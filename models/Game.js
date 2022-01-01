const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    ratings: {
        type: Object,
        required: true
    }
});

module.exports = Game = mongoose.model('games', GameSchema);