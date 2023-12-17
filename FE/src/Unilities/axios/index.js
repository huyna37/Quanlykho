import store from "@/store/store";
import axios from "axios";
import swal from "sweetalert";
import { useCookies } from "vue3-cookies";
import { BASE_API } from "../constants";
import { commonMessage } from "../common";
const { cookies } = useCookies();
let baseApi = BASE_API;

const instance = axios.create({
  baseURL: baseApi,
});

instance.interceptors.request.use(
  (config) => {
    const token = cookies.get("access_token");
    store.dispatch("app/setIsLoading", true);
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    store.dispatch("app/setIsLoading", false);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    // ẩn thông báo loading
    store.dispatch("app/setIsLoading", false);
    return response;
  },
  (error) => {
    const token = cookies.get("access_token");
    store.dispatch("app/setIsLoading", false);
    if (
      error.response?.data?.message == "jwt expired" ||
      (!token && store._state.data.app.isAuth)
    ) {
      swal("Session của bạn đã hết", "vui lòng đăng nhập lại !!", "success");
      store.dispatch("app/setAuth", false);
      cookies.remove("access_token");
      cookies.remove("user");
      return;
    } else if (error.response?.data?.message) {
      swal(error.response.data.message);
    } else {
      swal(commonMessage);
    }
    // xử lý lỗi
    return Promise.reject(error);
  }
);

export default instance;
