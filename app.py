import streamlit as st

st.title("RAG Website Chatbot")

if "messages" not in st.session_state:
    st.session_state.messages = []

for msg in st.session_state.messages:
    with st.chat_message("user"):
        st.write(msg)

user_input = st.chat_input("Ask something")

if user_input:
    st.session_state.messages.append(user_input)
    with st.chat_message("user"):
        st.write(user_input)
