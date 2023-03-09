import { Custom } from "../../shared/helper/customDataType";

export const GetShowData = async () => {
    const option = {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
    }
    return (
        fetch('http://localhost:5000/', option)
        .then(res => res.json())
        .then(({news, organizations, programs}) => {
            return {
                organizations: Custom(organizations),
                programs: Custom(programs),
                news: Custom(news)
            }
        })
        .catch(err => console.log('Font-End, error: ', err))
    );
};

export const GetAuthData = async (auth) => {};

export const CreateCollection = (type, data) => console.log(`You created ${type} collection, with data: `, data);

export const UpdateCollection = (type, data) => console.log(`You updated ${type} collection, with _id: ${data._id.$oid}, and data: `, data);

export const DeleteCollection = (type, id) => console.log(`You deleted ${type} collection, with _id: `, id);

export const PostImg = ([data]) => ({ url: 'public/asset/img/boat.png', file: data });