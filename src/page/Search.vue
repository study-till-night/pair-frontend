<template>
  <!-- 搜索栏 -->
  <form action="/">
    <van-search
      v-model="searchContent"
      show-action
      placeholder="请输入要搜索的标签 "
      @search="onSearch(searchContent)"
      @cancel="onSearch('')"
    />
  </form>
  <!-- 已选标签 -->
  <van-divider content-position="left">已选标签</van-divider>
  <div class="selected-tags">
    <van-empty
      v-if="activeTags.length === 0"
      image-size="50"
      description="暂未选中标签"
    />
    <!-- 已选标签列表 -->
    <van-tag
      v-for="(tag, index) in activeTags"
      closeable
      size="large"
      type="primary"
      plain
      @close="activeTags.splice(index, 1)"
      class="selected-tags-item"
    >
      {{ tag }}
    </van-tag>
  </div>

  <van-divider content-position="left">可选标签</van-divider>
  <!-- 可选标签列表 -->
  <van-tree-select
    v-model:active-id="activeTags"
    v-model:main-active-index="activeTreeIndex"
    :items="tempTagList"
  />
  <div class="search-btn">
    <van-button
      type="primary"
      icon="search"
      @click="router.push({ path: '/search/result', query: { activeTags } })"
      size="small"
      >搜索用户</van-button
    >
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
// 搜索关键字
const searchContent = ref<string>("");
// 已选中的标签
const activeTags = ref<Array<string>>([]);
// 当前所在目录索引
const activeTreeIndex = ref<number>(0);

// 原始可选标签列表 始终不动
const originTagList = [
  {
    text: "浙江",
    children: [
      { text: "杭州", id: "杭州" },
      { text: "温州", id: "温州" },
      { text: "宁波", id: "宁波", disabled: true },
    ],
  },
];
// 用于处理的临时标签列表
let tempTagList = reactive([...originTagList]);

// 根据关键字模糊搜索标签
const onSearch = (content: string) => {
  tempTagList.length = 0;
  if (content === "") {
    tempTagList.push(...originTagList);
    return;
  }
  const result = originTagList.map((parentTag) => {
    // 获取每个子树对象
    const tempChildren = [...parentTag.children];
    const tempParent = { ...parentTag };
    // 对子树对象的每个标签进行过滤
    tempParent.children = tempChildren.filter((child) => {
      return child.text.includes(content);
    });
    return tempParent;
  });
  tempTagList.push(...result);
};
</script>

<style scoped lang="scss">
.selected-tags {
  display: flex;
  justify-content: start;
  align-items: start;
  height: 15vh;
  overflow-x: auto;
  flex-wrap: wrap;
  .van-empty {
    width: 100%;
    height: 100%;
  }
  .selected-tags-item {
    margin: 10px;
    &:nth-child(1) {
      margin-left: 20px;
    }
  }
}
.search-btn {
  display: flex;
  margin-top: 2vh;
  justify-content: center;
}
</style>
