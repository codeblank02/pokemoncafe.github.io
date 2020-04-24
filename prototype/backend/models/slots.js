const mongoose = require('mongoose');

const slotSchema = mongoose.Schema({
    _id: {type: String, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true, trim: true},
    contact: {type: Number, required: true, unique: true, trim: true},
    date: {type: String, required: true},
    time: {type: String, required: true},
    people: {type: Number, required: true}

});

module.exports = mongoose.model('Slot', slotSchema, 'Reservation');
