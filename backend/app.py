from flask import Flask, request, jsonify
from llm import run_query  # Import the run_query function from llm.py. all openai stuff are handled in llm.py
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  


chat_history = []

# Route to handle chat requests
@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        query = request.json.get('message')
        
        if not query:
            return jsonify({"error": "Query is required"}), 400

        openai_api_key = os.getenv('OPENAI_API_KEY')
        response = run_query(query, chat_history, openai_api_key)

        return jsonify({"reply": response}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
