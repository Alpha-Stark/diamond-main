// Path: src/lib/database/models/product.model.js
import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    photo: { type: String, required: true },
    color: { type: String, required: true }, //D, E, F, G, H, I, J, K, L, M, N
    clarity: { type: String, required: true }, // IF, VVS1, VVS2, VS1, VS2, SI1, SI2, I1, I2, I3
    cut: { type: String, required: true }, // Excellent, Very Good, Good, Fair, Poor
    carat: { type: Number, required: true }, // manual input number
    shape: { type: String, required: true }, // Round, Princess, Emerald, Asscher, Marquise, Oval, Radiant, Pear, Heart, Cushion
    certificate: { type: String, required: true }, // None, IGI, GIA, HRD, EGL, AGS

    createdAt: { type: Date, default: Date.now },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
});

const Product = models.Product || model("Product", ProductSchema);

export default Product;
