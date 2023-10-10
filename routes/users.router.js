const express = require('express');
const UsersService = require('../services/users.service')

const router = express.Router();
const service = new UsersService();

router.get('/', (req, res) => {
  const users = service.find();
  res.json(users)
})

router.get('/:userId', (req, res) => {
  const { userId } = req.params
  const user = service.findOne(userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({
      message: 'user not found'
    })
  }
})

router.post('/', (req, res) => {
  const body = req.body
  res.json({
    message: 'user created',
    data: body
  })
})

module.exports = router;
