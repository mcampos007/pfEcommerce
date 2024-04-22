import  {Schema, model} from "mongoose";

const ticketCollection = "ticket"

const ticketSchema = new Schema({
  code: {
    type: String,
    unique: true,
    required: true,
  },
  purchase_datetime: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: true,
  },
  purchaser: {
    type: String,
    required: true,
  },
  products: [{
    product: { type: Schema.Types.ObjectId, ref: 'products', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  }],
});

ticketSchema.pre('find', function(){
    this.populate('products')
 })


const Ticket = model(ticketCollection, ticketSchema);

export default Ticket ;