const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    coordinates: {
        x: { type: Number, required: true },
        y: { type: Number, required: true },
        z: { type: Number, required: true }
    },
    description: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Location', locationSchema);
