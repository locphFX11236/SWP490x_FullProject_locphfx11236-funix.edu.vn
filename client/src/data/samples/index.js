import organizations from './json/organizations.json';
import programs from './json/programs.json';
import news from './json/news.json';
import users from './json/users.json';

export const GetShowData = async () => new Promise((resolve, rejects) => {
    const samples = {
        organizations: organizations,
        programs: programs,
        news: news
    };

    try {
        setTimeout(() => {
            resolve( samples );
        }, 1000);
    } catch(err) {
        console.log(err);
        rejects(err);
    };

    return;
});

export const GetAuthData = async (auth) => new Promise((resolve, rejects) => {
    const result = {
        user_id: '',
        isAdmin: false,
        isLogin: false,
        message: 'Phone numbers don\'t match',
        data: []
    };
    const user = users.filter(p => p.phoneNumber === auth.phoneNumber);

    if (user.length !== 0) {
        const isConnect = (user[0].password === auth.password);
        if (isConnect) {
            result.user_id = user[0]._id.$oid;
            result.isAdmin = user[0].isAdmin;
            result.isLogin = true;
            result.message = 'Success Login';
            if (result.isAdmin) result.data = users;
            else result.data = user;
        } else {
            result.message = 'Password don\'t match';
        };
    };

    try {
        setTimeout(() => {
            resolve( result );
        }, 1000);
    } catch(err) {
        console.log(err);
        rejects(err);
    };

    return;
});