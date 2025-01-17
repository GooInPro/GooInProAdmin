import axios from "axios";

const host =  `${import.meta.env.VITE_API_HOST}/faq`;

//faq 리스트 api
export const getFAQList = async (page) => {

    const pageValue = (Number)(page || 1);

    const res = await axios.get(`${host}/list?page=${pageValue}`);

    console.log("getFAQList" + res.data);

    return res.data;
}

//faq 상세보기 api
export const detailFAQ = async (fno) => {

    const res = await axios.get(`${host}/detail/${fno}`);

    console.log("detailFAQ" + res.data);

    return res.data;
}

//faq 등록 api
export const addFAQ = async (addData) => {

    const res = await axios.post(`${host}/register`, addData);

    console.log("addFAQ" + res.data);

    return res.data;

}

//faq 삭제 api
export const deleteFAQ = async (fno) => {

    const res = await axios.put(`${host}/delete/${fno}`);

    console.log("deleteFAQ" + res.data);

    return res.data;
}

//faq 수정 api
export const editFAQ = async (fno, updatedData) => {

    const res = await axios.put(`${host}/edit/${fno}`, updatedData);

    console.log("editFAQ", res.data);

    return res.data;
}
