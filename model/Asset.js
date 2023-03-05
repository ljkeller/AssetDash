const mongoose = require('mongoose');

const AssetSchema = mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    model : {
        type: String,
        required: true
    },
    state : {
        type: String,
        enum: ['on', 'off', 'maintenance'],
        default: ['maintenance'],
        required: true
    },
    availibility: {
        type: String,
        enum: ['availible', 'claimed'],
        default: 'availible',
        required: true
    },
    notes: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('asset', AssetSchema);