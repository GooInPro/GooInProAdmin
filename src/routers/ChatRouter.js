

const ChattingIndexPage = () => import('../pages/employerpages/EmployerIndexPage.vue')
const ChattingMainPage = () => import('../pages/chattingpages/ChattingMainPage.vue')
const ChattingStartPage = () => import('../pages/chattingpages/ChattingStartPage.vue')



const ChatRouter = {

    path: '/chat', component: () => ChattingIndexPage(),
    children: [
        {path: 'main', component: ChattingMainPage},
        {path: 'start', component: ChattingStartPage}
    ]

}

export default ChatRouter