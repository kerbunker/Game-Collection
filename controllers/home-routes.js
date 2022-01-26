const router = require("express").Router();
const sequelize = require("../config/connection");
const { List, User, Game } = require("../models");

router.get("/", (req, res) => {
  console.log(req.session);

  List.findAll({
    attributes: [
      "id",
      "title",
      "created_at"
    ],
    include: [
      {
        model: Game,
        attributes: ["id", "title", "list_id"],
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbListData) => {
      // pass a single post object into the homepage template
      const lists = dbListData.map((list) => list.get({ plain: true }));
      res.render("homepage", {
        lists,
        loggedIn: req.session.loggedIn
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

router.get('/list/:id', (req, res) => {
  List.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'created_at'
    ],
    include: [
      {
        model: Game,
        attributes: ['id', 'title', 'list_id'],
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbListData => {
      if (!dbListData) {
        res.status(404).json({ message: 'No list found with this id' });
        return;
      }

      // serialize the data
      const list = dbListData.get({ plain: true });

      // pass data to template
      res.render('single-list', {
        list,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

});

module.exports = router;