import os
from groq import Groq


class LLMGenerator:
    def __init__(self):
        api_key = os.getenv("GROQ_API_KEY")
        if not api_key:
            raise RuntimeError("GROQ_API_KEY environment variable is not set")

        self.client = Groq(api_key=api_key)

    def generate_answer(self, question: str, contexts: list[str]) -> str:
        context_text = "\n\n".join(contexts)

        messages = [
            {
                "role": "system",
                "content": (
                    "You are a documentation assistant. "
                    "Answer ONLY using the provided documentation. "
                    "If the answer is not present, say "
                    "'I don't know based on the given documentation.'"
                ),
            },
            {
                "role": "user",
                "content": f"Documentation:\n{context_text}\n\nQuestion:\n{question}",
            },
        ]

        response = self.client.chat.completions.create(
            model="llama-3.1-8b-instant",   # ✅ UPDATED, SUPPORTED MODEL
            messages=messages,
            temperature=0.2,
        )

        return response.choices[0].message.content.strip()
