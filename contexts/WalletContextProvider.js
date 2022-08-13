import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider as ReactUIWalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { notification } from "antd";
import { useCallback, useMemo } from "react";

const WalletContextProvider = (props) => {
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = "https://solana-mainnet.g.alchemy.com/v2/I5XOmtgE2oEvJDzRDfJ3wxIFhYu28uhn" //useMemo(() => clusterApiUrl(network), [network]);
  console.log('endpoint', endpoint)
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new SolletWalletAdapter({ network }),
      new SolletExtensionWalletAdapter({ network }),
      new TorusWalletAdapter(),
    ],
    [network]
  );

  const onError = useCallback((error) => {
    notification["error"]({
      message: "Error",
      description: error.message
        ? `${error.name}: ${error.message}`
        : error.name,
    });
    console.error(error);
  }, []);

  return (
    // TODO: updates needed for updating and referencing endpoint: wallet adapter rework
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} onError={onError} autoConnect={true}>
        <ReactUIWalletModalProvider>
          {props.children}
        </ReactUIWalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default WalletContextProvider;
