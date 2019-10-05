// var port = null;
// var message = null;

// function connect() {
//     // connect to local program com.a.chrome_interface
//     port = chrome.runtime.connectNative('com.flyinglawnmower.obsnp');
//     port.onMessage.addListener(onNativeMessage);
//     port.onDisconnect.addListener(onDisconnected);
// }

// connect();

// function onNativeMessage(msg) {
//     console.log("Message received from Native Interface.")
//     console.log(msg);
// }

// function onDisconnected() {
//     console.log("Disconnected.");
// }

// function sendNativeMessage(msg) {
//     message = msg;
//     port.postMessage(message);
// }

if (process.env.BROWSER === 'chrome' || process.env.BROWSER === 'edgium' || process.env.BROWSER === 'edge') {
  chrome.runtime.onMessage.addListener(async function(
    data,
    sender,
    sendResponse
  ) {
    // sendNativeMessage(data);
    try {
      await fetch('http://localhost:47565/track', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (e) {
      console.log(e);
    }
  });  
} else if (process.env.BROWSER === 'firefox') {
  browser.runtime.onMessage.addListener(async function(
    data,
    sender,
    sendResponse
  ) {
    // sendNativeMessage(data);
    try {
      await fetch('http://localhost:47565/track', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (e) {
      console.log(e);
    }
  });
}

