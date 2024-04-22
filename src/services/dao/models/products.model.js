import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productCollection = 'products';

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  status: { type: Boolean, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: 'No Catgory' },
  thumbnail: {
    type: [String],
  },
    owner: {
      type: String, // Cambiado de ObjectId a String
      required: true,
      default: 'admin'
    },
  
});
productSchema.plugin(mongoosePaginate);
/* productSchema.pre('find', function(){
    this.populate('products' );
}) */

const productModel = model(productCollection, productSchema);

export default productModel;

/* 
import { Schema, model  } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productCollection = "products";

const productSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    status:{type: Boolean, required:true},
    stock: { type: Number, required: true },
    category: { type: String, required: "No Catgory" },
    thumbnail: { type: [String],  }
}
);
productSchema.plugin(mongoosePaginate);
export const product = model(productCollection, productSchema); */
