import axios from "axios";


const host = `${import.meta.env.VITE_API_HOST}/chatroom`;

export const getEmpChatRoom = async (eno) => {

    const res = await axios.get(`${host}/get/emp/${eno}`)

    console.log(res);

    return res.data;
}

export const deleteEmpChatRoom = async (eno) => {

    const res = await axios.delete(`${host}/delete/emp/${eno}`)

    console.log(res);

    return res.data;
}

export const getPartChatRoom = async (pno) => {

    const res = await axios.get(`${host}/get/part/${pno}`)

    console.log(res);

    return res.data;
}

export const deletePartChatRoom = async (pno) => {

    const res = await axios.delete(`${host}/delete/part/${pno}`)

    console.log(res);

    return res.data;
}