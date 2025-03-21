// "use client"

// import { useState } from "react"
// import MainLayout from "../../components/layout/main-layout"
// import { ArrowDown, ArrowUp, Search } from "lucide-react"

// interface CryptoData {
//   id: string
//   name: string
//   symbol: string
//   price: number
//   change24h: number
//   volume24h: number
//   marketCap: number
// }

// // Mock data for demonstration
// const mockCryptoData: CryptoData[] = [
//   { id: "sui", name: "Sui", symbol: "SUI", price: 1.23, change24h: 5.67, volume24h: 123456789, marketCap: 1234567890 },
//   {
//     id: "bitcoin",
//     name: "Bitcoin",
//     symbol: "BTC",
//     price: 50123.45,
//     change24h: -2.34,
//     volume24h: 30123456789,
//     marketCap: 950123456789,
//   },
//   {
//     id: "ethereum",
//     name: "Ethereum",
//     symbol: "ETH",
//     price: 2789.12,
//     change24h: 1.23,
//     volume24h: 15123456789,
//     marketCap: 350123456789,
//   },
//   {
//     id: "binancecoin",
//     name: "Binance Coin",
//     symbol: "BNB",
//     price: 345.67,
//     change24h: -0.45,
//     volume24h: 5123456789,
//     marketCap: 60123456789,
//   },
//   {
//     id: "solana",
//     name: "Solana",
//     symbol: "SOL",
//     price: 89.12,
//     change24h: 7.89,
//     volume24h: 4123456789,
//     marketCap: 40123456789,
//   },
//   {
//     id: "cardano",
//     name: "Cardano",
//     symbol: "ADA",
//     price: 0.45,
//     change24h: -1.23,
//     volume24h: 2123456789,
//     marketCap: 15123456789,
//   },
//   {
//     id: "polkadot",
//     name: "Polkadot",
//     symbol: "DOT",
//     price: 12.34,
//     change24h: 3.45,
//     volume24h: 1123456789,
//     marketCap: 14123456789,
//   },
//   {
//     id: "dogecoin",
//     name: "Dogecoin",
//     symbol: "DOGE",
//     price: 0.12,
//     change24h: 10.45,
//     volume24h: 3123456789,
//     marketCap: 16123456789,
//   },
// ]

// export default function CryptoMarketPage() {
//   const [cryptoData, setCryptoData] = useState<CryptoData[]>(mockCryptoData)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [sortConfig, setSortConfig] = useState<{ key: keyof CryptoData; direction: "ascending" | "descending" } | null>(
//     null,
//   )

//   // Filter data based on search term
//   const filteredData = cryptoData.filter(
//     (crypto) =>
//       crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
//   )

//   // Sort data based on sort configuration
//   const sortedData = [...filteredData].sort((a, b) => {
//     if (!sortConfig) return 0

//     const { key, direction } = sortConfig
//     if (a[key] < b[key]) {
//       return direction === "ascending" ? -1 : 1
//     }
//     if (a[key] > b[key]) {
//       return direction === "ascending" ? 1 : -1
//     }
//     return 0
//   })

//   // Handle sorting
//   const requestSort = (key: keyof CryptoData) => {
//     let direction: "ascending" | "descending" = "ascending"
//     if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
//       direction = "descending"
//     }
//     setSortConfig({ key, direction })
//   }

//   // Format numbers for display
//   const formatNumber = (num: number, isCurrency = false) => {
//     if (isCurrency) {
//       return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(num)
//     }
//     return new Intl.NumberFormat("en-US").format(num)
//   }

//   return (
//     <MainLayout>
//       <div className="py-12 md:py-24">
//         <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8">
//           Crypto Market
//           <div className="w-48 sm:w-64 md:w-96 h-1 bg-[#4e8aff] mt-2"></div>
//         </h1>

