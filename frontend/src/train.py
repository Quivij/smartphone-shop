import pandas as pd
import numpy as np
from lightfm import LightFM
from lightfm.data import Dataset
from pymongo import MongoClient

# --- 1. KẾT NỐI VỚI MONGODB ATLAS ---
print("Đang kết nối tới MongoDB Atlas...")

# ⚠️ DÁN CONNECTION STRING CỦA BẠN VÀO ĐÂY
# (Nhớ thay <username> và <password> bằng thông tin đăng nhập của bạn)
ATLAS_CONNECTION_STRING = "mongodb+srv://TEN_USER:MAT_KHAU@cluster_cua_ban.mongodb.net/" 

try:
    # 1.1. Kết nối (Sử dụng string của Atlas)
    client = MongoClient(ATLAS_CONNECTION_STRING) 
    
    # 1.2. Chọn Database
    db = client['ten_database_cua_ban'] # <-- ⚠️ THAY TÊN DB CỦA BẠN

    # 1.3. Kiểm tra kết nối (rất quan trọng)
    client.admin.command('ping')
    print("Kết nối thành công tới MongoDB Atlas!")

except Exception as e:
    print(f"LỖI KẾT NỐI: {e}")
    print("\nVUI LÒNG KIỂM TRA LẠI:")
    print("1. Đã dán đúng Connection String từ Atlas chưa?")
    print("2. Đã thay thế <username> và <password> chưa?")
    print("3. Đã thêm địa chỉ IP của máy chủ này vào 'IP Access List' trên Atlas chưa?")
    exit()


# --- 2. TRÍCH XUẤT DATAFRAME 1: `items_df` (Đặc tính Sản phẩm) ---
# (Code trích xuất ở phần này GIỮ NGUYÊN như cũ)
print("\nĐang trích xuất: 1. Đặc tính Sản phẩm (Item Features)...")
try:
    products_collection = db['products'] # <-- ⚠️ THAY TÊN COLLECTION NẾU KHÁC
    pipeline_items = [
        { '$unwind': '$variants' }, 
        {
            '$project': {
                '_id': 0,
                'item_id': {
                    '$concat': [
                        { '$toString': '$_id' }, 
                        '_', '$variants.color',
                        '_', '$variants.storage'
                    ]
                },
                'name': '$name',
                'category': '$category',
                'brand': '$brand',
                'os': '$specifications.os',
                'ram': '$specifications.ram',
                'color': '$variants.color',
                'storage': '$variants.storage',
                'price': '$variants.price'
            }
        }
    ]
    items_data = list(products_collection.aggregate(pipeline_items))
    items_df = pd.DataFrame(items_data)

    print(f"Thành công! Tìm thấy {len(items_df)} biến thể sản phẩm.")
    print(items_df.head())

except Exception as e:
    print(f"LỖI khi trích xuất Items: {e}")
    exit()


# --- 3. TRÍCH XUẤT DATAFRAME 2: `users_df` (Đặc tính Người dùng) ---
# (Code trích xuất ở phần này GIỮ NGUYÊN như cũ)
print("\nĐang trích xuất: 2. Đặc tính Người dùng (User Features)...")
try:
    users_collection = db['users'] # <-- ⚠️ THAY TÊN COLLECTION NẾU KHÁC
    pipeline_users = [
        {
            '$project': {
                '_id': 0,
                'user_id': { '$toString': '$_id' }, 
                'address': '$address', 
                'provider': '$provider'
            }
        }
    ]
    users_data = list(users_collection.aggregate(pipeline_users))
    users_df = pd.DataFrame(users_data)
    
    print(f"Thành công! Tìm thấy {len(users_df)} người dùng.")
    print(users_df.head())

except Exception as e:
    print(f"LỖI khi trích xuất Users: {e}")
    exit()


# --- 4. TRÍCH XUẤT DATAFRAME 3: `interactions_df` (Tương tác) ---
# (Code trích xuất ở phần này GIỮ NGUYÊN như cũ)
print("\nĐang trích xuất: 3. Tương tác (Interactions)...")
try:
    # 4.1. Lấy sự kiện 'purchase' từ collection 'orders'
    orders_collection = db['orders'] # <-- ⚠️ THAY TÊN COLLECTION NẾU KHÁC
    pipeline_purchases = [
        { '$unwind': '$orderItems' },
        {
            '$project': {
                '_id': 0,
                'user_id': { '$toString': '$user' },
                'item_id': {
                    '$concat': [
                        { '$toString': '$orderItems.product' },
                        '_', '$orderItems.color',
                        '_', '$orderItems.storage'
                    ]
                },
                'event_type': 'purchase' 
            }
        }
    ]
    purchases_data = list(orders_collection.aggregate(pipeline_purchases))
    purchases_df = pd.DataFrame(purchases_data)
    print(f"Tìm thấy {len(purchases_df)} lượt MUA HÀNG.")

    # 4.2. Lấy sự kiện 'add_to_cart' từ collection 'carts'
    carts_collection = db['carts'] # <-- ⚠️ THAY TÊN COLLECTION NẾU KHÁC
    pipeline_carts = [
        { '$unwind': '$items' },
        {
            '$project': {
                '_id': 0,
                'user_id': { '$toString': '$userId' },
                'item_id': {
                    '$concat': [
                        { '$toString': '$items.productId' },
                        '_', '$items.color',
                        '_', '$items.storage'
                    ]
                },
                'event_type': 'add_to_cart'
            }
        }
    ]
    carts_data = list(carts_collection.aggregate(pipeline_carts))
    carts_df = pd.DataFrame(carts_data)
    print(f"Tìm thấy {len(carts_df)} lượt THÊM VÀO GIỎ.")

    # 4.3. Gộp tất cả tương tác lại
    interactions_df = pd.concat([purchases_df, carts_df])
    
    # 4.4. Lọc rác
    valid_items = items_df['item_id'].unique()
    valid_users = users_df['user_id'].unique()
    
    interactions_df = interactions_df[
        interactions_df['item_id'].isin(valid_items) &
        interactions_df['user_id'].isin(valid_users)
    ]

    print(f"\nThành công! Tổng cộng có {len(interactions_df)} tương tác hợp lệ.")
    print(interactions_df.head())

except Exception as e:
    print(f"LỖI khi trích xuất Interactions: {e}")
    exit()