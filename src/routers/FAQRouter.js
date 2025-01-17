
const FAQIndexPage = () => import('../pages/faqpages/FAQIndexPage.vue')
const FAQListPage= () => import('../pages/faqpages/FAQListPage.vue')
const FAQDetailPage = () => import('../pages/faqpages/FAQDetailPage.vue')
const FAQEditPage = () => import('../pages/faqpages/FAQEditPage.vue')
const FAQAddPage = () => import('../pages/faqpages/FAQAddPage.vue')

const FAQRouter = {

    path: '/faq', component: FAQIndexPage,
    children: [
        {
            path: 'list', component: FAQListPage
        },
        {
            path: 'detail/:fno', component: FAQDetailPage
        },
        {
            path: 'edit/:fno', component: FAQEditPage
        },
        {
            path: 'register', component: FAQAddPage
        }

    ]

}

export default FAQRouter;