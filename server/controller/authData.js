const Users = require('../models/users');

exports.PostAuth = (req, res, next) => {
    const { phoneNumber, password } = req.body;
    const result = {
        user_id: '',
        isAdmin: false,
        isLogin: false,
        message: 'Phone numbers don\'t match',
        data: []
    };

    return (
        Users.find()
        .then(users => {
            const user = users.find(p => p.phoneNumber === phoneNumber);
            return [users, user];
        })
        .then(([users, user]) => {
            if (user) {
                const isConnect = (user.password === password);
                if (isConnect) {
                    result.user_id = user._id;
                    result.isAdmin = user.isAdmin;
                    result.isLogin = true;
                    result.message = 'Success Login';
                    if (result.isAdmin) result.data = users;
                    else result.data = user;
                } else {
                    result.message = 'Password don\'t match';
                };
            };
            return result;
        })
        .then(result => res.json(result))
        .catch(err => console.log(err))
    );
};

exports.PostLogOut = (req, res, next) => {
    return res.end();
}