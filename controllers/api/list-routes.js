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
        model: Game,
        attributes: ['id', 'title', 'list_id'],
      },
      {
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

router.post('/', withAuth, (req, res) => {
  // expects {title: 'Taskmaster goes public!', post_url: 'https://taskmaster.com/press', user_id: 1}
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