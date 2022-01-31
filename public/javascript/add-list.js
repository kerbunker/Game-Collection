var mylist = document.getElementsByTagName("LI");

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
    
    // reloads the page to show new comment
    document.location.reload();
  } else {
    alert(response.statusText);
  }
}



document.querySelector('.list-input').addEventListener('submit', addList);

