/**
 * 队伍类型
 */
declare type TeamType = {
  teamId: string;
  name: string;
  description: string;
  maxNum: number;
  expireTime?: Date;
  userId: string;
  password?: string;
  // todo 定义枚举值类型，更规范
  status: TeamStatusEnum;
  createTime: Date;
  createUser?: UserType;
  hasJoin?: number;
  joinNum: number;
};

// 队伍状态
declare enum TeamStatusEnum {
  PUBLIC,
  PRIVATE,
  SECRET,
}
