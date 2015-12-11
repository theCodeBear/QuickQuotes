chrome.contextMenus.create({
  'title': 'Save as Quick Quote',
  'contexts': ['selection'],
  'onclick': function(info, tab) {
    console.log('text', info.selectionText);
    console.log('url', info.pageUrl);
  }
});
