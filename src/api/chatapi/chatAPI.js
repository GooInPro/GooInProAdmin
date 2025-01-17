import axios from "axios";


const host = `${import.meta.env.VITE_API_HOST}/chatmessage`;

export const getMessage = async (roomId) => {

    const res = await axios.get(`${host}/chat?roomId=${roomId}`)

    console.log(res);

    return res.data;
}

export const sendMessage = async (body) => {

    const res = await axios.post(`${host}/send`, body);

    console.log(res);

    return res.data;
}
