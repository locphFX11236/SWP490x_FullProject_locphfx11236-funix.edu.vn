const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const programSchema = new Schema({
    organization_id: {
        type: Schema.Types.ObjectId,
        ref: 'Organizations',
        required: true,
    },
    programName: {
        type: String,
        required: true,
    },
    descriptionStory: {
        type: String,
        required: true,
    },
    imgProgram: {
        type: String,
        required: true
    },
    moneyTotal: {
        type: Number,
        required: true,
    },
    moneyCurrent: {
        type: Number,
        required: true,
    },
    moneyRate: {
        type: Number,
        required: true,
    },
    times: {
        type: Number,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    management: [
        {
            admin_id: {
                type: Schema.Types.ObjectId,
                ref: 'Users',
                required: true,
            },
            executionTime: {
                type: String,
                required: true,
            },
            descriptionChange: {
                type: String,
                required: true,
            },
        },
    ],
});

module.exports = mongoose.model('Programs', programSchema);