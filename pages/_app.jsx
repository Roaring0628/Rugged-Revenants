import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "components/organisms/layout/Header";
import Footer from "components/organisms/layout/Footer";
import MetaTags from "components/organisms/layout/MetaTags";

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
      <MetaTags />
      <Header />
      <Component {...pageProps} />
      {!hideFooter && <Footer />}
    </>
  );
}

export default MyApp;
