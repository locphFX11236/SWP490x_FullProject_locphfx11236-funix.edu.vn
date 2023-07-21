const fetch = require("node-fetch");

const CLIENT_ID = process.env.CLIENT_ID_PAYPAL;
const APP_SECRET = process.env.APP_SECRET_PAYPAL;
const base = process.env.PAYPAL_SANDBOX_URI;

// Rest api lấy tỷ giá ngoại tệ
const CurrencyVNDUSD = 23000;

const HandleResponse = async (response) => {
    if (response.status === 200 || response.status === 201) {
        return response.json();
    }

    const errorMessage = await response.text();
    throw new Error(errorMessage);
};

const GenerateAccessToken = async () => {
    const auth = Buffer.from(CLIENT_ID + ":" + APP_SECRET).toString("base64");
    const url = `${base}/v1/oauth2/token`;
    const response = await fetch(url, {
        method: "post",
        headers: {
            Authorization: `Basic ${auth}`,
        },
        body: "grant_type=client_credentials",
    });

    const jsonData = await HandleResponse(response);
    return jsonData.access_token;
};

exports.OrderFetch = async (data) => {
    const accessToken = await GenerateAccessToken();
    const url = `${base}/v2/checkout/orders`;

    const response = await fetch(url, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: Math.round(data.donationMoney / CurrencyVNDUSD),
                    },
                },
            ],
        }),
    });

    return await HandleResponse(response);
};

exports.CapturePaymentFetch = async (data) => {
    const accessToken = await GenerateAccessToken();
    const url = `${base}/v2/checkout/orders/${data.orderId}/capture`;

    const response = await fetch(url, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });

    return await HandleResponse(response);
};
