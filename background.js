chrome.contextMenus.create({
  'title': 'Save as Quick Quote',
  'contexts': ['selection'],
  'onclick': function(info, tab) {
    var now = new Date();
    chrome.storage.sync.set({[now]: {date: now, url: info.pageUrl, text: info.selectionText}});
  }
});
