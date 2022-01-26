async function gameFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="game-body"]').value.trim();
  console.log(title);

  const list_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

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