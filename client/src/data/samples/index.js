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

export const PostLogIn = async (auth) => new Promise((resolve, rejects) => {
    const result = {
        user_id: '',
        isAdmin: false,
        isLogin: false,
        message: 'Phone numbers don\'t match',
        data: []
    };
    const user = users.find(p => p.phoneNumber === auth.phoneNumber);

    if (user) {
        const isConnect = (user.password === auth.password);
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

export const PostLogOut = () => {};

export const CreateCollection = (type, data) => console.log(`You created ${type} collection to url: http://localhost:5000/add${type}, with data: `, data);

export const UpdateCollection = (type, data) => console.log(`You updated ${type} collection, with _id: ${data._id}, and data: `, data);

export const DeleteCollection = (type, id) => console.log(`You deleted ${type} collection, with _id: `, id);

export const PostImg = ([data]) => setTimeout({ url: 'public/asset/img/boat.png', file: data }, 1000);