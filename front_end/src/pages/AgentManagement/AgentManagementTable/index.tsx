import { Card, Switch, Tooltip, Typography } from "antd";
import { FC, useState } from "react";
import { ColumnsType } from "antd/es/table";

import "./style.scss";
import { IpType } from "../../../constants/types/rules.type";
import ListButtonActionUpdate from "../../../components/ListButtonActionUpdate";
import TableCustom from "../../../components/TableCustom";
import { CommonGetAllParams } from "../../../constants/types/common.type";
import { dataMock } from "./mockData.config";
import CardTitleCustom from "../../../components/CardTitleCustom";
import { useNavigate } from "react-router-dom";
//import { USER_MANAGEMENT_DETAILS } from "../../../routes/route.constant";
import { usePhantrang } from "../../../utils/request";
import { Ipfilter } from "../../../constants/types/common.type";

const AgentManagementTable: FC = () => {
  const navigate = useNavigate();
  /* =========== SAU NAY LIST DANH SACH IP PHAN TRANG O DAY==============
  const [params, setParams] = useState<CommonGetAllParams>({
    limit: 10,
    page: 1,
  });
  const {data, mutate,isLoading} = usePhantrang(params);
*/
/*================ DU LIEU MAU, backend tra ve dang nay=============*/
const [params, setParams] = useState<CommonGetAllParams>({
  limit: 10,
  page: 1,
});
const isLoading = false
const Danhsachip = {
  "data": 
  [
  {'ip':'192.168.10.1','id':1},
  {'ip':'192.168.10.2','id':2},
  {'ip':'192.168.10.3','id':3},
  {'ip':'192.168.10.4','id':4},
  {'ip':'192.168.10.5','id':5},
                          ],
      "limit": 5,
      "page": 1,
      "total": 10
    }
  
  //=================== KET THUC DU LIEU MAU===================
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
  // const dataTable = dataMock.data
  //   ? dataMock.data.map((item: any) => {
  //     return {
  //       ...item,
  //       key: item.id,
  //     };
  //   })
  //   : [];
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
      title: "dia chi ip",
      dataIndex: "ip",
      align: "center",
      render: (group) => (
        <Tooltip title={group}>
          <div className="inline-text">{group}</div>
        </Tooltip>
      ),
    },
    {
      key: 3,
      title: "Status",
      align: "center",
      width: "10%",
      render: (_, record) => (
        <>
      <Switch defaultValue={true}/>
        </>
      ),
    },
    {
      key: 4,
      title: "Chi tiet",
      align: "center",
      width: "10%",
      render: (_, record) => (
        <>
          <ListButtonActionUpdate
            // editFunction={() => {}}
            viewFunction={() => navigate(`/agent-management-details/${record.id}`)}
          />
          
        </>
      ),
    }

  ];
 

  return (
    <div>
      <Card className="card-container" size="small">
        <CardTitleCustom title="List agent"/>
        <TableCustom
          dataSource={Danhsachip?.data}
          columns={columns}
          bordered={true}
          //isLoading={!data && isLoading}
          isLoading={isLoading}
          limit={Danhsachip.limit || 10}
          total={Danhsachip?.total}
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

export default AgentManagementTable;
