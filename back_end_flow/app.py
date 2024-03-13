from fastapi import FastAPI
#from motor.motor_asyncio import AsyncIOMotorClient
from fastapi.encoders import jsonable_encoder
from data import *
import pandas as pd
import json
from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel
import pandas as pd
import uvicorn
from model import *
from typing import List, Dict
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
client = MongoClient("mongodb://localhost:27017/")
db = client["cici_flow"]

ip = "192.168.189.133"
intf_str = "ens33"


collection = db[f"flow_data_{ip}_{intf_str}"]

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, # Danh sách các nguồn gốc có thể truy cập API của bạn
    allow_credentials=True,
    allow_methods=["*"], # Phương thức HTTP cho phép
    allow_headers=["*"], # Tiêu đề HTTP cho phép
)

# @app.get("/items/", response_model=List[dict])
# async def read_items():
#     try:
    
        
#         # # Tiền xử lý dữ liệu
#         # df_processed = preprocess_flow(df_f)
        
#         # # Dự đoán
#         # pred = model.predict(df_processed)
        
#         # # Thêm kết quả dự đoán vào DataFrame
#         # df_f['label'] = pred
        
#         df_l = predict_label(collection)

        
#         return df_l[0:15]
        
#         # Trả về kết quả dưới dạng JSON
#         #return df_f.to_dict(orient='records')
#     except Exception as e:
#     # Nếu có lỗi, trả về thông báo lỗi với status code 500
#         raise HTTPException(status_code=500, detail=str(e))
    
    
#API: http://127.0.0.1:8000/items/?page=1&limit=10&filter_field=Source%20IP&filter_value=117.18.232.200   
@app.get("/items/", response_model=List[Dict])
async def read_items(page: int = Query(1, alias="page"), limit: int = Query(1, alias="limit"), filter_field: str = Query("", alias="filter_field"), filter_value: str = Query("", alias="filter_value")):
    try:
        if (filter_field == "") | (filter_value == ""):
            skip = (page - 1) * limit
            # Tiền xử lý và dự đoán ở đây
            df_l, df_st = predict_label(collection)
            
            total = len(df_l)
            
            limit = limit
            
            page = page
            
            # Áp dụng phân trang
            paginated_items = df_l[skip : skip + limit]
            
            # Trả về kết quả dưới dạng JSON
            return [{
                "data": paginated_items,
                "limit": limit,
                "page": page,
                "total": total
            }]
        else :
            skip = (page - 1) * limit
            # Tiền xử lý và dự đoán ở đây
            df_l, df_st = predict_label(collection)
            
            df_st = Filter(filter_field, filter_value, df_st)
            
            total = len(df_st)
            
            limit = limit
            
            page = page
            
            # Áp dụng phân trang
            paginated_items = df_st[skip : skip + limit]
            
            return [{
                "data": paginated_items,
                "limit": limit,
                "page": page,
                "total": total
            }]
            
    except Exception as e:
        # Nếu có lỗi, trả về thông báo lỗi với status code 500
        raise HTTPException(status_code=500, detail=str(e))
    
@app.get("/alert/", response_model=List[dict])
async def read_alert():
    try:
        
        df_l = predict_label(collection)
        df_a = get_alert(df_l)

        
        return df_a[0:15]
        
        # Trả về kết quả dưới dạng JSON
        #return df_f.to_dict(orient='records')
    except Exception as e:
    # Nếu có lỗi, trả về thông báo lỗi với status code 500
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
