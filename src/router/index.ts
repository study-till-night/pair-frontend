import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";
import { getToken } from "@/utils/auth";
import pinia from "@/store/index";
import { useUserStore } from "@/store/module/user";

// 路由白名单
const whitePath = ["/login", "/register"];

// 默认路由
const constantRoutes: Array<RouteRecordRaw> = [
  {
    name: "to404",
    path: "/:catchAll(.*)",
    redirect: "/404",
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@p/error/404.vue"),
    meta: { title: "404" },
  },
];

// 系统相关路由
const routes: Array<RouteRecordRaw> = [
  {
    path: "",
    component: Layout,
    name: "layout",
    meta: { menuName: "平台功能" },
    redirect: "home",
    // 页面主体部分组件
    children: [
      {
        path: "home",
        component: () => import("@p/Home.vue"),
      },
      {
        path: "team",
        component: () => import("@p/Team/Team.vue"),
      },
      {
        path: "team/add",
        component: () => import("@p/Team/TeamAdd.vue"),
      },
      {
        path: "personal",
        component: () => import("@p/Personal.vue"),
      },
      {
        path: "search",
        component: () => import("@p/Search.vue"),
      },
      {
        path: "search/result",
        component: () => import("@p/SearchResult.vue"),
      },
      {
        path: "personal/edit",
        component: () => import("@p/PersonEdit.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@p/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes.concat(constantRoutes),
  // to, from, savedPosition
  scrollBehavior() {
    // 始终滚动到顶部
    return { top: 0 };
  },
});
// 路由守卫
router.beforeEach(async (to, from, next) => {
  // 有cookie则直接获取信息
  if (getToken()) {
    const userStore = useUserStore(pinia);
    // 没有登录 则自动登录
    if (userStore.isLogin === false) {
      userStore.isLogin = true;
      try {
        await userStore.userGetCurrent();
        console.log("重新获取用户信息");
      } catch (error) {
        // 如果用户在浏览器存在cookie 但服务端已退出登录 则抛出异常 重定向到登录页
        next(`/login?redirect=${to.fullPath}`);
      }
      next();
    } else next();
  } else if (whitePath.indexOf(to.path) !== -1) next();
  // 没有则重定向到登录页
  else {
    next(`/login?redirect=${to.fullPath}`);
  }
});
export default router;
export { routes };
