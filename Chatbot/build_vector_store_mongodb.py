import os
import json
import numpy as np
import faiss
from dotenv import load_dotenv
import google.generativeai as genai
import logging
from typing import List, Dict, Any
from pymongo import MongoClient
from datetime import datetime
from bson import ObjectId

# --------------------------- CONFIG & ENV --------------------------- #
load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")
MONGO_URI = os.getenv("MONGO_DB_URI")
DB_NAME = os.getenv("MONGO_DB_DATABASE", "test")
COLLECTION_NAME = os.getenv("MONGO_DB_COLLECTION", "products")
VECTOR_STORE_DIR = "vector_stores"

if not API_KEY:
    raise ValueError("GEMINI_API_KEY not found in environment variables.")
if not MONGO_URI:
    raise ValueError("MONGO_DB_URI not found in environment variables.")

genai.configure(api_key=API_KEY)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# --------------------------- UTILITIES --------------------------- #
class MongoJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        if isinstance(obj, datetime):
            return obj.isoformat()
        return super().default(obj)

def build_text_representation(doc: Dict[str, Any]) -> str:
    variant_lines = []
    for variant in doc.get("variants", []):
        if isinstance(variant, dict):
            info = [
                f"Color: {variant.get('color', '')}",
                f"Storage: {variant.get('storage', '')}",
                f"Price: {variant.get('price', 0):,} VND",
                f"Stock: {variant.get('stock', 0)}",
                f"Sold: {variant.get('sold', 0)}"
            ]
            variant_lines.append("Variant: " + " - ".join(info))

    specs = doc.get("specifications", {})
    specs_text = " ".join([f"{k}: {v}" for k, v in specs.items()])

    return f"{doc.get('name', '')} - {doc.get('description', '')} - Brand: {doc.get('brand', '')} - Category: {doc.get('category', '')} {' '.join(variant_lines)} {specs_text}"

def embed_texts(texts: List[str], model_name: str = "text-embedding-004") -> List[List[float]]:
    embeddings = []
    for text in texts:
        result = genai.embed_content(
            model=f"models/{model_name}",
            content=text,
            task_type="retrieval_document"
        )
        embeddings.append(result['embedding'])
    return embeddings

# --------------------------- VECTOR STORE BUILDER --------------------------- #
class VectorStoreBuilder:
    def __init__(self, model_name: str = "text-embedding-004"):
        self.model_name = model_name
        self.dimension = 768
        self.index = faiss.IndexFlatL2(self.dimension)
        self.documents = []

    def load_documents(self) -> List[Dict[str, Any]]:
        try:
            with MongoClient(MONGO_URI) as client:
                collection = client[DB_NAME][COLLECTION_NAME]
                docs = []
                for doc in collection.find({}):
                    text = build_text_representation(doc)
                    docs.append({
                        "text": text,
                        "metadata": {
                            "id": str(doc.get("_id")),
                            "name": doc.get("name"),
                            "slug": doc.get("slug"),
                            "description": doc.get("description"),
                            "category": doc.get("category"),
                            "brand": doc.get("brand"),
                            "variants": doc.get("variants", []),
                            "specifications": doc.get("specifications", {}),
                            "sold": doc.get("sold", 0),
                            "ratings": doc.get("ratings", []),
                            "created_at": doc.get("createdAt", datetime.now().isoformat()),
                            "updated_at": doc.get("updatedAt", datetime.now().isoformat())
                        }
                    })
                logger.info(f"Loaded {len(docs)} documents from MongoDB.")
                return docs
        except Exception as e:
            logger.error(f"Failed to load documents: {e}")
            raise

    def build(self, documents: List[Dict[str, Any]]) -> str:
        try:
            self.documents = documents
            texts = [doc["text"] for doc in documents]
            embeddings = embed_texts(texts, self.model_name)

            self.index.add(np.array(embeddings).astype("float32"))

            os.makedirs(VECTOR_STORE_DIR, exist_ok=True)
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            store_id = f"phone_vector_store_{len(documents)}_{timestamp}"
            self.save_index(store_id)
            self.save_metadata(store_id, len(documents))
            return store_id
        except Exception as e:
            logger.error(f"Error building vector store: {e}")
            raise

    def save_index(self, store_id: str):
        try:
            faiss.write_index(self.index, f"{VECTOR_STORE_DIR}/{store_id}.index")
            with open(f"{VECTOR_STORE_DIR}/{store_id}_documents.json", "w", encoding="utf-8") as f:
                json.dump(self.documents, f, ensure_ascii=False, indent=2, cls=MongoJSONEncoder)
            logger.info(f"Saved vector store: {store_id}")
        except Exception as e:
            logger.error(f"Failed to save index: {e}")
            raise

    def save_metadata(self, store_id: str, num_docs: int):
        try:
            with MongoClient(MONGO_URI) as client:
                client[DB_NAME]['vector_stores'].insert_one({
                    "store_id": store_id,
                    "num_documents": num_docs,
                    "created_at": datetime.now(),
                    "model_name": self.model_name,
                    "dimension": self.dimension
                })
                logger.info("Saved vector store metadata.")
        except Exception as e:
            logger.error(f"Failed to save metadata: {e}")
            raise

# --------------------------- MAIN --------------------------- #
def main():
    try:
        builder = VectorStoreBuilder()
        docs = builder.load_documents()
        if docs:
            store_id = builder.build(docs)
            print(f"✅ Vector store created with ID: {store_id}")
        else:
            print("⚠️ No documents found.")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    main()
