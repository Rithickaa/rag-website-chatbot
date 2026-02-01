const API_URL = "https://rag-website-chatbot.onrender.com/query";

export async function askDocarg(question) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question }),
  });

  if (!response.ok) {
    throw new Error("Backend error");
  }

  return response.json();
}
