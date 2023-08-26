const mongoose = require('mongoose');

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/testemongoose2');
    console.log('Connected to Mongoose!');
}

main().catch((err) => console.error(err));

module.exports = mongoose;