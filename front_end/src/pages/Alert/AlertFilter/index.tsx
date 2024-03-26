import {
  Button,
  Card,
  Row,
  Space,
  Typography,
  Form,
  Input,
  Select,
} from "antd";
import "./style.scss";
import React, { useEffect, useState } from "react";
import ButtonCustom from "../../../components/ButtonCustom";
import { Alertfilter } from "../../../constants/types/common.type";

type Props = {
  filters: Alertfilter;
  setFilters: (filters: Alertfilter) => void;
};


const AlertFilter: React.FC<Props> = ({ filters, setFilters }) => {
const [filterData, setFilterData] = useState<Alertfilter>({});

  useEffect(() => {
    if (filters) {
      setFilterData({ ...filterData, ...filters })
    }
  }, [filters]);

  return (
    <Form className="alert-FilterForm" layout="vertical">
      <Space direction="horizontal" style={{width: '100%'}}>

        {/* <Form.Item label="chon truong">
        <Select onChange={(target)=>}>
            <Select.Option >ip nguon</Select.Option>      
            <Select.Option>ip dich</Select.Option>  
            <Select.Option>mac</Select.Option>      
        </Select>

        </Form.Item>
        
        <Form.Item label="gia tri">
        
        <Input placeholder="Search IP ..." />
        </Form.Item> */}
        <Input placeholder="Source IP ..." />
        <ButtonCustom
          label="Search"
          bgColor="#2862AF"
          type="primary"
          onClick={() => setFilters({ ...filterData })}
        />
      </Space>
    </Form>
    
  );
};

export default AlertFilter;
