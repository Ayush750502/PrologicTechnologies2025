# What to do? 2026 05 11

## 1. health api integration:

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

