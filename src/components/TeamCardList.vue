<template>
  <div id="teamCardList">
    <van-card
      v-for="team in props.teamList"
      :thumb="ikun"
      :desc="team.description"
      :title="`${team.name}`"
    >
      <template #tags>
        <!-- 队伍状态 -->
        <van-tag plain type="danger" style="margin-right: 8px; margin-top: 8px">
          {{ teamStatusEnum[team.status] }}
        </van-tag>
      </template>
      <template #bottom>
        <div>
          {{ `队伍人数: ${team.joinNum}/${team.maxNum}` }}
        </div>
        <div v-if="team.expireTime">
          {{ "过期时间: " + format(team.expireTime) }}
        </div>
        <div>
          {{ "创建时间: " + format(team.createTime) }}
        </div>
      </template>
      <template #footer>
        <van-button
          size="small"
          type="primary"
          v-if="team.userId !== currentUser?.userId && !team.hasJoin"
          plain
          @click="preJoinTeam(team)"
        >
          加入队伍
        </van-button>
        <van-button
          v-if="team.userId === currentUser?.userId"
          size="small"
          plain
          @click="doUpdateTeam(team.teamId)"
          >更新队伍
        </van-button>
        <!-- 仅加入队伍可见 -->
        <van-button
          v-if="team.userId !== currentUser?.userId && team.hasJoin"
          size="small"
          plain
          @click="doQuitTeam(team.teamId)"
          >退出队伍
        </van-button>
        <!-- 解散队伍 -->
        <van-button
          v-if="team.userId === currentUser?.userId"
          size="small"
          type="danger"
          plain
          @click="doDeleteTeam(team.teamId)"
          >解散队伍
        </van-button>
      </template>
    </van-card>
    <!-- 加入私密队伍需要密码 -->
    <van-dialog
      v-model:show="showPasswordDialog"
      title="请输入密码"
      show-cancel-button
      @confirm="doJoinTeam"
      @cancel="doJoinCancel"
    >
      <van-field v-model="password" placeholder="请输入密码" />
    </van-dialog>
  </div>
</template>

<script setup lang="ts">
import ikun from "../assets/ikun.png";
import { teamStatusEnum } from "@/utils/constants/teamStatusConstants";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/module/user";
import { joinTeam, quitTeam, deleteTeam } from "@/api/module/teamApi";
import { format } from "@/utils/dateUtils";

interface TeamCardListProps {
  teamList: TeamType[];
}

const props = withDefaults(defineProps<TeamCardListProps>(), {
  // @ts-ignore
  // 展示的队伍列表
  teamList: [] as TeamType[],
});
const emits = defineEmits(["callForTeamList"]);

const userStore = useUserStore();
const router = useRouter();

const showPasswordDialog = ref(false);
const password = ref("");
const joinTeamId = ref("");
const currentUser = ref<UserType>(userStore.currentUser as UserType);

const preJoinTeam = (team: TeamType) => {
  joinTeamId.value = team.teamId;
  if (team.status === 0) {
    doJoinTeam();
  } else {
    showPasswordDialog.value = true;
  }
};

// 关闭输入密码对话框
const doJoinCancel = () => {
  joinTeamId.value = "";
  password.value = "";
};

/**
 * 加入队伍
 */
const doJoinTeam = async () => {
  if (joinTeamId.value === "") {
    return;
  }
  await joinTeam({
    teamId: joinTeamId.value,
    password: password.value,
  });
  // 重置数据
  doJoinCancel();
  emits("callForTeamList");
};

/**
 * 跳转至更新队伍页
 * @param id
 */
const doUpdateTeam = (id: string) => {
  router.push({
    path: "/team/update",
    query: {
      id,
    },
  });
};

/**
 * 退出队伍
 * @param id
 */
const doQuitTeam = async (id: string) => {
  await quitTeam(id);
  emits("callForTeamList");
};

/**
 * 解散队伍
 * @param id
 */
const doDeleteTeam = async (id: string) => {
  await deleteTeam(id);
  emits("callForTeamList");
};
</script>

<style scoped>
/* scoped限制作用域 使用:deep向组件内进行传递 */
#teamCardList :deep(.van-image__img) {
  height: 128px;
  object-fit: unset;
}
</style>
