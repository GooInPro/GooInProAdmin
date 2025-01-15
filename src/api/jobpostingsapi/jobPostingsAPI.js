import axios from "axios";

const host = `${import.meta.env.VITE_API_HOST}/jobPostings`;

//모든 구인 공고 리스트 호출 api
export const getAllJobPostingsList = async (page) => {

    const pageValue = (Number)(page || 1);

    const res = await axios.get(`${host}/allList?page=${pageValue}`);

    console.log("getAllJobPostingsList" + res.data);

    return res.data;
}

//구인 공고 삭제 api
export const deleteJobPosting = async (jpno) => {

    const res = await axios.put(`${host}/delete/${jpno}`);

    console.log('deleteJobPosting' + res.data);

    return res.data;
}

//구인 공고 사세 보기 api
export const readJobPosting = async (jpno) => {

    const res = await axios.get(`${host}/read/${jpno}`)

    console.log('readJobPosting' + res.data);

    return res.data;
}

//구인 공고 수 확인 api
export const countJobPostings = async (jpno) => {

    const res = await axios.get(`${host}/count`);

    console.log('countJobPostings' + res.data);

    return res.data;
}