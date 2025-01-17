<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getFQNAList, getTQNAList } from '../../api/qnaapi/qnaAPI.js'; // API 호출 함수 경로에 맞게 수정
import {useRoute, useRouter} from 'vue-router'; // Vue Router import

const router = useRouter(); // Router 사용
const route = useRoute();

const currentPage = ref<number>(Number(route.query.page) || 1);  // 현재 페이지
const totalPages = ref(1);  // 전체 페이지 수

// 답변 대기 리스트와 답변 완료 리스트
const fqnaList = ref([]);
const tqnaList = ref([]);

const fetchFQNAList = async (page = 1) => {
  const response = await getFQNAList(page);
  fqnaList.value = response.dtoList;
  totalPages.value = Math.ceil(response.totalCount / response.pageRequestDTO.size); // 전체 페이지 수 계산
};

const fetchTQNAList = async (page = 1) => {
  const response = await getTQNAList(page);
  tqnaList.value = response.dtoList;
  totalPages.value = Math.ceil(response.totalCount / response.pageRequestDTO.size); // 전체 페이지 수 계산
};

// 페이지네이션 핸들러
const changePage = (page: number) => {
  currentPage.value = page;

  router.push({
    path: route.path,
    query: { page: currentPage.value, status: status.value },
  });

  if (status.value === 'false') {
    fetchFQNAList(page);
  } else {
    fetchTQNAList(page);
  }
};




// 상세보기 페이지로 이동
const goToDetail = (qno: number) => {
  router.push({ path: `/qna/detail/${qno}`, query: { page: currentPage.value, status: status.value } });
};


const status = ref('false'); // 'false'이면 답변 대기, 'true'이면 답변 완료 리스트

// 초기 데이터 로드
onMounted(() => {
  // 쿼리에서 페이지 번호와 상태 읽기
  currentPage.value = Number(route.query.page) || 1;
  status.value = route.query.status === 'true' ? 'true' : 'false';

  // 초기 데이터 로드
  if (status.value === 'false') {
    fetchFQNAList(currentPage.value);
  } else {
    fetchTQNAList(currentPage.value);
  }
});


</script>

<template>
  <div class="container mx-auto p-4">
    <!-- 답변 대기 리스트 버튼 -->
    <div class="mb-4 flex gap-4 justify-center">
      <!-- 답변 대기 버튼 -->
      <button
          @click="() => {
          status = 'false';
          currentPage = 1;
          router.push({ path: route.path, query: { page: 1, status: 'false' } });
          fetchFQNAList(1);
         }"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        답변 대기
      </button>

      <!-- 답변 완료 버튼 -->
      <button
          @click="() => {
          status = 'true';
          currentPage = 1;
          router.push({ path: route.path, query: { page: 1, status: 'true' } });
          fetchTQNAList(1);
        }"
          class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
      >
        답변 완료
      </button>

    </div>

    <!-- 리스트 출력 (테이블 형식) -->
    <div v-if="status === 'false'">
      <h3 class="text-xl font-semibold mb-4">답변 대기 리스트</h3>
      <table class="min-w-full table-auto bg-white rounded-lg shadow-md border border-gray-300">
        <thead>
        <tr class="bg-gray-100">
          <th class="px-6 py-3 text-left text-sm font-medium text-gray-600">제목</th>
          <th class="px-6 py-3 text-left text-sm font-medium text-gray-600">문의자</th>
          <th class="px-6 py-3 text-left text-sm font-medium text-gray-600">등록일</th>
          <th class="px-6 py-3 text-left text-sm font-medium text-gray-600">상태</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="qna in fqnaList" :key="qna.qno" class="border-t border-gray-200"
            @click="goToDetail(qna.qno)">
          <td class="px-6 py-4 text-sm text-gray-800">{{ qna.qtitle }}</td>
          <td class="px-6 py-4 text-sm text-gray-600">{{ qna.pname }}</td>
          <td class="px-6 py-4 text-sm text-gray-500">{{ qna.qregdate }}</td>
          <td class="px-6 py-4 text-sm text-gray-500">{{ qna.qstatus ? '답변 완료' : '대기 중' }}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div v-if="status === 'true'">
      <h3 class="text-xl font-semibold mb-4">답변 완료 리스트</h3>
      <table class="min-w-full table-auto bg-white rounded-lg shadow-md border border-gray-300">
        <thead>
        <tr class="bg-gray-100">
          <th class="px-6 py-3 text-left text-sm font-medium text-gray-600">제목</th>
          <th class="px-6 py-3 text-left text-sm font-medium text-gray-600">문의자</th>
          <th class="px-6 py-3 text-left text-sm font-medium text-gray-600">등록일</th>
          <th class="px-6 py-3 text-left text-sm font-medium text-gray-600">상태</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="qna in tqnaList" :key="qna.qno" class="border-t border-gray-200"
            @click="goToDetail(qna.qno)">
          <td class="px-6 py-4 text-sm text-gray-800">{{ qna.qtitle }}</td>
          <td class="px-6 py-4 text-sm text-gray-600">{{ qna.pname }}</td>
          <td class="px-6 py-4 text-sm text-gray-500">{{ qna.qregdate }}</td>
          <td class="px-6 py-4 text-sm text-gray-500">{{ qna.qstatus ? '답변 완료' : '대기 중' }}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- 페이지네이션 -->
    <div class="flex justify-center mt-6 gap-2">
      <!-- 이전 버튼 -->
      <button
          v-if="currentPage > 1"
          @click="changePage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition disabled:opacity-50"
      >
        이전
      </button>

      <!-- 페이지 번호 표시 -->
      <button
          v-for="pageNumber in totalPages"
          :key="pageNumber"
          @click="changePage(pageNumber)"
          :class="{
            'bg-blue-500': pageNumber === currentPage,
            'bg-gray-300 hover:bg-gray-400': pageNumber !== currentPage
          }"
          class="px-4 py-2 rounded-lg text-white"
      >
        {{ pageNumber }}
      </button>

      <!-- 다음 버튼 -->
      <button
          v-if="currentPage < totalPages"
          @click="changePage(currentPage.value + 1)"
          :disabled="currentPage.value === totalPages"
          class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition disabled:opacity-50"
      >
        다음
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>
