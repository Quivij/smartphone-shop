from flask import Flask, request, jsonify
from flask_cors import CORS
from chatbot import PhoneChatbot
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize chatbot
chatbot = PhoneChatbot()
store_id = 'phone_vector_store_27_20250611_234455'

try:
    # Load vector store
    print("Đang tải dữ liệu điện thoại...")
    chatbot.load_vector_store(store_id)
    print("Đã tải xong dữ liệu điện thoại!")
except Exception as e:
    print(f"Lỗi khi tải vector store: {str(e)}")
    raise

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        if not data or 'message' not in data:
            return jsonify({'error': 'Missing message in request'}), 400

        message = data['message']
        response = chatbot.chat(message)
        
        return jsonify({
            'response': response
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5001))
    app.run(host='0.0.0.0', port=port, debug=True) 