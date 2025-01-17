<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { detailFAQ, deleteFAQ } from '../../api/faqapi/faqAPI.js'; // FAQ 상세보기 API 호출 함수

// FAQ 상세 정보 타입 정의
interface FAQDetailDTO {
  fno: number;
  admname: string;
  ftitle: string;
  fcontent: string;
  fcategory: string;
  fdelete: boolean;
}

// 상태 관리
const faqDetail = ref<FAQDetailDTO | null>(null);
const loading = ref<boolean>(false);
const error = ref<string | null>(null);

// 현재 라우트에서 fno 가져오기
const route = useRoute();
const router = useRouter();
const fno = route.params.fno as string;
const page = route.query.page as string | undefined;

// FAQ 상세 정보를 가져오는 함수
const fetchFaqDetail = async () => {
  loading.value = true;
  error.value = null;

  try {
    const data = await detailFAQ(Number(fno));
    faqDetail.value = data;
  } catch (err) {
    console.error('FAQ 상세 정보를 가져오는 중 오류 발생:', err);
    error.value = 'FAQ 정보를 로드하는 데 실패했습니다.';
  } finally {
    loading.value = false;
  }
};

// FAQ 삭제 함수
const deleteFaq = async () => {
  if (faqDetail.value) {
    try {
      await deleteFAQ(faqDetail.value.fno);
      // 삭제 성공 후 FAQ 목록 페이지로 리다이렉트
      router.push('/faq/list');
    } catch (err) {
      console.error('FAQ 삭제 중 오류 발생:', err);
      error.value = 'FAQ 삭제에 실패했습니다.';
    }
  }
};

// FAQ 수정 페이지로 이동
const goToEditPage = () => {
  if (faqDetail.value) {
    router.push(`/faq/edit/${faqDetail.value.fno}`);
  }
};

// 리스트 페이지로 돌아가기
const goToListPage = () => {
  if (page) {
    router.push(`/faq/list?page=${page}`); // 쿼리 파라미터와 함께 리스트 페이지로 이동
  } else {
    router.push('/faq/list'); // 페이지 정보가 없으면 기본 리스트로 이동
  }
};

// 컴포넌트 마운트 시 FAQ 상세 정보 로드
onMounted(fetchFaqDetail);
</script>

<template>
  <div class="p-6">
    <!-- 제목 -->
    <h1 class="text-2xl font-bold mb-4">FAQ 상세보기</h1>

    <!-- 로딩 중 -->
    <div v-if="loading" class="text-center text-gray-500">로딩 중...</div>

    <!-- 오류 메시지 -->
    <div v-if="error" class="text-center text-red-500">{{ error }}</div>

    <!-- FAQ 상세 내용 -->
    <div v-else-if="faqDetail" class="space-y-4">
      <div class="border p-4 rounded shadow-sm bg-white">
        <h2 class="text-xl font-semibold">{{ faqDetail.ftitle }}</h2>
        <p class="text-sm text-gray-500 mb-2">작성자: {{ faqDetail.admname }}</p>
        <p class="text-sm text-gray-500 mb-2">카테고리: {{ faqDetail.fcategory }}</p>
        <div class="mt-4">
          <h3 class="text-lg font-medium">내용</h3>
          <p class="text-gray-700 mt-2">{{ faqDetail.fcontent }}</p>
        </div>
      </div>

      <!-- 버튼들 -->
      <div class="flex justify-end gap-4">
        <button @click="goToEditPage" class="px-4 py-2 bg-blue-500 text-white rounded">수정</button>
        <button @click="deleteFaq" class="px-4 py-2 bg-red-500 text-white rounded">삭제</button>
        <button @click="goToListPage" class="px-4 py-2 bg-gray-500 text-white rounded">목록으로</button>
      </div>


    </div>

    <!-- 데이터가 없을 때 -->
    <div v-else class="text-center text-gray-500">FAQ 정보를 찾을 수 없습니다.</div>
  </div>
</template>

<style scoped>
</style>
