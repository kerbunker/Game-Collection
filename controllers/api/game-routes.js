const router = require("express").Router();
const { Game, List, User } = require("../../models");
const withAuth = require("../../utils/auth");
const axios = require('axios').default;

// gets the game data from an api
async function addGame(title) {
  const apiUrl = "https://api.boardgameatlas.com/api/search?name=" + title+ "&client_id=HeQ1W2N1xL";

  //uses axios to call api
  const { data } = await axios(apiUrl);

  //creates a game object with the data from the api
  const gameObject = {
    url: data.games[0].url,
    description: data.games[0].description,
    image_url: data.games[0].image_url
  }
  // returns the object to the post route
  return gameObject;
}

//gets all the games
router.get("/", (req, res) => {
  Game.findAll()
    .then((dbGameData) => res.json(dbGameData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// gets a single game with the given id
router.get('/:id', (req, res) => {
  Game.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'url',
      'image_url',
      'description'
    ],
    include: [
      {
        // also gets the list data that contains the game
        model: List,
        attributes: ['id', 'title', 'user_id'],
        include: {
          model: User,
          attributes: ['username']
        }
        
      }
    ]
  })
    .then(dbGameData => {
      // gives an error message if no game data was found
      if (!dbGameData) {
        res.status(404).json({ message: 'No game found with this id' });
        return;
      }
      res.json(dbGameData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// creates a new game in the given list
router.post("/", async (req, res) => {
  // gets the title the user gave
  const title = req.body.title;
  // calls the function to get the data from the game api
  const gameObject = await addGame(title);

  //if (req.session) {
    // creates the new game object with data from user and game api
    Game.create({
      title: req.body.title,
      user_id: req.body.user_id,
      list_id: req.body.list_id,
      image_url: gameObject.image_url,
      url: gameObject.url,
      description: gameObject.description
    })
      .then((dbGameData) => res.json(dbGameData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  //}
});

// deletes the game
router.delete("/:id", withAuth, (req, res) => {
  Game.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbGameData) => {
      if (!dbGameData) {
        res.status(404).json({ message: "No game found with this id!" });
        return;
      }
      res.json(dbGameData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
