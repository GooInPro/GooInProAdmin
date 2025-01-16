import SideBar from "../layout/SideBar.vue";

const ChattingIndexPage = () => import('../pages/employerpages/EmployerIndexPage.vue')
const ChattingMainPage = () => import('../pages/chattingpages/ChattingMainPage.vue')


const ChatRouter = {

    path: '/chat', component: () => ChattingIndexPage(),
    children: [
        {path: 'main', component: ChattingMainPage}
    ]

}

export default ChatRouter