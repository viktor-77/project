import axios from "axios";
import apiEndpoints from "@/constants/apiEndpoints";

export default {
  namespaced:true,
  
  state: {
    productsList: [],
  },
  mutations: {
    setProductsListData(state, data) {
        state.productsList = [...data];
    },
  },

  actions: {
    loadData({ commit }) {
        return new Promise((resolve, reject) => {
          axios
            .get(apiEndpoints.products.read)
            .then(res => res.data)
            .then((resData) => {
              if (resData.success) {
                commit("setProductsListData", resData.products);
              }
              resolve(true);
            })
            .catch((err) => {
              console.log(err);
              reject(false);
            })
        });
    },
  },

  getters: {
    productsList: state => state.productsList,
  },
};
