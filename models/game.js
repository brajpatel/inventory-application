const { DateTime } = require("luxon");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    name: { type: String, minLength: 3, maxLength: 100, required: true },
    release_date: { type: Date },
    description: { type: String, minLength: 20, maxLength: 400, required: true },
    price: { type: Number, required: true },
    number_in_stock: { type: Number, required: true },
    developer: { type: Schema.Types.ObjectId, ref: 'Developer', required: true },
    platform: [{ type: Schema.Types.ObjectId, ref: 'Platform', required: true }],
    genre: [{ type: Schema.Types.ObjectId, ref: 'Genre', required: true }],
    image: { data: Buffer, contentType: String }

})

GameSchema.virtual('url').get(function() {
    return `/collection/game/${this._id}`;
})

GameSchema.virtual('release_date_formatted').get(function() {
    return DateTime.fromJSDate(this.release_date).toLocaleString(DateTime.DATE_MED);
})

module.exports = mongoose.model('Game', GameSchema);