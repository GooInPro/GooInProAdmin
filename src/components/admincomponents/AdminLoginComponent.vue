<script setup>
import { ref } from 'vue'

const isLoading = ref(false)
const loginForm = ref({
  admid: '',
  admpw: ''
})

const emit = defineEmits(['login'])

const handleLogin = async () => {
  try {
    console.log('로그인 시도:', loginForm.value)  // 로그 추가
    isLoading.value = true
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
      <div class="rounded-md shadow-sm -space-y-px">
        <div>
          <label for="admid" class="sr-only">아이디</label>
          <input
              id="admid"
              type="text"
              v-model="loginForm.admid"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="아이디를 입력하세요"
          >
        </div>
        <div>
          <label for="admpw" class="sr-only">비밀번호</label>
          <input
              id="admpw"
              type="password"
              v-model="loginForm.admpw"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="비밀번호를 입력하세요"
          >
        </div>
      </div>

      <div>
        <button
            type="submit"
            :disabled="isLoading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
        >
          {{ isLoading ? '로그인 중...' : '로그인' }}
        </button>
      </div>
    </form>
  </div>
</template>
