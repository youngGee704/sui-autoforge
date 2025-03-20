// "use client"

// import { createContext, useContext, useState, type ReactNode } from "react"

// interface WalletContextType {
//   isConnected: boolean
//   walletAddress: string | null
//   connectWallet: (address: string) => void
//   disconnectWallet: () => void
// }

// const WalletContext = createContext<WalletContextType>({
//   isConnected: false,
//   walletAddress: null,
//   connectWallet: () => {},
//   disconnectWallet: () => {},
// })

// export const useWallet = () => useContext(WalletContext)

// interface WalletProviderProps {
//   children: ReactNode
// }

// export function WalletProvider({ children }: WalletProviderProps) {
//   const [isConnected, setIsConnected] = useState(false)
//   const [walletAddress, setWalletAddress] = useState<string | null>(null)

//   const connectWallet = (address: string) => {
//     setWalletAddress(address)
//     setIsConnected(true)
//   }

//   const disconnectWallet = () => {
//     setWalletAddress(null)
//     setIsConnected(false)
//   }

//   return (
//     <WalletContext.Provider value={{ isConnected, walletAddress, connectWallet, disconnectWallet }}>
//       {children}
//     </WalletContext.Provider>
//   )
// }

