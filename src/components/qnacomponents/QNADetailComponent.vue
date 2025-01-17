<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAdminAuthStore } from '../../stores/adminAuthStore.js';
import { detailQNA, deleteQNA, answerQNA } from '../../api/qnaapi/qnaAPI.js';

interface QNADetailDTO {
  qno: number;
  qtitle: string;
  qcontent: string;
  qanswer: string | null;
  pname: string;
  admname: string;
  qstatus: boolean;
  qregdate: string;
  qmoddate: string | null;
}

const route = useRoute();
const router = useRouter();

const qno = route.params.qno as string;
const qnaDetail = ref<QNADetailDTO | null>(null);
const newAnswer = ref<string>('');

const adminAuthStore = useAdminAuthStore(); // 관리자 인증 스토어 가져오기
const adminNo = ref(adminAuthStore.adminNo); // 관리자 번호
const adminName = ref(adminAuthStore.adminName); // 관리자 이름

const fetchQnaDetail = async () => {
  try {
    const response = await detailQNA(qno);
    qnaDetail.value = response;
  } catch (error) {
    console.error('Error fetching QNA detail:', error);
  }
};

const goBack = () => {
  const page = route.query.page || 1;
  const statusQuery = route.query.status || 'false';
  router.push({ path: '/qna/list', query: { page, status: statusQuery } });
};


const deleteQna = async () => {
  try {
    await deleteQNA(qno);
    goBack();
  } catch (error) {
    console.error('Error deleting QNA:', error);
  }
};

const submitAnswer = async () => {
  if (newAnswer.value.trim() === '') {
    return;
  }

  try {
    const answerAdmin = {
      qanswer: newAnswer.value,
      admno: adminNo.value,
    };
    await answerQNA(qno, answerAdmin);
    qnaDetail.value!.qanswer = newAnswer.value;
    newAnswer.value = '';
  } catch (error) {
    console.error('Error submitting answer:', error);
  }
};

onMounted(() => {
  fetchQnaDetail();
});
</script>




<template>
  <div class="container mx-auto p-4">
    <div v-if="qnaDetail" class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-semibold text-gray-700 mb-4">{{ qnaDetail.qtitle }}</h2>
      <p class="text-sm text-gray-500 mb-2">등록일: {{ qnaDetail.qregdate }}</p>
      <p class="text-sm text-gray-500 mb-4">수정일: {{ qnaDetail.qmoddate || '없음' }}</p>

      <div class="mb-4">
        <h3 class="text-xl font-semibold text-gray-600">문의자: {{ qnaDetail.pname }}</h3>
        <p class="text-gray-600">관리자: {{ adminName }}</p>
      </div>

      <div class="mb-4">
        <h3 class="text-xl font-semibold text-gray-600">Q&A 내용</h3>
        <p class="text-gray-700">{{ qnaDetail.qcontent }}</p>
      </div>

      <div v-if="!qnaDetail.qanswer" class="mt-4">
        <h3 class="text-xl font-semibold text-gray-600">답변 작성</h3>
        <textarea
            v-model="newAnswer"
            class="w-full p-2 border border-gray-300 rounded-lg mb-4"
            rows="4"
            placeholder="답변을 입력하세요."
        ></textarea>
        <button
            @click="submitAnswer"
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition mt-4"
        >
          답변 추가
        </button>
      </div>

      <div v-else class="mt-4">
        <h3 class="text-xl font-semibold text-gray-600">답변</h3>
        <p class="text-gray-700">{{ qnaDetail.qanswer }}</p>
      </div>

      <div class="flex space-x-4 justify-end mt-4">
        <button
            @click="goBack"
            class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
        >
          돌아가기
        </button>
        <button
            @click="deleteQna"
            class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          삭제
        </button>
      </div>
    </div>

    <div v-else class="text-center">
      <p class="text-xl text-gray-500">상세 정보를 로딩 중...</p>
    </div>
  </div>
</template>



<style scoped>
</style>



