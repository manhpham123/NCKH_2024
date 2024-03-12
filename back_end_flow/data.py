from pymongo import MongoClient
import joblib
#import torch
import numpy as np # linear algebra
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)

import seaborn as sns
import matplotlib.pyplot as plt

from sklearn.preprocessing import StandardScaler 
import warnings

from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
import time
from sklearn.preprocessing import normalize


client = MongoClient("mongodb://localhost:27017/")
db = client["cici_flow"]

ip = "192.168.189.133"
intf_str = "ens33"
label_mapping = {"BENIGN": 0, "DoS Hulk": 1,'PortScan':2,'DDoS':3,'DoS GoldenEye':4,
                 'FTP-Patator':5,'SSH-Patator':6,'DoS slowloris':7,'DoS Slowhttptest':8,'Bot':9,'Web Attack-Brute Force':10,
                 'Web Attack-XSS':11,'Infiltration':12,'Web Attack-Sql Injection':13,'Heartbleed':14}
reverse_label_mapping = {value: key for key, value in label_mapping.items()}

collection = db[f"flow_data_{ip}_{intf_str}"]

model = joblib.load("/home/frblam/Desktop/NCKH/back_end_flow/rfc.joblib")

def reduce_mem_usage(df, verbose=True):
    # 定义数值型数据类型的列表
    numerics = ['int16', 'int32', 'int64', 'float16', 'float32', 'float64']

    # 计算当前DataFrame占用的内存
    start_mem = df.memory_usage(deep=True).sum() / 1024**2

    # 遍历DataFrame的每一列
    for col in df.columns:
        # 获取当前列的数据类型
        col_type = df[col].dtypes

        # 如果数据类型属于数值型
        if col_type in numerics:
            # 计算列数据的最小值和最大值，用于选择适当的数据类型
            c_min = df[col].min()
            c_max = df[col].max()

            # 如果数据类型是int类型
            if str(col_type)[:3] == 'int':
                # 根据取值范围选择合适的数据类型
                if c_min > np.iinfo(np.int8).min and c_max < np.iinfo(np.int8).max:
                    df[col] = df[col].astype(np.int8)
                elif c_min > np.iinfo(np.int16).min and c_max < np.iinfo(np.int16).max:
                    df[col] = df[col].astype(np.int16)
                elif c_min > np.iinfo(np.int32).min and c_max < np.iinfo(np.int32).max:
                    df[col] = df[col].astype(np.int32)
                elif c_min > np.iinfo(np.int64).min and c_max < np.iinfo(np.int64).max:
                    df[col] = df[col].astype(np.int64)
            else:
                # 根据取值范围选择合适的数据类型
                if c_min > np.finfo(np.float32).min and c_max < np.finfo(np.float32).max:
                    df[col] = df[col].astype(np.float32)
                else:
                    df[col] = df[col].astype(np.float64)

    # 计算优化后DataFrame的内存占用
    end_mem = df.memory_usage(deep=True).sum() / 1024**2

    # 输出优化结果信息
    if verbose:
        print('Mem. usage decreased to {:5.2f} Mb ({:.1f}% reduction)'.format(end_mem, 100 * (start_mem - end_mem) / start_mem))

    return df

def read_all_data(collection_name):
    cursor = collection.find()

    # Chuyển đổi dữ liệu từ cursor thành danh sách
    all_data = list(cursor)

    # Đóng kết nối đến MongoDB
    #client.close()

    return all_data




def preprocess_flow(df_f):
    columns_to_drop = ['Source IP', 'Source Port', 'Destination IP', 'Protocol', 'Timestamp']

# Bỏ các cột đã chọn khỏi dataframe
    df = df_f.drop(columns=columns_to_drop, axis=1)
    df.head()
    df = reduce_mem_usage(df)
    df.shape
    
    train_df = df  # 假设Week是一个DataFrame对象

    stats = []  # 用于存储特征统计信息的列表

    # 遍历DataFrame的每个列
    for col in train_df.columns:
        # 计算特征的统计信息，并将这些信息添加到stats列表中
        stats.append((col,  # 特征名
                    train_df[col].nunique(),  # 特征中唯一值的数量
                    train_df[col].isnull().sum() * 100 / train_df.shape[0],  # 缺失值的百分比
                    train_df[col].value_counts(normalize=True, dropna=False).values[0] * 100,  # 最常出现的值在特征中的百分比
                    train_df[col].dtype))  # 特征的数据类型

    # 创建一个DataFrame来存储特征统计信息
    stats_df = pd.DataFrame(stats, columns=['Feature', 'Unique_values', 'Percentage of missing values', 'Percentage of values in the biggest category', 'type'])

    # 根据缺失值的百分比降序排列DataFrame
    stats_df.sort_values('Percentage of missing values', ascending=False)
    df = df.dropna().reset_index(drop = True)
    df['Flow Bytes/s'].isnull().sum()
    df.shape

    meaningless_feature = stats_df[stats_df['Unique_values']==1]['Feature'].to_list()
    #df = df.drop(columns=meaningless_feature)

    df.shape
    
    df = df[['Destination Port', 'Flow Duration', 'Total Fwd Packets', 'Total Backward Packets',
       'Total Length of Fwd Packets', 'Total Length of Bwd Packets',
       'Packet Length Variance', 'Bwd Packet Length Std', 'Max Packet Length',
       'Min Packet Length', 'Bwd Packet Length Min', 'Fwd Packet Length Max']]


    
    ss = StandardScaler()
    df = ss.fit_transform(df)  # 对特征进行标准化
        
    return df

# Giả sử data được đọc từ hàm read_all_data(collection) và bạn đã có `data`


# Gọi hàm preprocess để tiền xử lý dữ liệu

# In DataFrame sau khi thêm cột 'label'


def predict_label(collection):
    data = read_all_data(collection)
    df_f = pd.DataFrame(data)
    df_processed = preprocess_flow(df_f)
    columns_to_drop = ['_id']

    # Bỏ các cột đã chọn khỏi dataframe
    df_f = df_f.drop(columns=columns_to_drop, axis=1)
    
    # Thực hiện dự đoán
    pred = model.predict(df_processed)

    # Thêm trường 'label' vào `df_f` với giá trị từ `pred`
    df_f = df_f[['Destination Port', 'Flow Duration', 'Total Fwd Packets', 'Total Backward Packets',
       'Total Length of Fwd Packets', 'Total Length of Bwd Packets',
       'Packet Length Variance', 'Bwd Packet Length Std', 'Max Packet Length',
       'Min Packet Length', 'Bwd Packet Length Min', 'Fwd Packet Length Max']]
    df_f['label'] = pred
    df_f['label'] = df_f['label'].map(reverse_label_mapping)
    
    #print(df_f)
    
    return df_f.to_dict(orient='records')
    #return df_f
        
df_p = predict_label(collection)


def get_alert (df_p):
    l_df_a = []
    for row in df_p:
        if row['label'] != 'BENIGN':
            
            #row['label'] = row['label'].map(label_mapping)
            l_df_a.append(row)
            print(row['label'])
    return l_df_a
        
kq =  get_alert(df_p)
#print(kq)


