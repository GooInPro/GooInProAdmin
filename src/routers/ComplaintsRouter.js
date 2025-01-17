
const ComplaintsIndexPage = () => import("../pages/complaintspages/ComplaintsIndexPage.vue");
const ComplaintsListPage = () => import("../pages/complaintspages/ComplaintsListPage.vue");
const ComplaintsDetailPage = () => import("../pages/complaintspages/ComplaintsDetailPage.vue");

const ComplaintsRouter = {

    path: '/complaints', component: ComplaintsIndexPage,
    children: [
        {
            path: 'list', component: ComplaintsListPage,
        },
        {
            path: 'detail/:cno', component: ComplaintsDetailPage,
        }
    ]

}

export default ComplaintsRouter;