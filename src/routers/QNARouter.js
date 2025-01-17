
const QNAIndexPage = () => import('../pages/qnapages/QNAIndexPage.vue')
const QNAListPage = () => import('../pages/qnapages/QNAListPage.vue')
const QNADetailPage = () => import('../pages/qnapages/QNADetailPage.vue')

const QNARouter = {

    path: '/qna', component: QNAIndexPage,
    children: [
        {
            path: 'list', component: QNAListPage,
        },
        {
            path: 'detail/:qno', component: QNADetailPage,
        }
    ]

}

export default QNARouter;