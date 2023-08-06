const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeveloperSchema = new Schema({
    name: { type: String, minLength: 3, maxLength: 100, required: true }
})

DeveloperSchema.virtual('url').get(function() {
    return `/collection/developer/${this._id}`;
})

module.exports = mongoose.model('Developer', DeveloperSchema);