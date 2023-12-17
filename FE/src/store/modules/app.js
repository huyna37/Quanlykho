import instance from "@/Unilities/axios";
import { useCookies } from "vue3-cookies";

const state = {
  baseUrl: window.location.origin,
  isAuth: false,
  roles: "",
  user: null,
  isLoading: false,
  titleCurrent: "",
  env: process.env.NODE_ENV,
  isMobileDevice: false
};

const mutations = {
  SET_AUTH: (state, val) => {
    state.isAuth = val;
  },
  SET_ROLES: (state, val) => {
    state.roles = val;
  },
  SET_USER: (state, val) => {
    state.user = val;
  },
  SET_LOADING: (state, val) => {
    state.isLoading = val;
  },
  SET_TITLECURRENT: (state, val) => {
    state.titleCurrent = val;
  },
  SET_ISMOBILEDEVICE: (state, val) => {
    state.isMobileDevice = val;
  },
};

const actions = {
  setAuth({ commit }, val) {
    commit("SET_AUTH", val);
  },
  setRoles({ commit }, val) {
    commit("SET_ROLES", val);
  },
  setUser({ commit }) {
    if (state.isAuth == true) {
      const cookies = useCookies().cookies;
      const baseGetCurrentUser = "users/currentUser";
      instance
        .get(baseGetCurrentUser)
        .then((res) => {
          commit("SET_USER", res?.data?.data);
          commit("SET_ROLES", res?.data?.data?.role);
          cookies.set("user", JSON.stringify(res?.data?.data));
        })
    }
  },
  setIsLoading({ commit }, val) {
    commit("SET_LOADING", val);
  },
  setTitleCurrent({commit}, val) {
    commit("SET_TITLECURRENT", val);
  },
  setIsMobileDevice({commit}, val) {
    commit("SET_ISMOBILEDEVICE", val);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
