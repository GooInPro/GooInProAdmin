import axios from "axios";

const host =  `${import.meta.env.VITE_API_HOST}/complaints`;

//신고 리스트 api
export const getComplaintsList = async (page) => {

    const pageValue = (Number)(page || 1);

    const res = await axios.get(`${host}/list?page=${pageValue}`);

    console.log("getComplaintsList" + res.data);

    return res.data;
}

//신고 상세보기 api
export const detailComplaints = async (cno) => {

    const res = await axios.get(`${host}/detail/${cno}`);

    console.log("detailComplaints" + res.data);

    return res.data;
}

//신고 삭제 api
export const deleteComplaints = async (cno) => {

    const res = await axios.put(`${host}/delete/${cno}`);

    console.log("deleteComplaints" + res.data);

    return res.data;

}

//신고 답변 api
export const answerComplaints = async (cno, canswer) => {

    const res = await axios.put(`${host}/answer/${cno}`, canswer);

    console.log("answerComplaints" + res.data);

    return res.data;

}

//신고 답변 완료 리스트 api
export const getTComplaintsList = async (page) => {

    const pageValue = (Number)(page || 1);

    const res = await axios.get(`${host}/statuslist/true?page=${pageValue}`);

    console.log("getTComplaintsList" + res.data);

    return res.data;
}

//신고 답변 대기 리스트 api
export const getFComplaintsList = async (page) => {

    const pageValue = (Number)(page || 1);

    const res = await axios.get(`${host}/statuslist/false?page=${pageValue}`);

    console.log("getFComplaintsList" + res.data);

    return res.data;
}