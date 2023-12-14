import { QueryClientProvider } from "@tanstack/react-query";
import { trpcReact, trpcClient, queryClient } from "./renderer";


export function TrpcProvider(props: React.PropsWithChildren) {
  return (
    <trpcReact.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        { props.children }
      </QueryClientProvider>
    </trpcReact.Provider>
  );
}