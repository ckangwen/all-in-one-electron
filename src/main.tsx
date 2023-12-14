import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { TrpcProvider } from "@revealing/trpc/react";
import router from "@/router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TrpcProvider>
      <RouterProvider router={router}></RouterProvider>
    </TrpcProvider>
  </React.StrictMode>
);
