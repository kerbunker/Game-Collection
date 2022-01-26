const router = require("express").Router();
const { List, User, Game } = require('../models');

router.get('/', (req, res)=>{
  res.render('homepage');
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

router.get("/dashboard", (req, res) => {
  List.findAll({
    attributes: [
      'id',
      'title'
    ],
    include: [
      {
        model: Game,
        attributes: [ 'id', 'title' ],
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then((dbListData) => {
      const lists = dbListData.map((list) => list.get({ plain: true }));
      res.render("dashboard");
      // , {
      //   lists,
      //   loggedIn: req.session.loggedIn
      // }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/list/:id', (req, res) => {
  List.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'user_id'
    ],
    include: [
      {
        model: Game,
        attributes: ['id', 'title']
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

      const list = dbListData.get({ plain: true });

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