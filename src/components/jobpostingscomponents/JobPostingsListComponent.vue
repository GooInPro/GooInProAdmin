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
  const searchQuery = ref('');

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


  watch(() => searchQuery.value, (newSearchQuery) => {

    if(newSearchQuery || searchQuery.value.length === 0) {

      currentPage.value = 1;

      getJobPostingsList(eno.value, currentPage.value, searchQuery.value).then((res) => {

        jobPostings.value = res.dtoList;
        pageNumList.value = res.pageNumList;
      })
    }
  })

  // eno prop의 변경을 감지하여 데이터 업데이트
  watch(() => props.eno, (newEno) => {

    eno.value = newEno;

    getJobPostingsList(eno.value, currentPage.value, searchQuery.value).then((res) => {

      jobPostings.value = res.dtoList;
      pageNumList.value = res.pageNumList;
      currentPage.value = 1; // 첫 번째 페이지로 설정
    });
  });

  onMounted(() => {

    eno.value = props.eno;

    getJobPostingsList(eno.value, currentPage.value, searchQuery.value).then((res) => {

      jobPostings.value = res.dtoList;
      pageNumList.value = res.pageNumList;
      console.log(jobPostings.value);
    })
  })

</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-semibold mb-6 text-gray-800">근로자 리스트</h1>

    <!-- 검색 입력 -->
    <div class="mb-6">
      <input
          v-model="searchQuery"
          type="text"
          placeholder="검색어를 입력하세요"
          class="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>

    <!-- 테이블 -->
    <div class="overflow-x-auto p-4 bg-gray-50 rounded-lg shadow-lg">
      <table class="table-auto w-full text-left border-collapse border border-gray-200">
        <!-- 테이블 헤더 -->
        <thead>
        <tr class="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-sm">
          <th class="px-6 py-3 border-b border-gray-300 text-center">번호</th>
          <th class="px-6 py-3 border-b border-gray-300 text-center">고용인 이름</th>
          <th class="px-6 py-3 border-b border-gray-300 text-center">공고 이름</th>
          <th class="px-6 py-3 border-b border-gray-300 text-center">등록 시간</th>
          <th class="px-6 py-3 border-b border-gray-300 text-center">시급</th>
        </tr>
        </thead>

        <!-- 테이블 바디 -->
        <tbody>
        <!-- 데이터가 있을 때 -->
        <tr
            v-for="jobPosting in jobPostings"
            :key="jobPosting.jpno"
            class="hover:bg-gray-100 transition-colors duration-150 border-b border-gray-200"
            @click="() => linkClick(jobPosting.jpno)"
        >
          <td
              v-for="(value, key) in jobPosting"
              :key="key"
              class="px-6 py-4 text-sm text-center text-gray-700"
          >
            {{ key === 'jpregdate' ? formatDate(value) : value }}
          </td>
        </tr>

        <!-- 데이터가 없을 때 -->
        <tr v-if="jobPostings.length === 0">
          <td colspan="5" class="text-center py-6 text-gray-500">데이터가 없습니다.</td>
        </tr>
        </tbody>

        <!-- 테이블 푸터 (페이지네이션) -->
        <tfoot>
        <tr>
          <td colspan="5" class="py-4">
            <div class="flex justify-center items-center">
              <div class="flex space-x-2">
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
  </div>

</template>

<style scoped>

</style>