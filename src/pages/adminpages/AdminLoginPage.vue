<script setup>
import { useRouter } from 'vue-router'
import { loginAdmin } from '../../api/adminapi/jwtAPI'
import AdminLoginComponent from '../../components/admincomponents/AdminLoginComponent.vue'

const router = useRouter()

const handleLogin = async (loginData) => {
  try {
    const response = await loginAdmin(loginData)
    localStorage.setItem('accessToken', response.accessToken)
    localStorage.setItem('refreshToken', response.refreshToken)
    router.push('/admin/list')
  } catch (error) {
    console.error('로그인 실패:', error)
    alert('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.')
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <AdminLoginComponent @login="handleLogin"/>
  </div>
</template>
