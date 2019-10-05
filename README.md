## Universal Now Playing Companion
This extension lets you send now playing data from any supported website (youtube, soundcloud, spotify (web), etc.) to the [Universal Now Playing desktop app](https://github.com/pendo324/universal-np).

### Usage
Install the extension from the [Chrome Web Store](https://chrome.google.com/webstore/detail/lljahlkpnhdopaegadghfjhhkcpdlijg/), if you're not using Chrome, Firefox/Edge builds will be uploaded soon, the browsers themselves should already be supported, so you can build the extension and use it like that if you wish.

### Contribute
To build, just install the dependencies (`npm i`/`yarn`) and then run the build script for the browser that you are testing on, for example, `npm run build:chrome`.

I anticipate most changes to be related to `src/worker-es6.js`, that is the script that is injected into a web page when you press the "Use on this page" button.