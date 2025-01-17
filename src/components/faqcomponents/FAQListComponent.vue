<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';  // computed 임포트 추가
import { useRouter, useRoute } from 'vue-router'; // Vue Router 사용
import { getFAQList } from '../../api/faqapi/faqAPI.js'; // API 파일에서 가져오기

// FAQ 리스트 데이터 타입 정의
interface FAQListDTO {
  fno: number;
  admname: string;
  ftitle: string;
  fcategory: string;
  fdelete: boolean;
}

// 상태 관리
const faqList = ref<FAQListDTO[]>([]);
const totalCount = ref<number>(0);
const currentPage = ref<number>(1);
const pageSize = ref<number>(10);
const loading = ref<boolean>(false);

// 라우터 인스턴스 가져오기
const router = useRouter();
const route = useRoute();

// 쿼리 파라미터에서 페이지 번호를 가져오기
const pageQuery = route.query.page as string | undefined;
if (pageQuery) {
  currentPage.value = Number(pageQuery);
}

// FAQ 리스트를 가져오는 함수
const fetchFaqList = async () => {
  loading.value = true;
  try {
    const data = await getFAQList(currentPage.value);
    faqList.value = data.dtoList;
    totalCount.value = data.totalCount;
  } catch (error) {
    console.error('FAQ 리스트를 가져오는 중 오류 발생:', error);
  } finally {
    loading.value = false;
  }
};

// 페이지 변경 핸들러
const handlePageChange = (page: number) => {
  currentPage.value = page;
  // 페이지 변경 시 쿼리 파라미터로 페이지 번호를 업데이트
  router.push({ path: '/faq/list', query: { page: page.toString() } });
  fetchFaqList();
};

// 상세보기 페이지로 이동
const goToDetail = (fno: number) => {
  router.push({ path: `/faq/detail/${fno}`, query: { page: currentPage.value } });
};

// 등록하기 페이지로 이동 (새로운 FAQ 추가)
const goToRegister = () => {
  router.push({ path: '/faq/register' }); // 등록 페이지로 이동
};

// 컴포넌트가 마운트될 때 FAQ 리스트를 가져옴
onMounted(fetchFaqList);

// 총 페이지 수 계산
const totalPages = computed(() => Math.ceil(totalCount.value / pageSize.value));  // computed 사용
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">FAQ 리스트</h1>

    <!-- 로딩 표시 -->
    <div v-if="loading" class="text-center text-gray-500">로딩 중...</div>

    <!-- FAQ 리스트 -->
    <div v-else>

      <!-- 등록하기 버튼 -->
      <div class="mt-6 flex justify-end">
        <button
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            @click="goToRegister"
        >
          등록하기
        </button>
      </div>
      <table class="min-w-full table-auto border-collapse border border-gray-300">
        <thead class="bg-gray-100">
        <tr>
          <th class="px-4 py-2 border-b">번호</th>
          <th class="px-4 py-2 border-b">관리자</th>
          <th class="px-4 py-2 border-b">제목</th>
          <th class="px-4 py-2 border-b">카테고리</th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="faq in faqList"
            :key="faq.fno"
            class="hover:bg-gray-50 cursor-pointer"
            @click="goToDetail(faq.fno)"
        >
          <td class="px-4 py-2 border-b">{{ faq.fno }}</td>
          <td class="px-4 py-2 border-b">{{ faq.admname }}</td>
          <td class="px-4 py-2 border-b">{{ faq.ftitle }}</td>
          <td class="px-4 py-2 border-b">{{ faq.fcategory }}</td>
        </tr>
        </tbody>
      </table>

      <!-- 페이지네이션 -->
      <div class="mt-4 flex justify-center gap-2">
        <!-- 이전 버튼 -->
        <button
            v-if="currentPage > 1"
            class="px-4 py-2 rounded text-white bg-gray-300 hover:bg-gray-400"
            @click="handlePageChange(currentPage - 1)"
        >
          이전
        </button>

        <!-- 페이지 번호 -->
        <button
            v-for="pageNumber in totalPages"
            :key="pageNumber"
            @click="handlePageChange(pageNumber)"
            class="px-4 py-2 rounded text-white"
            :class="pageNumber === currentPage ? 'bg-blue-500' : 'bg-gray-300 hover:bg-gray-400'"
        >
          {{ pageNumber }}
        </button>

        <!-- 다음 버튼 -->
        <button
            v-if="currentPage < totalPages"
            class="px-4 py-2 rounded text-white bg-gray-300 hover:bg-gray-400"
            @click="handlePageChange(currentPage + 1)"
        >
          다음
        </button>
      </div>
    </div>


  </div>
</template>

<style scoped>
</style>
