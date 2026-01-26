from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from backend.logger import log_query
from backend.docs_source import DOCS
from backend.tfidf_retriever import TfidfRetriever
from backend.llm_generator import LLMGenerator


app = FastAPI(title="DOCARG Backend")

# ✅ CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# These will be initialized on startup
retriever: TfidfRetriever | None = None
generator: LLMGenerator | None = None


class QueryRequest(BaseModel):
    question: str


@app.on_event("startup")
def startup_event():
    """
    Initialize retriever and generator exactly once on startup.
    DOCS is a list of answer-complete documentation chunks.
    """
    global retriever, generator

    print("✅ DOCARG documentation loaded")
    print(f"📄 Total documentation chunks: {len(DOCS)}")

    retriever = TfidfRetriever(DOCS)
    generator = LLMGenerator()

    print("✅ TF-IDF retriever initialized")
    print("✅ LLM generator initialized")


@app.get("/")
def read_root():
    return {"status": "DOCARG backend running"}


@app.post("/query")
def query_docs(request: QueryRequest):
    retrieved = retriever.retrieve(request.question, top_k=3)

    # 🔒 Safe failure: nothing relevant found
    if not retrieved:
        return {
            "question": request.question,
            "answer": "I don’t know based on the given documentation.",
            "sources": [],
        }

    contexts = [item["content"] for item in retrieved]

    answer = generator.generate_answer(
        question=request.question,
        contexts=contexts,
    )

    # 🔹 Log only the top retrieval result
    top_result = retrieved[0]
    log_query(
        query=request.question,
        top_section=top_result["section"],
        score=top_result["score"],
    )

    # 🔹 Return only the primary source for clean UX
    return {
        "question": request.question,
        "answer": answer,
        "sources": [
            {
                "section": top_result["section"],
                "score": top_result["score"],
            }
        ],
    }
