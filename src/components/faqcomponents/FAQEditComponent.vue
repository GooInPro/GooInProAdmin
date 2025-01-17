<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { detailFAQ, editFAQ } from '../../api/faqapi/faqAPI.js'; // API 함수 가져오기

// 라우터에서 fno 가져오기
const route = useRoute();
const router = useRouter();
const fno = Number(route.params.fno); // URL 파라미터에서 fno 가져오기

// 상태 관리
const faqData = ref({
  ftitle: '',
  fcategory: '',
  fcontent: '',
}); // 수정할 FAQ 데이터

const loading = ref<boolean>(false);
const error = ref<string>('');

// FAQ 상세 정보 불러오기
const fetchFAQDetails = async () => {
  loading.value = true;
  try {
    const response = await detailFAQ(fno);
    faqData.value = {
      ftitle: response.ftitle,
      fcategory: response.fcategory,
      fcontent: response.fcontent,
    };
  } catch (err) {
    error.value = 'FAQ를 불러오는 중 오류가 발생했습니다.';
  } finally {
    loading.value = false;
  }
};

// FAQ 수정하기
const updateFAQ = async () => {
  loading.value = true;
  try {
    const response = await editFAQ(fno, faqData.value);
    console.log('FAQ 수정 결과:', response);
    // 수정 후 FAQ 리스트 페이지로 돌아가기
    router.push('/faq/list');
  } catch (err) {
    error.value = 'FAQ 수정 중 오류가 발생했습니다.';
  } finally {
    loading.value = false;
  }
};

// 상세보기 페이지로 돌아가기
const goToDetail = () => {
  router.push(`/faq/detail/${fno}`);
};

// 컴포넌트가 마운트될 때 상세 정보 불러오기
onMounted(fetchFAQDetails);
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">FAQ 수정</h1>

    <!-- 로딩 표시 -->
    <div v-if="loading" class="text-center text-gray-500">로딩 중...</div>

    <!-- 오류 표시 -->
    <div v-if="error" class="text-center text-red-500">{{ error }}</div>

    <!-- FAQ 수정 폼 -->
    <div v-else>
      <form @submit.prevent="updateFAQ">
        <div class="mb-4">
          <label for="ftitle" class="block text-sm font-medium text-gray-700">제목</label>
          <input
              type="text"
              id="ftitle"
              v-model="faqData.ftitle"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
          />
        </div>

        <div class="mb-4">
          <label for="fcategory" class="block text-sm font-medium text-gray-700">카테고리</label>
          <input
              type="text"
              id="fcategory"
              v-model="faqData.fcategory"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
          />
        </div>

        <div class="mb-4">
          <label for="fcontent" class="block text-sm font-medium text-gray-700">내용</label>
          <textarea
              id="fcontent"
              v-model="faqData.fcontent"
              rows="4"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
          ></textarea>
        </div>

        <div class="flex justify-end gap-4">
          <button
              type="submit"
              class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              :disabled="loading"
          >
            수정
          </button>
          <button
              type="button"
              class="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
              @click="goToDetail"
          >
            뒤로가기
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
</style>
