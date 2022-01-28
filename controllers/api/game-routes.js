const router = require("express").Router();
const { Game, List, User } = require("../../models");
const withAuth = require("../../utils/auth");
const axios = require('axios').default;

async function addGame(title) {
 //console.log(title);
  const apiUrl = "https://api.boardgameatlas.com/api/search?name=" + title+ "&client_id=HeQ1W2N1xL";

  const { data } = await axios(apiUrl);

  //console.log('(axios)', data);

  //console.log(data.games[0]);
  const gameObject = {
    url: data.games[0].url,
    description: data.games[0].description,
    image_url: data.games[0].image_url
  }
  console.log(gameObject);
  return gameObject;
}

router.get("/", (req, res) => {
  Game.findAll()
    .then((dbGameData) => res.json(dbGameData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

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

router.post("/", async (req, res) => {
  const title = req.body.title;
  const gameObject = await addGame(title);

  //if (req.session) {
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
