<template>
  <div id="teamAddPage">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="addTeamData.name"
          name="name"
          label="队伍名"
          placeholder="请输入队伍名"
          :rules="[{ required: true, message: '请输入队伍名' }]"
        />
        <van-field
          v-model="addTeamData.description"
          rows="4"
          autosize
          label="队伍描述"
          type="textarea"
          placeholder="请输入队伍描述"
        />
        <van-field
          is-link
          readonly
          name="datetimePicker"
          label="过期时间"
          :placeholder="expireTime.join('-') || '点击选择过期时间'"
          @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-date-picker
            v-model="expireTime"
            @confirm="showPicker = false"
            type="datetime"
            title="请选择过期时间"
            :min-date="minDate"
          />
        </van-popup>
        <van-field name="stepper" label="最大人数">
          <template #input>
            <van-stepper v-model="addTeamData.maxNum" max="10" min="3" />
          </template>
        </van-field>
        <van-field name="radio" label="队伍状态">
          <template #input>
            <van-radio-group
              v-model="addTeamData.status"
              direction="horizontal"
            >
              <van-radio name="0">公开</van-radio>
              <van-radio name="1">私有</van-radio>
              <van-radio name="2">加密</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
          v-if="Number(addTeamData.status) === 2"
          v-model="addTeamData.password"
          type="password"
          name="password"
          label="密码"
          placeholder="请输入队伍密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";
import { addTeam } from "@/api/module/teamApi";

const router = useRouter();
// 展示日期选择器
const showPicker = ref(false);

const minDate = new Date();
// 队伍参数对象模型
const initFormData = {
  name: "",
  description: "",
  maxNum: 3,
  password: "",
  status: 0,
};
// 队伍过期时间
let expireTime = ref([
  minDate.getFullYear().toString(),
  (minDate.getMonth() + 1).toString(),
  minDate.getDay().toString(),
]);
// 需要用户填写的表单数据
const addTeamData = ref({ ...initFormData });

// 提交
const onSubmit = async () => {
  const postData = {
    ...addTeamData.value,
    expireTime: expireTime.value.join("-") + " 00:00:00",
    status: Number(addTeamData.value.status),
  };
  // todo 前端参数校验
  const { data } = await addTeam(postData);
  if (data !== null) {
    router.push({
      path: "/team",
      replace: true,
    });
  }
};
</script>

<style scoped></style>
