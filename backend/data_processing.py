import pandas as pd
import os
from langchain_community.document_loaders.csv_loader import CSVLoader
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma
from dotenv import load_dotenv
from langchain_text_splitters import CharacterTextSplitter

df=pd.read_csv('data\CCNY_Health_Wellness_Services.csv') #load df
print(df.shape)

cols=df.columns
print(cols.values)

current_dir = os.getcwd()
file_path = os.path.join(current_dir, 'data', 'CCNY_Health_Wellness_Services.csv')

load_dotenv()
persist_directory = 'db'
raw_documents = loader = CSVLoader(file_path=file_path).load()  # Load PDFs from folder
if not raw_documents:
    raise ValueError("No documents found. Ensure the document loading is correct.")

# split it into chunks
text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
documents = text_splitter.split_documents(raw_documents)

db = Chroma.from_documents(documents, OpenAIEmbeddings(), persist_directory=persist_directory)  # Initialize the database
print("Documents loaded into the database successfully.")