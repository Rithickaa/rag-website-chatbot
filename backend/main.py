from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from backend.logger import log_query
from backend.docs_source import DOCS
from backend.tfidf_retriever import TfidfRetriever
from backend.llm_generator import LLMGenerator


app = FastAPI(title="DOCARG Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

retriever: TfidfRetriever | None = None
generator: LLMGenerator | None = None


class QueryRequest(BaseModel):
    question: str


@app.on_event("startup")
def startup_event():
    global retriever, generator
    retriever = TfidfRetriever(DOCS)
    generator = LLMGenerator()


@app.post("/query")
def query_docs(request: QueryRequest):
    question = request.question

    # 1️⃣ TF-IDF retrieval
    retrieved = retriever.retrieve(question, top_k=5)

    # 2️⃣ Infer defining section from question intent
    inferred_section = retriever.infer_section_from_question(question)

    # 3️⃣ FORCE include defining section docs (CRITICAL FIX)
    section_docs = []
    if inferred_section:
        section_docs = [
            d for d in DOCS if d["section"] == inferred_section
        ]

    # 4️⃣ Merge section docs + TF-IDF results (deduplicated)
    combined = []
    seen = set()

    for item in section_docs + retrieved:
        key = (item["section"], item["content"])
        if key not in seen:
            combined.append(item)
            seen.add(key)

    if not combined:
        return {
            "question": question,
            "answer": "I don’t know based on the given documentation.",
            "sources": [],
        }

    # 5️⃣ Pass COMPLETE authoritative context to LLM
    contexts = [c["content"] for c in combined]

    answer = generator.generate_answer(
        question=question,
        contexts=contexts,
    )

    # 6️⃣ Correct source attribution
    source_section = inferred_section or combined[0]["section"]

    log_query(
        query=question,
        top_section=source_section,
        score=combined[0].get("score", 1.0),
    )

    return {
        "question": question,
        "answer": answer,
        "sources": [
            {
                "section": source_section,
                "score": combined[0].get("score", 1.0),
            }
        ],
    }
