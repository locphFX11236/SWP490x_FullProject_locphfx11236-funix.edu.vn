const PORT = 5000;

const defaultOption = {
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
};

export const GetShowData = async () =>
    await fetch(`http://localhost:${PORT}/`, {
        method: "GET",
        ...defaultOption,
    })
        .then((res) => res.json())
        .catch((err) => console.log("Font-End, error: ", err));

export const PostLogIn = async (auth) =>
    await fetch(`http://localhost:${PORT}/login`, {
        method: "POST",
        ...defaultOption,
        body: JSON.stringify(auth),
    })
        .then((res) => res.json())
        .catch((err) => console.log("Font-End, error: ", err));

export const PostLogOut = async () =>
    await fetch(`http://localhost:${PORT}/logout`, {
        method: "POST",
        ...defaultOption,
    })
        .then(() => console.log("Log Out!"))
        .catch((err) => console.log("Font-End, error: ", err));

export const CreateCollection = async (type, data) =>
    await fetch(`http://localhost:${PORT}/add${type}`, {
        method: "POST",
        ...defaultOption,
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            return res;
        })
        .catch((err) => console.log("Font-End, error: ", err));

export const UpdateCollection = async (type, data) =>
    await fetch(`http://localhost:${PORT}/patch${type}/${data._id}`, {
        method: "PATCH",
        ...defaultOption,
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((result) => console.log(result))
        .catch((err) => console.log("Font-End, error: ", err));

export const DeleteCollection = async (type, id, admin_id) =>
    await fetch(`http://localhost:${PORT}/delete${type}/${id}/${admin_id}`, {
        method: "DELETE",
        ...defaultOption,
    })
        .then((res) => res.json())
        .then((result) => console.log(result))
        .catch((err) => console.log("Font-End, error: ", err));

export const PostImg = async ([data]) =>
    await fetch(`http://localhost:${PORT}/postImg`, {
        method: "POST",
        ...defaultOption,
        body: JSON.stringify({ file: data }),
    })
        .then((res) => res.json())
        .catch((err) => console.log("Font-End, error: ", err));
