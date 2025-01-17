<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getPartTimerList } from '../../api/parttimerapi/partTimerAPI.js';

const router = useRouter();
const route = useRoute();

const partTimers = ref([]);
const loading = ref(true);
const error = ref(null);

const size = ref(10); // 페이지당 항목 수
const totalCount = ref(0); // 전체 항목 수

const searchQuery = ref(''); // 이름 검색어
const addressQuery = ref(''); // 주소 검색어

// 초기 페이지를 URL에서 가져오거나 기본값 1로 설정
const page = ref(Number(route.query.page) || 1);

// 리스트 API 호출 함수
const fetchPartTimerList = async () => {
  try {
    loading.value = true;
    const response = await getPartTimerList(page.value, searchQuery.value, addressQuery.value);
    partTimers.value = response.dtoList;
    totalCount.value = response.totalCount;
  } catch (err) {
    error.value = '근로자 리스트를 불러오는 데 실패했습니다.';
  } finally {
    loading.value = false;
  }
};

// 상세보기로 이동하는 함수
const handleDetail = (pno) => {
  router.push({ path: `/partTimer/detail/${pno}`, query: { page: page.value } });
};

// 페이지 변경 함수
const changePage = (pageNumber) => {
  if (page.value !== pageNumber) {
    page.value = pageNumber;
    router.push({ query: { ...route.query, page: pageNumber } });
    fetchPartTimerList();
  }
};

// 총 페이지 계산
const totalPages = ref(1);
watch([totalCount, size], () => {
  totalPages.value = Math.ceil(totalCount.value / size.value);
});

// URL 변경 감지 및 페이지 초기화
watch(
    () => route.query.page,
    (newPage) => {
      const pageNumber = Number(newPage) || 1;
      if (page.value !== pageNumber) {
        page.value = pageNumber;
        fetchPartTimerList();
      }
    }
);

// 검색어 변경 시 리스트를 다시 불러옴
watch([searchQuery, addressQuery], () => {
  page.value = 1;  // 검색 시 첫 페이지부터 시작
  fetchPartTimerList();
});

// 컴포넌트가 마운트될 때 데이터 로드
onMounted(fetchPartTimerList);

// 날짜 포맷팅 함수 (생년월일은 시간 제외, 등록일은 시간 포함)
const formatDate = (dateString, includeTime = false) => {
  const date = new Date(dateString);
  if (includeTime) {
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Asia/Seoul',
    }).format(date);
  } else {
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: 'Asia/Seoul',
    }).format(date);
  }
};
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-semibold mb-4">근로자 리스트</h1>

    <div class="flex mb-4 gap-4">
      <!-- 이름 검색 입력 -->
      <div class="flex-1">
        <input
            v-model="searchQuery"
            type="text"
            placeholder="이름 검색"
            class="w-full px-4 py-2 border border-gray-300 rounded"
        />
      </div>

      <!-- 주소 검색 입력 -->
      <div class="flex-1">
        <input
            v-model="addressQuery"
            type="text"
            placeholder="지역 검색"
            class="w-full px-4 py-2 border border-gray-300 rounded"
        />
      </div>
    </div>

    <!-- 로딩 상태 -->
    <div v-if="loading" class="text-lg">로딩 중...</div>

    <!-- 에러 처리 -->
    <div v-if="error" class="text-red-500 font-semibold">{{ error }}</div>

    <!-- 근로자 수 표시 -->
    <div v-if="!loading && !error" class="mb-4">
      <strong>총 근로자 수: </strong>{{ totalCount }}
    </div>

    <!-- 리스트 테이블 -->
    <table v-if="!loading && !error" class="min-w-full table-auto border-collapse border border-gray-200">
      <thead class="bg-gray-100">
      <tr>
        <th class="px-4 py-2 border-b">이름</th>
        <th class="px-4 py-2 border-b">생년월일</th>
        <th class="px-4 py-2 border-b">성별</th>
        <th class="px-4 py-2 border-b">이메일</th>
        <th class="px-4 py-2 border-b">등록일</th>
        <th class="px-4 py-2 border-b">주소</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="partTimer in partTimers" :key="partTimer.pno" class="hover:bg-gray-50"
          @click="handleDetail(partTimer.pno)">
        <td class="px-4 py-2 border-b">{{ partTimer.pname }}</td>
        <td class="px-4 py-2 border-b">{{ formatDate(partTimer.pbirth) }}</td>
        <td class="px-4 py-2 border-b">{{ partTimer.pgender ? '남' : '여' }}</td>
        <td class="px-4 py-2 border-b">{{ partTimer.pemail }}</td>
        <td class="px-4 py-2 border-b">{{ formatDate(partTimer.pregdate, true) }}</td>
        <td class="px-4 py-2 border-b">{{ partTimer.proadAddress }}</td>
      </tr>
      </tbody>
    </table>

    <!-- 페이지네이션 -->
    <div v-if="!loading && !error" class="mt-4 flex justify-center gap-2">
      <!-- 이전 버튼 -->
      <button
          v-if="page > 1"
          @click="changePage(page - 1)"
          class="px-4 py-2 rounded text-white bg-gray-300 hover:bg-gray-400"
      >
        Prev
      </button>

      <!-- 페이지 버튼 -->
      <button
          v-for="pageNumber in totalPages"
          :key="pageNumber"
          @click="changePage(pageNumber)"
          class="px-4 py-2 rounded text-white"
          :class="pageNumber === page ? 'bg-blue-500' : 'bg-gray-300 hover:bg-gray-400'"
      >
        {{ pageNumber }}
      </button>

      <!-- 다음 버튼 -->
      <button
          v-if="page < totalPages"
          @click="changePage(page + 1)"
          class="px-4 py-2 rounded text-white bg-gray-300 hover:bg-gray-400"
      >
        Next
      </button>
    </div>
  </div>
</template>
