// Import required modules
const express = require("express"); // Framework for building web applications
const http = require("http"); // Core Node.js module for creating HTTP servers
const socketIo = require("socket.io"); // Library for real-time bidirectional communication
const cors = require("cors"); // Middleware to enable Cross-Origin Resource Sharing
const axios = require("axios"); // Library for making HTTP requests
const jwt = require("jsonwebtoken"); // Library for handling JSON Web Tokens (JWT)
const CryptoJS = require("crypto-js"); // Library for cryptographic operations
const connection = require("../connection.cjs"); // Import custom database connection module
const moment = require("moment-timezone"); // Library for date and time manipulation with timezone support
const FormData = require("form-data");
const { log } = require("console");
const app = express();
app.use(express.json({ limit: "1mb" }));
app.use(express.static("public"));
// Create an HTTP server and attach Express to it
const server = http.createServer(app);

// Define constants
// Bind to all interfaces by default. Set SOCKET_HOST when a specific interface is required.
const IP_ADDRESS = process.env.SOCKET_HOST || "0.0.0.0";
const PORT = Number(process.env.SOCKET_PORT || 3000);
const LARAVEL_API_URL = process.env.LARAVEL_API_URL;
const SOCKET_INTERNAL_SECRET = process.env.SOCKET_INTERNAL_SECRET;

const used = process.memoryUsage();
console.log(
  `Memory Usage: RSS: ${(used.rss / 1024 / 1024).toFixed(2)} MB, Heap: ${(
    used.heapUsed /
    1024 /
    1024
  ).toFixed(2)} MB`,
);
// Initialize an Express application

// Initialize Socket.IO for real-time communication, with CORS configuration
const io = socketIo(server, {
  cors: {
    origin: "*", // Allow requests from all origins
    methods: ["GET", "POST"], // Allow these HTTP methods
    // maxHttpBufferSize: 1e6, // Limit the size of the HTTP request body (1 MB)
    // pingInterval: 25000, // Set ping interval (5 seconds)
    // pingTimeout: 60000, // Set timeout for ping (3 seconds)
    cookie: false, // Disable cookie parsing for better memory handling
    transports: ["websocket"], // Use only WebSockets, reducing memory usage compared to long polling
    // allowUpgrades: false, // Disable protocol upgrades, further reducing resource usage
    // perMessageDeflate: false, // Disable per-message deflation (compression), which can save memory
    maxConnections: 1000, // Maximum number of concurrent connections
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 5000,
    timeout: 300000,
  },
});

// Laravel calls this endpoint after a chat message is safely stored. It is not
// public: both processes must share SOCKET_INTERNAL_SECRET.
app.post("/internal/chat-message", (req, res) => {
  if (
    !SOCKET_INTERNAL_SECRET ||
    req.get("X-Socket-Secret") !== SOCKET_INTERNAL_SECRET
  ) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const participantIds = [...new Set(req.body?.participantIds || [])]
    .map(String)
    .filter((id) => /^\d+$/.test(id));
  const message = req.body?.message;
  if (!participantIds.length || !message) {
    return res
      .status(422)
      .json({ message: "participantIds and message are required" });
  }

  const rooms = participantIds.map((id) => `chat-user:${id}`);
  io.to(rooms).emit("chat:message", message);

  return res.json({ delivered: true, rooms: rooms.length });
});

function decryptAES(base64String) {
  try {
    // Decode the Base64-encoded string
    const decodedData = CryptoJS.enc.Base64.parse(base64String);
    // Convert the decoded data to a UTF-8 string
    const plaintext = decodedData.toString(CryptoJS.enc.Utf8);
    return plaintext;
  } catch (error) {
    console.error("Base64 decoding failed:", error.message);
    return "Decoding failed.";
  }
}

const users = {};

