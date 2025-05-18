# chatbot-model/predict.py
import sys
import joblib
import os

# Đường dẫn tuyệt đối đến model và vectorizer
MODEL_DIR = os.path.join(os.path.dirname(__file__), "models")
MODEL_PATH = os.path.join(MODEL_DIR, "intent_model.pkl")
VECTORIZER_PATH = os.path.join(MODEL_DIR, "vectorizer.pkl")

# Load mô hình
model = joblib.load(MODEL_PATH)
vectorizer = joblib.load(VECTORIZER_PATH)

# Lấy tin nhắn từ command-line argument
if len(sys.argv) < 2:
    print("unknown")
    sys.exit(1)

text = sys.argv[1]

# Tiền xử lý (giống lúc huấn luyện)
def preprocess(text):
    import re
    import unicodedata

    text = text.lower()
    text = unicodedata.normalize("NFD", text)
    text = re.sub(r"[\u0300-\u036f]", "", text)  # xóa dấu tiếng Việt
    text = re.sub(r"[^a-zA-Z0-9\s]", "", text)
    return text.strip()

clean_text = preprocess(text)
X = vectorizer.transform([clean_text])
predicted_intent = model.predict(X)[0]

print(predicted_intent)
