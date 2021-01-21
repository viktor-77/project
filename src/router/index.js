import Vue from "vue";
import VueRouter from "vue-router";

import Shop from "@/components/Shop";
import LogIn from "@/components/LogIn";
import SignUp from "@/components/SignUp";


Vue.use(VueRouter);

const routes = [
  { path: "/", component: Shop, name: 'Shop' },
  { path: "/login", component: LogIn, name: 'LogIn' },
  { path: "/signup", component: SignUp, name: 'SignUp' },
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
