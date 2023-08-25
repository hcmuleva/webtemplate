import React, { useState } from "react";
import { Avatar, Button, Modal, Table } from "antd";
import CreateTeamForm from "./CreateTeamForm";
import UserTransferList from "./UserTransferList";
import { useShow } from "@refinedev/core";

const TeamListTableView = ({ baderdata,baderid,teamList }) => {
    console.log("teamList",teamList)
      const columns = [
    {
      title: "Logo",
      dataIndex: "photo",
      key: "photo",
      render: (photo) => <Avatar src={photo?.formats?.thumbnail?.url} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
        title: "Actions",
        dataIndex: "id", 
        key: "actions",
        render: (id) => (
          <Button type="link" onClick={() => showAssignMembersModal(id)}>
            Assign Members
          </Button>
        ),
      },
  ];

  const [isCreateTeamModalVisible, setIsCreateTeamModalVisible] = useState(false);
  const [isAssignMembers, setIsAssignMembers] =useState(false);
const [selectedTeamId, setSelectedTeamId] = useState(null);

const showAssignMembersModal = (teamId) => {
  setSelectedTeamId(teamId);
  setIsAssignMembers(true);
};


  const showModal = () => {
    setIsCreateTeamModalVisible(true);
  };

  const handleCancel = () => {
    setIsCreateTeamModalVisible(false);
  };

  return (
 <>  {isAssignMembers? <UserTransferList  selectedTeamId={selectedTeamId} setSelectedTeamId={setSelectedTeamId} baderdata={baderdata} setIsAssignMembers={setIsAssignMembers} isAssignMembers={isAssignMembers}/>: <> 
      <Button type="primary" onClick={showModal}>
        Create Team
      </Button>
      <Modal
        title="Create Team"
        visible={isCreateTeamModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <CreateTeamForm baderid={baderid} setOpen={setIsCreateTeamModalVisible}/>
      </Modal>
     
       
      
      <Table columns={columns} dataSource={teamList} />
      </>
  }
   </>
  );
};

export default TeamListTableView;
