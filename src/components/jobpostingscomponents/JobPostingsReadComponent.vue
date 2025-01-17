<script setup>

  import {onMounted, ref} from "vue";
  import {deleteJobPosting, readJobPosting} from "../../api/jobpostingsapi/jobPostingsAPI.js";
  import {useRoute} from "vue-router";
  import CommonCheckModalComponent from "../../common/components/CommonCheckModalComponent.vue";

  const route = useRoute();

  const jobPosting = ref({});
  const modalOpen = ref(false);

  const formatDate = (isoString) => {
    if (!isoString) return "-";

    const date = new Date(isoString);
    if (isNaN(date)) return "유효하지 않은 날짜";

    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date);
  };

  const deleteClick = () => {

    modalOpen.value = true;
  }

  const deleteFn = () => {

    deleteJobPosting(route.params.jpno);
  }

  onMounted(() => {

    readJobPosting(route.params.jpno).then((res) => {

      jobPosting.value = res;
      console.log(jobPosting.value);
    })
  })

</script>

<template>
  <CommonCheckModalComponent
      v-if="modalOpen"
      :fn="deleteFn"
      msg="삭제"
      :is-open="modalOpen"
      @close="modalOpen = false"
      afterPushLink="/jobPostings/list"
  />

  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex justify-center items-start py-10">
    <div class="w-full max-w-5xl bg-white rounded-xl shadow-xl overflow-hidden">
      <!-- 로딩 처리 -->
      <div v-if="!jobPosting" class="p-8 text-center">
        <p class="text-xl font-medium text-gray-500 animate-pulse">
          Loading JobPosting data...
        </p>
      </div>

      <template v-else>
        <!-- 헤더 -->
        <div class="bg-blue-500 text-white px-8 py-6 flex justify-between items-center">
          <h2 class="text-3xl font-bold">JobPosting Information</h2>
          <span class="text-sm font-medium bg-blue-600 px-3 py-1 rounded-full">
            NO: {{ jobPosting.jpno }}
          </span>
        </div>

        <!-- 프로필 섹션 -->
        <div class="p-8 border-b border-gray-200">
          <h3 class="text-2xl font-semibold text-gray-900">{{ jobPosting.jpname }}</h3>
          <p class="text-lg text-gray-500">{{ jobPosting.ename }}</p>
        </div>

        <!-- 상세 정보 섹션 -->
        <div class="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="flex flex-col space-y-2">
            <h4 class="text-sm font-medium text-gray-500">Content</h4>
            <p class="text-lg font-semibold text-gray-900">{{ jobPosting.jpcontent }}</p>
          </div>

          <div class="flex flex-col space-y-2">
            <h4 class="text-sm font-medium text-gray-500">Hourly Rate</h4>
            <p class="text-lg font-semibold text-gray-900">{{ jobPosting.jphourlyRate }}</p>
          </div>

          <div class="flex flex-col space-y-2">
            <h4 class="text-sm font-medium text-gray-500">RegDate</h4>
            <p class="text-lg font-semibold text-gray-900">{{ formatDate(jobPosting.jpregdate) }}</p>
          </div>

          <div class="flex flex-col space-y-2">
            <h4 class="text-sm font-medium text-gray-500">EndDate</h4>
            <p class="text-lg font-semibold text-gray-900">{{ formatDate(jobPosting.jpenddate) }}</p>
          </div>

          <div class="flex flex-col space-y-2">
            <h4 class="text-sm font-medium text-gray-500">Work Days</h4>
            <p class="text-lg font-semibold text-gray-900">{{ jobPosting.jpworkDays }}</p>
          </div>

          <div class="flex flex-col space-y-2">
            <h4 class="text-sm font-medium text-gray-500">Min Duration</h4>
            <p class="text-lg font-semibold text-gray-900">{{ jobPosting.jpminDuration }}</p>
          </div>

          <div class="flex flex-col space-y-2">
            <h4 class="text-sm font-medium text-gray-500">Max Duration</h4>
            <p class="text-lg font-semibold text-gray-900">{{ jobPosting.jpmaxDuration }}</p>
          </div>

          <div class="flex flex-col space-y-2">
            <h4 class="text-sm font-medium text-gray-500">Start Time</h4>
            <p class="text-lg font-semibold text-gray-900">{{ jobPosting.jpworkStartTime }}</p>
          </div>

          <div class="flex flex-col space-y-2">
            <h4 class="text-sm font-medium text-gray-500">End Time</h4>
            <p class="text-lg font-semibold text-gray-900">{{ jobPosting.jpworkEndTime }}</p>
          </div>

          <div class="flex flex-col space-y-2">
            <h4 class="text-sm font-medium text-gray-500">Vacancies</h4>
            <p class="text-lg font-semibold text-gray-900">{{ jobPosting.jpvacancies }}</p>
          </div>
        </div>

        <!-- 하단 버튼 -->
        <div class="bg-gray-50 px-8 py-6 flex justify-end space-x-4">
          <button
              class="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-400 transition"
              @click="deleteClick"
          >
            Delete
          </button>
        </div>
      </template>
    </div>
  </div>
</template>


<style scoped>

</style>