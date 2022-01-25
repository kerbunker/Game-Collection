const gameAPI = title => {
var request = require('request');

request({ url: `https://api.boardgameatlas.com/api/search?name=$[title]&client_id=HeQ1W2N1xL` } , function(err, res, jsonString) {
    var json = JSON.parse(jsonString);
    var gameObject = {
      name: json.games.name,
      url: json.games.url,
      description: json.games.description,
      image_url: json.games.image_url
    }
      console.log(json.games.name);
});

};