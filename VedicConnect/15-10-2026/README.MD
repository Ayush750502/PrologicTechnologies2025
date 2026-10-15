Here is the complete, step-by-step documentation detailing everything we configured to install ZAP by Checkmarx on Ubuntu and successfully intercept network logs from your Android mobile device.

Complete Guide: Mobile Traffic Interception with ZAP on Ubuntu


Step 1: Install ZAP by Checkmarx on Ubuntu

We used the Snap installation package, which automatically bundles all necessary packages, including Java 17+.
1. Open your Ubuntu terminal (Ctrl + Alt + T).
2. Run the installation command:bash
sudo snap install zaproxy --classic
Use code with caution.
3. To start ZAP via the terminal, use:bash
zaproxy
Use code with caution.

Step 2: Configure ZAP to Accept External Network Connections

By default, ZAP only listens for network requests coming from your local computer (127.0.0.1). We changed this so it could listen to external devices like your phone.
1. Open ZAP and navigate to Tools -> Options.
2. From the left sidebar, expand Network and click on Local Servers/Proxies.
3. Locate the server table, select the active row, and click Edit.
4. Change the Address dropdown to 0.0.0.0 (this allows ZAP to listen to all network devices).
5. Set the Port to 8080.
6. Click OK to save.

Step 3: Open the Ubuntu Firewall

To prevent Ubuntu's internal firewall from blocking incoming connections from your mobile device, open port 8080.
1. Run the following command in your Ubuntu terminal:bash
sudo ufw allow 8080/tcp
Use code with caution.

Step 4: Export and Install the ZAP SSL Certificate on Android

Because modern mobile web apps use encrypted HTTPS, the phone will block connections through ZAP unless it explicitly trusts ZAP as a Root Certificate Authority (CA).

A. Export the Certificate from ZAP

1. In ZAP, go to Tools -> Options.
2. Expand the Network menu and click on Server Certificates.
3. Click the Save button and download the file named zap_root_ca.cer to your computer.
4. Transfer this file to your Android device (via USB cable, Google Drive, or email).

B. Install on the Android Device

1. Open Settings on your Android device.
2. Search for or navigate to Security -> More Security Settings -> Encryption & credentials.
3. Tap Install a certificate -> Select CA certificate.
4. Tap Install Anyway if a security warning pops up.
5. Select the zap_root_ca.cer file from your device storage to finalize the installation.

Step 5: Gather Network Configurations & Configure Phone Proxy

Your Ubuntu machine and Android phone must be connected to the same Wi-Fi network.

A. Find the Host IP Address

1. Run this command in your Ubuntu terminal to find your local IP address:bash
hostname -I
Use code with caution.
(In your setup, this address was determined to be 192.168.1.244).

B. Configure the Manual Proxy on Android

1. Go to your phone's Wi-Fi Settings.
2. Tap the small arrow or gear icon > on the far-right edge of your currently connected Wi-Fi profile (Prologic_Wifi) to open its Network Details.
3. Scroll down and tap on Proxy (which defaults to None).
4. Change it to Manual.
5. Input the following configurations:
	• Proxy hostname: 192.168.1.244
	• Proxy port: 8080
6. Tap the checkmark icon (✓) in the top-right corner to save.

Step 6: Reviewing Intercepted Network Logs in ZAP

With configurations complete, all incoming and outgoing mobile traffic paths through your machine.
1. Open a mobile web browser (like Chrome) and navigate to an unencrypted testing website like http://neverssl.com.
2. If Chrome displays a "This site doesn't support a secure connection" warning, tap Continue to site.
3. Look at the interface on your Ubuntu desktop machine inside ZAP:
	• The History Tab: Located at the bottom panel. Displays an active, real-time list of all network endpoints requested by the phone.
	• The Sites Tree: Located on the left panel. Graphically maps out the directory layouts of every domain structure captured by ZAP.
Now that your environment is fully configured and documented, are you ready to test the actual Android mobile application, or would you like to see how to use ZAP's Active Scan tools to run an automated vulnerability test on the endpoints you just captured?
