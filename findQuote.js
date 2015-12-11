// right now this script always runs when a new tab is opened. can i stop that??
// also window.find() doesn't work if the text spans multiple tags
chrome.runtime.onMessage.addListener(function(message, sender, response) {
  window.find(message);
});

