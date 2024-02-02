import request from "../request";
const BASE_URL = "/user";

/**
 * 登录
 * @param {} username 用户名
 * @param {*} password  密码
 */
export const doLogin = (username, password) => {
  return request({
    url: `${BASE_URL}/login`,
    method: "post",
    data: {
      username,
      password,
    },
  });
};

/**
 * 注册
 * @param {} username 用户名
 * @param {*} password  密码
 */
export const doRegister = (username, password, checkPassword) => {
  return request({
    url: `${BASE_URL}/register`,
    method: "post",
    data: {
      registerBody: {
        username,
        password,
        checkPassword,
      },
    },
  });
};

/**
 * 退出登录
 */
export const doLogout = () => {
  return request({
    url: `${BASE_URL}/logout`,
    method: "post",
  });
};

/**
 * 获取当前登录用户
 */
export const getCurrentUser = () => {
  return request({
    url: `${BASE_URL}/current`,
    method: "get",
  });
};

/**
 * 根据标签搜索用户
 * @param {Array} tagsList 搜索标签列表
 */
export const searchByTags = (tagNameList) => {
  /*  json序列化
   tagNameList = JSON.stringify(tagNameList); */
  return request({
    url: `${BASE_URL}/search-by-tags`,
    method: "post",
    // 若写成data: { tagListJson } 则后端会解析为{ "tagListJson": [] } 传多个对象时需要这么写 同时后端用Map接收
    // 下方写法则后端直接解析为[] 
    data: tagNameList,
    /* 
    传入json数据必须配置 "Content-Type": "application/json"
    headers: {
      "Content-Type": "application/json"
    } 
    */
  });
};

/**
 * 修改用户信息
 * @param {*} user 修改后用户对象
 */
export const updateUser = (user) => {
  return request({
    url: `${BASE_URL}/update`,
    method: "post",
    data: user,
  });
};

/**
 * 首页推荐
 */
export const recommend = (pageSize, pageNum) => {
  return request({
    url: `${BASE_URL}/recommend`,
    method: "get",
    params: {
      pageSize,
      pageNum
    }
  });
};
