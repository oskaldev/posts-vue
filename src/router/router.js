import AboutPage from "@/pages/AboutPage.vue"
import Main from "@/pages/HomePage.vue"
import PostDetails from "@/pages/PostDetails.vue"
import PostPage from "@/pages/PostPage.vue"
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
]
const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL)
})

export default router
