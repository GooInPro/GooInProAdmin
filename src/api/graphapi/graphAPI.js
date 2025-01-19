import axios from "axios";


const host = `${import.meta.env.VITE_API_HOST}`;


export const getCountFComplaints = async () => { // 신고 답변 대기 개수

    const res = await axios.get(`${host}/complaints/count/f`);

    console.log(res);

    return res.data;

}

export const getCountTComplaints = async () => { // 신고 답변 완료 개수

    const res = await axios.get(`${host}/complaints/count/t`);

    console.log(res);

    return res.data;

}

export const getCountFQNA = async () => { // qna 답변 대기 개수

    const res = await axios.get(`${host}/qna/count/f`);

    console.log(res);

    return res.data;

}

export const getCountTQNA = async () => { // qna 답변 완료 개수

    const res = await axios.get(`${host}/qna/count/t`);

    console.log(res);

    return res.data;

}





