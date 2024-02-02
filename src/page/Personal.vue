<template>
  <div class="main-content">
    <van-cell-group inset title="个人信息" class="group-title">
      <van-cell
        title="用户昵称"
        :value="currentUser.nickName"
        is-link
        @click="toEdit('nickName', currentUser.nickName, '用户昵称')"
      />
      <van-cell
        title="邮箱"
        :value="currentUser.email"
        is-link
        @click="toEdit('email', currentUser.email, '邮箱')"
      />
      <van-cell
        title="手机号"
        :value="currentUser.phone"
        is-link
        @click="toEdit('phone', currentUser.phone, '手机号')"
      />
      <van-cell
        title="性别"
        :value="currentUser.gender === 0 ? '男' : '女'"
        @click="toEdit('gender', currentUser.gender, '性别')"
      />
      <van-cell title="创建时间" :value="format(currentUser.createTime)" />
    </van-cell-group>

    <van-cell-group inset title="账号操作" class="group-title">
      <van-cell title="账户信息" />
      <van-cell title="退出登录" />
    </van-cell-group>
  </div>
</template>

<script setup lang="ts">
import { format } from "@/utils/dateUtils.js";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/module/user";
import { storeToRefs } from "pinia";

const userStore = useUserStore();

const router = useRouter();
userStore.userGetCurrent();
// @ts-ignore
let { currentUser }: { currentUser: UserType } = storeToRefs(userStore);
// 进入编辑页面
const toEdit = (editKey: string, editValue: string | number, label: string) => {
  router.push({
    path: "personal/edit",
    query: {
      editKey,
      editValue,
      label,
    },
  });
};
</script>

<style scoped>
.main-content {
  text-align: left !important;
  .group-title {
    text-indent: 10px;
  }
}
</style>
