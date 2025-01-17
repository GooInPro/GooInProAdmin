import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAdmin, refreshToken } from '../api/adminAPI/jwtAPI.js'

export const useAdminAuthStore = defineStore('adminAuth', () => {
    const accessToken = ref(localStorage.getItem('accessToken') || null)
    const refreshTokenValue = ref(localStorage.getItem('refreshToken') || null)
    const adminNo = ref(localStorage.getItem('adminNo') || null)
    const adminId = ref(localStorage.getItem('adminId') || null)
    const adminName = ref(localStorage.getItem('adminName') || null)
    const adminRole = ref(localStorage.getItem('adminRole') || null)
    const isAuthenticated = ref(!!accessToken.value)

    // 로그인 상태 확인
    const checkAuth = () => {
        const storedToken = localStorage.getItem('accessToken')
        if (storedToken) {
            accessToken.value = storedToken
            refreshTokenValue.value = localStorage.getItem('refreshToken')
            adminNo.value = localStorage.getItem('adminNo')
            isAuthenticated.value = true
            return true
        }
        return false
    }

    // 로그인
    const login = async (loginData) => {
        try {
            const response = await loginAdmin(loginData)
            setAuthData(response)
            return true
        } catch (error) {
            console.error('로그인 실패:', error)
            return false
        }
    }

    // 로그아웃
    const logout = () => {
        accessToken.value = null
        refreshTokenValue.value = null
        adminNo.value = null
        adminId.value = null
        adminName.value = null
        adminRole.value = null
        isAuthenticated.value = false

        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('adminNo')
        localStorage.removeItem('adminId')
        localStorage.removeItem('adminName')
        localStorage.removeItem('adminRole')
    }

    // 토큰 갱신
    const refreshAuth = async () => {
        try {
            const response = await refreshToken(refreshTokenValue.value)
            setAuthData(response)
            return true
        } catch (error) {
            console.error('토큰 갱신 실패:', error)
            logout()
            return false
        }
    }

    // 인증 데이터 저장
    const setAuthData = (authData) => {
        accessToken.value = authData.accessToken
        refreshTokenValue.value = authData.refreshToken
        adminNo.value = authData.admno
        adminId.value = authData.admid
        adminName.value = authData.admname
        adminRole.value = authData.admrole
        isAuthenticated.value = true

        localStorage.setItem('accessToken', authData.accessToken)
        localStorage.setItem('refreshToken', authData.refreshToken)
        localStorage.setItem('adminNo', authData.admno)
        localStorage.setItem('adminId', authData.admid)
        localStorage.setItem('adminName', authData.admname)
        localStorage.setItem('adminRole', authData.admrole)
    }

    return {
        accessToken,
        refreshTokenValue,
        adminNo,
        adminId,
        adminName,
        adminRole,
        isAuthenticated,
        login,
        logout,
        refreshAuth
    }
})
