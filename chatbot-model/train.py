# chatbot-model/train.py
import pandas as pd
import re
import unicodedata
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
import joblib
import os

# Tiền xử lý văn bản
def preprocess(text):
    text = text.lower()
    text = unicodedata.normalize("NFD", text)
    text = re.sub(r"[\u0300-\u036f]", "", text)  # bỏ dấu tiếng Việt
    text = re.sub(r"[^a-zA-Z0-9\s]", "", text)   # loại ký tự đặc biệt
    return text.strip()

# Load dữ liệu
data_path = os.path.join("data", "train_data.csv")
df = pd.read_csv(data_path)

# Tiền xử lý
df["clean_text"] = df["text"].apply(preprocess)

# Vector hóa
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(df["clean_text"])
y = df["intent"]

# Train model
model = LogisticRegression()
model.fit(X, y)

# Lưu model và vectorizer
os.makedirs("models", exist_ok=True)
joblib.dump(model, os.path.join("models", "intent_model.pkl"))
joblib.dump(vectorizer, os.path.join("models", "vectorizer.pkl"))

print("✅ Đã huấn luyện và lưu mô hình thành công.")
