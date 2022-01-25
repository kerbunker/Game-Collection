var request = require('request');

request({ url: "https://api.boardgameatlas.com/api/search?name=Catan&client_id=JLBr5npPhV" } , function(err, res, jsonString) {
    var json = JSON.parse(jsonString);
    var gameNameList = json.games.map(e => e.name);
    console.log(gameNameList);
});