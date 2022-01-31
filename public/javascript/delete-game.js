async function deleteFormHandler(event) {
  event.preventDefault();

  // gets the game id from the address
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  // deletes the game from the database
  const response = await fetch(`/api/games/${id}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    //reloads to dashboard
    document.location.replace('/dashboard/');
  } else {
    alert(response.statusText);
  }

}

document.querySelector('.delete-game-btn').addEventListener('click', deleteFormHandler);