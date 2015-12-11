var list = document.getElementById('quotesList');
var li, links, quote;
chrome.storage.sync.get(null, function(items) {
  var count = 0;
  for (var item in items) {
    li = createListItem(item, items[item], count++);
    list.appendChild(li);
  }
  document.body.appendChild(list);
  links = list.getElementsByClassName('link');
  makeEventListeners(links);
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


function createListItem(date, info, count) {
  var li = document.createElement('li');
  createDivForListItem(date, li);
  createAnchoredDiv(info.url, li);
  createDivForListItem(info.text, li);
  return li;
}

function createDivForListItem(text, li) {
  var div = document.createElement('div');
  div.innerText = text;
  li.appendChild(div);
}

function createAnchoredDiv(text, li) {
  var div = document.createElement('div');
  div.classList.add('link');
  div.innerText = text;
  li.appendChild(div);
}
