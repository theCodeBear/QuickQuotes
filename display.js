var list = document.getElementById('quotesList');
var li;
chrome.storage.sync.get(null, function(items) {
  for (var item in items) {
    li = createListItem(item, items[item]);
    list.appendChild(li);
  }
  document.body.appendChild(list);
});


function createListItem(date, info) {
  var li = document.createElement('li');
  createDivForListItem(date, li);
  createDivForListItem(info.url, li);
  createDivForListItem(info.text, li);
  return li;
}

function createDivForListItem(text, li) {
  var div = document.createElement('div');
  div.innerText = text;
  li.appendChild(div);
}
