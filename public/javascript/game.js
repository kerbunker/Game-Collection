

async function gameFormHandler(event) {
  event.preventDefault();

  // gets the user input game title
  const title = document.querySelector('input[name="game-body"]').value.trim();

  // gets the list id from the address
  const list_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  // calls the post api to add the game
  if (title) {
    const response = await fetch('/api/games', {
      method: 'POST',
      body: JSON.stringify({
        title,
        list_id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('.game-form').addEventListener('submit', gameFormHandler);