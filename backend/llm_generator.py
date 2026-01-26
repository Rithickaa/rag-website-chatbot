import os
from groq import Groq


class LLMGenerator:
    def __init__(self):
        api_key = os.getenv("GROQ_API_KEY")
        if not api_key:
            raise RuntimeError("GROQ_API_KEY environment variable is not set")

        self.client = Groq(api_key=api_key)

    def generate_answer(self, question: str, contexts: list[str]) -> str:
        """
        Generates an answer strictly from retrieved documentation.
        Allows summarization across multiple documentation statements.
        """

        # HARD GUARD
        if not contexts:
            return "I don’t know based on the given documentation."

        context_text = "\n".join(contexts)

        messages = [
            {
                "role": "system",
                "content": (
                    "You are a documentation-grounded assistant. "
                    "Answer ONLY using the provided documentation. "
                    "You may summarize or combine multiple documentation statements. "
                    "Do NOT add new facts. "
                    "If the documentation does not contain enough information, say "
                    "'I don’t know based on the given documentation.'"
                ),
            },
            {
                "role": "user",
                "content": (
                    f"Documentation:\n{context_text}\n\n"
                    f"Question:\n{question}"
                ),
            },
        ]

        response = self.client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=messages,
            temperature=0.2,
        )

        return response.choices[0].message.content.strip()
