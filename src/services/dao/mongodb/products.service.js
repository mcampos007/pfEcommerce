import productsModel from '../models/products.model.js';
import mongoose from 'mongoose';

export default class ProductDao {
  constructor() {
    // console.log('Calling product model a servise');
  }

  async getAll(limit = 10, page = 2, query, sort) {
    try {
      // console.log("page en el servicio:")
      if (sort == 'asc') {
        sort = { price: 1 };
      } else if (sort == 'desc') {
        sort = { price: -1 };
      }

      const categoryfilter = query
        ? { and: [{ category: query }, { status: true }] }
        : { status: true };
      let products = await productsModel.paginate(
        { ...categoryfilter },
        { limit, page, query, sort }
      );
      return products;
    } catch (error) {
      return error;
    }
  }

  async save(product) {
    try {
      let result = await productsModel.create(product);
      return result;
    } catch (error) {
      return error;
    }
  }

  async findByTitle(title) {
    try {
      const result = await productsModel.findOne({ title: title });
      return result;
    } catch (error) {
      return error;
    }
  }

  async findById(id) {
    try {
      let result = await productsModel.findById(id);
      return result;
    } catch (error) {
      return error;
    }
  }

  async deleteProduct(id) {
    try {
      const result = await productsModel.findByIdAndDelete(id);
      return result;
    } catch (error) {
      return error;
    }
  }

  async update(id, product) {
    try {
      //const result = await productsModel.findByIdAndUpdate(id, product);
      let result = await productsModel.updateOne({ _id: id }, product);
      return result;
    } catch (error) {
      return error;
    }
  }
}
