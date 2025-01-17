<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { addFAQ } from '../../api/faqapi/faqAPI.js';
import { useAdminAuthStore } from '../../stores/adminAuthStore.js';

const title = ref('');
const content = ref('');
const category = ref('');
const loading = ref(false);
const error = ref<string | null>(null);

const adminAuthStore = useAdminAuthStore();
const { adminName, adminNo } = adminAuthStore;

const router = useRouter();

const submitFAQ = async () => {
  if (!title.value || !content.value || !category.value) {
    error.value = '모든 필드를 채워주세요.';
    return;
  }

  loading.value = true;
  error.value = null;

  try {
    const newFAQ = {
      ftitle: title.value,
      fcontent: content.value,
      fcategory: category.value,
      admno: adminNo, // 관리자 번호 포함 (수정된 키 이름)
    };

    console.log('전송 데이터:', newFAQ);

    const response = await addFAQ(newFAQ);

    console.log('등록 성공:', response);

    router.push('/faq/list');
  } catch (err) {
    console.error('FAQ 등록 중 오류 발생:', err.response?.data || err.message);
    error.value = err.response?.data || 'FAQ 등록 중 오류가 발생했습니다.';
  } finally {
    loading.value = false;
  }
};

const goToListPage = () => {
  router.push('/faq/list');
};
</script>


<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">FAQ 등록</h1>

    <!-- 관리자 정보 표시 -->
    <div class="text-sm mb-4 text-gray-500">
      로그인한 관리자: <span class="font-semibold">{{ adminName }}</span>
    </div>

    <!-- 에러 메시지 -->
    <div v-if="error" class="text-center text-red-500 mb-4">{{ error }}</div>

    <!-- FAQ 등록 폼 -->
    <div class="max-w-md mx-auto bg-white p-6 rounded shadow-sm">
      <div class="space-y-4">
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700">제목</label>
          <input
              id="title"
              v-model="title"
              type="text"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded"
              placeholder="FAQ 제목"
          />
        </div>

        <div>
          <label for="category" class="block text-sm font-medium text-gray-700">카테고리</label>
          <input
              id="category"
              v-model="category"
              type="text"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded"
              placeholder="FAQ 카테고리"
          />
        </div>

        <div>
          <label for="content" class="block text-sm font-medium text-gray-700">내용</label>
          <textarea
              id="content"
              v-model="content"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded"
              placeholder="FAQ 내용"
              rows="4"
          />
        </div>

        <!-- 버튼들 -->
        <div class="flex justify-between">
          <!-- 등록 버튼 -->
          <button
              @click="submitFAQ"
              :disabled="loading"
              class="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
          >
            등록
          </button>
          <!-- 돌아가기 버튼 -->
          <button
              @click="goToListPage"
              class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            목록으로
          </button>
        </div>
      </div>
    </div>

    <!-- 로딩 중 표시 -->
    <div v-if="loading" class="text-center text-gray-500 mt-4">로딩 중...</div>
  </div>
</template>

<style scoped>
</style>
