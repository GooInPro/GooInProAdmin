<script setup>
import { useAdminAuthStore } from "../../stores/adminAuthStore.js";
import {  onMounted, ref } from "vue";
import { getChatRoomList } from "../../api/chatapi/chatAPI.js";
import {  useRouter } from "vue-router";

const adminAuthStore = useAdminAuthStore();
const admid =  adminAuthStore.adminId;
const data = ref([]);
const router = useRouter();

const getList = async () => {
  await getChatRoomList(admid).then((res) => {
    data.value = res;
    console.log(data.value);
  });
};

const roomClick = (roomId) => {
  // roomId를 사용하여 채팅방으로 이동
  router.push(`/chat/chatting/${roomId}`);
};

onMounted(() => {
  getList();
});
</script>

<template>
  <div class="bg-gray-100 min-h-screen p-6">
    <h1 class="text-3xl font-semibold text-center text-[#3393EA] mb-6">
      채팅방 목록
    </h1>

    <div v-if="data.length === 0" class="text-center text-gray-500">
      채팅방이 없습니다.
    </div>

    <div v-else>
      <ul class="space-y-4">
        <li
            v-for="room in data"
            :key="room.id"
            class="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
        >
          <div class="flex items-center justify-between">
            <!-- room.id를 인자로 전달 -->
            <div class="text-lg font-semibold text-[#3393EA]" @click="roomClick(room.id)">
              {{ room.roomName }}
            </div>
            <div class="text-sm text-gray-500">{{ room.sentAt }}</div>
          </div>
          <div class="mt-2 text-gray-700">
            <span class="font-medium text-[#3393EA]">최근 메시지:</span>
            {{ room.message || "새로운 메시지가 없습니다." }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
/* You can customize styles here if needed */
</style>