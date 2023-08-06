const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    name: { type: String, minLength: 3, maxLength: 100, required: true },
    release_date: { type: Date },
    description: { type: String, minLength: 20, maxLength: 150, required: true },
    price: { type: Number, required: true },
    number_in_stock: { type: Number, required: true },
    developer: { type: String, required: true },
    platform: [{ type: Schema.Types.ObjectId, ref: 'Platforn', required: true }],
    genre: [{ type: Schema.Types.ObjectId, ref: 'Genre' }],
    image: { type: String }

})

GameSchema.virtual('url').get(function() {
    return `/collection/game/${this._id}`;
})

module.exports = mongoose.model('Game', GameSchema);