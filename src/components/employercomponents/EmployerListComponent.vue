<script setup>
import {onMounted, ref, watch} from "vue";
  import {countEmployer, getEmployerList} from "../../api/employerapi/employerAPI.js";
  import {useRoute, useRouter} from "vue-router";

  const employers = ref([]);
  const pageNumList = ref([]);
  const currentPage = ref(1);
  const searchName = ref('');
  const totalCount = ref(0);
  const searchQuery = ref('');
  const route = useRoute();
  const router = useRouter();


  const linkClick = (eno) => {

    router.push({path: `/employer/read/${eno}`})
  }

  const changePage = (page) => {

    router.push({ query: { ...route.query, page } });

    getEmployerList(page).then((res) => {

      employers.value = res.dtoList;
      currentPage.value = page;
    })
  }

  watch(() => searchQuery.value, (newSearchQuery) => {

    if (newSearchQuery || searchQuery.value.length === 0) {

      currentPage.value = 1;

      getEmployerList(currentPage.value, searchQuery.value).then((res) => {

        employers.value = res.dtoList;
        pageNumList.value = res.pageNumList;
      })
    }
  })

  // API 호출 후 데이터를 받아옴
  onMounted(() => {

    getEmployerList(1, searchName.value).then((res) => {

      employers.value = res.dtoList;  // 받은 데이터에서 dtoList만 추출
      pageNumList.value = res.pageNumList;
      console.log(employers.value); // 콘솔로 데이터 확인
    });

    countEmployer().then((res) => {

      totalCount.value = res;
    })
  });
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-semibold mb-4">고용인 리스트</h1>

    <!-- 검색 입력 부분 (검색 기능은 사용자 구현) -->
    <div class="flex mb-4 gap-4">
      <div class="flex-1">
        <input
            v-model="searchQuery"
            type="text"
            placeholder="이름 검색"
            class="w-full px-4 py-2 border border-gray-300 rounded"
        />
      </div>
    </div>
    <!-- 고용인 수 표시 -->
    <div class="mb-4">
      <strong>총 고용인 수: </strong>{{ totalCount }}
    </div>

    <!-- 테이블 -->
    <div class="overflow-x-auto p-4">
      <table class="table-fixed w-full leading-normal border border-gray-300 rounded-lg shadow-lg">
        <!-- 테이블 헤더 -->
        <thead class="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <tr class="text-sm font-semibold text-left uppercase tracking-wide">
          <th class="px-5 py-3 text-center">번호</th>
          <th class="px-5 py-3 text-center">이름</th>
          <th class="px-5 py-3 text-center">성별</th>
        </tr>
        </thead>

        <!-- 테이블 바디 -->
        <tbody class="bg-white">
        <!-- 데이터가 있을 때 렌더링 -->
        <tr
            v-for="employer in employers"
            :key="employer.eno"
            class="hover:bg-gray-100 border-b border-gray-200"
            @click="() => linkClick(employer.eno)"
        >
          <td
              v-for="(value, key) in employer"
              :key="key"
              class="px-5 py-4 text-sm text-center"
          >
            <!-- egender일 때 조건 적용 -->
            {{ key === 'egender' ? (value ? 'Male' : 'Female') : value }}
          </td>
        </tr>

        <!-- 데이터가 없을 경우 -->
        <tr v-if="employers.length === 0">
          <td colspan="3" class="text-center py-4 text-gray-500">데이터가 없습니다.</td>
        </tr>
        </tbody>

        <!-- 페이지네이션을 위한 푸터 -->
        <tfoot>
        <tr>
          <td colspan="3">
            <div class="flex justify-center items-center py-4">
              <!-- 페이지 번호 -->
              <div class="flex items-center space-x-2">
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
