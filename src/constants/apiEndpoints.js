export default {
  products: {
    read: `${process.env.VUE_APP_API_URL}/products/list`,
  },
  user: {
    signup: `${process.env.VUE_APP_API_URL}/users/signup`,
    login: `${process.env.VUE_APP_API_URL}/users/login`,
  },
};
