const router = require('express').Router();
const { List, User, Game } = require('../models');
const withAuth = require('../utils/auth.js');

router.get('/', withAuth, (req, res) => {
  List.findAll({
    where: {
      user_id: req.session.user_id
    },
    include: [
      {
        model: Game,
<<<<<<< HEAD
        attributes: ['id', 'title', 'list_id' ]
=======
        attributes: ['id', 'title', 'list_id']
>>>>>>> 2ed59810ce5cc0fd49f198f1d4de7e7441d2cb34
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbListData => {
      const lists = dbListData.map(lists => lists.get({ plain: true }));
      res.render('dashboard', { lists, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/edit/:id', withAuth, (req, res) => {
  List.findByPk(req.params.id, {
    include: [
      {
        model: Game,
<<<<<<< HEAD
        attributes: ['id', 'title']
=======
        attributes: ['id', 'title', 'list_id']
>>>>>>> 2ed59810ce5cc0fd49f198f1d4de7e7441d2cb34
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbListData => {
      if (dbListData) {
        const list = dbListData.get({ plain: true });

        res.render('edit-list', {
          list,
          loggedIn: true
        });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;