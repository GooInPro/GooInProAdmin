
const JobPostingsIndexPage = () => import('../pages/jobpostingspages/JobPostingsIndexPage.vue');
const JobPostingsListPage = () => import('../pages/jobpostingspages/JobPostingsListPage.vue');

const JobPostingsRouter = {

    path: '/jobPostings', component: JobPostingsIndexPage,
    children: [

        {path: 'list', component: JobPostingsListPage},
    ]
}

export default JobPostingsRouter;