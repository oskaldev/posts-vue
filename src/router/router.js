import AboutPage from "@/pages/AboutPage.vue"
import Main from "@/pages/HomePage.vue"
import PostDetails from "@/pages/PostDetailsPage.vue"
import PostPageWithStore from "@/pages/PostPageWithStore.vue"
import PostPage from "@/pages/PostPage.vue"
import PostPageWithCompositionAPI from "@/pages/PostPageWithCompositionAPI.vue"
import { createWebHistory } from "vue-router"
import { createRouter } from "vue-router"


const routes = [
  {
    path: '/',
    component: Main
  },
  {
    path: '/posts',
    component: PostPage
  },
  {
    path: '/about',
    component: AboutPage
  },
  {
    path: '/posts/:id',
    component: PostDetails
  },
  {
    path: '/store',
    component: PostPageWithStore
  },
  {
    path: '/composition',
    component: PostPageWithCompositionAPI
  },
]
const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL)
})

export default router
