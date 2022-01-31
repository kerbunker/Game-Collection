async function deleteFormHandler(event) {
  event.preventDefault();

  // gets the list id from the address
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  // calls the delete list api call
  const response = await fetch(`/api/lists/${id}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    //reloads to the dashboard
    document.location.replace('/dashboard/');
  } else {
    alert(response.statusText);
  }

}

document.querySelector('.delete-list-btn').addEventListener('click', deleteFormHandler);