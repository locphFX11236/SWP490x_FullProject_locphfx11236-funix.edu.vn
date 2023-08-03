const { ObjectId } = require("mongodb");

const Organizations = require("../models/organizations");
const Programs = require("../models/programs");
const News = require("../models/news");
const { DeleteFile } = require("../config/helper/deleteFile");

exports.GetIndex = async (req, res, next) =>
    await Promise.all([Organizations.find(), Programs.find(), News.find()])
        .then(([orga, prog, news]) => ({
            organizations: orga,
            programs: prog,
            news: news,
        }))
        .then((data) => res.json(data))
        .catch((err) => {
            const error = new Error(err);
            error.httpStatus = 500;
            return next(error);
        });

exports.AddProgram = async (req, res, next) => {
    const { organization_id, ...rest } = req.body;
    const program = new Programs({
        organization_id: ObjectId(organization_id),
        ...rest,
    });

    return await program
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
            const error = new Error(err);
            error.httpStatus = 500;
            res.json({
                message:
                    "Information already exists.\nChange information, please!",
                result: "err",
            });
            return next(error);
        });
};

exports.UpdateProgram = async (req, res, next) => {
    const { _id, ...rest } = req.body;

    return await Programs.findByIdAndUpdate(_id, rest)
        .then((result) => {
            const isChangeImg = rest.imgProgram !== result._doc.imgProgram;
            const isAuto =
                result._doc.imgProgram === "asset/img/auto_insert_img.jpg";
            if (isChangeImg && !isAuto) {
                DeleteFile(result._doc.imgProgram);
                return { ...result._doc, ...rest };
            } else return { ...result._doc, ...rest };
        })
        .then((result) =>
            res.json({
                message: "You updated program collection!",
                endpoint: `/patchProgram/${_id}`,
                id: _id,
                result: result,
            })
        )
        .catch((err) => {
            const error = new Error(err);
            error.httpStatus = 500;
            return next(error);
        });
};

exports.DeleteProgram = async (req, res, next) => {
    const id = req.params.id;
    const admin_id = req.params.admin_id;

    return await Programs.findByIdAndDelete(id)
        .then((result) => {
            const isAuto =
                result.imgProgram === "asset/img/auto_insert_img.jpg";
            if (!isAuto) {
                DeleteFile(result.imgProgram);
                return result;
            } else return result;
        })
        .then((result) =>
            res.json({
                message: "You deleted program collection!",
                endpoint: `/deleteProgram/${id}/${admin_id}`,
                id: id,
                result: result,
            })
        )
        .catch((err) => {
            const error = new Error(err);
            error.httpStatus = 500;
            return next(error);
        });
};

exports.Donation = async ({ _id, orderId, ...donat }) =>
    await Programs.findById(_id)
        .then((prog) => {
            const { moneyTotal, times } = prog;
            const { donationMoney } = donat;
            prog.moneyCurrent += donationMoney;
            prog.moneyRate = prog.moneyCurrent / moneyTotal;
            prog.times = times + 1;
            prog.donations.push(donat);
            return prog.save();
        })
        .then((prog) => {
            const index = prog.donations.length - 1;
            const donation = prog.donations[index];
            return `Program: ${_id} - Donation: ${donation._id} - Payment: ${orderId}`;
        })
        .catch((err) => {
            const error = new Error(err);
            error.httpStatus = 500;
            return next(error);
        });
