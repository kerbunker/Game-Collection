const { READUNCOMMITTED } = require("sequelize/dist/lib/table-hints");

const gameApi = title => {
  console.log(title);
    const apiUrl = `https://api.boardgameatlas.com/api/search?name=$[title]&client_id=HeQ1W2N1xL`;
    
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
             response.json.then(function(data) {
             console.log(data);
                let gameObject = {
                    title: data.games.name,
                    url: data.games.url,
                    description: data.games.description,
                    image_url: data.games.image_url
                }
              });
           }
                
           console.log(gameObject);
          });
    };

    // gameApi("Catan");
                    