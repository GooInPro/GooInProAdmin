import {createRouter, createWebHistory} from "vue-router";

import EmployerRouter from "./EmployerRouter.js";
import JobPostingsRouter from "./JobPostingsRouter.js";
import QNARouter from "./QNARouter.js";
import FAQRouter from "./FAQRouter.js";
import AdminRouter from "./AdminRouter.js";

const routes = [
    EmployerRouter,
    JobPostingsRouter,
    QNARouter,
    FAQRouter,
    AdminRouter

]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router;