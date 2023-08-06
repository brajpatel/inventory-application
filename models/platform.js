const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlatformSchema = new Schema({
    name: { type: String, minLength: 3, maxLength: 100, required: true }
})

PlatformSchema.virtual('url').get(function() {
    return `/collection/platform/${this._id}`;
})

module.exports = mongoose.model('Platform', PlatformSchema);