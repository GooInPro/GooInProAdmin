<script setup>
  import {onMounted, ref} from "vue";
  import {deleteEmployer, readEmployer} from "../../api/employerapi/employerAPI.js";
  import {useRoute, useRouter} from "vue-router";
  import CommonCheckModalComponent from "../../common/components/CommonCheckModalComponent.vue";
  import {getEmpChatRoom} from "../../api/chatroomapi/chatRoomAPI.js";

  const route = useRoute();
  const router = useRouter();

  const employer = ref();
  const modalOpen = ref(false);
  const eno = ref('');
  const roomId = ref('');
  const eemail = ref('');

  const deleteClick = () => {

    modalOpen.value = true;
  }

  const deleteFn = () => {

    deleteEmployer(route.params.eno);
  }

  const startChattingClick = () => {
    getEmpChatRoom(eno.value).then((res) => {
        roomId.value = res.rno;
        console.log(roomId.value);
        console.log(eemail.value);
        router.push(`/chat/main/${roomId.value}/${eno.value}/${eemail.value}`);
    })

  }

  onMounted(() => {

    readEmployer(route.params.eno).then((res) => {

          console.log("API 응답:", res); // 확인용
          employer.value = res;
          eno.value = res.eno;
          eemail.value = res.eemail;
        })
        .catch((error) => {

          console.error("API 호출 에러:", error);
        });
  });
</script>

<template>

  <CommonCheckModalComponent
      v-if="modalOpen"
      :fn="deleteFn"
      msg="삭제"
      :is-open="modalOpen"
      @close="modalOpen = false"
      afterPushLink="/employer/list"
  />

  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex justify-center items-start py-10">
    <div class="w-full max-w-5xl bg-white rounded-xl shadow-xl overflow-hidden">
      <!-- 로딩 처리 -->
      <div v-if="!employer" class="p-8 text-center">
        <p class="text-xl font-medium text-gray-500 animate-pulse">
          Loading employer data...
        </p>
      </div>
      <template v-else>
        <!-- 헤더 -->
        <div class="bg-blue-500 text-white px-8 py-6 flex justify-between items-center">
          <h2 class="text-3xl font-bold">Employer Information</h2>
          <span class="text-sm font-medium bg-blue-600 px-3 py-1 rounded-full">
            NO: {{ employer.eno }}
          </span>
        </div>

        <!-- 프로필 섹션 -->
        <div class="p-8 flex items-center border-b border-gray-200 space-x-6">
          <div>
            <h3 class="text-2xl font-semibold text-gray-900">{{ employer.ename }}</h3>
            <p class="text-lg text-gray-500">{{ employer.eemail }}</p>
          </div>
        </div>

        <!-- 상세 정보 섹션 -->
        <div class="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="flex flex-col space-y-2">
            <h4 class="text-sm font-medium text-gray-500">Birthdate</h4>
            <p class="text-lg font-semibold text-gray-900">{{ employer.ebirth }}</p>
          </div>
          <div class="flex flex-col space-y-2">
            <h4 class="text-sm font-medium text-gray-500">Gender</h4>
            <p class="text-lg font-semibold text-gray-900">
              {{ employer.egender ? "Male" : "Female" }}
            </p>
          </div>
          <div class="flex flex-col space-y-2">
            <h4 class="text-sm font-medium text-gray-500">Registration Date</h4>
            <p class="text-lg font-semibold text-gray-900">
              {{ employer.eregdate.split("T")[0] }}
            </p>
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

          <button
              class="px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-400 transition"
              @click="startChattingClick"
          >
            채팅하기
          </button>
        </div>
      </template>
    </div>
  </div>
</template>