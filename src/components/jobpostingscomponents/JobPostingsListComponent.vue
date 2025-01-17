<script setup>

import {onMounted, ref, watch} from "vue";
  import {getJobPostingsList} from "../../api/jobpostingsapi/jobPostingsAPI.js";
  import {useRoute, useRouter} from "vue-router";

  const props = defineProps({

    eno: {
      type: Number,
      required: true
    }
  })

  const formatDate = (isoString) => {
    if (!isoString) return "유효하지 않은 날짜";

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

  const jobPostings = ref([]);
  const eno = ref(0);

  const pageNumList = ref([]);
  const currentPage = ref(1);
  const searchName = ref('');
  const route = useRoute();
  const router = useRouter();


  const linkClick = (jpno) => {

    router.push({path: `/jobPostings/read/${jpno}`})
  }

  const changePage = (page) => {

    router.push({ query: { ...route.query, page } });

    getJobPostingsList(eno.value, page).then((res) => {

      jobPostings.value = res.dtoList;
      currentPage.value = page;
    })
  }


  // eno prop의 변경을 감지하여 데이터 업데이트
  watch(() => props.eno, (newEno) => {

    eno.value = newEno;

    getJobPostingsList(eno.value, currentPage.value, searchName.value).then((res) => {

      jobPostings.value = res.dtoList;
      pageNumList.value = res.pageNumList;
      currentPage.value = 1; // 첫 번째 페이지로 설정
    });
  });

  onMounted(() => {

    eno.value = props.eno;

    getJobPostingsList(eno.value, currentPage.value, searchName.value).then((res) => {

      jobPostings.value = res.dtoList;
      pageNumList.value = res.pageNumList;
      console.log(jobPostings.value);
    })
  })

</script>

<template>
  <div class="overflow-x-auto p-4">
    <table class="table-fixed w-full leading-normal border border-gray-300 rounded-lg shadow-lg">
      <!-- 테이블 헤더 -->
      <thead class="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
      <tr class="text-sm font-semibold text-left uppercase tracking-wide">
        <th class="px-5 py-3 text-center">번호</th>
        <th class="px-5 py-3 text-center">고용인 이름</th>
        <th class="px-5 py-3 text-center">공고 이름</th>
        <th class="px-5 py-3 text-center">등록 시간</th>
        <th class="px-5 py-3 text-center">시급</th>
      </tr>
      </thead>

      <!-- 테이블 바디 -->
      <tbody class="bg-white">
      <!-- 데이터가 있을 때 렌더링 -->
      <tr
          v-for="jobPosting in jobPostings"
          :key="jobPosting.jpno"
          class="hover:bg-gray-100 border-b border-gray-200"
          @click="() => linkClick(jobPosting.jpno)"
      >
        <td
            v-for="(value, key) in jobPosting"
            :key="key"
            class="px-5 py-4 text-sm text-center"
        >
          {{ key === 'jpregdate' ? formatDate(value) : value }}
        </td>
      </tr>


      <!-- 데이터가 없을 경우 -->
      <tr v-if="jobPostings.length === 0">
        <td colspan="3" class="text-center py-4 text-gray-500">데이터가 없습니다.</td>
      </tr>
      </tbody>

      <!-- 페이지네이션을 위한 푸터 -->
      <tfoot>
      <tr>
        <td colspan="5">
          <div class="flex justify-center items-center py-4">
            <!-- 페이지 번호 -->
            <div class="flex items-center space-x-2">
              <!-- 페이지 번호 버튼 -->
              <button
                  v-for="page in pageNumList"
                  :key="page"
                  class="px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ease-in-out"
                  :class="{
                'bg-blue-500 text-white': page === currentPage,
                'bg-white text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white': page !== currentPage
              }"
                  @click="changePage(page)"
              >
                {{ page }}
              </button>
            </div>
          </div>
        </td>
      </tr>
      </tfoot>
    </table>
  </div>
</template>

<style scoped>

</style>