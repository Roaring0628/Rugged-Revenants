import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Script from "next/script";
import Header from "components/organisms/layout/Header";
import Footer from "components/organisms/layout/Footer";
import MetaTags from "components/organisms/layout/MetaTags";
import WalletContextProvider from "contexts/WalletContextProvider";
import { NotificationContextProvider } from "contexts/NotificationContext";
import NotificationModal from "components/molecules/NotificationModal";
import { LoadingContextProvider } from "contexts/LoadingContext";
import LoadingModal from "components/molecules/LoadingModal";
import "@solana/wallet-adapter-react-ui/styles.css";

import "styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [hideFooter, setHideFooter] = useState(false);

  useEffect(() => {
    if (router.pathname) {
      if (
        [
          "/charge-success",
          "/burn-rugged-nfts",
          "/inventory",
          "/upgrade-nft",
        ].includes(router.pathname)
      ) {
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
      <Script
        src="https://www.gstatic.com/firebasejs/7.19.1/firebase-app.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://www.gstatic.com/firebasejs/7.19.1/firebase-database.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://www.gstatic.com/firebasejs/7.19.1/firebase-auth.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://www.gstatic.com/firebasejs/7.19.1/firebase-storage.js"
        strategy="beforeInteractive"
      />
      <WalletContextProvider>
        <NotificationContextProvider>
          <LoadingContextProvider>
            <NotificationModal />
            <LoadingModal />
            <MetaTags />
            <Header />
            <Component {...pageProps} />
            {!hideFooter && <Footer />}
          </LoadingContextProvider>
        </NotificationContextProvider>
      </WalletContextProvider>
    </>
  );
}

export default MyApp;
