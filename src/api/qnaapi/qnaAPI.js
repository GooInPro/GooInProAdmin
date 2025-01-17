import axios from "axios";

const host =  `${import.meta.env.VITE_API_HOST}/qna`;

//QNA 리스트 api
export const getQNAList = async (page) => {

    const pageValue = (Number)(page || 1);

    const res = await axios.get(`${host}/list?page=${pageValue}`);

    console.log("getQNAList" + res.data);

    return res.data;
}

//QNA 답변 대기 리스트 api
export const getFQNAList = async (page) => {

    const pageValue = Number(page || 1);

    const res = await axios.get(`${host}/statuslist/false?page=${pageValue}`);

    console.log("getFQNAList", res.data);

    return res.data;
};

//QNA 답변 완료 리스트 api
export const getTQNAList = async (page) => {

    const pageValue = Number(page || 1);

    const res = await axios.get(`${host}/statuslist/true?page=${pageValue}`);

    console.log("getTQNAList", res.data);

    return res.data;
};

//QNA 상세보기 api
export const detailQNA = async (qno) => {

    const res = await axios.get(`${host}/detail/${qno}`);

    console.log("detailQNA" + res.data);

    return res.data;
}

//QNA 삭제 api
export const deleteQNA = async (qno) => {

    const res = await axios.put(`${host}/delete/${qno}`);

    console.log("deleteQNA" + res.data);

    return res.data;
}

//QNA 답변 api
export const answerQNA = async (qno, answerAdmin) => {

    const res = await axios.put(`${host}/answer/${qno}`, answerAdmin);

    console.log("answerQNA" + res.data);

    return res.data;

}