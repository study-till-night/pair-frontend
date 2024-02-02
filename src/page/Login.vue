<template>
  <div class="login-form">
    <van-form>
      <van-cell-group inset>
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" @click="handleLogin">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/store/module/user";
import { closeToast, showLoadingToast, showNotify } from "vant";
import { useRouter, useRoute } from "vue-router";

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

let username = ref("shu-king");
let password = ref("t128129..");

const handleLogin = () => {
  if (username.value === "" || password.value === "") {
    showNotify({ type: "warning", message: "用户名或密码不能为空！" });
    return;
  }
  showLoadingToast("登录中……");
  // 进行登录
  userStore
    .userLogin(username.value, password.value)
    .then(() => {
      // 如果是重定向来的则返回原来路径
      router.replace((route.query.redirect as string) ?? "/home");
      closeToast();
    })
    .catch(() => {
      closeToast();
    });
};
</script>

<style scoped>
.login-form {
  margin-top: 5vh;
}
</style>