const mongoose = require('mongoose');
const { Schema } = mongoose;

const Product = mongoose.model(
    'Product',
    new Schema({
        name: { type: 'string', required: true },
        image: { type: 'string', required: true},
        price: { type: 'number', required: true},
        description: { type: 'string', required: true}
    })
)

module.exports = Product;