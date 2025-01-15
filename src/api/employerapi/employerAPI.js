import axios from "axios";

const host = `${import.meta.env.VITE_API_HOST}/employer`;

//고용인 리스트 호출 api
export const getEmployerList = async (page) => {

    const pageValue = (Number)(page || 1);

    const res = await axios.get(`${host}/list?page=${pageValue}`);

    console.log('getEmployerList' + res.data);

    return res.data;
}

export const deleteEmployer = async (eno) => {

    const res = await axios.put(`${host}/delete/${eno}`);

    console.log('deleteEmployer' + res.data);

    return res.data;
}

export const readEmployer = async (eno) => {

    const res = await axios.get(`${host}/read/${eno}`);

    console.log('readEmployer' + res.data);

    return res.data;
}