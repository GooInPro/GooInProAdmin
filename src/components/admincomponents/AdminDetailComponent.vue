<script setup>
import {ref, onMounted} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {readAdmin, editAdmin, deleteAdmin} from '../../api/adminAPI/adminAPI'
import CommonNoticeModalComponent from "../../common/components/CommonNoticeModalComponent.vue"
import CommonCheckModalComponent from "../../common/components/CommonCheckModalComponent.vue"

const route = useRoute()
const router = useRouter()
const admno = route.params.admno

const adminData = ref(null)
const showModal = ref(false)
const showConfirmModal = ref(false)
const modalMsg = ref('')
const isEditing = ref(false)

const roleTypes = [
  {id: 'ROLE_SUPER', name: '슈퍼관리자'},
  {id: 'ROLE_CS', name: '고객관리자'},
  {id: 'ROLE_GATE', name: '등록관리자'}
]

// 관리자 정보 조회
const fetchAdminData = async () => {
  try {
    const response = await readAdmin(admno)
    adminData.value = response
  } catch (error) {
    modalMsg.value = '관리자 정보를 불러오는데 실패했습니다.'
    showModal.value = true
  }
}

// 수정 모드 전환
const toggleEdit = () => {
  isEditing.value = !isEditing.value
}

// 수정 저장
const handleSubmit = async () => {
  try {
    await editAdmin(adminData.value)
    modalMsg.value = '수정이 완료되었습니다.'
    showModal.value = true
    isEditing.value = false
  } catch (error) {
    modalMsg.value = '수정에 실패했습니다.'
    showModal.value = true
  }
}

// 삭제 확인 모달 표시
const showDeleteConfirm = () => {
  showConfirmModal.value = true
}

// 실제 삭제 수행 함수
const performDelete = async () => {
  try {
    await deleteAdmin(admno)
  } catch (error) {
    modalMsg.value = '삭제에 실패했습니다.'
    showModal.value = true
  }
}

// 모달 닫기
const closeModal = (value) => {
  showModal.value = value
  if (modalMsg.value === '수정이 완료되었습니다.') {
    router.push('/admin/list')
  }
}

onMounted(fetchAdminData)
</script>

<template>
  <div class="max-w-2xl mx-auto p-4">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-semibold">관리자 상세 정보</h1>
      <div class="flex gap-2">
        <button
            v-if="!isEditing"
            @click="toggleEdit"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          수정
        </button>
        <button
            @click="showDeleteConfirm"
            class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          삭제
        </button>
      </div>
    </div>

    <div v-if="adminData" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">아이디</label>
        <input
            v-model="adminData.admid"
            type="text"
            :disabled="true"
            class="w-full px-4 py-2 border rounded bg-gray-50"
        />
      </div>

      <div v-if="isEditing">
        <label class="block text-sm font-medium text-gray-700 mb-1">새 비밀번호</label>
        <input
            v-model="adminData.admpw"
            type="password"
            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">이름</label>
        <input
            v-model="adminData.admname"
            type="text"
            :disabled="!isEditing"
            class="w-full px-4 py-2 border rounded"
            :class="!isEditing ? 'bg-gray-50' : 'focus:outline-none focus:ring-2 focus:ring-blue-500'"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">권한</label>
        <select
            v-model="adminData.admrole"
            :disabled="!isEditing"
            class="w-full px-4 py-2 border rounded"
            :class="!isEditing ? 'bg-gray-50' : 'focus:outline-none focus:ring-2 focus:ring-blue-500'"
        >
          <option v-for="role in roleTypes" :key="role.id" :value="role.id">
            {{ role.name }}
          </option>
        </select>
      </div>

      <div v-if="isEditing" class="flex gap-4 mt-6">
        <button
            @click="handleSubmit"
            class="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          저장
        </button>
        <button
            @click="toggleEdit"
            class="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
          취소
        </button>
      </div>
    </div>

    <div v-if="showModal">
      <CommonNoticeModalComponent
          :is-open="showModal"
          :msg="modalMsg"
          @close-modal="closeModal"
      />
    </div>

    <div v-if="showConfirmModal">
      <CommonCheckModalComponent
          :is-open="showConfirmModal"
          msg="관리자를 삭제"
          :fn="performDelete"
          after-push-link="/admin/list"
          @close-modal="showConfirmModal = $event"
      />
    </div>
  </div>
</template>
