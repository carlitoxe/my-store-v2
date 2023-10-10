const express = require('express');
const { faker } = require('@faker-js/faker');

const router = express.Router();

router.get('/', (req, res) => {
  const categories = [];
  const { limit } = req.query;
  console.log(limit);
  const size = limit || 5;
  for (let index = 0; index < size; index++) {
    categories.push({
      name: faker.commerce.department(),
      // id
    })
  }
  res.json(categories)
})

router.get('/:categoryId', (req, res) => {
  const { categoryId } = req.params;
  res.json({
    categoryId,
    name: 'Clothes',
    products: []
  })
})

router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
      categoryId,
      productId,
    })
})

router.post('/', (req, res) => {
  const body = req.body
  res.json({
    message: 'category created',
    data: body
  })
})

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'category updated',
    data: body,
    id
  })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: 'category deleted',
    id
  })
})

module.exports = router;