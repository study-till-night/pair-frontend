import { defineStore } from "pinia";
import {
  doLogin,
  doRegister,
  doLogout,
  updateUser,
  getCurrentUser,
} from "@/api/module/userApi";

// 第一个参数是应用程序中 store 的唯一 id
export const useUserStore = defineStore("user", {
  state: () => {
    return {
      // 当前用户信息
      currentUser: {},
      // 当前用户id
      currentUid: null,
      // 是否登录
      isLogin: false,
    };
  },
  actions: {
    // 设置state的用户值
    setStateUser(user) {
      this.currentUser = { ...user };
      this.currentUid = user.userId;
    },
    // 用户登录
    async userLogin(username, password) {
      const { data } = await doLogin(username, password);
      this.setStateUser(data);
      this.isLogin = true;
    },
    // 用户注册
    async userRegister(username, password, checkPassword) {
      const { data } = await doRegister(username, password, checkPassword);
      this.currentUid = data;
    },
    async userLogOut() {
      await doLogout();
      // 直接重置所有数据
      this.$reset();
    },
    // 获取当前登录用户
    async userGetCurrent() {
      try {
        const { data } = await getCurrentUser();
        this.setStateUser(data);
      } catch (error) {
        // 如果用户在浏览器存在cookie 但服务端已退出登录 则抛出异常
        return Promise.reject(error);
      }
    },
    // 更新用户信息
    async userUpdate(user) {
      await updateUser(user);
      this.userGetCurrent();
    },
  },
});
