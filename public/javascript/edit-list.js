async function editFormHandler(event) {
  event.preventDefault();

  //gets the updated list title
  const title = document.querySelector('input[name="list-title"]').value.trim();
  // gets the list id from the address
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  // calls the api to update the list
  const response = await fetch(`/api/lists/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    // reloads the dashboard
    document.location.replace('/dashboard/');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.edit-list-form').addEventListener('submit', editFormHandler);