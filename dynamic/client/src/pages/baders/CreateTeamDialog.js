import { useShow } from '@refinedev/core';
import { Button, Divider, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { Radio, Select, Space } from 'antd';

import { UserAddOutlined, TeamOutlined, PlusOutlined } from '@ant-design/icons';
import UserTransferList from '../users/UserTransferList';

const CreateTeamDialog = ({ baderdata }) => {
    console.log("Bader id in createteam dialog", baderdata)
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    
    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOpen(false);
        }, 3000);
    };

    const handleCancel = () => {
        setOpen(false);
    };
   
 
    return (
        <>
            <Button  icon={
                    <div>
                        <PlusOutlined />
                        <TeamOutlined />
                    </div>
                } type="primary" onClick={showModal}>
               AssignTeam
            </Button>
            <Modal
                visible={open}
                title="Create Team"
                width={1200} // Adjust the width as needed
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Return
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                        Submit
                    </Button>,
                    <Button
                        key="link"
                        href="https://google.com"
                        type="primary"
                        loading={loading}
                        onClick={handleOk}
                    >
                        Search on Google
                    </Button>,
                ]}
            >
                
                 
        
              
        <UserTransferList  baderdata={baderdata}/>
            </Modal>
        </>
    );
};


export default CreateTeamDialog;