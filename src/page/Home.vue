<template>
  <!-- 用户列表 -->
  <UserCardList :userList="recommendList.data" :loading="loading" />
  <van-empty
    v-if="!recommendList || recommendList.data.length < 1"
    description="暂无推荐"
  />
</template>

<script setup lang="ts">
import { recommend } from "@/api/module/userApi";
import { onMounted, ref, reactive } from "vue";
import UserCardList from "@c/UserCardList.vue";

// 分页相关
let pageSize = ref(10);
let pageNum = ref(1);
// 推荐用户列表
let recommendList = reactive({ data: [] as UserType[] });
let loading = ref(true);

onMounted(async () => {
  // 获取分页数据
  let { data } = await recommend(pageSize.value, pageNum.value);
  pageSize.value = data.pageSize;
  pageNum.value = data.pageNum;
  // 标签反序列化
  data.records.forEach((user: any) => {
    user.tags = JSON.parse(user.tags);
  });
  recommendList.data = [...data.records];
  loading.value = false;
});
</script>

<style scoped></style>
