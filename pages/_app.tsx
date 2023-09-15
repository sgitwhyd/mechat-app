import { AppProps } from "next/app";
import "../styles/globals.css";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Averia_Sans_Libre } from "@next/font/google";
import { AuthProvider } from "@/store/context/AuthContext";

const averiaSans = Averia_Sans_Libre({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-averia",
});

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <AuthProvider>
          <main className={averiaSans.className}>
            <Component {...pageProps} />
          </main>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
