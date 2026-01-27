import streamlit as st
import os
import sys

# Allow imports from embeddings folder
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.append(os.path.join(BASE_DIR, "embeddings"))

from search_faiss import search
from llm_response import generate_answer


st.set_page_config(page_title="RAG Website Chatbot", layout="centered")
st.title("RAG Website Chatbot")
st.write("Ask questions based on the Streamlit documentation")

# Chat input
user_query = st.chat_input("Ask a question")

if user_query:
    with st.spinner("Searching documentation and generating answer..."):
        # 1. Retrieve relevant chunks from FAISS
        retrieved_chunks = search(user_query, top_k=3)

        # 2. Generate answer using Groq LLM
        final_answer = generate_answer(user_query, retrieved_chunks)

    # Display answer
    st.subheader("Answer")
    st.write(final_answer)
