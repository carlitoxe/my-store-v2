const express = require('express');
const CategoriesService = require('../services/categories.service')

const router = express.Router();
const service = new CategoriesService();

router.get('/', async (req, res) => {
  const categories = await service.find();
  res.json(categories)
})

router.get('/:categoryId', async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const category = service.findOne(categoryId)
    res.json(category);
  } catch (error) {
    next(error)
  }
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

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const category = await service.update(id, body)
    res.json(category)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await service.delete(id)
    res.json(response)
  } catch (error) {
    next(error)
  }
})

module.exports = router;