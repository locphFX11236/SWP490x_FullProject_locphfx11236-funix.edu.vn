const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const organizationSchema = new Schema(
    {
        nameOrganization: {
            type: String,
            required: true,
            unique: true
        },
        descriptionOrganization: {
            type: String,
            required: true,
        },
        imgOrganization: {
            type: String,
            required: true
        },
        programsTotal: {
            type: String,
            required: true,
        },
        donationMoneyTotal: {
            type: String,
            required: true,
        },
        donationTimes: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Organizations', organizationSchema);