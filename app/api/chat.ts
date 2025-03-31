export const getChatResponse = async (message: string, walletAddress: string) => {
  try {
    const response = await fetch("https://sui-forge-api.onrender.com/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_message: message, wallet_address: walletAddress }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch response from AI API. Status: ${response.status}`);
    }

    const data = await response.json();
    return data.response; // Ensure this matches your backend response structure
  } catch (error) {
    console.error("Chat API error:", error);
    return "⚠️ An error occurred while fetching AI response.";
  }
};
