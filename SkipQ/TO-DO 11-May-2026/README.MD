# What to do? 2026 05 11

## 1. health api integration:

<img src='../TO-DO 30-Apr-2026 /DeviceDetailsDashboard.png' />

**API Interval:** 60 seconds


```cmd
curl --location --request PUT 'http://192.168.1.148:8000/device/health' \
--header 'Content-Type: application/json' \
--data '{
  "deviceId": "396374202667616254",

  "battery": 75,
  "cpu": 56,
  "memory": 89,
  "storage": 49,
  "temperature": 32,
  "wifi": "weak",

  "status": "offline",

  "firmwareVersion": "FW-2.1.4",
  "firmwareStatus": "outdated",

  "ipAddress": "192.168.1.25",
  "signalStrength": 12,

  "peripherals": {
    "camera": true,
    "scale": false,
    "printer": false
  },

  "cpuLoad": 97,
  "cpuTemp": 89,
  "ramUsage": 95,
  "gpuLoad": 92,
  "gpuTemp": 85,

  "version": "1.0.9"
}'
```

<img src="netInfo-working.png" />

``` json
// Currently we are getting 
{
    "battery": 100,
    "memory": 8,
    "ramUsage": 8,
    "storage": 29,
    "ipAddress": "192.168.1.121",
    "peripherals": {
        "camera": true,
        "scale": false,
        "printer": false
    },
    "version": "1.0",
    "deviceId": "396374202667616254",
    "firmwareVersion": "TKQ1.240727.V1.0.1",
    "status": "online"
}

// What we need to share
{
  "deviceId" : "396374202667616254", // ✔

  "battery" : 75, // ✔
  "cpu": 56, // library not yet found
  "memory" : 89, // ✔
  "storage" : 49, // ✔
  "temperature": 32, // getting null value in react-native-device-thermal
  "wifi": "weak", // ✔ can be determined by strength in @react-native-community/netinfo

  "status" : "offline", // ✔ we are getting @react-native-community/netinfo

  "firmwareVersion" : "FW-2.1.4", // ✔
  "firmwareStatus": "outdated", // should be computable from backend.

  "ipAddress" : "192.168.1.25", // ✔
  "signalStrength": 12, // ✔ in @react-native-community/netinfo the signal strength is not in dBm

  "peripherals": {
    "camera" : true, // ✔
    "scale": false,
    "printer": false
  },

  "cpuLoad": 97, // library not yet found
  "cpuTemp": 89, // library not yet found
  "ramUsage" : 95, // ✔
  "gpuLoad": 92, // library not yet found
  "gpuTemp": 85, // library not yet found

  "version" : "1.0.9" // ✔
}
```

## 2. api on PersonelItem Continue and loader on Personel Item modal is closed:


### Api for continue personel item:
```cmd
curl --location 'http://192.168.1.27:8000/cart/68602/addProduct' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTE0LCJpYXQiOjE3NTc1ODI0NzAsImV4cCI6MTc1ODE4NzI3MH0.4M_gd0qV7nDj-fi-casQjmMAIAOHr4zrpAIKD4DLf6E' \
--header 'isShopper: true' \
--header 'Content-Type: application/json' \
--data '{
    "productId": null,
    "quantity": 1,
    "scanned": true,
    "dropped": true,
    "status": 0,
    "event": "addedProductsDetected",
    "tag": "personalItemSkipped",
    "chainId": 1777967764105,
    "proofId": null
}'
```

