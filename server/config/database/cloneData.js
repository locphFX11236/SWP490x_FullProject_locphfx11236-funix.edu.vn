const Users = require('../../models/users');
const Organizations = require('../../models/organizations');
const UserSamples = require('../../data/samples/users.json');
const OrganizationSamples = require('../../data/samples/organizations.json');

const newUser = () => UserSamples.forEach(u => {
    const newUser = new Users({ ...u })
    newUser.save();
    return;
});

const newOrgan = () => OrganizationSamples.forEach(o => {
    const newOrgan = new Organizations({ ...o })
    newOrgan.save();
    return;
});

const CloneData = (key) => {
    switch (key) {
        case 'All': 
            newUser();
            newOrgan();
        return;
        case 'User': newUser();
        case 'Organ': newOrgan();
    };
};

module.exports = CloneData;