const router = require('express').Router();
const sequelize = require('../config/connection');
const { List, User, Game } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
  List.findAll({
    where: {
      // use the ID from the session
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'title',
      'created_at'
    ],
    include: [
      {
        model: Game,
        attributes: ['id', 'title', 'list_id']
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbListData => {
      // serialize data before passing to template
      const lists = dbListData.map(list => list.get({ plain: true }));
      res.render('dashboard', { lists, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/edit/:id', withAuth, (req, res) => {
  List.findByPk(req.params.id, {
    attributes: [
      'id',
      'title',
      'created_at'
    ],
    include: [
      {
        model: Game,
        attributes: ['id', 'title', 'list_id']
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

router.get('/edit-game/:id', withAuth, (req, res) => {
  Game.findByPk(req.params.id, {
    attributes: [
      'id',
      'title',
      'image_url',
      'url',
      'description'
    ],
    include: [
      {
        model: List,
        attributes: ['id', 'title', 'user_id'],
        include: [
          {
            model: User,
            attibutes: ['username']
          }

        ]
      }
    ]
  })
    .then(dbGameData => {
      if (dbGameData) {
        const game = dbGameData.get({ plain: true });
        
        res.render('edit-game', {
          game,
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