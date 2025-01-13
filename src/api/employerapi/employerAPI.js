import axios from "axios";

const host = `${import.meta.env.VITE_API_HOST}/employer`;

//고용인 리스트 호출 api
export const getEmployerList = async (page) => {

    const pageValue = (Number)(page || 1)

    const res = await axios.get(`${host}/list?page=${pageValue}`)

    return res.data;
}