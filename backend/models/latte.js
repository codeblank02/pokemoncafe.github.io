const mongoose = require('mongoose');

const latteSchema = mongoose.Schema({
    _id: {type: String, required: true},
    imageUrl: {type: String, required: true},
    name: {type: String, required: true},
    price: {type: String, required: true},
    content: {type: String, required: true}
});

module.exports = mongoose.model('Latte', latteSchema, 'Latte');
