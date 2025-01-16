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
        {path: 'login', component: AdminLoginPage},
        {path: 'list', component: AdminListPage},
        {path: 'register', component: AdminRegisterPage},
        {path: 'edit/:admno', component: AdminEditPage},
        {path: 'detail/:admno', component: AdminDetailPage}
    ]
}

export default AdminRouter
