const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom')

class CategoriesService {
  constructor() {
    this.categories = [
      {
        id: faker.string.uuid(),
        name: 'Electronics'
      },
      {
        id: faker.string.uuid(),
        name: 'Clothes'
      },
      {
        id: faker.string.uuid(),
        name: 'Toys'
      },
      {
        id: faker.string.uuid(),
        name: 'Food'
      }
    ]
    // this.generate()
  }

  // generate() {
  //   const limit = 10;
  //   for (let index = 0; index < limit; index++) {
  //     this.categories.push({
  //       id: faker.string.uuid(),
  //       name: faker.commerce.department(),
  //     })
  //   }
  // }

  async create(data) {
    const newCategory = {
      id: faker.string.uuid(),
      ...data,
    };
    this.categories.push(newCategory);
    return newCategory;
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
    return this.categories[index];
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