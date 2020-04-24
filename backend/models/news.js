const mongoose = require('mongoose');

const newsSchema = mongoose.Schema({
    _id: {type: String, required: true},
    news: {type: String, required: true},
    newsdata: {type: String, required: true}
});

module.exports = mongoose.model('News', newsSchema, 'News');
