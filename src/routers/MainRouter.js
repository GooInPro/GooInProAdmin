import {createRouter, createWebHistory} from "vue-router";

import EmployerRouter from "./EmployerRouter.js";
import JobPostingsRouter from "./JobPostingsRouter.js";
import QNARouter from "./QNARouter.js";
import FAQRouter from "./FAQRouter.js";
import ChatRouter from "./ChatRouter.js";
import PartTimerRouter from "./PartTimerRouter.js";
import ComplaintsRouter from "./ComplaintsRouter.js";
import AdminRouter from "./AdminRouter.js";

const routes = [
    EmployerRouter,
    JobPostingsRouter,
    QNARouter,
    FAQRouter,
    ChatRouter,
    FAQRouter,
    PartTimerRouter,
    ComplaintsRouter,
    AdminRouter
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router;