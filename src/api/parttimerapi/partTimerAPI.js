import axios from "axios";

const host =  `${import.meta.env.VITE_API_HOST}/partTimer`;

//근로자 리스트 호출 api
export const getPartTimerList = async (page, searchQuery = '', addressQuery = '') => {
    const pageValue = Number(page || 1);  // 페이지 값 설정

    // 검색어가 있을 경우, 쿼리 파라미터에 추가
    const query = new URLSearchParams();

    if (searchQuery) {
        query.append('searchQuery', searchQuery);  // 이름 검색
    }
    if (addressQuery) {
        query.append('addressQuery', addressQuery);  // 주소 검색
    }

    // API 호출
    const res = await axios.get(`${host}/list?page=${pageValue}&${query.toString()}`);

    console.log("getPartTimerList", res.data);

    return res.data;
}



//근로자 삭제 api
export const deletePartTimer = async (pno) => {

    const res = await axios.put(`${host}/delete/${pno}`);

    console.log("deletePartTimer" + res.data);

    return res.data;

}

//근로자 상세보기 api
export const detailPartTimer = async (pno) => {

    const res = await axios.get(`${host}/detail/${pno}`);

    console.log("detailPartTimer" + res.data);

    return res.data;

}