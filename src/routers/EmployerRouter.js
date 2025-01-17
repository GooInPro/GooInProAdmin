
const EmployerIndexPage = () => import('../pages/employerpages/EmployerIndexPage.vue')
const EmployerListPage = () => import('../pages/employerpages/EmployerListPage.vue')
const EmployerReadPage = () => import('../pages/employerpages/EmployerReadPage.vue')

const EmployerRouter = {

    path: '/employer', component: EmployerIndexPage,
    children: [
        {path: 'list', component: EmployerListPage},
        {path: 'read/:eno', component: EmployerReadPage}
    ]
}

export default EmployerRouter;