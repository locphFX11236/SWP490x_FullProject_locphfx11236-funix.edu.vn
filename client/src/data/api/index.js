import { BACK_END_URL, FRONT_END_URL } from "../../shared/helper/publicPath";

const defaultOption = {
    mode: "cors",
    cache: "default",
    redirect: "follow",
    referrerPolicy: "same-origin",
    credentials: "include",
    headers: {
        Accept: "application/json",
        Host: BACK_END_URL,
        Origin: FRONT_END_URL,
        "Access-Control-Allow-Origin": FRONT_END_URL,
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
    },
};

export const GetShowData = async () =>
    await fetch(`${BACK_END_URL}/`, {
        method: "GET",
        ...defaultOption,
        credentials: "same-origin",
    })
        .then((res) => res.json())
        .catch((err) => console.log("Font-End, error: ", err));

export const PostLogIn = async (auth) =>
    await fetch(`${BACK_END_URL}/login`, {
        method: "POST",
        ...defaultOption,
        body: JSON.stringify(auth),
    })
        .then((res) => res.json())
        .catch((err) => console.log("Font-End, error: ", err));

export const PostLogOut = async () =>
    await fetch(`${BACK_END_URL}/logout`, {
        method: "POST",
        ...defaultOption,
    })
        .then((res) => res.json())
        .catch((err) => console.log("Font-End, error: ", err));

export const CreateCollection = async (type, data) =>
    await fetch(`${BACK_END_URL}/add${type}`, {
        method: "POST",
        ...defaultOption,
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .catch((err) => console.log("Font-End, error: ", err));

export const UpdateCollection = async (type, data) =>
    await fetch(`${BACK_END_URL}/patch${type}/${data._id}`, {
        method: "PATCH",
        ...defaultOption,
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .catch((err) => console.log("Font-End, error: ", err));

export const DeleteCollection = async (type, id, admin_id) =>
    await fetch(`${BACK_END_URL}/delete${type}/${id}/${admin_id}`, {
        method: "DELETE",
        ...defaultOption,
    })
        .then((res) => res.json())
        .catch((err) => console.log("Font-End, error: ", err));

export const PostImg = async (data) =>
    await fetch(`${BACK_END_URL}/postImg`, {
        method: "POST",
        ...defaultOption,
        body: data,
    })
        .then((res) => res.json())
        .catch((err) => console.log("Font-End, error: ", err));
