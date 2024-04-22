import cartModel from '../models/carts.model.js';
import mongoose, { Mongoose, Types } from 'mongoose';

export default class CartDao {
  constructor() {
    // console.log("Calling carts model a servise");
  }

  getAll = async () => {
    let carts = await cartModel.find();
    return carts;
  };

  save = async (cart) => {
    let result = await cartModel.create(cart);
    return result;
  };

  addProductToCart = async (cart, id) => {
    const nuevoProducto = {
      product: id,
      quantity: 1,
    };
    const indexProductoExistente = cart.products.findIndex(
      (item) => item.product.toHexString() === id
    );
    if (indexProductoExistente !== -1) {
      // Si el producto ya existe, incrementar la cantidad en 1
      cart.products[indexProductoExistente].quantity += 1;
    } else {
      // Si el producto no existe, agregarlo al array
      cart.products.push(nuevoProducto);
    }
    const cid = cart._id;
    const result = this.update(cid, cart);
    return result;
  };

  deleteProductToCart = async (cart, id) => {
    const nuevoProducto = {
      product: id,
      quantity: 1,
    };
    const indexProductoExistente = cart.products.findIndex(
      (item) => item.product.toHexString() === id
    );
    if (indexProductoExistente !== -1) {
      // Si el producto ya existe, incrementar la cantidad en 1
      cart.products[indexProductoExistente].quantity -= 1;
      // Verificar si la cantidad llega a 0 y eliminar el elemento del array
      if (cart.products[indexProductoExistente].quantity === 0) {
        cart.products.splice(indexProductoExistente, 1);
      }
    } else {
      // Si el producto no existe, agregarlo al array
      cart.products.push(nuevoProducto);
    }
    const cid = cart._id;
    const result = this.update(cid, cart);
    return result;
  };
  deleteCart = async (id) => {
    let result = await cartModel.findByIdAndDelete(id);
    return result;
  };

  update = async (id, cart) => {
    const result = await cartModel.updateOne({ _id: id }, cart);
    return result;
  };

  findById = async (id) => {
    const result = await cartModel.findById(id);
    return result;
  };

  findByUser = async (id) => {
    const result = await cartModel.findOne({ user: id });
    return result;
  };
  /* 
    
    
    //Eliminar los productos del carrito
    async deletePtoductsInCart(id){
        const result = await cartModel.updateOne(
            { _id: id },
            { $unset: { products: '' } }
          );
          console.log(`result ${result}`);
          return result;
    }

    //Delete Product to cart
    async deleteProductToCart(cid, pid){
        //const cartId = "658341aec4107b26b82b87de";
        //const productIdToRemove = "657f088bbf51d6bc5c0353b3";
        const result = await cartModel.updateOne(
            { _id: cid },
            { $pull: { products: { product: pid } } }
          );
          
          console.log(result);
          return result;

    }

    // Update products to Cart
    async updateProductInCart(cid, pid, quantity){
        console.log(`cid ${cid}`);
        console.log(`pid ${pid}`);
        console.log(`quantity ${quantity}`);

        const result = await cartModel.updateOne(    
            { _id: cid, 'products.product': pid },
            { $set: { 'products.$.quantity': quantity } }
          );
          console.log(result);
          return result;
    }
 */
}
