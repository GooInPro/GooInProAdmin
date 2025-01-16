import jwtAxios from "../../util/jwtUtil";

const host = `${import.meta.env.VITE_API_HOST}/admin`;

// 관리자 목록 조회
export const getAdminList = async (page, types, keyword) => {

    const pageValue = (Number)(page || 1);

    const res = await jwtAxios.get(`${host}/list?page=${pageValue}&types=${types}&keyword=${keyword}`);

    console.log('getAdminList' + res.data);
    return res.data;
}

// 새로운 관리자 등록
export const registerAdmin = async (adminData) => {

    // adminData = { admid, admpw, admname, admrole }
    const res = await jwtAxios.post(`${host}/register`, adminData);

    console.log('registerAdmin' + res.data);
    return res.data;
}

// 관리자 정보 수정
export const editAdmin = async (adminData) => {

    // adminData = { admno, admpw, admname, admrole }
    const res = await jwtAxios.put(`${host}/edit`, adminData);

    console.log('editAdmin' + res.data);
    return res.data;
}

// 관리자 삭제
export const deleteAdmin = async (admno) => {

   const res = await jwtAxios.delete(`${host}/delete/${admno}`);

    console.log('deleteAdmin' + res.data);
    return res.data;
}

// 관리자 상세 정보 조회
export const readAdmin = async (admno) => {

    const res = await jwtAxios.get(`${host}/${admno}`);

    console.log('readAdmin' + res.data);
    return res.data;
}
