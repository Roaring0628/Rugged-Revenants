import Header from "components/organisms/layout/Header";
import Footer from "components/organisms/layout/Footer";
import MetaTags from "components/organisms/layout/MetaTags";

import "styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <MetaTags />
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
