import React, { useState } from "react";
import { Avatar, Button, List, Modal, Space, Table } from "antd";
import CreateActivityForm from "./CreateActivityForm";
import UserTransferList from "./UserTransferList";
import { DeleteButton, EditButton, useTable } from "@refinedev/antd";

const ActivityTableView = ({ baderdata, baderid, teamid, ActivityList }) => {
  const { tableProps } = useTable({
    resource: "activities",
    meta: {
      populate: ["photos"],
    },
  });
  console.log("ActivityList", ActivityList);



  const [isCreateActivityModalVisible, setIsCreateActivityModalVisible] =
    useState(false);
  const [isAssignMembersModalVisible, setIsAssignMembersModalVisible] =
    useState(false);
  const [selectedActivityId, setSelectedActivityId] = useState(null);

  const showAssignMembersModal = (teamId) => {
    setSelectedActivityId(teamId);
    setIsAssignMembersModalVisible(true);
  };

  const handleAssignMembersCancel = () => {
    setSelectedActivityId(null);
    setIsAssignMembersModalVisible(false);
  };

  const showModal = () => {
    setIsCreateActivityModalVisible(true);
  };

 

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Create Activity
      </Button>
      
        <CreateActivityForm
          teamid={teamid}
          baderid={baderid}
          setIsCreateActivityModalVisible={setIsCreateActivityModalVisible}
          isCreateActivityModalVisible={isCreateActivityModalVisible}
        />
     
      <Modal
        title="Assign Members to Acivity"
        visible={isAssignMembersModalVisible}
        onCancel={handleAssignMembersCancel}
        footer={null}
      >
        <UserTransferList
          selectedActivityId={selectedActivityId}
          baderdata={baderdata}
          setIsAssignMembersModalVisible={setIsAssignMembersModalVisible}
        />
      </Modal>
      <List>
        <Table {...tableProps} rowKey="id">
          <Table.Column dataIndex="id" key="id" title="ID" />
          <Table.Column
            dataIndex="photos"
            key="photos"
            title="Photo"
            render={(photos) =>
              photos !== null ? (
                <Avatar src={photos[0]?.url ?? null} />
              ) : null
            }
          />
          <Table.Column dataIndex="name" key="name" title="Names" />
          <Table.Column dataIndex="purpose" key="purpose" title="Purpose" />

          {/* <Table.Column
            title="Actions"
            dataIndex="actions"
            key="actions"
            render={(_, record) => ( 
              <Space>
                <EditButton hideText="false" size="small" recordItemId={record.id} />
                <DeleteButton hideText="false" size="small" recordItemId={record.id} />
              </Space>
            )}
            width="150px"
          /> */}
        </Table>
      </List>
      {/* <Table columns={columns} dataSource={ActivityList} /> */}
    </>
  );
};

export default ActivityTableView;