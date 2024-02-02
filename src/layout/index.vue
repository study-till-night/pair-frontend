<template>
  <!-- 顶部导航栏 -->
  <div class="nav-bar">
    <van-nav-bar
      title="首页"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      @click-right="router.push('/search')"
      fixed
    >
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
  </div>

  <!-- 主体页面 -->
  <div class="app-main">
    <Appmain />
  </div>
  <!-- 下方标签栏 -->
  <div class="footer">
    <van-tabbar v-model="active" @change="onChange(active)" route>
      <van-tabbar-item icon="home-o" name="home" to="/home"
        >主页</van-tabbar-item
      >
      <van-tabbar-item icon="friends-o" name="team" to="/team"
        >队伍</van-tabbar-item
      >
      <van-tabbar-item icon="user-o" name="personal" to="/personal"
        >个人</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
import { showToast } from "vant";
import { ref } from "vue";
import { useRouter } from "vue-router";
import Appmain from "./AppMain.vue";

const router = useRouter();

// 当前所在页面name
const active = ref("home");

const onClickLeft = () => {
  history.back();
};

const onChange = (index: string) => {
  showToast(`进入${index}`);
};
</script>

<style scoped lang="scss">
$nav-height: 6vh;
.app-main {
  padding: 2vh 0;
  margin: 0 auto;
  width: 100%;
  height: 100vh - $nav-height;
  overflow-y: scroll;
}
.nav-bar {
  height: $nav-height;
}
.footer {
  height: $nav-height;
}
</style>
