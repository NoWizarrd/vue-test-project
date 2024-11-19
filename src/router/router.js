import MainPage from "@/pages/MainPage.vue";
import PostIdPage from "@/pages/PostIdPage.vue";
import PostPage from "@/pages/PostPage.vue";
import PostPageCompositionApi from "@/pages/PostPageCompositionApi.vue";
import { createRouter, createWebHistory } from "vue-router";


const routes = [
    {
        path: '/',
        component: MainPage
    },
    {
        path: '/posts',
        component: PostPage
    },
    {
        path: '/posts/:id',
        component: PostIdPage
    },
    {
        path: '/composition',
        component: PostPageCompositionApi
    },
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router