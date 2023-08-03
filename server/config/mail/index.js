require("dotenv/config");
const nodeMailer = require("nodemailer");

exports.SendMail = ({ to, subject, htmlContent }) => {
    const optionsTransport = {
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            type: "login",
            user: process.env.MY_EMAIL_SEND,
            pass: process.env.MY_EMAIL_PASS,
        },
    };
    const optionsInfo = {
        from: process.env.MY_EMAIL_SEND,
        to: to,
        subject: subject,
        html: htmlContent,
        // attachments: [] -> Send file, img, ...
    };

    return nodeMailer.createTransport(optionsTransport).sendMail(optionsInfo);
};
