var request = require('request');

request({ url: `"https://api.boardgameatlas.com/api/search?name=$[title]&client_id=HeQ1W2N1xL"` } , function(err, res, jsonString) {
    var json = JSON.parse(jsonString);
    var gameNameList = json.games.map(e => e.name);
    console.log(gameNameList);
});