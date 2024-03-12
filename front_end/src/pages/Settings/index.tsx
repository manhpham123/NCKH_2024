import { PlusCircleOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CREATEVALUATION } from '../../routes/route.constant'

const Settings = () => {
  const navigate = useNavigate();
  const handleCreate = () => {
      navigate(CREATEVALUATION)
  }
  return (
    <div> 
        <Button icon={<PlusCircleOutlined></PlusCircleOutlined>} onClick={handleCreate}>Thêm</Button>
    </div>
  )
}

export default Settings