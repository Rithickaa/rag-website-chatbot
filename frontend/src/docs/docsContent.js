const docsContent = {
  introduction: {
    title: "Introduction",
    content: `
DOCARG is a documentation-centric Augmented Retrieval Generation (ARG) system.

It is designed to help users understand and explore documentation through both
structured pages and an AI-powered chatbot.

Instead of manually searching through long documentation pages, users can ask
questions in natural language and receive accurate answers generated strictly
from the documentation content.
    `,
  },

  "getting-started": {
    title: "Getting Started",
    content: `
DOCARG consists of two main components:

1. A documentation website built using React.
2. A backend retrieval system that enables intelligent question answering.

To use DOCARG:
- Navigate through the documentation using the sidebar.
- Read structured explanations of the system.
- Ask questions using the chatbot panel to clarify doubts.
    `,
  },

  architecture: {
    title: "Architecture",
    content: `
DOCARG follows a clean, modular architecture to ensure clarity and scalability.

Frontend:
- Built using React (Vite).
- Displays documentation content.
- Provides a chat interface for user queries.

Backend:
- Uses TF-IDF for text vectorization.
- Retrieves relevant documentation chunks.
- Uses a language model to generate answers.

The frontend and backend communicate through a REST API.
    `,
  },

  "retrieval-method": {
    title: "How Retrieval Works",
    content: `
DOCARG uses a TF-IDF based retrieval mechanism.

Steps involved:
1. Documentation text is split into smaller chunks.
2. Each chunk is vectorized using TF-IDF.
3. User queries are vectorized in the same space.
4. Cosine similarity is used to find the most relevant chunks.
5. Retrieved chunks are passed to the language model for answer generation.

This approach is lightweight, fast, and stable across platforms.
    `,
  },

  api: {
    title: "API Reference",
    content: `
DOCARG exposes a REST API for handling user queries.

Endpoint:
POST /query

Request Body:
{
  "question": "What is DOCARG?"
}

Response:
{
  "answer": "DOCARG is a documentation-centric ARG system..."
}

The API ensures that answers are generated strictly from documentation content.
    `,
  },

  limitations: {
    title: "Limitations",
    content: `
DOCARG relies entirely on the provided documentation.

- It cannot answer questions outside the documented scope.
- The quality of answers depends on the clarity of documentation.
- TF-IDF retrieval may not capture deep semantic meaning compared to embeddings.

Despite these limitations, DOCARG provides a reliable and transparent
documentation assistant.
    `,
  },
};

export default docsContent;
