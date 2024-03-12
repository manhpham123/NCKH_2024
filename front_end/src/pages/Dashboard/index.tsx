import React, { useEffect } from "react";
import DashboardChart from "./component/DashboardChart";
import './style.scss'
import { useDispatch } from "react-redux";
import { setSelectedBreadCrumb } from "../App/store/appSlice";
import DashboardGeneralItem from "./component/DashboardGeneralItem";
import { Space, message } from "antd";
import Icons from "../../assets/icons";
import DboardTopCardItem from "./component/DboardTopCardItem";
import { useItems } from "../../utils/request";
import { customerApi } from "../../apis/customer";

const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    let breadCrumb = [
      {
        label: "Dashboard",
        path: "",
      }
    ]
    dispatch(setSelectedBreadCrumb(breadCrumb))
  }, [])
  const {data, mutate} = useItems()
  // const handlerUpdate = (dataUpdate: any) =>{
  //   const res = customerApi.updateStatus(data);
  //   if(res.status === 200) {
  //     message.success("ooke xong");
  //     mutate();
  //   }else message.error()
  //   message.warning()
  // }
  console.log(data);
  
  return (
    <div className="customers-wrapper">
      <Space direction="horizontal" className="dasboard-gn-wrapper">
        <DashboardGeneralItem title="Số service" value={12} icon={<Icons.bell />} />
      </Space>
      <DashboardChart />
      <Space direction="horizontal" className="dasboard-gn-wrapper" style={{marginTop: 10}}>
          <DboardTopCardItem title="Top vulnerabilities" value={['XSS', 'SQL Injection', 'File Upload']} icon={<Icons.file />}/>
          <DboardTopCardItem title="Top rules" value={['100201', '192020', '192829']} icon={<Icons.camera />}/>
      </Space>
    </div>
  );
};

export default Dashboard;
