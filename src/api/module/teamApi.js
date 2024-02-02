import request from "../request";
const BASE_URL = "/team";

/**
 * 分页搜索队伍
 * @param {} teamQueryDto
 */
export const searchTeam = (teamQueryDto) => {
  return request({
    url: `${BASE_URL}/list`,
    method: "post",
    data: teamQueryDto,
  });
};

/**
 * 新增队伍
 * @param {UserType} teamAddDto
 */
export const addTeam = (teamAddDto) => {
  return request({
    url: `${BASE_URL}/add`,
    method: "post",
    data: teamAddDto,
  });
};

/**
 * 加入队伍
 * @param { String teamId; String password;} teamJoinDto
 */
export const joinTeam = (teamJoinDto) => {
  return request({
    url: `${BASE_URL}/join`,
    method: "post",
    data: teamJoinDto,
  });
};
/**
 * 退出队伍
 * @param {string} teamId
 */
export const quitTeam = (teamId) => {
  return request({
    url: `${BASE_URL}/quit`,
    method: "post",
    data: teamId,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
};
/**
 * 解散队伍
 * @param {string} teamId
 */
export const deleteTeam = (teamId) => {
  return request({
    url: `${BASE_URL}/delete`,
    method: "post",
    data: teamId,
  });
};
