import axios from "axios";

const host = `${import.meta.env.VITE_API_HOST}/employer`;

//고용인 리스트 호출 api
export const getEmployerList = async (page, ename) => {

    const pageValue = (Number)(page || 1);

    const url = ename && ename.length > 0
        ? `${host}/list?ename=${ename}&page=${pageValue}`
        : `${host}/list?page=${pageValue}`

    const res = await axios.get(url);

    console.log(res.data);

    return res.data;
}

//고용인 삭제 api
export const deleteEmployer = async (eno) => {

    const res = await axios.put(`${host}/delete/${eno}`);

    console.log(res.data);

    return res.data;
}

//고용인 상세 보기 api
export const readEmployer = async (eno) => {

    const res = await axios.get(`${host}/read/${eno}`);

    console.log(res.data);

    return res.data;
}

//고용인 수 확인 api
export const countEmployer = async () => {

    const res = await axios.get(`${host}/count`);

    console.log(res.data);

    return res.data;
}