
const ChattingIndexPage = () => import('../pages/employerpages/EmployerIndexPage.vue')
const ChatListPage = () => import("../pages/chattingpages/ChatListPage.vue")
const ChattingPage = () => import("../pages/chattingpages/ChattingPage.vue")




const ChatRouter = {
    path: '/chat',
    component: ChattingIndexPage,  // 함수를 호출하지 않고, 바로 컴포넌트를 참조
    children: [
        {
            path: '',
            component: ChatListPage
        },
        {
            path: 'chatting/:id',
            component: ChattingPage
        }
    ]
}

export default ChatRouter