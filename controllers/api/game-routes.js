const router = require("express").Router();
const { Game, List, User } = require("../../models");
const withAuth = require("../../utils/auth.js");
const fetch = require('node-fetch');

// const gameApi = function(title) {
//   const apiUrl = "https://api.boardgameatlas.com/api/search?name=" + title + "&client_id=HeQ1W2N1xL";

//   // const response = fetch(apiUrl);
//   // const data = response.json().then()
//   let gameObject;
//   fetch(apiUrl).then(function(data) {
//     if (data.ok) {
//       data.json().then(function(data) {
//         gameObject = {
//           url: data.games[0].url,
//           description: data.games[0].description,
//           image_url: data.games[0].image_url
//         };
//         console.log(gameObject);
//         return gameObject;
//       });
//     }
//   });

//   //console.log(data.games[0].url);
  
// };

//gameApi("search for planet x");

router.get("/", (req, res) => {
  Game.findAll({
    include: [
      {
        model: List,
        attributes: ["id", "title", "user_id"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  })
    .then((dbGameData) => res.json(dbGameData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Game.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: List,
        attributes: ["id", "title", "user_id"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  })
    .then((dbGameData) => {
      if (!dbGameData) {
        res.status(404).json({ message: "No game found with this id" });
        return;
      }
      res.json(dbGameData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", withAuth, (req, res) => {
  // let title = req.body.title;
  // console.log(title);
  // let gameObject;
  // const apiUrl = "https://api.boardgameatlas.com/api/search?name=" + title + "&client_id=HeQ1W2N1xL";

  // // const response = fetch(apiUrl);
  // // const data = response.json().then()
  // //let gameObject;
  // fetch(apiUrl).then(function(data) {
  //   if (data.ok) {
  //     data.json().then(function(data) {
  //       gameObject = {
  //         url: data.games[0].url,
  //         description: data.games[0].description,
  //         image_url: data.games[0].image_url
  //       };
  //       console.log(gameObject);
  //       //return gameObject;
  //     });
  //   }
  // });
  

  // console.log(gameObject);
  Game.create({
    title: req.body.title,
    list_id: req.body.list_id,
    // description: gameObject.description,
    // url: gameObject.url,
    // image_url: gameObject.image_url
  })
    .then((dbGameData) => res.json(dbGameData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", withAuth, (req, res) => {
  Game.update(
    {
      title: req.body.title,
      // theoretically this will let you change the associated list. not sure if it will work
      list_id: req.body.list_id,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbGameData) => {
      if (!dbGameData) {
        res.status(404).json({ message: "No game found with this id" });
        return;
      }
      res.json(dbGameData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", withAuth, (req, res) => {
  Game.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbGameData) => {
      if (!dbGameData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;