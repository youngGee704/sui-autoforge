// app/api/chat.ts (Frontend function)
export const getChatResponse = async (message: string) => {
    try {
      // Define allowed topics
      const allowedTopics = [
        "sui blockchain",
        "sui smart contract",
        "move language",
        "sui move",
        "sui developer",
        "sui wallet",
        "sui network",
        "sui transactions",
        "sui gas fees",
        "sui staking",
        "sui nft",
        "sui defi"
      ];
  
      const lowerMessage = message.toLowerCase();
      const isAllowed = allowedTopics.some(topic => lowerMessage.includes(topic));
  
      if (!isAllowed) {
        return "❌ Only Sui Move smart contracts and Sui blockchain-related questions are allowed.";
      }
  
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
  
      const data = await response.json();
      return data.response || "Error: No response from AI";
    } catch (error) {
      console.error("Error fetching chat response:", error);
      return "Error: Failed to reach AI";
    }
  };
  