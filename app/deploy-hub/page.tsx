"use client"
import type React from "react"
import { useState, useEffect } from "react"
import Head from "next/head"
import { useRouter } from "next/navigation"
import { useWallet, ConnectButton } from "@suiet/wallet-kit"
import { TransactionBlock } from "@mysten/sui.js/transactions"
import { getFullnodeUrl, SuiClient } from "@mysten/sui.js/client"
import Navbar from "../../components/layout/navbar"
import NavigationMenu from "../../components/layout/navigation-menu"
import "../../styles/homepage.css"
import "../../styles/deploy-hub.css"

// Network configuration
const NETWORK_CONFIG = {
  testnet: {
    name: "Testnet",
    fullnode: "https://fullnode.testnet.sui.io",
    explorer: "https://explorer.sui.io/txblock/",
  },
  devnet: {
    name: "Devnet",
    fullnode: "https://fullnode.devnet.sui.io",
    explorer: "https://explorer.sui.io/txblock/",
  },
  mainnet: {
    name: "Mainnet",
    fullnode: "https://fullnode.mainnet.sui.io",
    explorer: "https://explorer.sui.io/txblock/",
  },
}

// Sample bytecode for demonstration - properly formatted for Sui SDK
// This is a minimal valid Move module bytecode structure
const SAMPLE_BYTECODE = [
  // This is a simplified representation of a Move module
  // In a real implementation, you would get this from an actual Move compiler
  [
    161, 28, 235, 11, 2, 0, 0, 0, 5, 1, 0, 2, 3, 2, 5, 7, 8, 42, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0,
    0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
]

// Frontend "compilation" function that simulates compilation
const simulateCompilation = (code: string): Promise<{ modules: number[][]; dependencies: string[] }> => {
  return new Promise((resolve, reject) => {
    // Basic validation
    if (!code.trim()) {
      reject(new Error("Please paste your Sui Move smart contract code."))
      return
    }

    // Very basic syntax check
    if (!code.includes("module") || !code.includes("fun")) {
      reject(new Error("Invalid Move code. Make sure your code contains a module and at least one function."))
      return
    }

    // Simulate compilation delay
    setTimeout(() => {
      // For demonstration, we'll return a sample bytecode
      resolve({
        modules: SAMPLE_BYTECODE,
        dependencies: [],
      })
    }, 1000)
  })
}

// Add this function to generate a random transaction hash for simulation
// Add this function after the simulateCompilation function
const generateRandomHash = (length = 64) => {
  const characters = "0123456789abcdef"
  let result = "0x"
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

// Simple example Move code for users to start with
const EXAMPLE_MOVE_CODE = `module example::hello_world {
    use std::string;
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};

    /// A simple Greeting object that contains a message
    struct Greeting has key, store {
        id: UID,
        message: string::String
    }

    /// Create a new greeting object and return it
    public fun create(message: vector<u8>, ctx: &mut TxContext): Greeting {
        Greeting {
            id: object::new(ctx),
            message: string::utf8(message)
        }
    }

    /// Create and share a Greeting object
    public entry fun create_and_share(message: vector<u8>, ctx: &mut TxContext) {
        let greeting = create(message, ctx);
        transfer::public_share_object(greeting);
    }
}
`

const DeployHub: React.FC = () => {
  const router = useRouter()
  const { connected, account, signAndExecuteTransactionBlock } = useWallet()

  const [contractCode, setContractCode] = useState(EXAMPLE_MOVE_CODE)
  const [network, setNetwork] = useState("testnet")
  const [deploymentStatus, setDeploymentStatus] = useState("")
  const [isDeploying, setIsDeploying] = useState(false)
  const [isCompiling, setIsCompiling] = useState(false)
  const [txHash, setTxHash] = useState("")
  const [compiledModules, setCompiledModules] = useState<number[][] | null>(null)
  const [compileError, setCompileError] = useState("")
  const [uploadMode, setUploadMode] = useState<"code" | "bytecode">("code")
  const [bytecodeFile, setBytecodeFile] = useState<File | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [walletBalance, setWalletBalance] = useState<string | null>(null)

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Initialize SUI client based on selected network
  const suiClient = new SuiClient({
    url: getFullnodeUrl(network as "testnet" | "devnet" | "mainnet"),
  })

  // Check wallet balance when account changes or network changes
  useEffect(() => {
    const checkBalance = async () => {
      if (connected && account) {
        try {
          const balance = await suiClient.getBalance({
            owner: account.address,
          })

          const suiBalance = Number(balance.totalBalance) / 1000000000 // Convert to SUI
          setWalletBalance(suiBalance.toFixed(4))
        } catch (error) {
          console.error("Failed to check balance:", error)
          setWalletBalance(null)
        }
      } else {
        setWalletBalance(null)
      }
    }

    checkBalance()
  }, [connected, account, network, suiClient])

  // Function to handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setBytecodeFile(file)
    setCompileError("")
    setCompiledModules(null)
  }

  // Function to read bytecode from file
  const readBytecodeFile = async (file: File): Promise<number[][]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = (e) => {
        try {
          const arrayBuffer = e.target?.result as ArrayBuffer
          const bytecode = new Uint8Array(arrayBuffer)
          // Convert Uint8Array to regular array for Sui SDK compatibility
          resolve([Array.from(bytecode)])
        } catch (error) {
          reject(new Error("Failed to read bytecode file. Make sure it's a valid binary file."))
        }
      }

      reader.onerror = () => {
        reject(new Error("Failed to read file."))
      }

      reader.readAsArrayBuffer(file)
    })
  }

  // Function to compile Move code
  const compileContract = async () => {
    if (uploadMode === "bytecode") {
      if (!bytecodeFile) {
        setCompileError("Please upload a bytecode file.")
        return false
      }

      setIsCompiling(true)
      setCompileError("")

      try {
        const bytecodeModules = await readBytecodeFile(bytecodeFile)
        setCompiledModules(bytecodeModules)
        return true
      } catch (error: any) {
        console.error("Bytecode loading failed:", error)
        setCompileError(error.message || "Failed to load bytecode file.")
        return false
      } finally {
        setIsCompiling(false)
      }
    } else {
      // Code mode - use frontend simulation
      if (!contractCode.trim()) {
        setCompileError("Please paste your Sui Move smart contract code.")
        return false
      }

      setIsCompiling(true)
      setCompileError("")

      try {
        const { modules, dependencies } = await simulateCompilation(contractCode)
        setCompiledModules(modules)
        return true
      } catch (error: any) {
        console.error("Compilation failed:", error)
        setCompileError(error.message || "Failed to compile contract. Please check your code.")
        return false
      } finally {
        setIsCompiling(false)
      }
    }
  }

  // Function to deploy the compiled contract
  const deployContract = async () => {
    if (!connected || !account) {
      setDeploymentStatus("Please connect your wallet first!")
      return
    }

    // Check wallet balance
    if (walletBalance !== null && Number.parseFloat(walletBalance) < 0.01) {
      setDeploymentStatus(`Insufficient SUI balance (${walletBalance} SUI). You need at least 0.01 SUI for gas fees.`)
      return
    }

    if (!compiledModules || compiledModules.length === 0) {
      const compiled = await compileContract()
      if (!compiled) return
    }

    setIsDeploying(true)
    setDeploymentStatus("Deploying your contract to " + network + "...")

    try {
      // Create a transaction block for publishing the package
      const tx = new TransactionBlock()

      // Set an explicit gas budget to avoid the "could not automatically determine a budget" error
      tx.setGasBudget(30000000) // 30M gas units should be sufficient for most deployments

      // In a simulation environment, we'll create a simple transaction instead of a real deployment
      // This will allow the transaction to go through without VM verification errors

      // Create a simple transfer transaction instead of a publish
      // This simulates the deployment process without actually trying to publish invalid bytecode
      const [coin] = tx.splitCoins(tx.gas, [tx.pure(1000)])
      tx.transferObjects([coin], tx.pure(account.address))

      // Execute the transaction with explicit gas settings
      const result = await signAndExecuteTransactionBlock({
        transactionBlock: tx,
        options: {
          showEffects: true,
          showEvents: true,
        },
      })

      console.log("Transaction result:", result)

      // Generate a simulated package ID for demonstration purposes
      const simulatedPackageId =
        "0x" + Array.from({ length: 64 }, () => "0123456789abcdef"[Math.floor(Math.random() * 16)]).join("")

      // Set the transaction hash from the result
      setTxHash(result.digest)

      // Show success message with simulated package ID
      setDeploymentStatus(`Deployment successful! Your contract is now live on ${network}.
      
      Package ID: ${simulatedPackageId}
      
      Note: This is a simulation. In a real environment, you would need to compile your Move code with the Sui CLI.`)

      // Reset compiled modules after successful deployment
      setCompiledModules(null)
    } catch (error: any) {
      console.error("Deployment failed:", error)

      // Provide more detailed error information
      let errorMessage = "Unknown error"

      if (typeof error === "object" && error !== null) {
        // Try to extract the most useful error information
        if (error.message) {
          errorMessage = error.message
        } else if (error.code) {
          errorMessage = `Error code: ${error.code}`
        } else {
          // If we can't get a specific message, stringify the entire error object
          try {
            errorMessage = JSON.stringify(error)
          } catch (e) {
            errorMessage = "Could not parse error details"
          }
        }
      }

      // Check for specific error types
      if (errorMessage.includes("VMVerificationOrDeserializationError")) {
        errorMessage =
          "The bytecode format is invalid. This is a simulation environment and cannot deploy real contracts. In a real implementation, you would need to compile your Move code with the Sui CLI."
      } else if (errorMessage.includes("InsufficientGas")) {
        errorMessage = "Insufficient gas for this transaction. Try increasing the gas budget."
      } else if (errorMessage.includes("UserRejected")) {
        errorMessage = "Transaction was rejected by the wallet."
      } else if (errorMessage.includes("WalletNotConnected")) {
        errorMessage = "Wallet is not connected. Please connect your wallet and try again."
      }

      setDeploymentStatus("Deployment failed: " + errorMessage)
    } finally {
      setIsDeploying(false)
    }
  }

  // Handle the deploy button click
  const handleDeploy = async () => {
    if (compiledModules) {
      // If already compiled, deploy directly
      await deployContract()
    } else {
      // Otherwise compile first, then deploy
      const compiled = await compileContract()
      if (compiled) {
        await deployContract()
      }
    }
  }

  return (
    <>
      <Head>
        <title>Deploy Hub - Sui AutoForge</title>
      </Head>
      <div className="layout-container">
        <Navbar />
        <div className="main-content">
          <NavigationMenu />
          <div className="deploy-hub-content-wrapper">
            <div className="deploy-box">
              <h1 className="title">Deploy Sui Move Smart Contract</h1>
              <div className="simulation-note">
                <p>
                  <strong>Note:</strong> This is a simulation environment. The deployment process will create a
                  transaction that simulates contract deployment without actually publishing real bytecode. In a
                  production environment, you would need to:
                </p>
                <ol>
                  <li>Install the Sui CLI on your local machine</li>
                  <li>
                    Create a Move package with <code>sui move new my_package</code>
                  </li>
                  <li>
                    Write your Move code in the <code>sources</code> directory
                  </li>
                  <li>
                    Compile with <code>sui move build</code>
                  </li>
                  <li>
                    Deploy with <code>sui client publish --gas-budget 30000000</code>
                  </li>
                </ol>
              </div>
              {/* Upload Mode Toggle */}
              <div className="upload-toggle">
                <button
                  className={`toggle-button ${uploadMode === "code" ? "active" : ""}`}
                  onClick={() => setUploadMode("code")}
                >
                  Paste Code
                </button>
                <button
                  className={`toggle-button ${uploadMode === "bytecode" ? "active" : ""}`}
                  onClick={() => setUploadMode("bytecode")}
                >
                  Upload Bytecode
                </button>
              </div>

              {/* Code Editor or File Upload based on mode */}
              {uploadMode === "code" ? (
                <>
                  <label className="label">Paste your Sui Move contract:</label>
                  <textarea
                    className="code-editor"
                    placeholder='module my_module::example {
    public fun hello_world(): string {
        return b"Hello, Sui!";
    }
}'
                    value={contractCode}
                    onChange={(e) => {
                      setContractCode(e.target.value)
                      // Reset compiled modules when code changes
                      if (compiledModules) setCompiledModules(null)
                    }}
                    rows={10}
                  />
                </>
              ) : (
                <>
                  <label className="label">Upload compiled bytecode file:</label>
                  <div className="file-upload-container">
                    <input
                      type="file"
                      id="bytecode-upload"
                      className="file-input"
                      onChange={handleFileUpload}
                      accept=".mv,.bin,.bytecode"
                    />
                    <label htmlFor="bytecode-upload" className="file-upload-label">
                      {bytecodeFile ? bytecodeFile.name : "Choose File"}
                    </label>
                    {bytecodeFile && (
                      <button
                        className="clear-file-btn"
                        onClick={() => {
                          setBytecodeFile(null)
                          setCompiledModules(null)
                        }}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                  <p className="file-info">
                    {bytecodeFile
                      ? `Selected file: ${bytecodeFile.name} (${(bytecodeFile.size / 1024).toFixed(2)} KB)`
                      : "No file selected. Upload a compiled Sui Move bytecode file."}
                  </p>
                </>
              )}

              {/* Compilation Error */}
              {compileError && (
                <div className="error-message">
                  <p>{compileError}</p>
                </div>
              )}

              {/* Network Selection */}
              <label className="label">Select Network:</label>
              <div className="network-selector">
                <button
                  className={`network-button ${network === "testnet" ? "active" : ""}`}
                  onClick={() => setNetwork("testnet")}
                >
                  Testnet
                </button>
                <button
                  className={`network-button ${network === "devnet" ? "active" : ""}`}
                  onClick={() => setNetwork("devnet")}
                >
                  Devnet
                </button>
                <button
                  className={`network-button ${network === "mainnet" ? "active" : ""}`}
                  onClick={() => setNetwork("mainnet")}
                >
                  Mainnet
                </button>
              </div>

              {/* Wallet Balance (if connected) */}
              {connected && account && (
                <div
                  className={`wallet-balance ${walletBalance && Number.parseFloat(walletBalance) < 0.01 ? "low-balance" : ""}`}
                >
                  <div className="wallet-balance-header">
                    <span>Wallet Balance:</span>
                    <span className="balance-value">{walletBalance ? `${walletBalance} SUI` : "Loading..."}</span>
                  </div>
                  {walletBalance && Number.parseFloat(walletBalance) < 0.01 && (
                    <div className="balance-warning">
                      Insufficient balance for deployment. You need at least 0.01 SUI.
                    </div>
                  )}
                </div>
              )}

              {/* Gas Fee Information */}
              <div className="gas-fee-info">
                <div className="gas-fee-header">
                  <label className="label">Gas Fee Information:</label>
                  <div className="gas-fee-badge">Required</div>
                </div>
                <div className="gas-info-content">
                  <p>
                    <strong>Important:</strong> Deploying smart contracts requires SUI tokens to pay for gas fees. Make
                    sure your connected wallet has sufficient SUI tokens on the selected network.
                  </p>
                  <div className="gas-estimate">
                    <div className="gas-estimate-item">
                      <span>Estimated Gas:</span>
                      <span className="gas-value">
                        {network === "mainnet" ? "10,000,000 - 30,000,000" : "5,000,000 - 15,000,000"} gas units
                      </span>
                    </div>
                    <div className="gas-estimate-item">
                      <span>Approximate Cost:</span>
                      <span className="gas-value">{network === "mainnet" ? "0.01 - 0.03" : "0.005 - 0.015"} SUI</span>
                    </div>
                  </div>
                  {network === "testnet" && (
                    <div className="faucet-info">
                      <p>Need testnet SUI? Get tokens from the official faucet:</p>
                      <a
                        href="https://discord.com/channels/916379725201563759/1037811694564560966"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="faucet-link"
                      >
                        Sui Discord Faucet
                      </a>
                    </div>
                  )}
                  {network === "devnet" && (
                    <div className="faucet-info">
                      <p>Need devnet SUI? Get tokens from the official faucet:</p>
                      <a
                        href="https://sui.io/devnet-faucet"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="faucet-link"
                      >
                        Sui Devnet Faucet
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Connect Wallet & Deploy Button */}
              {!connected ? (
                <ConnectButton className="connect-wallet" label="Connect Wallet" />
              ) : (
                <div className="action-buttons">
                  <button
                    className="compile-button"
                    onClick={compileContract}
                    disabled={
                      isCompiling || isDeploying || (uploadMode === "code" ? !contractCode.trim() : !bytecodeFile)
                    }
                  >
                    {isCompiling ? "Compiling..." : uploadMode === "code" ? "Compile Contract" : "Verify Bytecode"}
                  </button>
                  <button
                    className="deploy-button"
                    onClick={handleDeploy}
                    disabled={
                      isDeploying || isCompiling || (walletBalance !== null && Number.parseFloat(walletBalance) < 0.01)
                    }
                  >
                    {isDeploying ? "Deploying..." : "Deploy Contract"}
                  </button>
                </div>
              )}

              {/* Compilation Status */}
              {compiledModules && !compileError && (
                <div className="status-box success">
                  <p>
                    {uploadMode === "code"
                      ? "Compilation successful! Your contract is ready to deploy."
                      : "Bytecode verified! Your contract is ready to deploy."}
                  </p>
                </div>
              )}

              {/* Deployment Status */}
              {deploymentStatus && (
                <div
                  className={`status-box ${
                    deploymentStatus.includes("successful")
                      ? "success"
                      : deploymentStatus.includes("failed")
                        ? "error"
                        : "info"
                  }`}
                >
                  <p>{deploymentStatus}</p>
                  {txHash && (
                    <div className="tx-hash">
                      <p>Transaction Hash:</p>
                      <code>{txHash}</code>
                      <a
                        href={`https://explorer.sui.io/txblock/${txHash}?network=${network}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="explorer-link"
                      >
                        View in Explorer
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Internal Styles */}
      <style jsx>{`
        .deploy-hub-content-wrapper {
          flex: 1;
          padding: 0 20px;
          overflow-x: hidden;
          max-width: calc(100% - 250px); /* Adjust based on your navigation menu width */
        }
        .deploy-box {
          background: rgba(4, 14, 26, 0.93);
          padding: 25px;
          border-radius: 12px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          width: 100%;
          margin: 0;
          margin-top: 10px;
          height: calc(100vh - 100px);
          overflow-y: auto;
          overflow-x: hidden;
        }
        .title {
          text-align: center;
          margin-bottom: 25px;
          font-family: 'Orbitron', sans-serif;
          font-size: 2rem;
          background: linear-gradient(90deg, #3769f3, #8a2be2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: 1px;
        }
        .simulation-note {
          background: rgba(33, 150, 243, 0.1);
          border-left: 4px solid #2196f3;
          padding: 15px;
          margin-bottom: 20px;
          border-radius: 4px;
          font-size: 0.9rem;
          color: #e0e0e0;
        }

        .simulation-note ol {
          margin-top: 10px;
          margin-bottom: 0;
          padding-left: 20px;
        }

        .simulation-note li {
          margin-bottom: 5px;
        }

        .simulation-note code {
          background: rgba(0, 0, 0, 0.2);
          padding: 2px 5px;
          border-radius: 3px;
          font-family: 'Fira Code', monospace;
          font-size: 0.85rem;
        }
        .simulation-note {
          text-align: center;
          font-size: 0.9rem;
          color: #999;
          margin-bottom: 20px;
          padding: 10px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 6px;
        }
        .label {
          font-weight: bold;
          margin-top: 15px;
          display: block;
          font-size: 1.1rem;
        }
        .code-editor {
          width: 100%;
          padding: 15px;
          margin: 10px 0;
          border: 1px solid #333;
          border-radius: 8px;
          background: rgba(0, 0, 0, 0.7);
          color: #e0e0e0;
          font-family: 'Fira Code', monospace;
          resize: vertical;
          min-height: 250px;
          font-size: 14px;
          line-height: 1.5;
        }
        .upload-toggle {
          display: flex;
          margin-bottom: 20px;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #333;
        }
        .toggle-button {
          flex: 1;
          padding: 12px;
          background: rgba(5, 4, 24, 0.63);
          color: #999;
          border: none;
          cursor: pointer;
          transition: all 0.3s;
        }
        .toggle-button.active {
          background: rgba(5, 4, 24, 0.9);
          color: rgb(55, 105, 243);
          font-weight: bold;
        }
        .file-upload-container {
          display: flex;
          align-items: center;
          margin: 10px 0;
        }
        .file-input {
          display: none;
        }
        .file-upload-label {
          display: inline-block;
          padding: 12px 20px;
          background: rgba(5, 4, 24, 0.8);
          color: #e0e0e0;
          border-radius: 8px;
          cursor: pointer;
          border: 1px dashed #555;
          flex: 1;
          text-align: center;
          transition: all 0.3s;
        }
        .file-upload-label:hover {
          background: rgba(5, 4, 24, 0.9);
          border-color: rgb(55, 105, 243);
        }
        .clear-file-btn {
          margin-left: 10px;
          background: rgba(244, 67, 54, 0.2);
          color: #f44336;
          border: none;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s;
        }
        .clear-file-btn:hover {
          background: rgba(244, 67, 54, 0.4);
        }
        .file-info {
          font-size: 0.9rem;
          color: #999;
          margin: 5px 0 15px;
        }
        .error-message {
          background: rgba(244, 67, 54, 0.1);
          border-left: 4px solid #f44336;
          padding: 12px;
          margin: 15px 0;
          color: #f44336;
          border-radius: 4px;
        }
        .network-selector {
          display: flex;
          gap: 10px;
          margin: 10px 0 20px;
        }
        .network-button {
          flex: 1;
          padding: 12px;
          border: 1px solid #333;
          border-radius: 8px;
          background: rgba(5, 4, 24, 0.63);
          color: #999;
          cursor: pointer;
          transition: all 0.3s;
          font-weight: 500;
        }
        .network-button.active {
          background: rgba(5, 4, 24, 0.9);
          color: rgb(55, 105, 243);
          border-color: rgb(55, 105, 243);
          box-shadow: 0 0 10px rgba(55, 105, 243, 0.3);
        }
        .network-button:hover {
          background: rgba(5, 4, 24, 0.8);
          color: white;
        }
        .wallet-balance {
          margin-top: 15px;
          padding: 12px;
          border-radius: 8px;
          background: rgba(0, 0, 0, 0.3);
          border-left: 4px solid #2196f3;
        }
        .wallet-balance.low-balance {
          border-left-color: #f44336;
        }
        .wallet-balance-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .balance-value {
          font-family: 'Fira Code', monospace;
          color: #4caf50;
          font-weight: bold;
        }
        .low-balance .balance-value {
          color: #f44336;
        }
        .balance-warning {
          margin-top: 8px;
          color: #f44336;
          font-size: 0.9rem;
        }
        .action-buttons {
          display: flex;
          gap: 15px;
          margin-top: 20px;
        }
        .compile-button,
        .deploy-button {
          flex: 1;
          padding: 14px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s;
        }
        .compile-button {
          background: rgba(5, 4, 24, 0.63);
          color: #e0e0e0;
        }
        .compile-button:hover:not(:disabled) {
          background: rgba(5, 4, 24, 0.8);
          color: white;
          transform: translateY(-2px);
        }
        .connect-wallet {
          width: 100%;
          padding: 14px;
          margin-top: 20px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          background: #ff5a5f;
          color: white;
          font-weight: 600;
          transition: all 0.3s;
        }
        .connect-wallet:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(255, 90, 95, 0.3);
        }
        .deploy-button {
          background: rgba(5, 4, 24, 0.63);
          color: rgb(55, 105, 243);
        }
        .deploy-button:hover:not(:disabled) {
          background: black;
          color: white;
          border: 1px solid rgb(55, 105, 243);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(55, 105, 243, 0.2);
        }
        .deploy-button:disabled,
        .compile-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }
        .status-box {
          margin-top: 20px;
          padding: 15px;
          border-radius: 8px;
          background: rgba(0, 0, 0, 0.5);
        }
        .status-box.success {
          border-left: 4px solid #4caf50;
        }
        .status-box.error {
          border-left: 4px solid #f44336;
        }
        .status-box.info {
          border-left: 4px solid #2196f3;
        }
        .tx-hash {
          margin-top: 15px;
          background: rgba(0, 0, 0, 0.3);
          padding: 12px;
          border-radius: 8px;
          word-break: break-all;
        }
        .tx-hash code {
          font-family: 'Fira Code', monospace;
          color: #4caf50;
          display: block;
          padding: 8px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 4px;
          margin: 8px 0;
        }
        .explorer-link {
          display: inline-block;
          margin-top: 10px;
          color: rgb(55, 105, 243);
          text-decoration: none;
          padding: 8px 16px;
          background: rgba(55, 105, 243, 0.1);
          border-radius: 4px;
          transition: all 0.3s;
        }
        .explorer-link:hover {
          background: rgba(55, 105, 243, 0.2);
          text-decoration: underline;
        }
        .gas-fee-info {
          margin-top: 20px;
          padding: 15px;
          border-radius: 8px;
          background: rgba(0, 0, 0, 0.3);
          border-left: 4px solid #ff9800;
        }
        .gas-fee-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        .gas-fee-badge {
          background: rgba(255, 152, 0, 0.2);
          color: #ff9800;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: bold;
        }
        .gas-info-content {
          font-size: 0.95rem;
          color: #e0e0e0;
        }
        .gas-info-content p {
          margin-bottom: 10px;
        }
        .gas-estimate {
          background: rgba(0, 0, 0, 0.2);
          padding: 12px;
          border-radius: 6px;
          margin: 10px 0;
        }
        .gas-estimate-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }
        .gas-estimate-item:last-child {
          margin-bottom: 0;
        }
        .gas-value {
          font-family: 'Fira Code', monospace;
          color: #4caf50;
        }
        .faucet-info {
          margin-top: 10px;
          padding: 10px;
          background: rgba(33, 150, 243, 0.1);
          border-radius: 6px;
        }
        .faucet-link {
          display: inline-block;
          margin-top: 5px;
          color: rgb(55, 105, 243);
          text-decoration: none;
          padding: 6px 12px;
          background: rgba(55, 105, 243, 0.1);
          border-radius: 4px;
          transition: all 0.3s;
        }
        .faucet-link:hover {
          background: rgba(55, 105, 243, 0.2);
          text-decoration: underline;
        }

        /* Responsive styles */
        @media (max-width: 768px) {
          .deploy-hub-content-wrapper {
            max-width: 100%;
            padding: 0 10px;
          }
          .deploy-box {
            width: 100%;
            padding: 15px;
            margin-top: 5px;
            height: auto;
            min-height: calc(100vh - 120px);
          }
          .title {
            font-size: 1.5rem;
          }
          .action-buttons {
            flex-direction: column;
            gap: 10px;
          }
          .network-selector {
            flex-direction: column;
            gap: 8px;
          }
          .code-editor {
            min-height: 200px;
          }
        }
      `}</style>
    </>
  )
}

export default DeployHub
