const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const donationSchema = new Schema({
    program_id: {
        type: Schema.Types.ObjectId,
        ref: 'Programs',
        required: true,
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    donationMoney: {
        type: Number,
        required: true,
    },
    donationTime: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Donations', donationSchema);