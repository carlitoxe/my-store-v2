const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
// import { faker } from '@faker-js/faker'



class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
        isBlocked: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.string.uuid(),
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async find(limit) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (limit) {
          resolve(this.products.splice(0, limit))
        } else {
          resolve(this.products)
        }
      }, 2000)
    });
  }

  async findOne(id) {
    // const name = this.getTotal();
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlocked) {
      throw boom.conflict('product is blocked');
    }
    return product;
  }

  async update(id, data) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...data,
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    this.products.splice(index, 1);
    return {id}
  }
}

module.exports = ProductsService;
