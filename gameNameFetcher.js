
var request = require('request');

request({ url: `https://api.boardgameatlas.com/api/search?name=Catan&client_id=HeQ1W2N1xL` } , function(err, res, jsonString) {
    var json = JSON.parse(jsonString);
    var gameObject = {
      name: json.games[1].name,
      url: json.games[1].url,
      description: json.games[1].description,
      image_url: json.games[1].image_url
    }
      console.log(json.games[1].name);
      console.log(gameObject);
});
