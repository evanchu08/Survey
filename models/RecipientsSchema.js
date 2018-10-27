const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipientsSchema = new Schema({
    email: String,
    respond: { type: Boolean, default: false }
})

module.exports = recipientsSchema