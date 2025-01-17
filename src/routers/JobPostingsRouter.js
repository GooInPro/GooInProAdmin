
const JobPostingsIndexPage = () => import('../pages/jobpostingspages/JobPostingsIndexPage.vue');
const JobPostingsListPage = () => import('../pages/jobpostingspages/JobPostingsListPage.vue');
const JobPostingsReadPage = () => import('../pages/jobpostingspages/JobPostingsReadPage.vue');

const JobPostingsRouter = {

    path: '/jobPostings', component: JobPostingsIndexPage,
    children: [

        {path: 'list', component: JobPostingsListPage},
        {path: 'read/:jpno', component: JobPostingsReadPage},
    ]
}

export default JobPostingsRouter;