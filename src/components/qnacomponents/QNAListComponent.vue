<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getFQNAList, getTQNAList } from '../../api/qnaapi/qnaAPI.js';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const currentPage = ref<number>(Number(route.query.page) || 1);
const totalPages = ref(1);
const fqnaList = ref([]);
const tqnaList = ref([]);
const status = ref('false');

const fetchFQNAList = async (page = 1) => {
  const response = await getFQNAList(page);
  fqnaList.value = response.dtoList;
  totalPages.value = Math.ceil(response.totalCount / response.pageRequestDTO.size);
};

const fetchTQNAList = async (page = 1) => {
  const response = await getTQNAList(page);
  tqnaList.value = response.dtoList;
  totalPages.value = Math.ceil(response.totalCount / response.pageRequestDTO.size);
};

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

const goToDetail = (qno: number) => {
  router.push({ path: `/qna/detail/${qno}`, query: { page: currentPage.value, status: status.value } });
};

const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true, // 24시간 형식
  };

  const formattedDate = new Date(date).toLocaleString('ko-KR', options);
  return formattedDate;
};

onMounted(() => {
  currentPage.value = Number(route.query.page) || 1;
  status.value = route.query.status === 'true' ? 'true' : 'false';

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
          <th class="px-4 py-2 border-b">제목</th>
          <th class="px-4 py-2 border-b">문의자</th>
          <th class="px-4 py-2 border-b">등록일</th>
          <th class="px-4 py-2 border-b">상태</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="qna in fqnaList" :key="qna.qno" class="border-t border-gray-200"
            @click="goToDetail(qna.qno)">
          <td class="px-6 py-4 text-sm text-gray-800">{{ qna.qtitle }}</td>
          <td class="px-6 py-4 text-sm text-gray-600">{{ qna.pname }}</td>
          <td class="px-6 py-4 text-sm text-gray-500">{{ formatDate(qna.qregdate) }}</td>
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
          <th class="px-4 py-2 border-b">제목</th>
          <th class="px-4 py-2 border-b">문의자</th>
          <th class="px-4 py-2 border-b">등록일</th>
          <th class="px-4 py-2 border-b">상태</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="qna in tqnaList" :key="qna.qno" class="border-t border-gray-200"
            @click="goToDetail(qna.qno)">
          <td class="px-6 py-4 text-sm text-gray-800">{{ qna.qtitle }}</td>
          <td class="px-6 py-4 text-sm text-gray-600">{{ qna.pname }}</td>
          <td class="px-6 py-4 text-sm text-gray-500">{{ formatDate(qna.qregdate) }}</td>
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
