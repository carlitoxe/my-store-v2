const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class UsersService {

  constructor() {
    this.users = [];
    this.generate();
  }

  generate() {
    const size = 10;
    for (let index = 0; index < size; index++) {
      this.users.push({
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        avatar: faker.internet.avatar(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
      })
    }
  }

  find() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.users)
      }, 2000)
    });
  }

  findOne(id) {
    const user = this.users.find(user => user.id === id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user
  }

  async create(data) {
    const newUser = {
      id: faker.string.uuid(),
      ...data,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id, data) {
    const index = this.users.findIndex(user => user.id === id);
    const user = this.users[index]
    if (user === -1) {
      boom.notFound('user not found')
    }
    this.users[index] = {
      ...user,
      ...data,
    }
    return this.users[index]
  }

}

module.exports = UsersService