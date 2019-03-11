console.log('test');
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('start').addEventListener('click', () => {
    if (process.env.BROWSER === 'chrome') {
      chrome.tabs.executeScript({
        file: '/worker-es6.js'
      });
    } else if (process.env.BROWSER === 'firefox') {
      try {
        browser.tabs.executeScript({
          file: '/worker-es6.js'
        });
      } catch (e) {
        console.log(e);
      }
    }
  });
});
