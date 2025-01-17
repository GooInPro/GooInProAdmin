<script setup>

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  msg: {
    type: String,
    required: true,
  }
});

const emit = defineEmits(['closeModal']);

const closeModal = () => {
  emit('closeModal', false);
};
</script>

<template>
  <div class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-[9999]">
    <div class="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm mx-auto transition-transform transform-gpu">
      <p class="text-center text-gray-900 text-xl font-bold mb-5 leading-snug">{{ msg }}</p>
      <div class="flex justify-center">
        <button
            class="px-5 py-2 bg-blue-600 text-white text-base font-medium rounded-full hover:bg-blue-500 transition duration-200 shadow focus:outline-none focus:ring focus:ring-blue-600/50"
            @click="closeModal"
        >
          확인
        </button>
      </div>
    </div>
  </div>
</template>
