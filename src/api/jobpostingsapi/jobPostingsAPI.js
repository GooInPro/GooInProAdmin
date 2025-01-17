import axios from "axios";

const host = `${import.meta.env.VITE_API_HOST}/jobPostings`;

//구인 공고 리스트 호출 api(eno = 0 이면 전체 리스트 호출)
export const getJobPostingsList = async (eno, page) => {

    const pageValue = (Number)(page || 1);

    const res = await axios.get(`${host}/list/${eno}?page=${pageValue}`);

    console.log(res.data);

    return res.data;
}

//구인 공고 삭제 api
export const deleteJobPosting = async (jpno) => {

    const res = await axios.put(`${host}/delete/${jpno}`);

    console.log(res.data);

    return res.data;
}

//구인 공고 사세 보기 api
export const readJobPosting = async (jpno) => {

    const res = await axios.get(`${host}/read/${jpno}`)

    console.log(res.data);

    return res.data;
}

//구인 공고 수 확인 api
export const countJobPostings = async (jpno) => {

    const res = await axios.get(`${host}/count`);

    console.log(res.data);

    return res.data;
}