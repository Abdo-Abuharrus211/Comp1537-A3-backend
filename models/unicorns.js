const mongoose = require('mongoose');

const unicornSchema = new mongoose.Schema({

});

const unicornModel = mongoose.model('unicorns', unicornSchema);

module.exports = unicornModel;