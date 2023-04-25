//some pieces of code are commented beacuse they are not necessary, or causing unwanted problems
import { useState } from "react";
import { Connection, PublicKey, SystemProgram ,Transaction} from "@solana/web3.js";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";


const connection = new Connection("https://api.mainnet-beta.solana.com");

const amount = 1; // Change this to the desired payment amount
const destination = "2qHKuKEevsyzqMSFLEhL69MyG4uNY8LnTJDcxVTT631J"; // Change this to the recipient's wallet address
// const memo = "YOUR"; // Change this to a unique memo for your transaction

export default function PaymentHandler() {
  const [status, setStatus] = useState("Connect your Solana wallet");
  // const { publicKey, wallet } = useWallet();
  const [wallet, setWallet] = useState(null);
 

  const connectWallet = async () => {
    const provider = new PhantomWalletAdapter();
    await provider.connect();
    setWallet(provider);
    setStatus(`Connected to wallet ${wallet.publicKey.toBase58()}`);
    
    
  };
 
  const sendPayment = async () => {
    // const walletAccount = await connectWallet.provider.getAccountInfo(wallet.publicKey);

    const transaction = new Transaction();
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: new PublicKey(destination),
        lamports: amount * 1000000000,
      })
    );
//try to fix this blockchash, and sign the transaction , and send it
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;

    const signature = await wallet.signTransaction(transaction);

    const signedTransaction = transaction.addSignature(wallet.publicKey, signature);

    setStatus(`Payment sent with signature: ${signature}`);

    // const transactionId = await connection.sendTransaction(signedTransaction);

    await connection.confirmTransaction(signature);
    setStatus(`Transaction ${transactionId} sent`);
  };

  return (
    <div>
      <button onClick={connectWallet}>{status}</button>
    
        <button onClick={sendPayment}>Send Payment</button>
    
    </div>
  );
}
