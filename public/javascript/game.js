//const nodeFetch = require('node-fetch');
//const axios = require('axios').default;

async function gameFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="game-body"]').value.trim();
  //console.log(title);

  //const apiUrl = "https://api.boardgameatlas.com/api/search?name=" + title + "&client_id=HeQ1W2N1xL";

  //const resp = await nodeFetch(apiUrl);
  //const data = await resp.json();
  //const { data } = await axios(apiUrl);

  //console.log(data);

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