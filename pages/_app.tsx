import { AppProps } from "next/app";
import "../styles/globals.css";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "@/store/context/AuthContext";
import fonts from "@/libs/font";
import { DefaultSeo } from "next-seo";
import defaultSeoConfig from "@/configs/next-seo";

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
            <DefaultSeo {...defaultSeoConfig} />
            <Component {...pageProps} />
          </main>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
