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
        attributes: ['id', 'title', 'list_id' ]
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbListData => {
      const list = dbListData.map(list => list.get({ plain: true }));
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
        attributes: ['id', 'title']
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