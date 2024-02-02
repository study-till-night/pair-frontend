import axios from "axios";
import { showNotify, showToast, showDialog } from "vant";
import errorCode from "../utils/errorCode.js";
import pinia from "@/store/index";
import { useUserStore } from "@/store/module/user";

let isReloginShow = false;
// 从同一个pinia实例中获取store

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 10000,
});
// 自带cookie进行验证
service.defaults.withCredentials = true;
// 响应拦截器
service.interceptors.response.use(
  (res) => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200;
    // 获取错误信息
    const msg = errorCode[code] || res.data.msg || errorCode["default"];
    // 获取错误详细描述
    const description = res.data.description || "";
    if (
      res.request.responseType === "blob" ||
      res.request.responseType === "arraybuffer"
    )
      return res.data;
    //  登录状态已过期
    if (code === 402) {
      if (!isReloginShow) {
        isReloginShow = true;
        showDialog({
          title: "系统提示",
          message: "登录状态已过期，您可以继续留在该页面，或者重新登录",
        })
          .then(() => {
            isReloginShow = false;
            // 重置store中用户数据
            const userStore = useUserStore(pinia);
            userStore.$reset();
          })
          .catch(() => {
            isReloginShow = false;
          });
      }
      return {
        message: "无效的会话，或者会话已过期，请重新登录。",
        success: false,
      };
    } else if (code === 200 && msg.includes("成功"))
      showToast({ type: "success", message: msg });
    else if (code !== 200) {
      // 业务异常
      showToast({ type: "danger", message: `${msg} ${description}` });
      // 业务异常返回自定义响应体 return Promise.reject(error) 需要在外层catch 使用await 接收参数时还要额外判断
      return {
        message: errMsg,
        success: false,
      };
    }
    // 记得将数据返回
    return res.data;
  },
  // 系统异常 直接报错
  (err) => {
    console.log("err" + err);
    let { message } = err;
    if (message.includes("Network Error")) {
      message = "后端接口连接异常";
    } else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    } else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    showToast({ type: "danger", message });
    return Promise.reject(err);
  }
);
export default service;
