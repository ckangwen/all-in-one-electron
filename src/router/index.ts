import { createHashRouter } from "react-router-dom";
import Home from "@/pages/home/index";

const router = createHashRouter([
  {
    path: "/",
    Component: Home,
  },
]);

export default router;
