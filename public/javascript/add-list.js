var mylist = document.getElementsByTagName("LI");
const listEl = document.getElementById("list-list");

var i;
for (i = 0; i < mylist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  mylist[i].appendChild(span);
}



async function addList(event) {

  const title = document.querySelector('input[name="list-title"]').value;



  const response = await fetch('/api/lists', {
    method: 'POST',
    body: JSON.stringify({
      title
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  console.log(response);

  if (response.ok) {
    //console.log(response);
    // reloads the page to show new comment
    document.location.reload();
  } else {
    alert(response.statusText);
  }
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button
function newGame() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("game-input").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  li.classList.add("list-group-item");
  if (inputValue === '') {
    alert("Please provide a game name!");
  } else {
    //addGame(inputValue);
    document.getElementById("my-list").appendChild(li);
  }
  document.getElementById("game-input").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}

document.querySelector('.list-input').addEventListener('submit', addList);

