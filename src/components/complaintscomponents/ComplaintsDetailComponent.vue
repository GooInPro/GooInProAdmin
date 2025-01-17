<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { detailComplaints, answerComplaints, deleteComplaints } from '../../api/complaintsapi/complaintsAPI.js';

interface ComplaintsDetailDTO {
  cno: number;
  ename: string;
  pname: string;
  cifilename?: string;
  canswer: string;
  ctitle: string;
  ccontent: string;
  ccheckedTime?: string;
  cdelete: boolean;
  cregdate: string;
}

const complaintDetail = ref<ComplaintsDetailDTO | null>(null);
const loading = ref<boolean>(true);
const error = ref<string | null>(null);
const newAnswer = ref<string>('');
const isSubmitting = ref<boolean>(false);
const isDeleting = ref<boolean>(false); // 삭제 상태

const route = useRoute();
const router = useRouter();
const cno = route.params.cno;
const page = route.query.page as string | undefined;

// 날짜/시간을 한국 시간으로 포맷팅하는 함수
const formatDateToKoreanTime = (dateString: string | undefined): string => {
  if (!dateString) return '';

  const date = new Date(dateString);
  const koreanTime = new Date(date.getTime() + (9 * 60 * 60 * 1000)); // UTC에서 9시간 더하기

  return koreanTime.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true, // 24시간제로 표기
  });
};

const fetchComplaintDetail = async () => {
  loading.value = true;
  error.value = null;
  try {
    const data = await detailComplaints(cno);
    complaintDetail.value = data;
  } catch (err) {
    console.error('Failed to fetch complaint detail:', err);
    error.value = '신고 상세 정보를 가져오는 중 오류가 발생했습니다.';
  } finally {
    loading.value = false;
  }
};

const submitAnswer = async () => {
  if (!newAnswer.value.trim()) {
    return;
  }

  isSubmitting.value = true;
  try {
    await answerComplaints(cno, newAnswer.value);
    fetchComplaintDetail();
  } catch (err) {
    console.error('Failed to submit answer:', err);
  } finally {
    isSubmitting.value = false;
  }
};

// 신고 삭제 함수
const deleteComplaint = async () => {
  isDeleting.value = true;
  try {
    await deleteComplaints(cno); // 신고 삭제 API 호출
    goToList(); // 삭제 후 리스트 페이지로 이동
  } catch (err) {
    console.error('Failed to delete complaint:', err);
    error.value = '신고 삭제 중 오류가 발생했습니다.';
  } finally {
    isDeleting.value = false;
  }
};

// 리스트로 돌아가기 함수
const goToList = () => {
  const basePath = '/complaints/list';
  const listType = complaintDetail.value?.canswer ? 'true' : 'false';
  const fullPath = `${basePath}${page ? `?page=${page}` : ''}&status=${listType}`;

  router.push(fullPath);
};

onMounted(fetchComplaintDetail);
</script>

<template>
  <div class="p-6">
    <div v-if="loading" class="text-center text-gray-500">로딩 중...</div>
    <div v-else-if="error" class="text-red-500 text-center">{{ error }}</div>
    <div v-else class="bg-white p-6 rounded shadow">
      <h1 class="text-2xl font-bold mb-4">신고 상세보기</h1>

      <table class="table-auto w-full border-collapse border border-gray-300">
        <tbody>
        <tr>
          <th class="border px-4 py-2 bg-gray-100 text-left">제목</th>
          <td class="border px-4 py-2">{{ complaintDetail?.ctitle }}</td>
        </tr>
        <tr>
          <th class="border px-4 py-2 bg-gray-100 text-left">내용</th>
          <td class="border px-4 py-2">{{ complaintDetail?.ccontent }}</td>
        </tr>
        <tr>
          <th class="border px-4 py-2 bg-gray-100 text-left">고용인</th>
          <td class="border px-4 py-2">{{ complaintDetail?.ename }}</td>
        </tr>
        <tr>
          <th class="border px-4 py-2 bg-gray-100 text-left">근로자</th>
          <td class="border px-4 py-2">{{ complaintDetail?.pname }}</td>
        </tr>
        <tr>
          <th class="border px-4 py-2 bg-gray-100 text-left">답변</th>
          <td class="border px-4 py-2">{{ complaintDetail?.canswer || '미답변' }}</td>
        </tr>
        <tr>
          <th class="border px-4 py-2 bg-gray-100 text-left">답변 시간</th>
          <td class="border px-4 py-2">{{ formatDateToKoreanTime(complaintDetail?.ccheckedTime) || '미답변' }}</td>
        </tr>
        <tr>
          <th class="border px-4 py-2 bg-gray-100 text-left">등록일</th>
          <td class="border px-4 py-2">{{ formatDateToKoreanTime(complaintDetail?.cregdate) }}</td>
        </tr>
        <tr v-if="complaintDetail?.cifilename">
          <th class="border px-4 py-2 bg-gray-100 text-left">첨부 이미지</th>
          <td class="border px-4 py-2">
            <img :src="`${complaintDetail.cifilename}`" alt="첨부 이미지" class="max-w-xs" />
          </td>
        </tr>
        </tbody>
      </table>

      <div v-if="!complaintDetail?.canswer" class="mt-6">
        <h2 class="text-lg font-bold">답변 입력</h2>
        <textarea
            v-model="newAnswer"
            class="w-full p-2 border border-gray-300 rounded mt-2"
            rows="4"
            placeholder="답변을 입력하세요..."
        ></textarea>
        <button
            @click="submitAnswer"
            :disabled="isSubmitting"
            class="mt-4 bg-blue-500 text-white py-2 px-4 rounded disabled:bg-gray-400"
        >
          {{ isSubmitting ? '답변 등록 중...' : '답변 등록' }}
        </button>
      </div>

      <!-- 신고 삭제 버튼 -->
      <button
          @click="deleteComplaint"
          :disabled="isDeleting"
          class="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 disabled:bg-gray-400"
      >
        {{ isDeleting ? '삭제 중...' : '신고 삭제' }}
      </button>

      <!-- 리스트로 돌아가기 버튼 -->
      <button
          @click="goToList"
          class="mt-4 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700"
      >
        리스트로 돌아가기
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>
