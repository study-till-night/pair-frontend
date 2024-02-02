<template>
  <!-- 骨架屏 缓冲显示 -->
  <van-skeleton
    title
    avatar
    :row="3"
    :loading="props.loading"
    v-for="(user, index) in props.userList"
  >
    <!-- 用户卡片 -->
    <van-card
      :tag="(index + 1).toString()"
      :desc="user.description"
      :title="user.nickName"
      thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
    >
      <!-- 用户标签 -->
      <template #tags>
        <van-tag v-for="tag in user.tags" plain type="primary">{{
          tag
        }}</van-tag>
      </template>
      <template #footer>
        <van-button size="small" plain icon="contact" type="primary" @click=""
          >联系ta</van-button
        >
      </template>
    </van-card>
  </van-skeleton>
</template>

<script setup lang="ts">
interface UserCardListProps {
  loading: boolean;
  userList: UserType[];
}

const props = withDefaults(defineProps<UserCardListProps>(), {
  loading: true,
  // @ts-ignore
  userList: [] as UserType[],
});
</script>

<style scoped>
.van-tag {
  margin: 5px 5px 0 0;
}
.van-card {
  margin: 5px 0;
}
</style>
