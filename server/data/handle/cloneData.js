const { ObjectId } = require('mongodb');

const Users = require('../../models/users');
const Organizations = require('../../models/organizations');
const Programs = require('../../models/programs');
const News = require('../../models/News');

const UserSamples = require('../samples/users.json');
const OrganizationSamples = require('../samples/organizations.json');
const ProgramSamples = require('../samples/programs.json');
const NewSamples = require('../samples/news.json');
const DonationSamples = require('../samples/donations.json');

const RandomFunc = ({
    f, // Từ - from
    t // Đến - to
}) =>  Math.floor(Math.random() * (t - f + 1)) + f;

const newOrgans = () => OrganizationSamples.forEach(o => {
    const newOrgan = new Organizations({ ...o })
    newOrgan.save();
    return;
});

const newUsers = () => UserSamples.forEach(u => {
    const newUser = new Users({ ...u, history: [] })
    newUser.save();
    return;
});

const newProgs = async () => {
    const organIDArr = await Organizations.find({}).select('_id');
    const userArr = await Users.find({isAdmin: true}).select('_id name');
    ProgramSamples.forEach((p, i) => {
        const r = RandomFunc({f: 0, t: 1});
        const newProg = new Programs({
            ...p,
            organization_id: organIDArr[i]._id,
            management: [{
                admin_id: userArr[r]._id,
                executionTime: new Date().toISOString(),
                descriptionChange: `Created by ${ userArr[r].name }.`
            }],
            donations: []
        });
        newProg.save();
    });
    return;
};

const newNews = async () => {
    const organIDArr = await Organizations.find({}).select('_id');
    const progIDArr = await Programs.find({}).select('_id');
    const organization_idArr = [
        organIDArr[0]._id,
        organIDArr[1]._id,
        organIDArr[0]._id,
        new ObjectId(),
        new ObjectId(),
    ];
    const program_idArr = [
        new ObjectId(),
        new ObjectId(),
        new ObjectId(),
        progIDArr[3]._id,
        progIDArr[4]._id,
    ];
    NewSamples.forEach((n, i) => {
        const newNews = new News({
            ...n,
            organization_id: organization_idArr[i],
            program_id: program_idArr[i]
        });
        newNews.save();
    });
    return;
};

const newDonations = async () => {
    const progIDArr = await Programs.find({}).select('_id');
    const userIDArr = await Users.find({}).select('_id');
    const randomNumber = () => RandomFunc({ f: 0, t: 4 });
    for (let i = 0; i < 20; i++) {
        DonationSamples.forEach(async d => {
            const progID = progIDArr[randomNumber()]._id;
            const userID = userIDArr[randomNumber()]._id;
            const donations_id = new ObjectId();
            return Programs.findById(progID)
                .then(p => {
                    p.donations.push({ user_id: userID, ...d, _id: donations_id });
                    p.save();
                    return Users.findById(userID);
                })
                .then(u => {
                    u.history.push(`Progs: ${progID} - Donas: ${donations_id}`);
                    u.save();
                })
                .catch(err => console.log(err))
            ;
        });
    };
};


const CloneData = (key) => {
    switch (key) {
        case 'All': {
            newOrgans();
            newUsers();
            setTimeout(() => newProgs(), 1000);
            setTimeout(() => newNews(), 2000);
            setTimeout(() => newDonations(), 3000);
            return;
        }
        case 'Organizations': return newOrgans();
        case 'Users': return newUsers();
        case 'Programs': return newProgs();
        case 'News': return newNews();
        case 'Donations': return newDonations();
    };
};

module.exports = CloneData;