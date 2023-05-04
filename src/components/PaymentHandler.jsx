import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { SystemProgram, Transaction, LAMPORTS_PER_SOL } from '@solana/web3.js';
import  { useCallback, useState } from 'react';



export const PaymentHandler = () => {
    const [toPublickey,setToPublickey]= useState('');

    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const onClick = useCallback(async () => {
        if (!publicKey) throw new WalletNotConnectedError();

        const lamports = LAMPORTS_PER_SOL * 0.25;

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
    }, [publicKey, sendTransaction, connection,toPublickey]);

    return (
<>
<label>
                To Public Key:
                <input type="text" value={toPublickey} onChange={e => setToPublickey(e.target.value)} />
            </label>
        <button onClick={onClick} disabled={!publicKey}>
        send 
        </button>
        </>
    );
};