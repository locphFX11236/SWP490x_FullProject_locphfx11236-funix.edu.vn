const Organizations = require('../models/organizations');
const Programs = require('../models/programs');
const News = require('../models/news');
const { ObjectId } = require('mongodb');

exports.GetIndex = (req, res, next) => (
    Promise.all([
        Organizations.find({}),
        Programs.find({}),
        News.find({})
    ])
    .then(([orga, prog, news]) => ({
        organizations: orga,
        programs: prog,
        news: news
    }))
    .then(data => res.json(data))
    .catch(err => console.log(err))
);

exports.AddCollection = (req, res, next) => {
    const { organization_id, ...rest } = req.body;
    const program = new Programs({
        organization_id: ObjectId(organization_id),
        ...rest,
    });
    return program.save()
    .then((result) => res.json(result))
    .catch(err => {
        console.log(err);
        // const error = new Error(err);
        // error.httpStatus = 500;
        // return next(error)
    });
};