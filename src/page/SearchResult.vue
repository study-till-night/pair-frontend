<template>
  <div class="usr-list">
    <UserCardList :userList="userList.data" :loading="loading" />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { reactive, onMounted, ref } from "vue";
import { searchByTags } from "@/api/module/userApi";
import UserCardList from "@c/UserCardList.vue";
const route = useRoute();

let loading = ref(true);
// 需要传到后端的搜索tags
const searchTags = (route.query.activeTags as any) || ["java"];
// 匹配的用户
const userList = reactive<{ data: UserType[] }>({ data: [] });

// 获取匹配的用户
onMounted(async () => {
  const { data } = await searchByTags(searchTags);
  if (data) {
    data.forEach((user: any) => {
      // 将用户标签反序列化 也可以交给后端
      user.tags = JSON.parse(user.tags);
    });
    userList.data = [...data];
    loading.value = false;
  }
});
</script>

<style scoped lang="scss">
.usr-list {
}
</style>
