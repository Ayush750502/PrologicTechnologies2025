# Detailings

## Status 🔴🟠🟡🟢🔵🟣

Error - 🔴 | ☢️ | ❌ | 🚨

Success - 🟢 | ✅ | 🚀

Warning - 🟡 | ⚠️ 

Info - 🔵 | ℹ️ | 📋

Important - ‼️IMPORTANT‼️ | 🟣 | 🎯

Function for sending logs: 
```ts
const logSymbolism = {

	error: "🚨",
	log: "📋",
	warn: "⚠️",
	important: "🎯"

} as const; 

export default function consoleDebug(type : keyof typeof logSymbolism, logSymbolism, message1 : string, message2: string) {
	if(__DEV__) console.log(logSymbolism.type, message1, message2);
}
```

> Note: while loging Json data must use the method given below for showing data in JSON format while sending string value the consoleDebug.
```ts
JSON.stringify(data, null, 3);

```