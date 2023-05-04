//this code is separated beacause use for reference , it connects phantom wallet to our app,use implementation from this in other componenets
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { useState } from "react";



const Wallet = () => {
  const [wallet, setWallet] = useState(null);
  const [balance, setBalance] = useState(null);

  const connectWallet = async () => {
    const provider = new PhantomWalletAdapter();
    await provider.connect();
    setWallet(provider);
    
    
  };

  const disconnectWallet = async () => {
    await wallet.disconnect();
    setWallet(null);
    setBalance(null);
  };

  const fetchBalance = async () => {
    try {
      const response = await fetch(`http://localhost:3001/balance/${wallet.publicKey}`);
      const data = await response.text();
      setBalance(data);
    } catch (error) {
      console.error(error);
      setBalance('Error fetching balance');
    }
  };

  return (
    <div>
      {wallet ? (
        <div>
          <button onClick={disconnectWallet}>Disconnect from Phantom</button>
          <p>Connected to {wallet.publicKey.toBase58()}</p>
        
          <button onClick={fetchBalance}>Fetch Balance</button>
          <p>{balance}</p>
        </div>
      ) : (
        <button onClick={connectWallet}>Connect to Phantom</button>
      )}
    </div>
  );
};

export default Wallet;