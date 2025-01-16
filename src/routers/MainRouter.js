import {createRouter, createWebHistory} from "vue-router";

import EmployerRouter from "./EmployerRouter.js";
import JobPostingsRouter from "./JobPostingsRouter.js";
import QNARouter from "./QNARouter.js";
import FAQRouter from "./FAQRouter.js";
import ChatRouter from "./ChatRouter.js";

const routes = [
    EmployerRouter,
    JobPostingsRouter,
    QNARouter,
    FAQRouter,
    ChatRouter,
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router;