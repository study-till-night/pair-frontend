/**
 * 用户信息类型
 */
declare type UserType = {
  userId: string;
  username: string;
  nickName: string;
  description: string;
  email: string;
  phone: string;
  gender: number;
  tags: string[];
  role: number;
  isVaild: number;
  createTime: Date;
};
