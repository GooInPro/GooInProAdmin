
const EmployerIndexPage = () => import('../pages/employerpages/EmployerIndexPage.vue')
const EmployerListPage = () => import('../pages/employerpages/EmployerListPage.vue')

const EmployerRouter = {

    path: '/employer', component: EmployerIndexPage,
    children: [
        {path: 'list', component: EmployerListPage}
    ]
}

export default EmployerRouter;