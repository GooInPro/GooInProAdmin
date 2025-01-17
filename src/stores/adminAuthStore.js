import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAdmin, refreshToken } from '../api/adminAPI/jwtAPI.js'

export const useAdminAuthStore = defineStore('adminAuth', () => {
    const accessToken = ref(localStorage.getItem('accessToken') || null)
    const refreshTokenValue = ref(localStorage.getItem('refreshToken') || null)
    const adminNo = ref(localStorage.getItem('adminNo') || null)
    const isAuthenticated = ref(!!accessToken.value)

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
        isAuthenticated.value = false
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('adminNo')
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
        isAuthenticated.value = true

        localStorage.setItem('accessToken', authData.accessToken)
        localStorage.setItem('refreshToken', authData.refreshToken)
        localStorage.setItem('adminNo', authData.admno)
    }

    return {
        accessToken,
        refreshTokenValue,
        adminNo,
        isAuthenticated,
        login,
        logout,
        refreshAuth
    }
})
