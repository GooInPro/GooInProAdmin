<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AdminLoginComponent from '../../components/admincomponents/AdminLoginComponent.vue'
import CommonNoticeModalComponent from '../../common/components/CommonNoticeModalComponent.vue'
import { useAdminAuthStore } from '../../stores/adminauthstore'

const router = useRouter()
const adminAuthStore = useAdminAuthStore()

const isModalOpen = ref(false)
const modalMessage = ref('')

const handleLogin = async (loginData) => {
  try {
    console.log('로그인 데이터 받음:', loginData)
    const success = await adminAuthStore.login(loginData)

    if (success) {
      router.push('/graph/list')
    } else {
      showErrorModal()
    }
  } catch (error) {
    console.error('로그인 실패:', error)
    showErrorModal()
  }
}

const showErrorModal = () => {
  modalMessage.value = '로그인에 실패하셨습니다'
  isModalOpen.value = true
}

const handleCloseModal = () => {
  isModalOpen.value = false
}

</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <AdminLoginComponent @login="handleLogin"/>

    <CommonNoticeModalComponent
        v-if="isModalOpen"
        :is-open="isModalOpen"
        :msg="modalMessage"
        @close-modal="handleCloseModal"
    />
  </div>
</template>
