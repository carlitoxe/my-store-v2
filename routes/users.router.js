const { faker } = require('@faker-js/faker');
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  const users = [];
  const { limit } = req.query;
  const size = limit || 10;
  for (let index = 0; index < size; index++) {
    users.push({
      name: faker.person.fullName(),
      image: faker.image.url()
    })
  }
  res.json(users)
})

router.post('/', (req, res) => {
  const body = req.body
  res.json({
    message: 'user created',
    data: body
  })
})

module.exports = router;
