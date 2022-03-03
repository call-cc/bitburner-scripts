# bitburner-scripts
Random scripts for the game bitburner. Highly experimental.

Intellisense for VS Code:
- copy https://raw.githubusercontent.com/danielyxie/bitburner/dev/src/ScriptEditor/NetscriptDefinitions.d.ts and save it as index.d.ts at the root of your project
- create a file named jsconfig.json at your project root with this content:
```javascript
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "/*": [
        "*"
      ]
    }
  }
}
```
- replace /** @param {NS} ns */
with  /** @param {import("/.").NS} ns */ in your hack scripts.

(The in-game editor will no longer have Intellisense.)