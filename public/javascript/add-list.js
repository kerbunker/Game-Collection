var mylist = document.getElementsByTagName("LI");


async function addList(event) {

  // gets the title the user added
  const title = document.querySelector('input[name="list-title"]').value;

  // adds the list to the database
  const response = await fetch('/api/lists', {
    method: 'POST',
    body: JSON.stringify({
      title
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });


  if (response.ok) {
    
    // reloads the page to show new comment
    document.location.reload();
  } else {
    alert(response.statusText);
  }
}



document.querySelector('.list-input').addEventListener('submit', addList);

