import axios from "axios";
import apiEndpoints from "@/constants/apiEndpoints";

export default {
  namespaced: true,
  state: {
    authData: JSON.parse(localStorage.getItem("authData")) || null,
    expiresAt: localStorage.getItem("expiresAt") || null,
  },
  mutations: {
    setAuthData(state, { authData, expiresAt }) {
      state.authData = { ...authData };
      state.expiresAt = expiresAt || new Date().getTime() +7200000
      localStorage.setItem("authData", JSON.stringify(state.authData));
      localStorage.setItem("expiresAt", JSON.stringify(state.expiresAt));
    },
    clearAuthData(state) {
      state.authData = null
      localStorage.removeItem("authData");
    }
  },
  actions: {
    login({commit}, { email, password }) {
      return new Promise((resolve,reject) => {
        axios
          .post(apiEndpoints.user.login, { email, password })
          .then((res)=>res.data)
          .then((data) => {
            commit("setAuthData", {...data.user});
            resolve()
          })
          .catch((err) => {
            reject(err.response.data);
          });
      });
    },
    clearAuthData({commit}) {
      commit("clearAuthData");
    }
  },
  getters: {
    authData: state=>state.authData
  },
};
