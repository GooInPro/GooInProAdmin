
const PartTimerIndexPage = () => import('../pages/parttimerpages/PartTimerIndexPage.vue')
const PartTimerListPage = () => import('../pages/parttimerpages/PartTimerListPage.vue')
const PartTimerDetailPage = () => import('../pages/parttimerpages/PartTimerDetailPage.vue')

const PartTimerRouter = {

    path: '/partTimer', component: PartTimerIndexPage,
    children: [
        {
            path: 'list', component: PartTimerListPage,

        },
        {
            path: 'detail/:pno', component: PartTimerDetailPage,
        }
    ]

}

export default PartTimerRouter;