import Vue from "vue";
import VueRouter from "vue-router";

import Cart from "@/components/Shop/Cart";
import ProductsList from "@/components/Shop/ProductsList";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: ProductsList, name: 'ProductsList' },
  { path: "/cart", component: Cart, name: 'Cart' },
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
