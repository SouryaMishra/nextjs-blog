/* This App component is the top-level component which will be common across all the different pages.
 You can use this App component to keep state when navigating between pages */

// Only _app.tsx can contain global styles for all the pages
import "../styles/global.css";
import { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
