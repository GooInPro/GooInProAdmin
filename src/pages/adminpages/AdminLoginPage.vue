<script setup>
import { useRouter } from 'vue-router'
import AdminLoginComponent from '../../components/admincomponents/AdminLoginComponent.vue'
import { useAdminAuthStore } from '../../stores/adminauthstore'

const router = useRouter()
const adminAuthStore = useAdminAuthStore()

const handleLogin = async (loginData) => {
  try {
    console.log('로그인 데이터 받음:', loginData)
    const success = await adminAuthStore.login(loginData)

    if (success) {
      router.push('/admin/list')
    } else {
      alert('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.')
    }
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
