import { AppProps } from "next/app";
import "../styles/globals.css";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "@/store/context/AuthContext";
import fonts from "@/libs/font";

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            useErrorBoundary: true,
            refetchOnWindowFocus: false,
            retry: false,
          },
        },
      })
  );
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <AuthProvider>
          <main className={fonts.averiaSans.className}>
            <Component {...pageProps} />
          </main>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
