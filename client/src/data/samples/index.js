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
            result.user_id = user[0]._id;
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

export const CreateCollection = (type, data) => console.log(`You created ${type} collection, with data: `, data);

export const UpdateCollection = (type, data) => console.log(`You updated ${type} collection, with _id: ${data._id}, and data: `, data);

export const DeleteCollection = (type, id) => console.log(`You deleted ${type} collection, with _id: `, id);

export const PostImg = ([data]) => ({ url: 'public/asset/img/boat.png', file: data });