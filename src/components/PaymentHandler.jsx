//some pieces of code are commented beacuse they are not necessary, or causing unwanted problems
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { Connection,PublicKey,Keypair,Transaction,LAMPORTS_PER_SOL,SystemProgram, sendAndConfirmTransaction} from "@solana/web3.js";

export default function PaymentHandler() {
  const secret= Uint8Array.from([142,12,245,90,104,248,153,220,17,80,189,246,246,246,183,203,65,192,216,246,126,51,17,45,168,189,196,233,35,189,83,168,187,104,149,68,181,181,221,131,183,196,79,252,166,159,31,129,21,112,94,217,144,27,74,20,125,123,67,68,84,252,206,22])
const fromKeyPair = Keypair.fromSecretKey(secret);
const toPublicKey = new PublicKey('2qHKuKEevsyzqMSFLEhL69MyG4uNY8LnTJDcxVTT631J');
 

  const connectWallet = async () => {
    const provider = new PhantomWalletAdapter();
    await provider.connect();
    
    
  };
 
  const transferSol = async (from,to,amount)=>{
    const connection = new Connection('https://api.devnet.solana.com','confirmed');
    
    const transaction = new Transaction();
    const instruction = SystemProgram.transfer({
     fromPubkey:from.publicKey,
     toPubkey:to,
     lamports:LAMPORTS_PER_SOL * amount
    }) ;
    transaction.add(instruction);
    await sendAndConfirmTransaction(connection,transaction,[
        from
     ])
     console.log("done")
 }

  return (
    <div>
      <button onClick={connectWallet}>{}</button>
    
        <button onClick={(async ()=>{
    
 
    await transferSol(fromKeyPair,toPublicKey,0.2);
   
})}>Send Payment</button>
    
    </div>
  );
}

