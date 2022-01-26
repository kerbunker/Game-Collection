async function gameFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('textarea[name="game-body"]').value.trim();

  const list_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  if (title) {
    const response = await fetch('/api/games', {
      method: 'POST',
      body: JSON.stringify({
        list_id,
        title
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