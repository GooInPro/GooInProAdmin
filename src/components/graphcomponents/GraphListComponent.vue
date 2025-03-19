<script setup>
import { onMounted, ref } from 'vue'
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js'
import {getCountFComplaints, getCountFQNA, getCountTComplaints, getCountTQNA} from "../../api/graphapi/graphAPI.js";
import {useAdminAuthStore} from "../../stores/adminAuthStore.js";

// Chart.js 구성 요소 등록
Chart.register(DoughnutController, ArcElement, Tooltip, Legend)

const FComplaint = ref(0)
const TComplaint = ref(0)
const FQNA = ref(0)
const TQNA = ref(0)

const adminAuthStore = useAdminAuthStore();

const getAPI = async () => {
  const [resolved, pending] = await Promise.all([
    getCountFComplaints(),
    getCountTComplaints(),
  ])

  const [resolved_qna, pending_qna] = await Promise.all([
    getCountFQNA(),
    getCountTQNA(),
  ])

  FComplaint.value = resolved
  TComplaint.value = pending
  FQNA.value = resolved_qna
  TQNA.value = pending_qna

  // 차트 업데이트
  updateComplaintChart([FComplaint.value, TComplaint.value])
  updateQNAChart([FQNA.value, TQNA.value])
}

// 신고현황 차트 업데이트
const updateComplaintChart = (data) => {
  const ctx = document.getElementById('complaintChart').getContext('2d')
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['답변대기', '답변완료'],
      datasets: [
        {
          data,
          backgroundColor: ['#FF6F61', '#4A90E2'], // Modified colors
          hoverOffset: 4,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      },
    },
  })
}

// QnA 차트 업데이트
const updateQNAChart = (data) => {
  const ctx = document.getElementById('qnaChart').getContext('2d')
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['답변대기', '답변완료'],
      datasets: [
        {
          data,
          backgroundColor: ['#FF6F61', '#4A90E2'], // Modified colors
          hoverOffset: 4,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      },
    },
  })
}

onMounted(() => {
  getAPI()
})
</script>

<template>
  <div class="bg-gray-50 min-h-screen py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Centered main title -->
      <h1 class="text-3xl font-bold text-blue-800 text-center mb-8">GooInPro</h1>

      <div class="grid grid-cols-2 gap-8 mb-8">
        <!-- 신고현황 차트 섹션 -->
        <div class="bg-white shadow rounded-lg p-6 mb-8">
          <h2 class="text-xl font-semibold text-gray-800 text-center mb-4">신고현황</h2>
          <div class="h-96">
            <canvas id="complaintChart" class="w-full h-full max-w-full max-h-full"></canvas>
          </div>
        </div>

        <!-- QnA 답변현황 차트 섹션 -->
        <div class="bg-white shadow rounded-lg p-6 mb-8">
          <h2 class="text-xl font-semibold text-gray-800 text-center mb-4">QnA 답변현황</h2>
          <div class="h-96">
            <canvas id="qnaChart" class="w-full h-full max-w-full max-h-full"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Center the main title */
h1 {
  text-align: center;
  margin-bottom: 2rem;
}
</style>