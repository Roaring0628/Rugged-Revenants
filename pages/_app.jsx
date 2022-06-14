import Header from "components/organisms/layout/Header";
import Footer from "components/organisms/layout/Footer";
import MetaTags from "components/organisms/layout/MetaTags";
import WalletContextProvider from "../contexts/WalletContextProvider";
import "@solana/wallet-adapter-react-ui/styles.css";

import "styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <>
    <WalletContextProvider>
      <MetaTags />
      <Header />
      <Component {...pageProps} />
      <Footer />
      </WalletContextProvider>
    </>
  );
}

export default MyApp;
