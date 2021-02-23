import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/Article',
    name: 'Article',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/Article.vue')
  },
  {
    path: '/ShowDetail',
    name: 'ShowDetail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "ShowDetail" */ '../views/ShowDetail.vue')
  },
  {
    path: '/TimeLine',
    name: 'TimeLine',
    component: () => import( /* webpackChunkName: "TimeLine" */ '../views/TimeLine.vue')
  },
  {
    path: '/LiCheng',
    name: 'LiCheng',
    component: () => import( /* webpackChunkName: "LiCheng" */ '../views/LiCheng.vue')
  },
  {
    path: "/MyProject",
    name: "MyProject",
    component: () => import( /*webpackChunkName:"MyProject"*/ "../views/MyProject")
  },
  {
    path: "/About",
    name: "About",
    component: () => import( /*webpackChunkName:"About"*/ "../views/About")
  }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  // 路由切换时，更新显示坐标  , 防止组件之间的滚动条影响 参考：https://blog.csdn.net/panchang199266/article/details/90524319
  // scrollBehavior(to, from, savedPosition) {
  scrollBehavior() {
    return {
      x: 0,
      y: 0
    }
  }
})

export default router