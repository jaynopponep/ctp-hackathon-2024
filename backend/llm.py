from flask import Flask, request, jsonify
import os
from flask_cors import CORS
import getpass
from langchain_openai import OpenAI
from langchain.chains import RetrievalQA
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma
from dotenv import load_dotenv
from langchain_core.messages import HumanMessage, AIMessage
import random

##loading my environment variables (openai key)
from dotenv import load_dotenv 
load_dotenv()

## loading the API key through an ENV file 
openai_api_key = os.getenv('OPENAI_API_KEY')
chat_history = [] #stores chat history              note- it might be better to use a dictionary to hold user and ai responses as a pair. might have to change the function
random_inquiries = [
    "Where is the CCNY mental health center?",
    "I am suffering a panic attack, what should I do?",
    "What are the operating hours for the CCNY Wellness Center?",
    "How can I schedule an appointment with a counselor at CCNY?",
    "Is there a student support group available at CCNY?",
    "What services does the CCNY health center offer?",
    "How do I get in touch with a mental health professional at CCNY?",
    "Where can I find resources for stress management at CCNY?",
    "Does CCNY offer any mental health workshops or seminars?",
    "I need immediate assistance, who can I contact at CCNY?"
]

query = random.choice(random_inquiries)  # Get a random inquiry from the list

def run_query(query, chat_history, openai_api_key):
    load_dotenv()
    persist_directory = 'db'

    db = Chroma(persist_directory=persist_directory, embedding_function=OpenAIEmbeddings(openai_api_key=openai_api_key))  # access db
    retriever = db.as_retriever(search_kwargs={"k": 3})  # kwargs determines how many docs it uses

    llm = OpenAI(api_key=openai_api_key, max_tokens=1500, temperature=.8)  # LLM setup
    search_results = retriever.get_relevant_documents(query)
    context = "\n".join([doc.page_content for doc in search_results])
    chat_history.append(HumanMessage(content=query))
    full_query = f"You are a digital support assistant. Please use the following context to format your response:\n{context}\nQuery:\n{query}"
    llm_response = llm(full_query)
    chat_history.append(AIMessage(content=llm_response))

    return llm_response  # Return the LLM response

# Run the query and print the response
response = run_query(query, chat_history, openai_api_key)
print(response)