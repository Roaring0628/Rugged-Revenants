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
  // const endpoint = "https://sleek-quiet-lambo.solana-mainnet.discover.quiknode.pro/05d4d05ed2a939d8da3cecbf417383d1192c0d40/" //useMemo(() => clusterApiUrl(network), [network]);
  // const endpoint = useMemo(() => clusterApiUrl(network), [network]);
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
    console.log('ERROR Happened in WalletProvider', error)
    notification["error"]({
      message: "Error",
      description: error.message
        ? `${error.name}: ${error.message}`
        : error.name,
    });
  }, []);

  return (
    // TODO: updates needed for updating and referencing endpoint: wallet adapter rework
    <ConnectionProvider endpoint={endpoint} config={{confirmTransactionInitialTimeout: 100000}}>
      <WalletProvider wallets={wallets} onError={onError} autoConnect>
        <ReactUIWalletModalProvider>
          {props.children}
        </ReactUIWalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default WalletContextProvider;
