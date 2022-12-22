const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const newsSchema = new Schema({
    organization_id: {
        type: Schema.Types.ObjectId,
        ref: 'Organizations',
        required: true,
    },
    program_id: {
        type: Schema.Types.ObjectId,
        ref: 'Programs',
        required: true,
    },
    newsName: {
        type: String,
        required: true,
    },
    imgNews: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('News', newsSchema);