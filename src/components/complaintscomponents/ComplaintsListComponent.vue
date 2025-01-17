<script setup>
import { ref, onMounted } from 'vue';
import { getTComplaintsList, getFComplaintsList } from '../../api/complaintsapi/complaintsAPI.js';
import { useRoute, useRouter } from 'vue-router';

const complaintsList = ref([]); // 신고 리스트
const currentPage = ref(1); // 현재 페이지
const totalPages = ref(0); // 전체 페이지 수
const status = ref('false'); // 상태: 'false' -> 답변 대기, 'true' -> 답변 완료
const pageSize = 10; // 페이지당 항목 수
const activeTab = ref('waiting'); // 현재 탭 상태

const router = useRouter();
const route = useRoute();

// 한국 시간으로 포맷팅하는 함수
const formatToKoreanTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
};

// 신고 리스트 데이터 로드 (답변 완료 / 대기)
const fetchComplaintsList = async (page = 1, statusValue = 'false') => {
  try {
    let data;
    if (statusValue === 'true') {
      data = await getTComplaintsList(page); // 답변 완료 리스트
    } else {
      data = await getFComplaintsList(page); // 답변 대기 리스트
    }

    // 등록일 및 답변 시간 포맷팅
    complaintsList.value = data.dtoList.map((complaint) => ({
      ...complaint,
      cregdate: formatToKoreanTime(complaint.cregdate),
      ccheckedTime: complaint.ccheckedTime ? formatToKoreanTime(complaint.ccheckedTime) : '없음',
    }));

    totalPages.value = Math.ceil(data.totalCount / pageSize);
  } catch (error) {
    console.error('Failed to fetch complaints list:', error);
  }
};

// 상태 변경 핸들러
const switchStatus = (newStatus) => {
  status.value = newStatus;
  activeTab.value = newStatus === 'true' ? 'completed' : 'waiting'; // 탭 상태 변경
  currentPage.value = 1;

  router.push({
    path: route.path,
    query: { page: currentPage.value, status: newStatus },
  });

  fetchComplaintsList(currentPage.value, newStatus);
};

// 페이지 변경 핸들러
const changePage = (page) => {
  currentPage.value = page;

  router.push({
    path: route.path,
    query: { page: currentPage.value, status: status.value },
  });

  fetchComplaintsList(page, status.value);
};

// 상세보기 페이지로 이동
const handleDetail = (cno) => {
  router.push({
    path: `/complaints/detail/${cno}`,
    query: { page: currentPage.value, status: status.value },
  });
};

// 컴포넌트 마운트 시 초기 데이터 로드
onMounted(() => {
  currentPage.value = Number(route.query.page) || 1;
  status.value = route.query.status || 'false';
  activeTab.value = status.value === 'true' ? 'completed' : 'waiting';

  fetchComplaintsList(currentPage.value, status.value);
});
</script>


<template>
  <div class="p-6">
    <div class="mb-4 text-center">
      <button
          class="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          :class="{ 'bg-blue-700': activeTab === 'waiting' }"
          @click="switchStatus('false')"
      >
        답변 대기
      </button>
      <button
          class="px-4 py-2 bg-green-500 text-white rounded disabled:bg-gray-300 ml-4"
          :class="{ 'bg-green-700': activeTab === 'completed' }"
          @click="switchStatus('true')"
      >
        답변 완료
      </button>
    </div>

    <div v-if="activeTab === 'waiting'">
      <h2 class="text-xl font-semibold mb-4">답변 대기 신고 목록</h2>
      <table class="w-full table-auto border-collapse border border-gray-300 text-left">
        <thead>
        <tr class="bg-gray-200">
          <th class="border border-gray-300 px-4 py-2">제목</th>
          <th class="border border-gray-300 px-4 py-2">등록일</th>
          <th class="border border-gray-300 px-4 py-2">답변 상태</th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="complaint in complaintsList"
            :key="complaint.cno"
            class="hover:bg-gray-100 cursor-pointer"
            @click="handleDetail(complaint.cno)"
        >
          <td class="border border-gray-300 px-4 py-2">{{ complaint.ctitle }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ complaint.cregdate }}</td>
          <td class="border border-gray-300 px-4 py-2">답변 대기</td>
        </tr>
        </tbody>
      </table>

      <!-- 페이지네이션 -->
      <div class="flex items-center justify-center space-x-2 mt-4">
        <!-- 이전 버튼 -->
        <button
            v-if="currentPage > 1"
            @click="changePage(currentPage - 1)"
            class="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-black"
        >
          이전
        </button>

        <!-- 페이지 번호 -->
        <button
            v-for="page in totalPages"
            :key="page"
            @click="changePage(page)"
            class="px-4 py-2 rounded"
            :class="{
            'bg-blue-500 text-white': currentPage === page,
            'bg-gray-300 hover:bg-gray-400 text-black': currentPage !== page
          }"
        >
          {{ page }}
        </button>

        <!-- 다음 버튼 -->
        <button
            v-if="currentPage < totalPages"
            @click="changePage(currentPage + 1)"
            class="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-black"
        >
          다음
        </button>
      </div>
    </div>

    <div v-if="activeTab === 'completed'">
      <h2 class="text-xl font-semibold mt-8 mb-4">답변 완료 신고 목록</h2>
      <table class="w-full table-auto border-collapse border border-gray-300 text-left">
        <thead>
        <tr class="bg-gray-200">
          <th class="border border-gray-300 px-4 py-2">제목</th>
          <th class="border border-gray-300 px-4 py-2">답변 시간</th>
          <th class="border border-gray-300 px-4 py-2">답변 상태</th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="complaint in complaintsList"
            :key="complaint.cno"
            class="hover:bg-gray-100 cursor-pointer"
            @click="handleDetail(complaint.cno)"
        >
          <td class="border border-gray-300 px-4 py-2">{{ complaint.ctitle }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ complaint.ccheckedTime }}</td>
          <td class="border border-gray-300 px-4 py-2">답변 완료</td>
        </tr>
        </tbody>
      </table>

      <!-- 페이지네이션 -->
      <div class="flex items-center justify-center space-x-2 mt-4">
        <!-- 이전 버튼 -->
        <button
            v-if="currentPage > 1"
            @click="changePage(currentPage - 1)"
            class="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-black"
        >
          이전
        </button>

        <!-- 페이지 번호 -->
        <button
            v-for="page in totalPages"
            :key="page"
            @click="changePage(page)"
            class="px-4 py-2 rounded"
            :class="{
            'bg-blue-500 text-white': currentPage === page,
            'bg-gray-300 hover:bg-gray-400 text-black': currentPage !== page
          }"
        >
          {{ page }}
        </button>

        <!-- 다음 버튼 -->
        <button
            v-if="currentPage < totalPages"
            @click="changePage(currentPage + 1)"
            class="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-black"
        >
          다음
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
