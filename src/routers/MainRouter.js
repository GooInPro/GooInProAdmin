import {createRouter, createWebHistory} from "vue-router";


import EmployerRouter from "./EmployerRouter.js";
import JobPostingsRouter from "./JobPostingsRouter.js";
import QNARouter from "./QNARouter.js";
import FAQRouter from "./FAQRouter.js";
import ChatRouter from "./ChatRouter.js";
import PartTimerRouter from "./PartTimerRouter.js";
import ComplaintsRouter from "./ComplaintsRouter.js";
import graphRouter from "./GraphRouter.js";
import AdminRouter from "./AdminRouter.js";
import {useAdminAuthStore} from "../stores/adminAuthStore.js";

const routes = [
    EmployerRouter,
    JobPostingsRouter,
    QNARouter,
    FAQRouter,
    ChatRouter,
    FAQRouter,
    PartTimerRouter,
    ComplaintsRouter,
    AdminRouter,
    graphRouter
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

// 라우터 가드 추가
router.beforeEach((to, from, next) => {
    const adminAuthStore = useAdminAuthStore()
    const isAuthenticated = adminAuthStore.isAuthenticated

    // admin 로그인 페이지는 별도 처리
    if (to.path === '/admin/login') {
        if (isAuthenticated) {
            console.log('이미 로그인된 사용자, 리스트 페이지로 리다이렉트')
            next('/admin/list')
            return
        }
        next()
        return
    }

    // 보호된 경로들 체크 (admin, employer 등 모든 보호 경로)
    if (to.path.startsWith('/admin') ||
        to.path.startsWith('/employer') ||
        to.path.startsWith('/jobpostings') ||
        to.path.startsWith('/qna') ||
        to.path.startsWith('/chat') ||
        to.path.startsWith('/parttimer') ||
        to.path.startsWith('/graph') ||
        to.path.startsWith('/complaints')) {

        if (!isAuthenticated) {
            console.log('인증되지 않은 접근, 로그인 페이지로 리다이렉트')
            next('/admin/login')
            return
        }
    }

    next()
})

export default router
