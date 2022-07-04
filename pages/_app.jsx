import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "components/organisms/layout/Header";
import Footer from "components/organisms/layout/Footer";
import MetaTags from "components/organisms/layout/MetaTags";
import WalletContextProvider from "../contexts/WalletContextProvider";
import "@solana/wallet-adapter-react-ui/styles.css";

import "styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [hideFooter, setHideFooter] = useState(false);

  useEffect(() => {
    if (router.pathname) {
      if (["/charge-success"].includes(router.pathname)) {
        setHideFooter(true);
      } else {
        setHideFooter(false);
      }
    }
  }, [router]);

  return (
    <>
      <Head>
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-FTC8Q8T4HF`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', 'G-FTC8Q8T4HF');
            `,
          }}
        />
      </Head>
      <WalletContextProvider>
        <MetaTags />
        <Header />
        <Component {...pageProps} />
        {!hideFooter && <Footer />}
      </WalletContextProvider>
    </>
  );
}

export default MyApp;
