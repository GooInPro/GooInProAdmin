<script setup>
import { ref, onMounted, onBeforeMount, watch } from "vue";
import { getMessage, sendMessage } from "../../api/chatapi/chatAPI.js";
import Stomp from 'stompjs';
import { useRoute, useRouter } from "vue-router";
import {deletePartChat} from "../../api/chatroomapi/chatRoomAPI.js";

const route = useRoute();
const router = useRouter();

// Props를 별도의 변수로 선언
const roomId = ref(route.params.roomId);
const receiverEmail = ref(route.params.eemail);
const eno = ref(route.params.eno);
const pno = ref(route.params.pno);

const stompClient = ref(null);
const messages = ref([]);
const inputValue = ref('');
const user = 'admin'; // Current user (sender)



const connect = () => {
  const socket = new WebSocket('ws://localhost:8080/ws');
  stompClient.value = Stomp.over(socket);
  stompClient.value.connect({}, () => {
    stompClient.value.subscribe(`/sub/chatroom/${roomId.value}`, (message) => {
      const newMessage = JSON.parse(message.body);
      messages.value.push(newMessage);
    });
  });
};

const disconnect = () => {
  if (stompClient.value) {
    stompClient.value.disconnect();
  }
};

const getMessageMethod = async () => {
  try {
    messages.value = []; // Clear previous messages
    const response = await getMessage(roomId.value);
    if (response && Array.isArray(response)) {
      messages.value = [...response];
    }
  } catch (error) {
    console.error('Error fetching messages:', error);
  }
};

const sendMessageMethod = async () => {
  if (stompClient.value && inputValue.value) {
    const body = {
      sender: user,
      receiver: receiverEmail.value,
      message: inputValue.value,
      timestamp: new Date().toISOString(),
      roomId: String(roomId.value),
    };

    stompClient.value.send('/pub/message', {}, JSON.stringify(body));
    await sendMessage(body);
    inputValue.value = '';
  }
};

onMounted(() => {
  connect();
  getMessageMethod();
});

// Watch for changes in route.params
watch(
    () => route.params,
    (newParams) => {
      roomId.value = newParams.roomId;
      receiverEmail.value = newParams.eemail;
      getMessageMethod(); // Fetch messages for the new room
    },
    {immediate: true}
);

onBeforeMount(() => {
  disconnect();
});

const leaveChatRoom = () => {
  deletePartChat(roomId.value).then((res) => {
    console.log(res);
  });
  disconnect();

  if (route.meta.role === 'employer') {
    router.push('/employer/list');
  } else if (route.meta.role === 'parttimer') {
    router.push('/parttimer/list');
  }
};
</script>

<template>
  <div class="flex items-center justify-center h-screen bg-gray-200">
    <div class="w-2/3 h-2/3 bg-white shadow-lg rounded-lg flex flex-col">
      <div class="flex justify-between items-center p-4 border-b">
        <h2 class="text-xl font-bold">채팅방</h2>
        <button @click="leaveChatRoom"
                class="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600">
          나가기
        </button>
      </div>
      <div class="flex-grow overflow-y-auto p-4">
        <div v-for="(item, index) in messages" :key="index" class="flex mb-4"
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
/* 추가적인 커스텀 스타일을 여기에 작성 */
</style>