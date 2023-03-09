const port = 5000;

const defaultOption = {
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
};

export const GetShowData = async () => (
    fetch(`http://localhost:${port}/`, { ...defaultOption, method: "GET", })
    .then(res => res.json())
    .catch(err => console.log('Font-End, error: ', err))
);

export const GetAuthData = async (auth) => {};

export const CreateCollection = (type, data) => console.log(`You created ${type} collection, with data: `, data);

export const UpdateCollection = (type, data) => console.log(`You updated ${type} collection, with _id: ${data._id.$oid}, and data: `, data);

export const DeleteCollection = (type, id) => console.log(`You deleted ${type} collection, with _id: `, id);

export const PostImg = ([data]) => ({ url: 'public/asset/img/boat.png', file: data });