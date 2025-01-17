
const GraphIndexPage = () => import('../pages/graphpages/GraphIndexPage.vue')
const GraphListPage = () => import('../pages/graphpages/GraphListPage.vue')



const GraphRouter = {

    path: '/graph', component: GraphIndexPage,
    children: [
        {
            path: 'list', component: GraphListPage
        },
        {
            path: '/', redirect: '/graph/list'
        }
    ]

}

export default GraphRouter