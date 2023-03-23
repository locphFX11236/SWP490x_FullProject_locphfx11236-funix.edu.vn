const Organizations = require("../models/organizations");
const Programs = require("../models/programs");
const News = require("../models/news");
const { ObjectId } = require("mongodb");

exports.GetIndex = async (req, res, next) =>
    Promise.all([Organizations.find(), Programs.find(), News.find()])
        .then(([orga, prog, news]) => ({
            organizations: orga,
            programs: prog,
            news: news,
        }))
        .then((data) => res.json(data))
        .catch((err) => console.log(err));

exports.AddCollection = async (req, res, next) => {
    const { organization_id, ...rest } = req.body;
    const program = new Programs({
        organization_id: ObjectId(organization_id),
        ...rest,
    });

    return program
        .save()
        .then((result) =>
            res.json({
                message: "You created program collection!",
                endpoint: "/addProgram",
                id: result._id,
                result: result,
            })
        )
        .catch((err) => {
            console.log(err);
            // const error = new Error(err);
            // error.httpStatus = 500;
            // return next(error)
        });
};

exports.UpdateCollection = async (req, res, next) => {
    const { _id, ...rest } = req.body;

    return Programs.findByIdAndUpdate(_id, rest)
        .then((result) =>
            res.json({
                message: "You updated program collection!",
                endpoint: `/patchProgram/${_id}`,
                id: _id,
                result: result,
            })
        )
        .catch((err) => console.log("Error: ", err));
};

exports.DeleteCollection = async (req, res, next) => {
    const id = req.params.id;
    const admin_id = req.params.admin_id;

    return Programs.findByIdAndDelete(id)
        .then((result) =>
            res.json({
                message: "You deleted program collection!",
                endpoint: `/deleteProgram/${id}/${admin_id}`,
                id: id,
                result: result,
            })
        )
        .catch((err) => console.log("Error: ", err));
};
