<script setup>
import { ref } from 'vue'

const isLoading = ref(false)
const loginForm = ref({
  admid: '',
  admpw: ''
})

// emit으로 로그인 이벤트를 부모로 전달
const emit = defineEmits(['login'])

const handleLogin = async () => {
  try {
    isLoading.value = true
    // 부모 컴포넌트로 로그인 데이터 전달
    emit('login', loginForm.value)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
    <div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        관리자 로그인
      </h2>
    </div>
    <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
      <!-- 기존 폼 UI 코드 -->
    </form>
  </div>
</template>
