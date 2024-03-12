from fastapi import FastAPI
#from motor.motor_asyncio import AsyncIOMotorClient
from fastapi.encoders import jsonable_encoder
from data import *
import pandas as pd
import json
from fastapi import FastAPI, HTTPException
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

@app.get("/items/", response_model=List[dict])
async def read_items():
    try:
    
        
        # # Tiền xử lý dữ liệu
        # df_processed = preprocess_flow(df_f)
        
        # # Dự đoán
        # pred = model.predict(df_processed)
        
        # # Thêm kết quả dự đoán vào DataFrame
        # df_f['label'] = pred
        
        df_l = predict_label(collection)

        
        return df_l[0:15]
        
        # Trả về kết quả dưới dạng JSON
        #return df_f.to_dict(orient='records')
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
