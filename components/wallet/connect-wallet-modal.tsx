// import {useWallet} from '@suiet/wallet-kit';
// import {Transaction} from "@mysten/sui/transactions";
// import {useEffect} from "react";

// const App = () => {
//   const wallet = useWallet()

//   useEffect(() => {
//     if (!wallet.connected) return;
//     console.log('connected wallet name: ', wallet.name)
//     console.log('account address: ', wallet.account?.address)
//     console.log('account publicKey: ', wallet.account?.publicKey)
//   }, [wallet.connected])

//   // launch a move call for the connected account via wallet
//   async function handleMoveCall() {
//     const tx = new Transaction();
//     const packageObjectId = "0x1";
//     tx.moveCall({
//       target: `${packageObjectId}::nft::mint`,
//       arguments: [tx.pure.string("Example NFT")],
//     });
//     await wallet.signAndExecuteTransaction({
//       transaction: tx,
//     });
//   }

//   // launch a move call for the connected account via wallet
//   async function handleSignMessage() {
//     await wallet.signPersonalMessage({
//       message: new TextEncoder().encode("Hello World"),
//     });
//   }

//   return ()
// };