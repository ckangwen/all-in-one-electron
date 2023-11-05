// import {
//   Router,
//   RootRoute,
//   Route,
//   createHashHistory,
// } from "@tanstack/react-router";
// import Layout from "@/components/Layout";
import {
  createHashRouter,
} from "react-router-dom"
import Home from "@/pages/home/index";
import SideTrigger from "@/pages/side-trigger/index";

// const rootRoute = new RootRoute({
//   component: Layout,
// });

// const homeRoute = new Route({
//   getParentRoute: () => rootRoute,
//   path: "/",
//   component: Home,
// });

// const sideTriggerRoute = new Route({
//   getParentRoute: () => rootRoute,
//   path: "/side-trigger",
//   component: SideTrigger,
// });

// const router = new Router({
//   routeTree: rootRoute.addChildren([homeRoute, sideTriggerRoute]),
//   history: createHashHistory(),
// });

// export default router;

const router = createHashRouter([
  {
    path: "/",
    Component: Home
  },
  {
    path: "/side-trigger",
    Component: SideTrigger
  }
])
export default router;