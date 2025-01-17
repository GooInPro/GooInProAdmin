const AdminIndexPage = () => import('../pages/adminpages/AdminIndexPage.vue')
const AdminListPage = () => import('../pages/adminpages/AdminListPage.vue')
const AdminRegisterPage = () => import('../pages/adminpages/AdminRegisterPage.vue')
const AdminEditPage = () => import('../pages/adminpages/AdminEditPage.vue')
const AdminLoginPage = () => import('../pages/adminpages/AdminLoginPage.vue')
const AdminDetailPage = () => import('../pages/adminpages/AdminDetailPage.vue')

const AdminRouter = {
    path: '/admin',
    component: AdminIndexPage,
    children: [
        {
            path: 'login',
            component: AdminLoginPage,
            meta: { requiresGuest: true }  // 비로그인 사용자만 접근 가능
        },
        {
            path: 'list',
            component: AdminListPage,
            meta: { requiresAuth: true }   // 인증된 사용자만 접근 가능
        },
        {
            path: 'register',
            component: AdminRegisterPage,
            meta: { requiresAuth: true }
        },
        {
            path: 'edit/:admno',
            component: AdminEditPage,
            meta: { requiresAuth: true }
        },
        {
            path: 'detail/:admno',
            component: AdminDetailPage,
            meta: { requiresAuth: true }
        }
    ]
}

export default AdminRouter
