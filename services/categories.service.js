const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom')

class CategoriesService {
  constructor() {
    this.categories = []
    this.generate()
  }

  generate() {
    const size = 5;
    for (let index = 0; index < size; index++) {
      this.categories.push({
        id: faker.string.uuid(),
        name: faker.commerce.department(),
      })
    }
  }

  find() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.categories)
      }, 2000)
    });
  }

  findOne(id) {
    const category = this.categories.find(category => category.id === id);
    if (!category) {
      throw boom.notFound('category not found');
    }
    return category
  }

  async update(id, data) {
    const index = this.categories.findIndex((category) => category.id === id);
    if (index === -1) {
      throw boom.notFound('category not found');
    }
    const category = this.categories[index];
    this.categories[index] = {
      ...category,
      ...data,
    };
    return this.category[index];
  }

  async delete(id) {
    const index = this.categories.findIndex(category => category.id === id);
    if (index === -1) {
      throw boom.notFound('category not found');
    }
    this.categories.splice(index, 1);
    return {id}
  }

}

module.exports = CategoriesService