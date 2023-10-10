const express = require('express');
const { faker } = require('@faker-js/faker');

const router = express.Router();

router.get('/', (req, res) => {
  const products = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let index = 0; index < limit; index++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.url(),
    })
  }
  res.json(products);
})

router.get('/filter', (req, res) => {
  res.send('Im a filter')
})

router.get('/:id', (req, res) => {
  const { id } = req.params;
  if (id === '999') {
    res.status(404).json({
      message: 'not found'
    })
  } else {
    res.status(200).json({
      id,
      name: 'Product 1',
      price: 1000
    })
  }
})

router.post('/', (req, res) => {
  const body = req.body
  res.status(201).json({
    message: 'product created',
    data: body
  })
})

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'product updated',
    data: body,
    id
  })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: 'product deleted',
    id
  })
})

module.exports = router;
