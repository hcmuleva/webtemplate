import React, { useState } from "react";
import { Avatar, Table, Tag, Button, Modal } from "antd";
import CreateUsers from "./CreateUsers";

const UserListTable = ({ userList,baderid }) => {
    const [open, setOpen] = useState(false)
    const showModal = () => {
        setOpen(true)
    }
    const handleCancel = () => {
        setOpen(false)
    }
    const handleOk = () => {
        setOpen(false)
    }

    



    const columns = [
        {
            title: "Photo",
            dataIndex: "photo",
            key: "photo",
            render: (photo) => <Avatar src={photo?.formats?.thumbnail?.url} />,
        },
        {
            title: "Name",
            dataIndex: "firstname",
            key: "firstname",
            //   render: (text, record) => (
            //     <a href={`/users/${record.id}`}>{text}</a> // Replace with appropriate link
            //   ),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Mobile",
            dataIndex: "mobile",
            key: "mobile",
            render: (role) => <Tag color={role === "admin" ? "blue" : "green"}>{role}</Tag>,
        },
        // Add more columns as needed
    ];

    return (
        <>
        <Button type="primary" onClick={showModal}> Create User</Button>
        <Modal  visible={open} title="Create User" width={1200} onOk={handleOk} onCancel={handleCancel} footer={null}>
            <CreateUsers baderid={baderid}/>
        </Modal>
            <Table
            dataSource={userList}
            columns={columns}
            rowKey="id" // Assuming 'id' is the unique identifier for each user
        />
        </>

    );
};

export default UserListTable;
