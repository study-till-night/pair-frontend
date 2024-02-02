<template>
  <div id="teamPage">
    <van-search
      v-model="searchText"
      placeholder="搜索队伍"
      @search="onSearch"
    />
    <van-tabs
      v-model:active="active"
      @change="onSearch(searchText, active2status)"
    >
      <van-tab title="公开" name="public" />
      <van-tab title="加密" name="private" />
    </van-tabs>
    <div style="margin-bottom: 16px" />
    <!-- 新增队伍跳转 -->
    <van-button
      class="add-button fixed-btn"
      type="primary"
      icon="plus"
      @click="router.push('/team/add')"
    />
    <!-- 队伍列表 -->
    <team-card-list
      :teamList="teamList"
      @callForTeamList="onSearch(searchText, active2status)"
    />
    <van-empty v-if="teamList?.length < 1" description="数据为空" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import TeamCardList from "@c/TeamCardList.vue";
import { ref, reactive, computed } from "vue";
import { searchTeam } from "@/api/module/teamApi";

const router = useRouter();

// 队伍类型
const active = ref("public");
const active2status = computed<number>(() => {
  return active.value === "public" ? 0 : 2;
});
const searchText = ref("");

// 队伍数组
let teamList = ref([]);

// 分页信息
let pageInfo = reactive({
  pageSize: 10,
  pageNum: 1,
  total: 0,
});
// 处理搜索
const onSearch = async (searchText = "", status = 0) => {
  let { data } = await searchTeam({
    searchText,
    status,
    pageSize: pageInfo.pageSize,
    pageNum: pageInfo.pageNum,
  });
  teamList.value = data?.records || [];
  pageInfo.pageNum = data?.pageNum || 10;
  pageInfo.pageSize = data?.pageSize || 1;
};

// 初始化队伍列表
onSearch();
</script>

<style scoped>
.fixed-btn {
  position: fixed;
  bottom: 20vh;
  right: 2px;
  z-index: 1;
}
</style>
