# Detailings

## Status 🔴🟠🟡🟢🔵🟣

Error - 🔴 | ☢️ | ❌ | 🚨

Success - 🟢 | ✅ | 🚀

Warning - 🟡 | ⚠️ 

Info - 🔵 | ℹ️ | 📋

Important - ‼️ | 🟣 | 🎯

Function for sending logs: 
```ts
const logSymbolism = {
	error: "🚨",
	log: "📋",
	warn: "⚠️",
	important: "🎯",
	send: "📤",
	received: "📥"
} as const; 

type LogType = keyof typeof logSymbolism;
/**
 * Logs a message to the console with a symbol based on its type
 * @param type 
 * @param messages 
 * @param optionalParams 
 */
export function consoleDebug(messages : LogType | any, ...optionalParams: any[]) {
	if(__DEV__) {
    if (typeof messages === 'string') {
      const logType: LogType = messages.toLowerCase() as LogType;
      if (logSymbolism[logType]) {
        console.log(logSymbolism[logType], ...optionalParams);
        return;
      } else {
        console.log(logSymbolism.log, messages, ...optionalParams);
      }
    }
  }
}
```

> Note: while loging Json data must use the method given below for showing data in JSON format while sending string value the consoleDebug.
```ts
JSON.stringify(data, null, 3);

```

```js
console.log("%cContent","color: blue; font-size: 20px;") // For blue color text
```