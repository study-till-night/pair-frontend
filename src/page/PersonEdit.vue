<template>
  <van-form>
    <van-cell-group inset>
      <van-field
        v-model="editBody.editValue"
        :name="editBody.editKey"
        :label="editBody.label"
        :placeholder="`请输入${editBody.label}`"
      />
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" @click="handleUserEdit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { reactive, watch } from "vue";
import { updateUser } from "@/api/module/userApi";
import { useUserStore } from "@/store/module/user";

const userStore = useUserStore();
const route = useRoute();

const editBody = reactive({
  editKey: route.query.editKey?.toString(),
  editValue: route.query.editValue?.toString(),
  label: route.query.label?.toString(),
});

// 监听路由变化
watch(
  () => route.query,
  (newV) => {
    if (route.fullPath.includes("/personal/edit")) {
      editBody.editKey = newV.editKey?.toString();
      editBody.editValue = newV.editValue?.toString();
      editBody.label = newV.label?.toString();
    }
  }
);

// 处理编辑请求
const handleUserEdit = async () => {
  await updateUser({
    userId: userStore.currentUid,
    [editBody.editKey as string]: editBody.editValue,
  });
};
</script>

<style scoped></style>
