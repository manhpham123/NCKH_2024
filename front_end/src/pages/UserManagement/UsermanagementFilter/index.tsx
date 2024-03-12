import {
  Button,
  Card,
  Row,
  Space,
  Typography,
  Form,
  Input,
} from "antd";
import "./style.scss";
import React, { useEffect, useState } from "react";
import { FilterUserManagementType } from "../../../constants/types/userManagement.type";
import ButtonCustom from "../../../components/ButtonCustom";

type Props = {
  filters: FilterUserManagementType;
  setFilters: (filters: FilterUserManagementType) => void;
};


const UserManagementFilter: React.FC<Props> = ({ filters, setFilters }) => {
  const [filterData, setFilterData] = useState<FilterUserManagementType>({});

  useEffect(() => {
    if (filters) {
      setFilterData({ ...filterData, ...filters })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);



  return (
    <Form className="userManager-FilterForm">
      <Space direction="horizontal" style={{width: '100%'}}>
        <Input placeholder="Search IP ..." />
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

export default UserManagementFilter;
