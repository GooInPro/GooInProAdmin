<script setup>
import { useAdminAuthStore } from "../../stores/adminAuthStore.js";
import { onMounted, ref } from "vue";
import { getChatRoomList } from "../../api/chatapi/chatAPI.js";
import { useRouter } from "vue-router";

const adminAuthStore = useAdminAuthStore();
const admid = adminAuthStore.adminId;
const data = ref([]);
const filterData = ref([]);  // 필터링된 데이터 배열
const router = useRouter();
const activeFilter = ref('employer'); // 'employer' or 'parttimer'

// 채팅방 목록을 가져오는 함수
const getList = async () => {
  await getChatRoomList(admid).then((res) => {
    data.value = res;
    filterData.value = res.filter((room) => room.roomName.includes('employer')); // 처음에 전체 데이터를 표시
    console.log(data.value);
  });
};

// 채팅방 클릭 시 해당 채팅방으로 이동
const roomClick = (roomId) => {
  router.push(`/chat/chatting/${roomId}`);
};

// employer 채팅방만 필터링
const empChatList = () => {
  filterData.value = data.value.filter((room) => room.roomName.includes('employer'));
  activeFilter.value = 'employer';
};

// parttimer 채팅방만 필터링
const partChatList = () => {
  filterData.value = data.value.filter((room) => room.roomName.includes('parttimer'));
  activeFilter.value = 'parttimer';
};

// 컴포넌트 마운트 시 채팅방 목록 가져오기
onMounted(() => {
  getList();
});
</script>

<template>
  <div class="bg-gray-100 min-h-screen p-6">
    <h1 class="text-3xl font-semibold text-center text-[#3393EA] mb-6">
      채팅방 목록
    </h1>

    <div class="flex justify-center mb-6">
      <!-- employer, parttimer 버튼 추가 -->
      <button
          @click="empChatList"
          class="px-4 py-2 rounded mr-4 hover:bg-blue-600"
          :class="{'bg-blue-500 text-white': activeFilter === 'employer', 'bg-gray-200': activeFilter !== 'employer'}"
      >
        Employer 채팅방
      </button>
      <button
          @click="partChatList"
          class="px-4 py-2 rounded hover:bg-green-600"
          :class="{'bg-green-500 text-white': activeFilter === 'parttimer', 'bg-gray-200': activeFilter !== 'parttimer'}"
      >
        Part Timer 채팅방
      </button>
    </div>

    <div v-if="filterData.length === 0" class="text-center text-gray-500">
      채팅방이 없습니다.
    </div>

    <div v-else>
      <ul class="space-y-4">
        <li
            v-for="room in filterData"
            :key="room.id"
            class="p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out border border-gray-300 hover:bg-gray-50"
            :class="{'bg-blue-100': room.roomName.includes('employer'), 'bg-green-100': room.roomName.includes('parttimer')}"
        >
          <div class="flex items-center justify-between">
            <!-- "채팅방 이름:" 텍스트는 검정색, room.roomName은 파란색으로 표시 -->
            <div class="text-lg font-semibold text-black">
              채팅방 이름:
              <span class="text-[#3393EA] cursor-pointer hover:text-blue-600" @click="roomClick(room.id)">
                {{ room.roomName }}
              </span>
            </div>
          </div>
          <!-- 마지막 메시지 내용 -->
          <div class="mt-2 text-gray-700 text-sm">
            {{ room.message }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
/* 스타일 추가 가능 */
</style>