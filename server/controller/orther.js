const NodeFetch = require("../config/fetch");
const { History } = require("./authData");
const { Donation } = require("./showData");

exports.CreateOrder = async (req, res) => {
    try {
        const donation = req.body.donation;
        const order = await NodeFetch.OrderFetch(donation);

        return res.json(order);
    } catch (err) {
        return res.status(500).send(err.message);
    } finally {
        return res.end();
    }
};

exports.CapturePayment = async (req, res, next) => {
    try {
        const { orderId, donation } = req.body;
        const captureData = await NodeFetch.CapturePaymentFetch({ orderId });
        const history = await Donation({
            orderId: captureData.id,
            ...donation,
        });
        const result = {
            captureData,
            history,
            user_id: donation.user_id,
        };
        History({ _id: donation.user_id, history });

        return res.json(result);
    } catch (err) {
        return res.status(500).send(err.message);
    } finally {
        return res.end();
    }
};

exports.PostImg = (req, res, next) => {
    try {
        const data = req.file;
        const response = `asset/img/${data.filename}`;

        return res.json(response);
    } catch (err) {
        return res.status(500).send(err.message);
    } finally {
        return res.end();
    }
};
