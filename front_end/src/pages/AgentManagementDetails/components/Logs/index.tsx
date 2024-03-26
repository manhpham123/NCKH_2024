import React, { useState } from "react";
import "./style.scss";
import LogsTable from "./LogsTable";
import LogsFilter from "./LogsFilter";
import { useParams } from "react-router-dom";
const Logs = () => {
  let { id } = useParams();
  const [filter, setFilter]= useState<any>({})
  const [isopenKeyCreateModal, setIsOpenKeyCreateModal] =
    useState<boolean>(false);

  const openKeyCreateModal = () => {
    setIsOpenKeyCreateModal(true);
  };

  const closeKeyCreateModal = () => {
    setIsOpenKeyCreateModal(false);
  };


  return (
    <>
      <div style={{ marginBottom: '12px' }}>
        <LogsFilter filters={filter} setFilters={setFilter}/>
      </div>
      <LogsTable id = {id} />
    </>
  );
};

export default Logs;
