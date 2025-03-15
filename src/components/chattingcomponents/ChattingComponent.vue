<script setup>
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import {getChatMessages, outChatRoom} from '../../api/chatapi/chatAPI.js';
import { Client } from '@stomp/stompjs';
import { useAdminAuthStore } from '../../stores/adminAuthStore.js';
import { useRoute } from 'vue-router';
import CommonCheckModalComponent from "../../common/components/CommonCheckModalComponent.vue";

const route = useRoute();
const id = route.params.id; // 채팅방 ID

const adminAuthStore = useAdminAuthStore();
const admid = adminAuthStore.adminId;
// const admid = "qqqq@naver.com"; 다른 사람 채팅 예시

const message = ref([]); // 채팅 메시지 배열
const inputText = ref(""); // 작성 중인 메시지
const sending = ref(false); // 전송 중 여부
const socketRef = ref(null); // STOMP 클라이언트
const messageList = ref(null); // 메시지 목록 DOM 요소 참조

const modalOpen = ref(false); // 나가기 모달 상태

const getMessage = async () => {
  await getChatMessages(id).then((response) => {
    message.value = response.reverse(); // 메시지를 뒤집어서 최신 메시지가 위로 오도록 처리
    nextTick(() => scrollToTop());
  });
};

const client = new Client({
  brokerURL: `${import.meta.env.VITE_CHAT_SOCKET}`,
  onConnect: () => {
    console.log("STOMP Connected!");
    socketRef.value = client;

    client.subscribe(`/topic/chat/${id}`, (message) => {
      const newMessage = JSON.parse(message.body);
      console.log("새로운 메시지:", newMessage);
      message.value.push(newMessage); // 새로운 메시지는 배열의 앞부분에 추가
    });
  },
  onDisconnect: () => {
    console.log("STOMP Disconnected!");
  },
});

const sendMessage = () => {
  if (sending.value || !inputText.value.trim()) return;

  sending.value = true;

  if (socketRef.value && socketRef.value.connected) {
    const msg = {roomId: id, message: inputText.value, senderEmail: admid};

    socketRef.value.publish({
      destination: `/app/chat.sendMessage`,
      body: JSON.stringify(msg),
    });

    console.log("메시지 전송:", msg);
    message.value.push(msg); // 전송한 메시지도 배열 앞부분에 추가
    inputText.value = "";
    nextTick(() => scrollToTop());
  } else {
    console.log("STOMP 연결 실패");
  }

  sending.value = false;
};

const handleOutClick = () => {
  modalOpen.value = true;
}

const leaveRoomFn = () => {

  const dto = {email: admid, roomId: id};

  outChatRoom(dto)
};

const scrollToTop = () => {
  nextTick(() => {
    if (messageList.value) {
      messageList.value.scrollTop = messageList.value.scrollHeight;
    }
  });
};


watch(message, () => {
  nextTick(() => scrollToTop());
});

onMounted(() => {
  console.log("STOMP Mounted!");
  getMessage();
  client.activate();
});

onUnmounted(() => {
  client.deactivate();
});
</script>

<template>

  <CommonCheckModalComponent
      v-if="modalOpen"
      :fn="leaveRoomFn"
      msg="채팅방 퇴장 "
      :is-open="modalOpen"
      @close="modalOpen = false"
      afterPushLink="/chat"
  />

  <div class="flex flex-col h-screen bg-gray-100">
    <!-- 채팅 헤더 -->
    <div class="flex justify-between items-center bg-blue-500 text-white p-4">
      <span class="text-lg font-semibold">채팅방 이름</span>
      <button @click="handleOutClick" class="text-sm bg-transparent border-none text-white hover:underline">
        채팅방 나가기
      </button>
    </div>

    <!-- 메시지 목록 (스크롤 자동 조정) -->
    <div ref="messageList" class="flex-1 overflow-y-auto p-4 space-y-4">
      <ul>
        <li v-for="(msg, index) in message" :key="index" class="flex flex-col">
          <div
              :class="{'bg-blue-500 text-white self-end': msg.senderEmail === admid, 'bg-gray-300 text-black self-start': msg.senderEmail !== admid}"
              class="p-3 rounded-lg max-w-xs mb-2">
            <span>{{ msg.message }}</span>
          </div>
        </li>
      </ul>
    </div>

    <!-- 메시지 입력창 -->
    <div class="flex items-center p-4 bg-white border-t border-gray-300">
      <input
          v-model="inputText"
          type="text"
          placeholder="메시지를 입력하세요..."
          @keydown.enter="sendMessage"
          class="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button @click="sendMessage"
              class="ml-4 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none">
        전송
      </button>
    </div>
  </div>
</template>

<style scoped>
/* 추가 스타일 필요 시 이곳에 작성 */
</style>