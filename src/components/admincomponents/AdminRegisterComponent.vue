<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { registerAdmin } from '../../api/adminAPI/adminAPI'
import CommonNoticeModalComponent from "../../common/components/CommonNoticeModalComponent.vue"

const router = useRouter()
const showModal = ref(false)
const modalMsg = ref('')

const adminData = ref({
  admid: '',
  admpw: '',
  admname: '',
  admrole: ''
})

const roleTypes = [
  { id: 'ROLE_SUPER', name: '슈퍼관리자' },
  { id: 'ROLE_CS', name: '고객관리자' },
  { id: 'ROLE_GATE', name: '등록관리자' }
]

const handleSubmit = async () => {
  try {
    await registerAdmin(adminData.value)
    modalMsg.value = '관리자가 등록되었습니다.'
    showModal.value = true
  } catch (error) {
    modalMsg.value = '관리자 등록에 실패했습니다: ' + error.message
    showModal.value = true
  }
}

const closeModal = (value) => {
  showModal.value = value
  if (modalMsg.value === '관리자가 등록되었습니다.') {
    router.push('/admin/list')
  }
}
</script>

<template>
  <div class="max-w-2xl mx-auto p-4">
    <h1 class="text-2xl font-semibold mb-6">관리자 등록</h1>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">아이디</label>
        <input
            v-model="adminData.admid"
            type="text"
            required
            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
        <input
            v-model="adminData.admpw"
            type="password"
            required
            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">이름</label>
        <input
            v-model="adminData.admname"
            type="text"
            required
            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">권한</label>
        <select
            v-model="adminData.admrole"
            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
        >
          <option value="">권한을 선택하세요</option>
          <option v-for="role in roleTypes" :key="role.id" :value="role.id">
            {{ role.name }}
          </option>
        </select>
      </div>

      <div class="flex gap-4 mt-6">
        <button
            type="submit"
            class="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          등록
        </button>
        <button
            type="button"
            @click="router.push('/admin/list')"
            class="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
        >
          취소
        </button>
      </div>
    </form>

    <div v-if="showModal">
      <CommonNoticeModalComponent
          :is-open="showModal"
          :msg="modalMsg"
          @close-modal="closeModal"
      />
    </div>
  </div>
</template>