// Listen for new socket connections
io.on("connection", (socket) => {
  // This event is triggered when a user establishes a connection with the server
  // Log the socket ID of the newly connected user
  console.log("A user connected:", socket.id);

  // A client must prove its Laravel JWT before joining its own private room.
  socket.on(
    "authenticateChat",
    async ({ token, userId } = {}, callback = () => {}) => {
      if (
        !LARAVEL_API_URL ||
        !token ||
        userId === undefined ||
        userId === null
      ) {
        return callback({
          success: false,
          message: "Socket authentication is not configured.",
        });
      }

      try {
        const response = await axios.post(
          `${LARAVEL_API_URL.replace(/\/$/, "")}/socket/chat-auth`,
          { userId: String(userId) },
          { headers: { token }, timeout: 5000 },
        );
        const verifiedUserId = String(response.data?.data?.userId || "");
        if (!/^\d+$/.test(verifiedUserId)) {
          return callback({
            success: false,
            message: "Socket authentication failed.",
          });
        }

        socket.join(`chat-user:${verifiedUserId}`);
        return callback({ success: true, userId: verifiedUserId });
      } catch (error) {
        return callback({
          success: false,
          message: "Socket authentication failed.",
        });
      }
    },
  );

  // Listen for the "user_connected" event, which is triggered when a user connects
  socket.on("user_connected", (userId) => {
    // Map the userId to the socket.id to associate the user with their socket connection
    users[userId] = socket.id;

    // Log the user connection details
    console.log(`User ${userId} is connected with socket ID ${socket.id}`);
  });

  /**
   * Handle the "joinRoom" event when a user requests to join a chat room.
   *
   * This function manages user joining rooms, counting users in each room,
   * and emitting relevant events when specific conditions are met (e.g., two users in a room).
   * It also fetches messages for the room from an external API and sends them to the user.
   *
   * @author Nitin Saini
   *
   * @event joinRoom
   * @param {Object} data The data sent by the client when joining a room.
   * @property {string} data.room The name of the room the user wants to join.
   * @property {string} data.token The authentication token for API requests.
   *
   * @returns {void}
   */
  socket.on("joinRoom", async (data) => {
    const { room, token } = data;

    if (!room) {
      console.error("Room name not provided for joinRoom event.");

      socket.emit("error", {
        message: "Room name is required to join.",
      });

      return;
    }

    socket.join(room);

    const userCount = io.sockets.adapter.rooms.get(room)?.size || 0;

    console.log(
      `User with socket ID ${socket.id} joined room ${room}. Total users: ${userCount}`,
    );

    if (userCount === 2) {
      io.to(room).emit("twoUsersConnected", {
        userCount,
      });
    }

    // Keep your existing API call here if room history is still required.
    // It should only use room/token now.
  });

  /**
   * Handle the "sendMessage" event when a user sends a message in a chat room.
   *
   * This function processes the message sending functionality, including:
   * - Decrypting sensitive data (appointmentId, senderId, receiverId)
   * - Determining the sender's role (Doctor or Patient)
   * - Handling file uploads (if any)
   * - Inserting the message into the database using a stored procedure
   * - Emitting the message to all users in the room
   *
   * @author Nitin Saini
   *
   * @event sendMessage
   * @param {Object} data The data sent by the client when sending a message.
   * @property {string} data.room The chat room ID where the message is sent.
   * @property {string} data.message The actual message content being sent.
   * @property {string} data.token The token for validation (not used directly in this block).
   * @property {string} data.receiverId The ID of the user receiving the message.
   * @property {string} data.appointmentId The ID of the appointment associated with the message.
   * @property {string} data.senderId The ID of the user sending the message.
   * @property {string} data.iRoleId The role of the sender (Doctor/Patient).
   * @property {string} data.vFile_Url The URL of any file attached to the message (optional).
   *
   * @returns {void}
   */
  // Deprecated appointment handler. New chat messages must go through Laravel's
  // POST /api/sendmessage endpoint so attachments and stored procedures are used.
  socket.on("legacyAppointmentSendMessage", async (data) => {
    const {
      room, // The chat room ID where the message is sent
      message, // The actual message content
      token, // Token for validation (not used directly in this block)
      receiverId, // The ID of the user receiving the message
      appointmentId, // The ID of the appointment associated with the message
      senderId, // The ID of the user sending the message
      iRoleId, // The role of the sender (Doctor/Patient)
      vFile_Url, // The URL of any file attached to the message
    } = data;

    // Try block to handle the message sending logic
    try {
      // Decrypt sensitive data (appointmentId, senderId, receiverId)
      const appointmentIdDecoded = decryptAES(appointmentId);
      const senderIdDecoded = decryptAES(senderId);
      const receiverIdDecoded = decryptAES(receiverId);

      // Log the decrypted values for debugging
      console.log("Decrypted senderId:", senderIdDecoded);
      console.log("Decrypted appointmentId:", appointmentIdDecoded);
      console.log("Decrypted receiverId:", receiverIdDecoded);

      // Log the sender's role (iRoleId)
      console.log("iRoleId", iRoleId);

      // Determine the sender's type based on their role (Doctor or Patient)
      let senderType = iRoleId == "3" || iRoleId == "5"? "Doctor" : "Patient";

      // Handle file upload (if applicable)
      let filename = null; // Placeholder for file upload logic
      const fileType = "text"; // Default file type is text for now
      console.log(vFile_Url, "vFile_Url:");
      // If no file URL is provided (empty or null), insert the message into the database
      if (vFile_Url == "" || vFile_Url == null) {
        const insertResult = await connection.query(
          "CALL sp_insert_messages_chat(?, ?, ?, ?, ?, ?, ?)", // Stored procedure to insert message
          [
            senderIdDecoded, // Sender ID
            message, // Message content
            fileType, // File type (text by default)
            receiverIdDecoded, // Receiver ID
            room, // Chat room ID
            filename, // Filename (null for now)
            senderType, // Sender type (Doctor or Patient)
          ],
        );

        // Get the current timestamp in IST (India Standard Time)
        const sentAt = moment.tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

        // Prepare the response object that will be sent back to the room
        const response = {
          iSender_Id: senderId, // Original sender ID
          iReceiverId: receiverId, // Receiver ID
          id: room, // Room ID
          tMessages: message, // The message text
          eMessageSenderType: senderType, // Type of sender (Doctor/Patient)
          eMessage_Type: "text", // Message type (text)
          dSent_At: sentAt, // Timestamp of when the message was sent
          vFile_Url: vFile_Url, // File URL (if any)
          dRead_At: sentAt, // Timestamp of when the message was recive
        };

        // Emit the response to all users in the room
        io.to(room).emit("message", response);
      } else {
        // Get the current timestamp in IST (India Standard Time)
        const sentAt = moment.tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

        // Prepare the response object that will be sent back to the room
        const response = {
          iSender_Id: senderId, // Original sender ID
          iReceiverId: receiverId, // Receiver ID
          id: room, // Room ID
          tMessages: message, // The message text
          eMessageSenderType: senderType, // Type of sender (Doctor/Patient)
          eMessage_Type: "document", // Message type (text)
          dSent_At: sentAt, // Timestamp of when the message was sent
          vFile_Url: vFile_Url, // File URL (if any)
          dRead_At: sentAt, // Timestamp of when the message was recive
        };

        // Emit the response to all users in the room
        io.to(room).emit("message", response);
      }
    } catch (error) {
      // Log any error that occurs during the process
      console.error("Error handling sendMessage:", error.message);

      // Emit an error response to the client indicating an issue occurred
      socket.emit("error", {
        error: "An error occurred while processing your request.",
      });
    }
  });

  /**
   * Listen for the "typing" event when a user starts typing
   * Handle the "typing" event to notify others that a user is typing in a specific room.
   *
   * This function listens for the "typing" event emitted by a user. It extracts the `room`
   * and `userId` from the incoming data, validates them, and emits a "userTyping" event
   * to notify others in the room that the user is typing. It also logs the event for debugging purposes.
   *
   * @group Chat Management
   *
   * @author Nitin Saini
   *
   * @param {Object} data The data object containing the room and userId details:
   * @param {string} data.room The room identifier where the user is typing.
   * @param {string} data.userId The ID of the user who is typing.
   *
   * @emits userTyping Emits an event to notify others in the room that the user is typing.
   *
   * @example
   * // Example usage
   * socket.emit("typing", { room: "room123", userId: "user456" });
   *
   * @returns {void}
   * Logs the typing activity of the user for debugging.
   *
   * @note Ensure that the client-side implementation emits the "typing" event with valid room and userId data.
   */
  socket.on("typing", (data) => {
    const { room, userId } = data; // Extract room and userId from the data object

    // Check if both room and userId are provided
    if (room && userId) {
      // Emit a "userTyping" event to notify others that the user is typing
      socket.emit("userTyping", { userId });

      // Log the event for debugging
      console.log(`User ${userId} is typing in room ${room}`);
    }
  });

  /**
   * Listen for the "stopTyping" event when a user stops typing
   * Handle the "stopTyping" event to notify others that a user has stopped typing in a specific room.
   *
   * This function listens for the "stopTyping" event emitted by a user. It extracts the `room`
   * and `userId` from the incoming data, validates them, and emits a "userStoppedTyping" event
   * to notify others in the room that the user has stopped typing. It also logs the event for debugging purposes.
   *
   * @group Chat Management
   *
   * @author Nitin Saini
   *
   * @param {Object} data The data object containing the room and userId details:
   * @param {string} data.room The room identifier where the user was typing.
   * @param {string} data.userId The ID of the user who has stopped typing.
   *
   * @emits userStoppedTyping Emits an event to notify others in the room that the user has stopped typing.
   *
   * @example
   * // Example usage
   * socket.emit("stopTyping", { room: "room123", userId: "user456" });
   *
   * @returns {void}
   * Logs the stop typing activity of the user for debugging.
   *
   * @note Ensure that the client-side implementation emits the "stopTyping" event with valid room and userId data.
   */
  socket.on("stopTyping", (data) => {
    const { room, userId } = data; // Extract room and userId from the data object

    // Check if both room and userId are provided
    if (room && userId) {
      // Emit a "userStoppedTyping" event to notify others that the user has stopped typing
      socket.emit("userStoppedTyping", { userId });

      // Log the event for debugging
      console.log(`User ${userId} stopped typing in room ${room}`);
    }
  });

  /**
   * Listen for the "doctor_accept" event
   * Handle the "doctor_accept" event to process and deduct the chat amount for continued appointment sessions.
   *
   * This function listens for the "doctor_accept" event emitted by the client. It receives the necessary data
   * to process the request, including details about the doctor, patient, appointment, and authentication token.
   * The function sends a request to a specific API endpoint to deduct the chat amount and emits the result
   * to the users in the relevant chat room.
   *
   * @group Chat Management
   *
   * @author Nitin Saini
   *
   * @param {Object} data The data object containing necessary parameters:
   * @param {number} data.patientId The ID of the patient.
   * @param {number} data.doctorId The ID of the doctor.
   * @param {number} data.newAppointmentFee The fee for the new appointment session.
   * @param {number} data.appointmentId The ID of the appointment.
   * @param {string} data.token The authentication token for the API request.
   * @param {string} data.iChatId The chat room ID where the event is triggered.
   * @param {boolean} data.requestType A flag indicating whether the request should proceed.
   *
   * @example
   * // Example usage
   * socket.emit("doctor_accept", {
   *   patientId: 1,
   *   doctorId: 2,
   *
   *   newAppointmentFee: 100.0,
   *   appointmentId: 123,
   *   token: "abcdefg12345",
   *   iChatId: "chat_room_456",
   *   requestType: true,
   * });
   *
   * @emits amount_deducted Emits the result of the amount deduction process to the relevant chat room.
   *
   * @returns {void}
   * Logs the request and response details for debugging purposes and handles errors gracefully.
   */
  // socket.on(
  //     "doctor_accept",
  //     async ({
  //         patientId,
  //         doctorId,
  //         newAppointmentFee,
  //         appointmentId,
  //         token, // Ensure the token is passed dynamically
  //         iChatId,
  //         requestType,
  //     }) => {
  //         try {
  //             // Create a new FormData object to send the data in a form-like structure

  //             console.log(iChatId, "iChatId");
  //             console.log(requestType, "requestType");
  //             if (requestType === true) {
  //                 let data = new FormData();
  //                 // Append each value to FormData only if defined
  //                 console.log("Appending doctorId:", doctorId);
  //                 data.append("doctorId", doctorId);

  //                 console.log("Appending patientId:", patientId);
  //                 data.append("patientId", patientId);

  //                 console.log(
  //                     "Appending newAppointmentFee:",
  //                     newAppointmentFee
  //                 );
  //                 data.append("newAppointmentFee", newAppointmentFee);

  //                 console.log("Appending appointmentId:", appointmentId);
  //                 data.append("appointmentId", appointmentId);
  //                 // Define the configuration for the HTTP request
  //                 let config = {
  //                     method: "post", // Use the POST method to submit data
  //                     maxBodyLength: Infinity, // Set max body length to infinity for large data
  //                     url: "femmeconnect.prologiclocal74.com/api/continueChatAmountDeduct", // API endpoint
  //                     headers: {
  //                         token: token, // Dynamically pass the token from the event
  //                         ...data.getHeaders(), // Append headers from the FormData object
  //                     },
  //                     data: data, // The FormData object to be sent with the request
  //                 };

  //                 const sentAt = moment
  //                     .tz("Asia/Kolkata")
  //                     .format("YYYY-MM-DD HH:mm:ss");

  //                 const dScheduledDateGet = `SELECT dChatTime FROM appointments WHERE iAppointmentId = ?`;
  //                 console.log(dScheduledDateGet, "continue chat date-time");

  //                 const query = `UPDATE appointments SET dChatTime = DATE_ADD(dChatTime, INTERVAL 5 MINUTE) WHERE iAppointmentId = ?`;

  //                 const dChatTime = `SELECT dChatTime FROM appointments WHERE iAppointmentId = ?`;
  //                 connection.query(
  //                     query,
  //                     [decryptAES(appointmentId)],
  //                     (err, results) => {
  //                         if (err) {
  //                             console.error("Error executing query:", err);
  //                             return;
  //                         }
  //                         console.log(
  //                             `Rows updated: ${results.affectedRows}`
  //                         );
  //                     }
  //                 );

  //                 connection.query(
  //                     dScheduledDateGet,
  //                     [decryptAES(appointmentId)],
  //                     (err, results) => {
  //                         if (err) {
  //                             console.error("Error executing query:", err);
  //                             return;
  //                         }
  //                         console.log(
  //                             `Rows updated: ${results.affectedRows}`
  //                         );
  //                     }
  //                 );

  //                 connection.query(
  //                     dChatTime,
  //                     [decryptAES(appointmentId)],
  //                     (err, results) => {
  //                         if (err) {
  //                             console.error("Error executing query:", err);
  //                             return;
  //                         }
  //                         console.log(
  //                             `get chat date time: ${results.affectedRows}`
  //                         );
  //                     }
  //                 );

  //                 connection.query(
  //                     dScheduledDateGet,
  //                     [decryptAES(appointmentId)],
  //                     (err, results) => {
  //                         if (err) {
  //                             console.error("Error executing query:", err);
  //                             return;
  //                         }
  //                         console.log(`get value: ${results.affectedRows}`);
  //                     }
  //                 );

  //                 // Send the request using axios and await the response
  //                 const response = await axios.request(config);
  //                 if (response.data && response.data.data[0].status === 200) {
  //                     const dChatTimeQuery = `SELECT dScheduledDate,dChatTime FROM appointments WHERE iAppointmentId = ?`;
  //                     const decryptedAppointmentId =
  //                         decryptAES(iAppointmentId);
  //                     connection.query(
  //                         dChatTimeQuery,
  //                         [decryptedAppointmentId],
  //                         (err, results) => {
  //                             if (err) {
  //                                 console.error(
  //                                     "Error executing query:",
  //                                     err
  //                                 );
  //                                 return;
  //                             }

  //                             // Check if any rows were returned
  //                             if (results.length === 0) {
  //                                 console.log(
  //                                     "No appointment found with the given ID."
  //                                 );
  //                                 return;
  //                             }

  //                             // Access the first result correctly
  //                             const dChatTime = results[0].dChatTime;
  //                             const dScheduledDate = results[0].dScheduledDate;
  //                             console.log(
  //                                 `Retrieved dChatTime: ${dChatTime}`
  //                             );
  //                             // currentDate = dChatTime;
  //                             // io.emit("twoUsersConnected", {
  //                             //     userCount,
  //                             //     dScheduledDate,
  //                             //     dChatTime
  //                             // });
  //                             const result = {
  //                                 request: "True",
  //                                 // dScheduledDate : dScheduledDate,
  //                                 dChatTime : dChatTime
  //                                  // Indicates failure in one or both conditions
  //                             };
  //                             // Emit the response to all users in the room
  //                             io.to(iChatId).emit("amount_deducted", result);
  //                         }
  //                     );
  //                     // const result = {
  //                     //     request: "True", // Indicates success for both conditions
  //                     // };
  //                     // console.log(result);
  //                     // // Emit the response to all users in the room
  //                     // io.to(iChatId).emit("amount_deducted", result);
  //                     // io.to(iChatId).emit("updated_time", sentAt);
  //                 }
  //             } else {

  //                 const dChatTimeQuery = `SELECT dScheduledDate,dChatTime FROM appointments WHERE iAppointmentId = ?`;
  //                 const decryptedAppointmentId =
  //                     decryptAES(iAppointmentId);
  //                 connection.query(
  //                     dChatTimeQuery,
  //                     [decryptedAppointmentId],
  //                     (err, results) => {
  //                         if (err) {
  //                             console.error(
  //                                 "Error executing query:",
  //                                 err
  //                             );
  //                             return;
  //                         }

  //                         // Check if any rows were returned
  //                         if (results.length === 0) {
  //                             console.log(
  //                                 "No appointment found with the given ID."
  //                             );
  //                             return;
  //                         }

  //                         // Access the first result correctly
  //                         const dChatTime = results[0].dChatTime;
  //                         const dScheduledDate = results[0].dScheduledDate;
  //                         console.log(
  //                             `Retrieved dChatTime: ${dChatTime}`
  //                         );
  //                         // currentDate = dChatTime;
  //                         // io.emit("twoUsersConnected", {
  //                         //     userCount,
  //                         //     dScheduledDate,
  //                         //     dChatTime
  //                         // });
  //                         const result = {
  //                             request: "False",
  //                             dScheduledDate : dScheduledDate,
  //                             // dChatTime : dChatTime
  //                              // Indicates failure in one or both conditions
  //                         };
  //                         // Emit the response to all users in the room
  //                         io.to(iChatId).emit("amount_deducted", result);
  //                     }
  //                 );
  //                 // const result = {
  //                 //     request: "False", // Indicates failure in one or both conditions
  //                 // };
  //                 // // Emit the response to all users in the room
  //                 // io.to(iChatId).emit("amount_deducted", result);
  //             }
  //         } catch (error) {
  //             // Log any error that occurs during the request
  //             console.error("Error:", error);
  //         }
  //     }
  // );
  socket.on(
    "doctor_accept",
    async ({
      patientId,
      doctorId,
      newAppointmentFee,
      appointmentId,
      token,
      iChatId,
      requestType,
    }) => {
      try {
        console.log(iChatId, "iChatId");
        console.log(requestType, "requestType");

        const decryptedAppointmentId = decryptAES(appointmentId);
        const sentAt = moment.tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

        if (requestType === true) {
          let data = new FormData();
          data.append("doctorId", doctorId);
          data.append("patientId", patientId);
          data.append("newAppointmentFee", newAppointmentFee);
          data.append("appointmentId", appointmentId);
          data.append("type", "socket");

          let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "femmeconnect.prologiclocal74.com/api/continueChatAmountDeduct",
            headers: {
              token: token,
              ...data.getHeaders(),
            },
            data: data,
          };

          // Update chat time by adding 5 minutes
          const updateChatTimeQuery = `UPDATE appointments SET dChatTime = DATE_ADD(dChatTime, INTERVAL 5 MINUTE) WHERE iAppointmentId = ?`;
          connection.query(
            updateChatTimeQuery,
            [decryptedAppointmentId],
            (err, results) => {
              if (err) {
                console.error("Error updating chat time:", err);
              } else {
                console.log(`Rows updated: ${results.affectedRows}`);
              }
            },
          );

          // Send the request using axios and await the response
          const response = await axios.request(config);

          console.log(response);

          if (response.data && response.data.data[0].status === 200) {
            // Retrieve updated chat time
            const fetchChatTimeQuery = `SELECT dChatTime FROM appointments WHERE iAppointmentId = ?`;
            connection.query(
              fetchChatTimeQuery,
              [decryptedAppointmentId],
              (err, results) => {
                if (err) {
                  console.error("Error fetching chat time:", err);
                  return;
                }

                if (results.length === 0) {
                  console.log("No appointment found with the given ID.");
                  return;
                }

                const { dChatTime, dScheduledDate } = results[0];
                console.log(`Retrieved dChatTime: ${dChatTime}`);

                io.to(iChatId).emit("amount_deducted", {
                  request: "True",
                  dChatTime: dChatTime,
                });
              },
            );
          }
        } else {
          // Handle case where requestType is false
          const fetchChatTimeQuery = `SELECT dScheduledDate FROM appointments WHERE iAppointmentId = ?`;
          connection.query(
            fetchChatTimeQuery,
            [decryptedAppointmentId],
            (err, results) => {
              if (err) {
                console.error("Error fetching chat time:", err);
                return;
              }

              if (results.length === 0) {
                console.log("No appointment found with the given ID.");
                return;
              }

              const { dScheduledDate } = results[0];
              console.log(`Retrieved dScheduledDate: ${dScheduledDate}`);

              io.to(iChatId).emit("amount_deducted", {
                request: "False",
                dScheduledDate: dScheduledDate,
              });
            },
          );
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
  );

  // socket.on(
  //     "doctor_accept",
  //     async ({
  //         patientId,
  //         doctorId,
  //         newAppointmentFee,
  //         appointmentId,
  //         token, // Ensure the token is passed dynamically
  //         iChatId,
  //         requestType,
  //     }) => {
  //         try {
  //             // Create a new FormData object to send the data in a form-like structure

  //             console.log(iChatId, "iChatId");
  //             console.log(requestType, "requestType");
  //             if (requestType === true) {
  //                 let data = new FormData();
  //                 // Append each value to FormData only if defined
  //                 console.log("Appending doctorId:", doctorId);
  //                 data.append("doctorId", doctorId);

  //                 console.log("Appending patientId:", patientId);
  //                 data.append("patientId", patientId);

  //                 console.log(
  //                     "Appending newAppointmentFee:",
  //                     newAppointmentFee
  //                 );
  //                 data.append("newAppointmentFee", newAppointmentFee);

  //                 console.log("Appending appointmentId:", appointmentId);
  //                 data.append("appointmentId", appointmentId);
  //                 // Define the configuration for the HTTP request
  //                 let config = {
  //                     method: "post", // Use the POST method to submit data
  //                     maxBodyLength: Infinity, // Set max body length to infinity for large data
  //                     url: "femmeconnect.prologiclocal74.com/api/continueChatAmountDeduct", // API endpoint
  //                     headers: {
  //                         token: token, // Dynamically pass the token from the event
  //                         ...data.getHeaders(), // Append headers from the FormData object
  //                     },
  //                     data: data, // The FormData object to be sent with the request
  //                 };

  //                 // Send the request using axios and await the response
  //                 const response = await axios.request(config);
  //                 if (response.data && response.data.data[0].status === 200) {
  //                     const result = {
  //                         request: "True", // Indicates success for both conditions
  //                     };
  //                     console.log(result);
  //                     // Emit the response to all users in the room
  //                     io.to(iChatId).emit("amount_deducted", result);
  //                 }
  //             } else {
  //                 const result = {
  //                     request: "False", // Indicates failure in one or both conditions
  //                 };
  //                 // Emit the response to all users in the room
  //                 io.to(iChatId).emit("amount_deducted", result);
  //             }
  //         } catch (error) {
  //             // Log any error that occurs during the request
  //             console.error("Error:", error);
  //         }
  //     }
  // );

  /**
   * Listen for the "patient_response" event from the client
   * Handle the "patient_response" event to process the patient's response.
   *
   * This function listens for the "patient_response" event emitted by the client and processes
   * the patient's response to a doctor's request in a specific chat room. It emits the appropriate
   * response back to the doctor based on the patient's input.
   *
   * @author Nitin Saini
   *
   * @group Chat Management
   *
   * @param {Object} data The data object containing necessary parameters:
   * @param {string} data.iChatId The chat room ID where the event is triggered.
   * @param {string} data.response The patient's response ("yes" or "no").
   *
   * @example
   * // Example usage
   * socket.emit("patient_response", {
   *   iChatId: "chat_room_456",
   *   response: "yes",
   * });
   *
   * @emits show_doctor_request Emits a message to notify the doctor of the patient's response.
   *
   * @returns {void}
   * Logs the response and handles invalid or missing data gracefully.
   */
  socket.on("patient_response", ({ iChatId, response }) => {
    // Log the response and chat ID for debugging
    console.log("Received response from patient:", response);
    console.log("iChatId ID:", iChatId);

    // Ensure iChatId exists before proceeding
    if (!iChatId) {
      console.log("chat ID not found.");
      io.to(iChatId).emit("show_doctor_request", "false"); // Emit false if iChatId is not found
      return; // Exit if chat ID is not found
    }

    // Check if the patient's response was "yes"
    if (response === "yes") {
      console.log("Patient responded positively. Notifying doctor.");
      io.to(iChatId).emit("show_doctor_request", {
        message: "True",
      });
    } else if (response === "no") {
      console.log("Patient responded negatively. Notifying doctor.");
      io.to(iChatId).emit("show_doctor_request", {
        message: "False",
      });
    } else {
      console.log("Invalid response received or no valid response.");
    }
  });

  let doctorSocketId = null; // Initialize doctorSocketId
  let patientSocketId = null; // Initialize patientSocketId
  let doctorDisconnected = false;
  let patientDisconnected = false;
  let firstToDisconnect = "";

  // When the doctor connects
  socket.on("doctorConnect", (doctorId, iChatId) => {
    doctorSocketId = socket.id; // Assign socket ID to doctorSocketId
    doctorDisconnected = false; // Reset disconnection flag
    console.log("Doctor connected:", doctorId);
    console.log("iChatIddoctorConnect", doctorId.iChatId);
    // Handle doctor disconnect
    socket.on("disconnect", () => {
      if (socket.id === doctorSocketId) {
        doctorDisconnected = true;
        console.log("Doctor has disconnected.");

        io.to(doctorId.iChatId).emit("first_disconnected", {
          message: "doctor",
        });
      }
    });
  });

  // When the patient connects
  socket.on("patientConnect", (patientId, iChatId) => {
    patientSocketId = socket.id; // Assign socket ID to patientSocketId
    patientDisconnected = false; // Reset disconnection flag
    console.log("Patient connected:", patientId);
    console.log("iChatIdpatientConnect", patientId.iChatId);
    // Handle patient disconnect
    socket.on("disconnect", () => {
      if (socket.id === patientSocketId) {
        patientDisconnected = true;
        console.log("Patient has disconnected.");

        io.to(patientId.iChatId).emit("first_disconnected", {
          message: "patient",
        });
      }
    });
  });

  /**
   * Listen for the "disconnect" event, which triggers when a user disconnects from the server
   * Handle the "disconnect" event to manage user disconnection.
   *
   * This function is triggered when a user disconnects from the server. It logs the
   * disconnection for debugging purposes, and if a list of connected users is maintained,
   * it removes the disconnected user from the `users` object.
   *
   * @author Nitin Saini
   *
   * @group Connection Management
   *
   * @emits None
   *
   * @example
   * // Example output when a user disconnects
   * User disconnected: socket_id_123
   * User user_456 disconnected
   *
   * @returns {void}
   * Logs the disconnection and updates the users list if applicable.
   */
  socket.on("disconnect", () => {
    // Log the socket ID of the disconnected user for debugging
    console.log("User disconnected:", socket.id);

    // Remove the user from the 'users' object (optional, if you are maintaining a list of connected users)
    for (const userId in users) {
      // Check if the current user's socket ID matches the disconnected socket ID
      if (users[userId] === socket.id) {
        // Delete the user from the 'users' object
        delete users[userId];

        // Log that the user has been removed from the users list
        console.log(`User ${userId} disconnected`);

        // Break the loop once the user is found and removed
        break;
      }
    }
  });
});

/**
 * Start the server and listen on the specified IP address and port
 * Start the Socket.IO server and listen for incoming connections.
 *
 * This function initializes the server to listen on a specific IP address and port,
 * logging a message to indicate that the server is running. This is the entry point
 * for the application to handle real-time communication using Socket.IO.
 *
 * @group Server Initialization
 *
 * @author Nitin Saini
 *
 * @param {number} PORT The port number on which the server will listen.
 * @param {string} IP_ADDRESS The IP address on which the server will listen.
 *
 * @example
 * // Start the server on localhost at port 3000
 * server.listen(3000, '127.0.0.1', () => {
 *   console.log('Socket.IO server is running at 127.0.0.1');
 * });
 *
 * @returns {void}
 * Logs the server's URL upon successful initialization.
 */
server.listen(PORT, IP_ADDRESS, () => {
  console.log(`Socket.IO server is running at http://${IP_ADDRESS}:${PORT}`);
});