import { Card, Tooltip, Typography } from "antd";
import { FC, useState } from "react";
import { ColumnsType } from "antd/es/table";

import "./style.scss";
import { ItemType } from "../../../constants/types/rules.type";
import ListButtonActionUpdate from "../../../components/ListButtonActionUpdate";
import TableCustom from "../../../components/TableCustom";
import { CommonGetAllParams } from "../../../constants/types/common.type";
import { dataMock } from "./mockData.config";
import CardTitleCustom from "../../../components/CardTitleCustom";
import { useNavigate } from "react-router-dom";
import { USER_MANAGEMENT_DETAILS } from "../../../routes/route.constant";
import { usePhantrang } from "../../../utils/request";
import { Itemfilter } from "../../../constants/types/common.type";

const UserManagementTable: FC = () => {
  const navigate = useNavigate();
  const [params, setParams] = useState<CommonGetAllParams>({
    limit: 10,
    page: 1,
  });
  const {data, mutate,isLoading} = usePhantrang(params);

  
  const [isEditSystemParamsModalShow, SetIsEditSystemParamsModalShow] =
    useState(false);
  const [selectedRule, setSelectedRule] = useState<any>({});
  const closeEditSystemParamsModal = () => {
    SetIsEditSystemParamsModalShow(false);
  };
  const openEditSystemParamsModal = (record: any) => {
    SetIsEditSystemParamsModalShow(true);
    setSelectedRule(record);
  };
  // const { data, isLoading, error, mutate } = useSystemParams(params, filter);
  const dataTable = dataMock.data
    ? dataMock.data.map((item: any) => {
      return {
        ...item,
        key: item.id,
      };
    })
    : [];
  const columns: ColumnsType<any> = [
    {
      key: 1,
      title: "Index",
      align: "center",
      width: "10%",
      render: (_, record, index) => {
        return index + 1;
      },
    },
    {
      key: 2,
      title: "Source IP",
      dataIndex: "Source IP",
      align: "center",
      render: (group) => (
        <Tooltip title={group}>
          <div className="inline-text">{group}</div>
        </Tooltip>
      ),
    },
    {
      key: 3,
      title: "Source Port",
      dataIndex: "Source Port",
      align: "center",
      render: (group) => (
        <Tooltip title={group}>
          <div className="inline-text">{group}</div>
        </Tooltip>
      ),
    },
    {
      key: 4,
      title: "Destination IP",
      dataIndex: "Destination IP",
      align: "center",
      render: (group) => (
        <Tooltip title={group}>
          <div className="inline-text">{group}</div>
        </Tooltip>
      ),
    },
    {
      key: 5,
      title: "Destination Port",
      dataIndex: "Destination Port",
      align: "center",
      render: (group) => (
        <Tooltip title={group}>
          <div className="inline-text">{group}</div>
        </Tooltip>
      ),
    },
    {
      key: 6,
      title: "Protocol",
      dataIndex: "Protocol",
      align: "center",
      render: (group) => (
        <Tooltip title={group}>
          <div className="inline-text">{group}</div>
        </Tooltip>
      ),
    },
    {
      key: 7,
      title: "Timestamp",
      dataIndex: "Timestamp",
      align: "center",
      render: (group) => (
        <Tooltip title={group}>
          <div className="inline-text">{group}</div>
        </Tooltip>
      ),
    },
    {
      key: 8,
      title: "du doan",
      dataIndex: "label",
      align: "center",
      render: (group) => (
        <Tooltip title={group}>
          <div className="inline-text">{group}</div>
        </Tooltip>
      ),
    },
    {
      key: 9,
      title: "Action",
      align: "center",
      width: "10%",
      render: (_, record) => (
        <>
          <ListButtonActionUpdate
            editFunction={() => {}}
            viewFunction={() => navigate(`/user-management-details/${123}`)}
          />
        </>
      ),
    },
  ];
 

  return (
    <div>
      <Card className="card-container" size="small">
        <CardTitleCustom title="List flows"/>
        <TableCustom
          dataSource={data?.data}
          columns={columns}
          bordered={true}
          //isLoading={!data && isLoading}
          isLoading={isLoading}
          limit={params.limit || 10}
          total={data?.total}
          onLimitChange={(limit) => {
            setParams({ ...params, limit });
          }}
          onPageChange={(page) => {
            setParams({ ...params, page });
          }}
          page={params.page || 1}
        />
      </Card>
    </div>
  );
};

export default UserManagementTable;
