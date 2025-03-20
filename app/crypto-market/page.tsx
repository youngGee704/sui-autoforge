"use client"

import { useState } from "react"
import MainLayout from "../../components/layout/main-layout"
import { ArrowDown, ArrowUp, Search } from "lucide-react"

interface CryptoData {
  id: string
  name: string
  symbol: string
  price: number
  change24h: number
  volume24h: number
  marketCap: number
}

// Mock data for demonstration
const mockCryptoData: CryptoData[] = [
  { id: "sui", name: "Sui", symbol: "SUI", price: 1.23, change24h: 5.67, volume24h: 123456789, marketCap: 1234567890 },
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    price: 50123.45,
    change24h: -2.34,
    volume24h: 30123456789,
    marketCap: 950123456789,
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    price: 2789.12,
    change24h: 1.23,
    volume24h: 15123456789,
    marketCap: 350123456789,
  },
  {
    id: "binancecoin",
    name: "Binance Coin",
    symbol: "BNB",
    price: 345.67,
    change24h: -0.45,
    volume24h: 5123456789,
    marketCap: 60123456789,
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    price: 89.12,
    change24h: 7.89,
    volume24h: 4123456789,
    marketCap: 40123456789,
  },
  {
    id: "cardano",
    name: "Cardano",
    symbol: "ADA",
    price: 0.45,
    change24h: -1.23,
    volume24h: 2123456789,
    marketCap: 15123456789,
  },
  {
    id: "polkadot",
    name: "Polkadot",
    symbol: "DOT",
    price: 12.34,
    change24h: 3.45,
    volume24h: 1123456789,
    marketCap: 14123456789,
  },
  {
    id: "dogecoin",
    name: "Dogecoin",
    symbol: "DOGE",
    price: 0.12,
    change24h: 10.45,
    volume24h: 3123456789,
    marketCap: 16123456789,
  },
]

export default function CryptoMarketPage() {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>(mockCryptoData)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState<{ key: keyof CryptoData; direction: "ascending" | "descending" } | null>(
    null,
  )

  // Filter data based on search term
  const filteredData = cryptoData.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Sort data based on sort configuration
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig) return 0

    const { key, direction } = sortConfig
    if (a[key] < b[key]) {
      return direction === "ascending" ? -1 : 1
    }
    if (a[key] > b[key]) {
      return direction === "ascending" ? 1 : -1
    }
    return 0
  })

  // Handle sorting
  const requestSort = (key: keyof CryptoData) => {
    let direction: "ascending" | "descending" = "ascending"
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  // Format numbers for display
  const formatNumber = (num: number, isCurrency = false) => {
    if (isCurrency) {
      return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(num)
    }
    return new Intl.NumberFormat("en-US").format(num)
  }

  return (
    <MainLayout>
      <div className="py-12 md:py-24">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8">
          Crypto Market
          <div className="w-48 sm:w-64 md:w-96 h-1 bg-[#4e8aff] mt-2"></div>
        </h1>

        <div className="mt-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold">Top Cryptocurrencies</h2>
            <div className="relative w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search cryptocurrency..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 p-2 pl-10 bg-[#1f2937] border border-gray-700 rounded-lg focus:ring-[#4e8aff] focus:border-[#4e8aff] outline-none"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#1f2937] text-left">
                  <th className="p-4 cursor-pointer" onClick={() => requestSort("name")}>
                    <div className="flex items-center gap-2">
                      Name
                      {sortConfig?.key === "name" &&
                        (sortConfig.direction === "ascending" ? <ArrowUp size={16} /> : <ArrowDown size={16} />)}
                    </div>
                  </th>
                  <th className="p-4 cursor-pointer" onClick={() => requestSort("price")}>
                    <div className="flex items-center gap-2">
                      Price
                      {sortConfig?.key === "price" &&
                        (sortConfig.direction === "ascending" ? <ArrowUp size={16} /> : <ArrowDown size={16} />)}
                    </div>
                  </th>
                  <th className="p-4 cursor-pointer" onClick={() => requestSort("change24h")}>
                    <div className="flex items-center gap-2">
                      24h Change
                      {sortConfig?.key === "change24h" &&
                        (sortConfig.direction === "ascending" ? <ArrowUp size={16} /> : <ArrowDown size={16} />)}
                    </div>
                  </th>
                  <th className="p-4 cursor-pointer hidden md:table-cell" onClick={() => requestSort("volume24h")}>
                    <div className="flex items-center gap-2">
                      24h Volume
                      {sortConfig?.key === "volume24h" &&
                        (sortConfig.direction === "ascending" ? <ArrowUp size={16} /> : <ArrowDown size={16} />)}
                    </div>
                  </th>
                  <th className="p-4 cursor-pointer hidden md:table-cell" onClick={() => requestSort("marketCap")}>
                    <div className="flex items-center gap-2">
                      Market Cap
                      {sortConfig?.key === "marketCap" &&
                        (sortConfig.direction === "ascending" ? <ArrowUp size={16} /> : <ArrowDown size={16} />)}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map((crypto) => (
                  <tr key={crypto.id} className="border-b border-gray-800 hover:bg-[#1f2937]">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                        <div>
                          <div className="font-medium">{crypto.name}</div>
                          <div className="text-gray-400 text-sm">{crypto.symbol}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-medium">{formatNumber(crypto.price, true)}</td>
                    <td className={`p-4 font-medium ${crypto.change24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                      {crypto.change24h >= 0 ? "+" : ""}
                      {crypto.change24h.toFixed(2)}%
                    </td>
                    <td className="p-4 hidden md:table-cell">{formatNumber(crypto.volume24h, true)}</td>
                    <td className="p-4 hidden md:table-cell">{formatNumber(crypto.marketCap, true)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

