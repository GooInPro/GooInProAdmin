<script setup>

import {onBeforeMount, onMounted, ref} from "vue";
import {getMessage, sendMessage} from "../../api/chatapi/chatAPI.js";
import Stomp from 'stompjs';

const stompClient = ref(null);
const messages = ref([]);
const inputValue = ref('');

const user = 'admin'; // Current user (sender)
const roomId = '23'; // Room ID
const receiver = 'user1'; // Example receiver name


const connect = () => {
  const socket = new WebSocket('ws://localhost:8080/ws');
  stompClient.value = Stomp.over(socket);
  stompClient.value.connect({}, () => {
    stompClient.value.subscribe(`/sub/chatroom/${roomId}`, (message) => {
      const newMessage = JSON.parse(message.body);
      messages.value.push(newMessage);
    });
  });
};

// 웹소켓 연결 해제
const disconnect = () => {
  if (stompClient.value) {
    stompClient.value.disconnect();
  }
};

const getMessageMethod = async () => {
  await getMessage(user, receiver).then(response => {
    console.log(response);
    if (response && Array.isArray(response)) {
      for (let i = 0; i < response.length; i++) {
        messages.value.push(response[i]);
      }
    }
  });
}

const sendMessageMethod = async () => {
  if (stompClient.value && inputValue.value) {
    const body = {
      sender: user,
      receiver: receiver,
      message: inputValue.value,
      timestamp: new Date().toISOString(),
      roomId: String(roomId),
    };

    stompClient.value.send('/pub/message', {}, JSON.stringify(body));
    await sendMessage(body);
    inputValue.value = '';
  }
};


onMounted(() => {
  connect();
  getMessageMethod();
})

onBeforeMount(() => {
  disconnect();
})

</script>

<template>
  <div class="flex items-center justify-center h-screen bg-gray-200">
    <div class="w-2/3 h-2/3 bg-white shadow-lg rounded-lg flex flex-col">
      <!-- 메시지 리스트 출력 -->
      <div class="flex-grow overflow-y-auto p-4">
        <div v-for="(item) in messages" :key="item.id"
             class="flex mb-4"
             :class="{'justify-start': item.sender !== user, 'justify-end': item.sender === user}">
          <div class="max-w-xs">
            <div class="text-sm text-gray-500 mb-1" :class="{'text-right': item.sender === user}">
              {{ item.sender }}
            </div>
            <div class="p-3 rounded-lg"
                 :class="{'bg-blue-500 text-white': item.sender === user, 'bg-gray-300': item.sender !== user}">
              {{ item.message }}
            </div>
            <div class="text-xs text-gray-400 mt-1" :class="{'text-right': item.sender === user}">
              {{ new Date(item.timestamp).toLocaleTimeString() }}
            </div>
          </div>
        </div>
      </div>

      <!-- 입력 필드 -->
      <div class="p-4 flex items-center">
        <input v-model="inputValue" type="text" placeholder="메시지를 입력하세요"
               class="flex-grow p-2 rounded-full border border-gray-300 mr-4 focus:outline-none focus:ring focus:border-blue-300">
        <button @click="sendMessageMethod"
                class="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
          입력
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 추가적인 커스텀 스타일을 원할 경우 여기에 작성 */
</style>