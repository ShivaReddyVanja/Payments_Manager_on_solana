import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet} from '@solana/wallet-adapter-react';
import { SystemProgram, Transaction, LAMPORTS_PER_SOL } from '@solana/web3.js';
import  { useCallback, useState } from 'react';



export const PaymentHandler = () => {
    const [balance,setBalance]=useState(0);
    const [toPublickey,setToPublickey]= useState('');

    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const [amount,setAmount] = useState(0)
    const onClick = useCallback(async () => {
        if (!publicKey) throw new WalletNotConnectedError();
        const lamports = LAMPORTS_PER_SOL * amount;

        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: toPublickey,
                lamports,
            })
        );

        const {
            context: { slot: minContextSlot },
            value: { blockhash, lastValidBlockHeight }
        } = await connection.getLatestBlockhashAndContext();

        const signature = await sendTransaction(transaction, connection, { minContextSlot });

        await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature });
    }, [publicKey, sendTransaction, connection,toPublickey,amount]);
    const balanceFetcher = async () =>{
        setBalance(await connection.getBalance(publicKey))
    }

    return (
<>
<label>
                To Public Key:
                <input type="text" value={toPublickey} onChange={e => setToPublickey(e.target.value)} />
            </label><br/>
        <label>
            Enter the amount to be sent:
            <input type = "number" value = {amount} onChange={e=>setAmount(e.target.value)}/></label>
        <button onClick={onClick} disabled={!publicKey}>
        send 
        </button>
        <br/>
        <button onClick={balanceFetcher}>
            show balance
        </button>
<br/>
        <label>
            your balance is :{balance}
        </label>
        
        </>
    );
};
