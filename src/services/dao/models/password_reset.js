import { Schema, model  } from "mongoose";

const passwordResetCollection = "password_reset";
// Define el esquema de Mongoose
const passwordResetSchema = new Schema({
    email: { type: String, index: true },
    token: String,
    expirationTime: { type: Date, default: Date.now }
});

// Crea y exporta el modelo de Mongoose
const passwordResetModel = model(passwordResetCollection, passwordResetSchema);

export default passwordResetModel;
