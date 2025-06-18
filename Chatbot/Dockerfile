FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the app
COPY . .

# Expose port (giả sử bạn dùng Flask hoặc FastAPI ở port 5001)
EXPOSE 5001

# Run chatbot (sửa tùy theo script của bạn)
CMD ["python", "app.py"]
