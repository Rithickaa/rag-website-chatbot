from tfidf_retriever import TfidfRetriever

retriever = TfidfRetriever()

query = "How does DOCARG retrieve information?"

results = retriever.retrieve(query)

for r in results:
    print("SECTION:", r["section"])
    print("SCORE:", r["score"])
    print("-" * 40)
