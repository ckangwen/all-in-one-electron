import { createHashRouter } from "react-router-dom";
import Home from "@/pages/home/index";
import Memo from "@/pages/memo/index";

const router = createHashRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/memo",
    Component: Memo,
  },
]);

export default router;
