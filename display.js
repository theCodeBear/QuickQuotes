var list = document.getElementById('quotesList');
var li;
var verticalPositios = [];
chrome.storage.sync.get(null, function(items) {
  var count = 0;
  for (var item in items) {
    li = createListItem(item, items[item], count++);
    list.appendChild(li);
    verticalPositions.push(items[item].yPos);
  }
  document.body.appendChild(list);
});

document.body.addEventListener('click', function(event) {
  // here i route to the page and then open it at the verical position in the data
  // which is verticalPositions[event.path[0].getAttribute('id')]
});


function createListItem(date, info, count) {
  var li = document.createElement('li');
  createDivForListItem(date, li);
  createAnchoredDiv(info.url, li, count);
  createDivForListItem(info.text, li);
  return li;
}

function createDivForListItem(text, li) {
  var div = document.createElement('div');
  div.innerText = text;
  li.appendChild(div);
}

function createAnchoredDiv(text, li, count) {
  var div = document.createElement('div');
  // var a = document.createElement('a');
  // a.setAttribute('href', text);
  // a.setAttribute('id', count);
  // a.innerText = text;
  div.classList.add('link');
  div.innerText = text;
  li.appendChild(div);
}
