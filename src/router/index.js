import Vue from "vue";
import VueRouter from "vue-router";

import Shop from "@/components/Shop";
import LogIn from "@/components/LogIn";
import SighnUp from "@/components/SighnUp";


Vue.use(VueRouter);

const routes = [
  { path: "/", component: Shop, name: 'Shop' },
  { path: "/login", component: LogIn, name: 'LogIn' },
  { path: "/sighnup", component: SighnUp, name: 'SighnUp' },
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
