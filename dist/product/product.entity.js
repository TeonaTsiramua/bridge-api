import { Schema, model } from 'mongoose';
import { imageSchema } from '../image/image.entity.js';
import { CATEGORIES, FUEL, GEARBOX } from './productConstants.js';
const productSchema = new Schema({
    title: { type: String, required: true },
    category: { type: String, required: true, enum: CATEGORIES },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: {
        type: Number,
        required: true,
        min: 1900,
        max: new Date().getFullYear(),
    },
    mileage: { type: Number, required: true, min: 0 },
    price: { type: Number, required: true, min: 0 },
    fuel_type: { type: String, required: true, enum: FUEL },
    displacement: { type: Number, required: true, min: 0.1, max: 40 },
    engine_output: { type: Number, min: 0 },
    cylinders: { type: Number, min: 1, max: 16 },
    transmission: { type: String, enum: GEARBOX },
    wheel_diameter: { type: Number, min: 10, max: 30 },
    gross: { type: Number, min: 500 },
    load_capacity: { type: Number, min: 0 },
    emission_class: {
        type: String,
        enum: ['Euro1', 'Euro2', 'Euro3', 'Euro4', 'Euro5', 'Euro6'],
    },
    images: { type: imageSchema, required: false },
    axle_configuration: {
        type: String,
        enum: ['4X2', '4X4', '6X4', '6X6', '8X4', '8X6', '8X8', 'სხვა'],
    },
});
const Product = model('Product', productSchema);
export { Product, productSchema };
