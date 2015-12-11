chrome.contextMenus.create({
  'title': 'Save as Quick Quote',
  'id': '001',
  'contexts': ['selection']
});

var mouseY;
document.body.addEventListener('click', function(event) {
  mouseY = event.pageY;
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  var now = new Date();
  chrome.storage.sync.set({[now]: {
    url: info.pageUrl,
    text: info.selectionText,
    yPos: mouseY
  }});
});

chrome.browserAction.onClicked.addListener(function() {
  chrome.tabs.create({url: 'quotes.html'});
});

