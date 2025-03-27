// app/api/chat.ts (Frontend function)
export const getChatResponse = async (message: string) => {
    try {
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
  