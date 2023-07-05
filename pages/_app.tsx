import { Layout } from "@/components/Layout";
import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import { Montserrat } from "next/font/google";
import { Toaster } from "react-hot-toast";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={montserrat.className}>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider>
          <ReactQueryDevtools initialIsOpen={false} />
          <Toaster />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </NextUIProvider>
      </QueryClientProvider>
    </div>
  );
}
