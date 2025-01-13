import axios from "axios";

const host = `${import.meta.env.VITE_API_HOST}/employer`;

//승인 된 고용인 리스트 호출 api
export const getApprovedEmployerList = async (page) => {

    const pageValue = (Number)(page || 1)

    const res = await axios.get(`${host}/approvedList?page=${pageValue}`)

    return res.data;
}

//승인되지 않은 고용인 리스트 호출 api
export const getNotApprovedEmployerList = async (page) => {

    const pageValue = (Number)(page || 1)

    const res = await axios.get(`${host}/notApprovedList?page=${pageValue}`)

    return res.data;
}