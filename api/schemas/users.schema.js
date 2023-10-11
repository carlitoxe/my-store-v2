const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(30);
const email = Joi.string().email();
const username = Joi.string().alphanum().min(3).max(30);
const avatar = Joi.string().uri();
// const isBlocked = Joi.boolean();

const createUserSchema = Joi.object({
  name: name.required(),
  email: email.required(),
  username: username.required(),
  avatar: avatar
})

const updateUserSchema = Joi.object({
  name: name,
  email: email,
  username: username,
  avatar: avatar
})

const getUserSchema = Joi.object({
  id: id.required(),
})

module.exports = { createUserSchema, updateUserSchema, getUserSchema }