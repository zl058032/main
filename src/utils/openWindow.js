export default function openWindow(url) {
  if (window.cordova) {
    window.cordova.InAppBrowser.open(url, '_system', 'location=yes');
  }
};