//         <div className="mt-12">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//             <h2 className="text-2xl font-bold">Top Cryptocurrencies</h2>
//             <div className="relative w-full sm:w-auto">
//               <input
//                 type="text"
//                 placeholder="Search cryptocurrency..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full sm:w-64 p-2 pl-10 bg-[#1f2937] border border-gray-700 rounded-lg focus:ring-[#4e8aff] focus:border-[#4e8aff] outline-none"
//               />
//               <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
//             </div>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="bg-[#1f2937] text-left">
//                   <th className="p-4 cursor-pointer" onClick={() => requestSort("name")}>
//                     <div className="flex items-center gap-2">
//                       Name
//                       {sortConfig?.key === "name" &&
//                         (sortConfig.direction === "ascending" ? <ArrowUp size={16} /> : <ArrowDown size={16} />)}
//                     </div>
//                   </th>
//                   <th className="p-4 cursor-pointer" onClick={() => requestSort("price")}>
//                     <div className="flex items-center gap-2">
//                       Price
//                       {sortConfig?.key === "price" &&
//                         (sortConfig.direction === "ascending" ? <ArrowUp size={16} /> : <ArrowDown size={16} />)}
//                     </div>
//                   </th>
//                   <th className="p-4 cursor-pointer" onClick={() => requestSort("change24h")}>
//                     <div className="flex items-center gap-2">
//                       24h Change
//                       {sortConfig?.key === "change24h" &&
//                         (sortConfig.direction === "ascending" ? <ArrowUp size={16} /> : <ArrowDown size={16} />)}
//                     </div>
//                   </th>
//                   <th className="p-4 cursor-pointer hidden md:table-cell" onClick={() => requestSort("volume24h")}>
//                     <div className="flex items-center gap-2">
//                       24h Volume
//                       {sortConfig?.key === "volume24h" &&
//                         (sortConfig.direction === "ascending" ? <ArrowUp size={16} /> : <ArrowDown size={16} />)}
//                     </div>
//                   </th>
//                   <th className="p-4 cursor-pointer hidden md:table-cell" onClick={() => requestSort("marketCap")}>
//                     <div className="flex items-center gap-2">
//                       Market Cap
//                       {sortConfig?.key === "marketCap" &&
//                         (sortConfig.direction === "ascending" ? <ArrowUp size={16} /> : <ArrowDown size={16} />)}
//                     </div>
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {sortedData.map((crypto) => (
//                   <tr key={crypto.id} className="border-b border-gray-800 hover:bg-[#1f2937]">
//                     <td className="p-4">
//                       <div className="flex items-center gap-2">
//                         <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
//                         <div>
//                           <div className="font-medium">{crypto.name}</div>
//                           <div className="text-gray-400 text-sm">{crypto.symbol}</div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="p-4 font-medium">{formatNumber(crypto.price, true)}</td>
//                     <td className={`p-4 font-medium ${crypto.change24h >= 0 ? "text-green-500" : "text-red-500"}`}>
//                       {crypto.change24h >= 0 ? "+" : ""}
//                       {crypto.change24h.toFixed(2)}%
//                     </td>
//                     <td className="p-4 hidden md:table-cell">{formatNumber(crypto.volume24h, true)}</td>
//                     <td className="p-4 hidden md:table-cell">{formatNumber(crypto.marketCap, true)}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import MainLayout from "../../components/layout/main-layout"
import { ArrowDown, ArrowUp, Search } from "lucide-react"

interface CryptoData {
  name: string
  price: number
  price_change_24h: number
  volume_24h: number
  market_cap: number
}

const API_URL = "https://monilydum-production-e42d.up.railway.app/api/crypto-prices"

export default function CryptoMarketPage() {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState<{ key: keyof CryptoData; direction: "ascending" | "descending" } | null>(
    null
  )
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch(API_URL,{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ currency: "usd" })
        }
      )
        const data = await response.json()
        console.log("Fetched data:", data)
        if (data && data.data) {
          setCryptoData(data.data)
        } else {
          console.error("Unexpected API response format:", data)
        }
      } catch (error) {
        console.error("Error fetching crypto data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCryptoData()
  }, [])

  const filteredData = cryptoData.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig) return 0
    const { key, direction } = sortConfig
    return direction === "ascending" ? (a[key] > b[key] ? 1 : -1) : a[key] < b[key] ? 1 : -1
  })

  const requestSort = (key: keyof CryptoData) => {
    let direction: "ascending" | "descending" = "ascending"
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  const formatNumber = (num: number, isCurrency = false) => {
    return new Intl.NumberFormat("en-US", isCurrency ? { style: "currency", currency: "USD" } : {}).format(num)
  }

return (
    <MainLayout>
      <div className="py-12 md:py-24">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8">Crypto Market</h1>
        <div className="relative w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search cryptocurrency..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64 p-2 pl-10 border border-gray-700 rounded-lg"
          />
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>
        <div className="overflow-x-auto mt-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-800 text-left">
                {["name", "price", "price_change_24h", "volume_24h", "market_cap"].map((key) => (
                  <th key={key} className="p-4 cursor-pointer" onClick={() => requestSort(key as keyof CryptoData)}>
                    <div className="flex items-center gap-2">
                      {key.replace("_", " ").toUpperCase()}
                      {sortConfig?.key === key && (sortConfig.direction === "ascending" ? <ArrowUp size={16} /> : <ArrowDown size={16} />)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 10 }).map((_, index) => (
                    <tr key={index} className="border-b border-gray-700">
                      <td className="p-4" colSpan={5}>
                        <div className="w-full h-6 bg-gray-700 rounded animate-pulse"></div>
                      </td>
                    </tr>
                  ))
                : sortedData.map((crypto) => (
                    <tr key={crypto.name} className="border-b border-gray-800 hover:bg-gray-900">
                      <td className="p-4 font-medium">{crypto.name.toUpperCase()}</td>
                      <td className="p-4 font-medium">{formatNumber(crypto.price, true)}</td>
                      <td className={`p-4 font-medium ${crypto.price_change_24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                        {crypto.price_change_24h.toFixed(2)}%
                      </td>
                      <td className="p-4">{formatNumber(crypto.volume_24h, true)}</td>
                      <td className="p-4">{formatNumber(crypto.market_cap, true)}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  )
}
