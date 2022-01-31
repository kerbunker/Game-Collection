const router = require('express').Router();
const sequelize = require('../../config/connection');
const { List, User, Game, Vote } = require('../../models');
const withAuth = require('../../utils/auth');

// get all users
router.get('/', (req, res) => {
  console.log('======================');
  List.findAll({
    attributes: [
      'id',
      'title',
      'created_at'
    ],
    include: [
      {
        // includes the games in the list
        model: Game,
        attributes: ['id', 'title', 'list_id'],
      },
      {
        // includes the user who made the list
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbListData => res.json(dbListData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// gets a single list with the given id
router.get('/:id', (req, res) => {
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
        // includes the games in the list
        model: Game,
        attributes: ['id', 'title', 'list_id']
        
      },
      {
        // includes the user that made the list
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbListData => {
      // gives an error message if no list was found with the given id
      if (!dbListData) {
        res.status(404).json({ message: 'No list found with this id' });
        return;
      }
      res.json(dbListData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// creates a new list
router.post('/', withAuth, (req, res) => {
  // expects "title": "Favorites", "user_id": 1
  List.create({
    title: req.body.title,
    user_id: req.session.user_id
  })
    .then(dbListData => res.json(dbListData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// lets the user update the title of the list
router.put('/:id', withAuth, (req, res) => {
  List.update(
    {
      title: req.body.title
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbListData => {
      // gives an error message if no list could be found with that id
      if (!dbListData) {
        res.status(404).json({ message: 'No list found with this id' });
        return;
      }
      res.json(dbListData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// deletes the list with the given id
router.delete('/:id', withAuth, (req, res) => {
  List.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbListData => {
      if (!dbListData) {
        res.status(404).json({ message: 'No list found with this id' });
        return;
      }
      res.json(dbListData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;