import { ipcLink } from "electron-trpc/renderer";
import { AppRouter } from "@revealing/api";
import { createTRPCReact } from "@trpc/react-query";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const trpcReact = createTRPCReact<AppRouter>();

export const trpcClient = trpcReact.createClient({
  links: [ipcLink()],
});
