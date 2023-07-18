import { createRouter, createWebHistory } from 'vue-router'
import MainVue from '@/views/Main.vue'
const routes = [
  {
    path: '/',
    redirect: "/index"
  },
  {
    path: '/index',
    component: MainVue,
    children:[
      {
        path:'',
        component: () => import("../views/book/BookList.vue")
      },
      {
        path: "/home",
        name: "home",
        component: () => import("../views/home/Home.vue")
      },
      {
        path: "/infoshow",
        name: "infoshow",
        component: () => import("../views/home/InfoShow.vue")
      },
      {
        path: "/booklist",
        name: "booklist",
        component: () => import("../views/book/BookList.vue")
      },
      {
        path: "/userinfo",
        name: "userinfo",
        component: () => import("../views/userInfo/UserInfo.vue")
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import("../views/login/Login.vue")
  },
  {
    path: '/register',
    name: 'register',
    component: () => import("../views/register/Register.vue")
  },
  {
    path: '/forget',
    name: 'forget',
    component: () => import("../views/forget/Forget.vue")
  },
  {
    path: '/:pathMatch(.*)',
    name: 'notfound',
    component: () => import("../views/NotFound.vue")
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 路由守卫  在没有登录之前，只能访问登录页面或者注册页面，其他页面都无妨访问
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.mytoken ? true : false
  if (to.path == "/login" || to.path == '/register' || to.path == '/forget') {
    next()
  } else {
    isLogin ? next() : next("/login")
  }
})

export default router
