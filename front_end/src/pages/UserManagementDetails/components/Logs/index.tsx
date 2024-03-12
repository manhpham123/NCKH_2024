import React, { useState } from "react";
import "./style.scss";
import LogsTable from "./LogsTable";
import LogsFilter from "./LogsFilter";

const Logs = () => {
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
      <LogsTable />
    </>
  );
};

export default Logs;
