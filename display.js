var list = document.getElementById('quotesList');
var li, links, quote;
var script = document.getElementsByTagName('script')[0];
var options = {
  weekday: 'long', year: 'numeric', month: 'short',
  day: 'numeric', hour: '2-digit', minute: '2-digit'
};
chrome.storage.sync.get(null, function(items) {
  if (!Object.keys(items).length) {
    console.log('no quoites');
    var empty = document.createElement('div');
    empty.innerText = 'No Saved Quotes';
    empty.classList.add('empty');
    document.body.insertBefore(empty, script);
  } else {
    var title = document.createElement('header');
    title.innerText = 'Your Quick Quotes';
    document.body.insertBefore(title, script);
    for (var item in items) {
      var date = new Date(item);
      date = date.toLocaleTimeString('en-us', options);
      li = createListItem(date, items[item], item);
      list.appendChild(li);
    }
    var i = list.childNodes.length;
    while (i--) list.appendChild(list.childNodes[i]);
    document.body.insertBefore(list, script);
    links = list.getElementsByClassName('link');
    makeEventListeners(links);
  }
});


function makeEventListeners(links) {
  for (var i=0; i<links.length; i++) {
    links[i].addEventListener('click', function(event) {
      chrome.tabs.create({url: event.path[0].innerText}, function(tab) {
        quote = event.path[1].childNodes[2].innerText;
        chrome.tabs.executeScript(tab.id, {file: "findQuote.js"}, function() {
          chrome.tabs.sendMessage(tab.id, event.path[1].childNodes[2].innerText);
        });
      });
    });
  }
}


function createListItem(date, info, key) {
  var li = document.createElement('li');
  createDivForListItem(date, li, 'date');
  createDivForListItem(info.url, li, 'link');
  createDivForListItem(info.text, li, 'quote');
  createDeleteButton(li, key);
  return li;
}

function createDivForListItem(text, li, className) {
  var div = document.createElement('div');
  div.classList.add(className);
  div.innerText = text;
  li.appendChild(div);
}

function createDeleteButton(li, key) {
  var button = document.createElement('button');
  button.classList.add('delete');
  button.innerText = 'X';
  button.addEventListener('click', function() {
    chrome.storage.sync.remove(key, function() {
      document.querySelector('ul').removeChild(li);
    });
  });
  li.appendChild(button);
  return li;
}
