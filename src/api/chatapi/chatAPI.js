import axios from "axios";


const host = `${import.meta.env.VITE_API_HOST}/chatmessage`;

export const getMessage = async (user, receiver) => {

    const res = await axios.get(`${host}/chat?sender=${user}&receiver=${receiver}`)

    console.log(res);

    return res.data;
}

export const sendMessage = async (body) => {

    const res = await axios.post(`${host}/send`, body);

    console.log(res);

    return res.data;
}
