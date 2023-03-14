const PORT = 5000;

const defaultOption = {
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
};

export const GetShowData = async () => await (
    fetch(`http://localhost:${PORT}/`, {
        method: "GET",
        ...defaultOption,
    })
    .then(res => res.json())
    .catch(err => console.log('Font-End, error: ', err))
);

export const PostLogIn = async (auth) => await (
    fetch(`http://localhost:${PORT}/login`, {
        method: "POST",
        ...defaultOption,
        body: JSON.stringify(auth),
    })
    .then(res => res.json())
    .catch(err => console.log('Font-End, error: ', err))
);

export const PostLogOut = async () =>  await (
    fetch(`http://localhost:${PORT}/logout`, {
        method: "POST",
        ...defaultOption,
    })
    .then(() => {})
    .catch(err => console.log('Font-End, error: ', err))
);

export const CreateCollection = async (type, data) => await (
    fetch(`http://localhost:${PORT}/add${type}`, {
        method: "POST",
        ...defaultOption,
        body: JSON.stringify(data),
    })
    .then(res => res.json())
    .catch(err => console.log('Font-End, error: ', err))
);

export const UpdateCollection = (type, data) => console.log(`You updated ${type} collection, with _id: ${data._id.$oid}, and data: `, data);

export const DeleteCollection = (type, id) => console.log(`You deleted ${type} collection, with _id: `, id);

export const PostImg = ([data]) => ({ url: 'public/asset/img/boat.png', file: data });