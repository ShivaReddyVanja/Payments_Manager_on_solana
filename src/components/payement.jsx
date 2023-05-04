import { ConnectionProvider, WalletProvider, useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { LAMPORTS_PER_SOL, SystemProgram, Transaction } from '@solana/web3.js';
import Web3 from 'web3';

const network = WalletAdapterNetwork.Devnet;

const PaymentHandler = () => {
  const { publicKey, sendTransaction } = useWallet();
  const connection = useConnection();

  const onClick = async () => {
    if (!publicKey) throw new Error("Wallet not connected");

    const web3 = new Web3(window.solana);
    const lamports = web3.utils.toWei('0.25', 'ether');
    const toAddress = 'YOUR_TARGET_SOLANA_ADDRESS';

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: toAddress,
        lamports,
      })
    );

    const { blockhash } = await connection.getRecentBlockhash();
    transaction.recentBlockhash = blockhash;

    const signature = await sendTransaction(transaction);

    console.log(`Transaction sent: ${signature}`);
  };

  const connectWallet = async () => {
    const [wallet, setWallet] = useState(null);
    const provider = new PhantomWalletAdapter();
    await provider.connect();
    setWallet(provider);
  };

  return (
    <div>
      <ConnectionProvider endpoint={network}>
        <WalletProvider wallets={[new PhantomWalletAdapter()]}>
          <button onClick={connectWallet}>Connect to Wallet</button>
          <button onClick={onClick}>Send Payment</button>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
};

export default PaymentHandler;
