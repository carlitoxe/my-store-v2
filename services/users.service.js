const { faker } = require('@faker-js/faker');

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
    return this.users;
  }

  findOne(id) {
    return this.users.find(user => user.id === id);
  }
}

module.exports = UsersService