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
#env_path = os.path.join(os.path.dirname(__file__), '.env')
#load_dotenv(dotenv_path=env_path)

## loading the API key through an ENV file 
openai_api_key = os.getenv('OPENAI_API_KEY')
chat_history = [] #stores chat history              note- it might be better to use a dictionary to hold user and ai responses as a pair. might have to change the function


def run_query(query, chat_history, openai_api_key):
    load_dotenv()
    persist_directory = 'chromadb'

    db = Chroma(persist_directory=persist_directory, embedding_function=OpenAIEmbeddings(openai_api_key=openai_api_key))  # access db
    retriever = db.as_retriever(search_kwargs={"k": 3})  # kwargs determines how many docs it uses

    llm = OpenAI(api_key=openai_api_key, max_tokens=1500, temperature=.6)  # LLM setup
    search_results = retriever.get_relevant_documents(query)
    context = "\n".join([doc.page_content for doc in search_results])
    chat_history.append(HumanMessage(content=query)) #this is some hardcoding prompting but it fulfils our use case
    full_query = f"""
            You are a digital support assistant named Assist μ for our website Campus Quest. Your primary role is to answer user questions strictly and exclusively using the information provided in the context. Do not introduce any information that is not present in the context.
            If a person is having a panic attack or seizure, please provide immediate action steps.
            Context:
            {context}

            Query:
            {query}
        """

    llm_response = llm(full_query)
    chat_history.append(AIMessage(content=llm_response))

    return llm_response  # returms llm output, will be called in app.py

