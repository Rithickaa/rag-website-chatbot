from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Legacy docs (current source)
from docs_source import docs_content as legacy_docs_content

# Markdown docs (future source)
from markdown_docs_provider import get_markdown_docs

from tfidf_retriever import TfidfRetriever
from llm_generator import LLMGenerator

app = FastAPI(title="DOCARG Backend")

# ✅ CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔒 Feature flag (DO NOT flip yet)
USE_MARKDOWN_DOCS = True


def load_docs():
    if USE_MARKDOWN_DOCS:
        return get_markdown_docs()
    return legacy_docs_content


# Initialize components
docs = load_docs()
retriever = TfidfRetriever(docs)
generator = LLMGenerator()


class QueryRequest(BaseModel):
    question: str


@app.get("/")
def read_root():
    return {"status": "DOCARG backend running"}


@app.post("/query")
def query_docs(request: QueryRequest):
    retrieved = retriever.retrieve(request.question, top_k=2)
    contexts = [item["content"] for item in retrieved]

    answer = generator.generate_answer(
        question=request.question,
        contexts=contexts
    )

    return {
        "question": request.question,
        "answer": answer,
        "sources": [
            {
                "section": item["section"],
                "score": item["score"]
            }
            for item in retrieved
        ],
    }
