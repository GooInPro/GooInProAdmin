<script setup>
import { ref } from 'vue';

// 첫 번째, 두 번째 모달 상태 관리
const isFirstModalOpen = ref(true);
const isSecondModalOpen = ref(false);

// 부모에서 전달받을 props 정의
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  msg: {
    type: String,
    required: true,
  },
  fn: {
    type: Function,
    required: true
  }
});

// emit 정의
const emit = defineEmits(['closeModal']);

// 확인 버튼 클릭 시 실행할 함수
const confirmAction = () => {
  props.fn();
  isFirstModalOpen.value = false;
  isSecondModalOpen.value = true;
};

// 취소 버튼 클릭 시 실행할 함수
const cancelAction = () => {
  isFirstModalOpen.value = false;  // 첫 번째 모달 숨기기
  emit('closeModal', false);
};

// 모달 닫기
const closeModals = () => {
  isSecondModalOpen.value = false;
  isFirstModalOpen.value = false;
  emit('closeModal', false);
};
</script>

<template>
  <div class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-[9999]">
    <!-- 첫 번째 모달: 수정하시겠습니까? -->
    <div v-if="isFirstModalOpen" class="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm mx-auto transition-transform transform-gpu">
      <p class="text-center text-gray-900 text-xl font-bold mb-5 leading-snug">{{ msg }} 하시겠습니까?</p>
      <div class="flex justify-center space-x-3">
        <button
            class="px-5 py-2 bg-gray-200 text-gray-800 text-base font-medium rounded-full hover:bg-gray-300 transition duration-200 shadow focus:outline-none focus:ring focus:ring-gray-300/50"
            @click="cancelAction"
        >
          취소
        </button>
        <button
            class="px-5 py-2 bg-blue-600 text-white text-base font-medium rounded-full hover:bg-blue-500 transition duration-200 shadow focus:outline-none focus:ring focus:ring-blue-600/50"
            @click="confirmAction"
        >
          확인
        </button>
      </div>
    </div>

    <!-- 두 번째 모달: 수정되었습니다 -->
    <div v-if="isSecondModalOpen" class="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm mx-auto transition-transform transform-gpu">
      <p class="text-center text-blue-700 text-xl font-bold mb-5 leading-snug">{{ msg }} 되었습니다.</p>
      <div class="flex justify-center">
        <button
            class="px-5 py-2 bg-blue-600 text-white text-base font-medium rounded-full hover:bg-blue-500 transition duration-200 shadow focus:outline-none focus:ring focus:ring-blue-600/50"
            @click="closeModals"
        >
          확인
        </button>
      </div>
    </div>
  </div>
</template>
