const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        imgAvatar: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        isAdmin: {
            type: Boolean,
            required: true
        },
        history: [{
            type: Schema.Types.ObjectId,
            ref: 'Programs',
            required: true
        }],
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Users', userSchema);