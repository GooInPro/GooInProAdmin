<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getAdminList } from '../../api/adminAPI/adminAPI';

const router = useRouter();
const route = useRoute();

const admins = ref([]);
const loading = ref(true);
const error = ref(null);

const size = ref(10);
const totalCount = ref(0);
const page = ref(Number(route.query.page) || 1);

// 권한 매핑 객체
const roleMapping = {
  '관리자 전체': '',
  '슈퍼관리자': 'ROLE_SUPER',
  '고객관리자': 'ROLE_CS',
  '등록관리자': 'ROLE_GATE'
}

// 검색 관련 상태
const searchType = ref('i'); // 'i': 아이디, 'n': 이름
const searchKeyword = ref('');
const roleFilter = ref('관리자 전체');

// 검색 타입 변경 함수
const changeSearchType = (type) => {
  searchType.value = type;
  searchKeyword.value = ''; // 검색어 초기화
};

// 리스트 조회 함수
const fetchAdminList = async () => {
  try {
    loading.value = true;
    let types = searchType.value;
    let keyword = searchKeyword.value;

    // 권한 필터링 처리
    if (roleFilter.value !== '관리자 전체') {
      if (searchKeyword.value) {
        // 검색어가 있는 경우: 기존 검색 타입 + 권한 검색
        types = searchType.value + 'r';
        keyword = searchKeyword.value + ',' + roleMapping[roleFilter.value];
      } else {
        // 검색어가 없는 경우: 권한 검색만
        types = 'r';
        keyword = roleMapping[roleFilter.value];
      }
    }

    console.log('검색 조건:', { types, keyword }); // 디버깅용
    const response = await getAdminList(page.value, types, keyword);
    admins.value = response.dtoList;
    totalCount.value = response.totalCount;
  } catch (err) {
    error.value = '관리자 리스트를 불러오는 데 실패했습니다.';
  } finally {
    loading.value = false;
  }
};

// 상세페이지 이동
const handleDetail = (admno) => {
  router.push({ path: `/admin/detail/${admno}`, query: { page: page.value } });
};

// 페이지 변경 함수
const changePage = (pageNumber) => {
  if (page.value !== pageNumber) {
    page.value = pageNumber;
    router.push({ query: { ...route.query, page: pageNumber } });
    fetchAdminList();
  }
};

// 총 페이지 계산
const totalPages = ref(1);
watch([totalCount, size], () => {
  totalPages.value = Math.ceil(totalCount.value / size.value);
});

// URL 변경 감지 및 페이지 초기화
watch(
    () => route.query.page,
    (newPage) => {
      const pageNumber = Number(newPage) || 1;
      if (page.value !== pageNumber) {
        page.value = pageNumber;
        fetchAdminList();
      }
    }
);

// 검색어 변경 시 리스트를 다시 불러옴
watch([searchKeyword, roleFilter], () => {
  page.value = 1;  // 검색 시 첫 페이지부터 시작
  fetchAdminList();
});

onMounted(fetchAdminList);

// 날짜 포맷팅 함수
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Seoul',
  }).format(date);
};
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-semibold mb-4">관리자 리스트</h1>

    <!-- 검색 영역 -->
    <div class="space-y-4 mb-6">
      <!-- 아이디/이름 검색 -->
      <div class="flex gap-4">
        <div class="flex gap-2">
          <button
              @click="changeSearchType('i')"
              class="px-4 py-2 rounded transition-colors duration-150"
              :class="searchType === 'i'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'"
          >
            아이디
          </button>
          <button
              @click="changeSearchType('n')"
              class="px-4 py-2 rounded transition-colors duration-150"
              :class="searchType === 'n'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'"
          >
            이름
          </button>
        </div>
        <input
            v-model="searchKeyword"
            type="text"
            :placeholder="searchType === 'i' ? '아이디 검색' : '이름 검색'"
            class="flex-1 px-4 py-2 border border-gray-300 rounded"
        />
      </div>

      <!-- 권한 필터 -->
      <div class="flex gap-2">
        <button
            v-for="role in Object.keys(roleMapping)"
            :key="role"
            @click="roleFilter = role"
            class="px-4 py-2 rounded transition-colors duration-150"
            :class="roleFilter === role
        ? 'bg-blue-500 text-white'
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'"
        >
          {{ role }}
        </button>
        <button
            @click="router.push('/admin/register')"
            class="ml-auto px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          관리자 등록
        </button>
      </div>
    </div>

    <div v-if="loading" class="text-lg">로딩 중...</div>
    <div v-if="error" class="text-red-500 font-semibold">{{ error }}</div>

    <div v-if="!loading && !error" class="mb-4">
      <strong>총 관리자 수: </strong>{{ totalCount }}
    </div>

    <table v-if="!loading && !error" class="min-w-full table-auto border-collapse border border-gray-200">
      <thead class="bg-gray-100">
      <tr>
        <th class="px-4 py-2 border-b">아이디</th>
        <th class="px-4 py-2 border-b">이름</th>
        <th class="px-4 py-2 border-b">권한</th>
        <th class="px-4 py-2 border-b">등록일</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="admin in admins" :key="admin.admno" class="hover:bg-gray-50 cursor-pointer"
          @click="handleDetail(admin.admno)">
        <td class="px-4 py-2 border-b">{{ admin.admid }}</td>
        <td class="px-4 py-2 border-b">{{ admin.admname }}</td>
        <td class="px-4 py-2 border-b">{{ admin.admrole }}</td>
        <td class="px-4 py-2 border-b">{{ formatDate(admin.admregdate) }}</td>
      </tr>
      </tbody>
    </table>

    <!-- 페이지네이션 -->
    <div v-if="!loading && !error" class="mt-4 flex justify-center gap-2">
      <button
          v-if="page > 1"
          @click="changePage(page - 1)"
          class="px-4 py-2 rounded text-white bg-gray-300 hover:bg-gray-400"
      >
        이전
      </button>

      <button
          v-for="pageNumber in totalPages"
          :key="pageNumber"
          @click="changePage(pageNumber)"
          class="px-4 py-2 rounded text-white"
          :class="pageNumber === page ? 'bg-blue-500' : 'bg-gray-300 hover:bg-gray-400'"
      >
        {{ pageNumber }}
      </button>

      <button
          v-if="page < totalPages"
          @click="changePage(page + 1)"
          class="px-4 py-2 rounded text-white bg-gray-300 hover:bg-gray-400"
      >
        다음
      </button>
    </div>
  </div>
</template>
