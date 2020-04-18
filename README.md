# Tab Titles for Ad Manager ![Mozilla Add-on](https://img.shields.io/amo/v/tab-titles-for-ad-manager) ![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg) ![GitHub](https://img.shields.io/github/license/v-ji/tab-titles-for-ad-manager)

[Google Ad Manager (DFP)](https://admanager.google.com) does not set meaningful tab titles by default, which can get confusing with a high number of tabs open. This is a simple extension to fix that.

Works for the following objects:
- Orders
- Line items
- Creatives
- Reports

## Installation
### Extension (Firefox)
1. Install from [Firefox Add-Ons](https://addons.mozilla.org/en-US/firefox/addon/tab-titles-for-ad-manager/).

### Userscript (all browsers)
1. Install a userscript manager such as [Violentmonkey](https://violentmonkey.github.io) (open-source) or [Tampermonkey](https://www.tampermonkey.net).
2. Open the [userscript code](https://raw.githubusercontent.com/v-ji/tab-titles-for-ad-manager/master/userscript/tab-titles-for-ad-manager.user.js).
3. Your userscript manager should prompt you to install. Accept.

## Considerations
Google Ad Manager does not expose a clean way to detect page changes or object changes. Not even the `hashchange` event fires consistently. I did my best to detect all object changes and set the title accordingly while keeping the extension lightweight.
