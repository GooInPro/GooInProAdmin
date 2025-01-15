import {createRouter, createWebHistory} from "vue-router";
import EmployerRouter from "./EmployerRouter.jsx";
import JobPostingsRouter from "./JobPostingsRouter.jsx";
import QNARouter from "./QNARouter.jsx";
import FAQRouter from "./FAQRouter.jsx";


const routes = [
    EmployerRouter,
    JobPostingsRouter,
    QNARouter,
    FAQRouter
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router;