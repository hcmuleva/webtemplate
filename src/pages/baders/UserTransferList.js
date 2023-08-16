import React, { useState, useEffect } from 'react';
import { Transfer, Table, Checkbox, Divider, Button, Modal } from 'antd';
import { Radio, Select, Space } from 'antd';
import { useShow } from "@refinedev/core";
import { useCreate, useGetIdentity } from "@refinedev/core";
import axios from 'axios'; // Import Axios

const UserTransferList = ({setIsAssignMembers,selectedTeamId,baderdata}) => {
  const { mutate } = useCreate();

  const [orgdata,setOrgdata]=useState([])
  const { queryResult } = useShow({
    resource: 'teams', // Replace with the appropriate resource name for teams
    id: selectedTeamId,
    metaData: { populate: ['members' ] },

  });
  const { data: teamData, loading: teamLoading } = queryResult;
  
  console.log("teamData in transfer comp ln 21",teamData)
  const totaluserlist =baderdata?.users_permissions_users??  []
  const [myorglist,setMyorglist]=useState([])
  const [targetKeys, setTargetKeys] = useState([]);
  const [mockData, setMockData] = useState([]);
  const id=selectedTeamId

  useEffect(() => {
    if (!teamLoading && teamData) {
      console.log("teamLoading TeamData", teamData);
      console.log("teamLoading TeamData conditionally", teamData.data.members);
      const membersInTeam = teamData.data.members;
      setMyorglist(membersInTeam);

      // Reset target keys and mock data when myorglist changes
      getMock(true);
    }
  }, [teamData, teamLoading, selectedTeamId]);
console.log("Myorglist",myorglist)

useEffect(() => {
  if (myorglist&&myorglist.length > 0) { // Wait until myorglist is populated
    const updatedMockData = totaluserlist.map(user => ({
      key: user.id.toString(),
      title: user.username,
      mobile: user.mobile,
      firstname: user.firstname,
      chosen: myorglist.some(orgUser => orgUser.id === user.id),
    }));

    const updatedTargetKeys = updatedMockData
      .filter(data => data.chosen)
      .map(data => data.key);

    setMockData(updatedMockData);
    setTargetKeys(updatedTargetKeys);
  }
}, [myorglist]);

const getMock = (updateStates = false) => {
  const tempTargetKeys = [];
  const tempMockData = totaluserlist.map(user => ({
    key: user.id.toString(),
    title: user.username,
    mobile: user.mobile,
    firstname: user.firstname,
    chosen: myorglist.some(orgUser => orgUser.id === user.id),
  }));

  tempMockData.forEach(data => {
    if (data.chosen) {
      tempTargetKeys.push(data.key);
    }
  });

  if (updateStates) {
    setTargetKeys(tempTargetKeys);
    setMockData(tempMockData);
  }

  return tempMockData;
};



  const filterOption = (inputValue, option) =>
    option.mobile.indexOf(inputValue) > -1;

  const handleChange = newTargetKeys => {
    setTargetKeys(newTargetKeys);
  };

  const handleSearch = (dir, value) => {
    console.log('search:', dir, value);
  };

  const columns = [
    {
      title: 'Select',
      dataIndex: 'select',
      render: (text, record) => (
        <Checkbox
          checked={record.chosen}
          onChange={() => handleCheckboxChange(record)}
        />
      ),
    },
    
    {
      title: 'Mobile',
      dataIndex: 'mobile',
      key: 'mobile',
    },
    
  ];

  const handleCheckboxChange = record => {
    const updatedMockData = mockData.map(data =>
      data.key === record.key ? { ...data, chosen: !data.chosen } : data
    );
    const updatedTargetKeys = updatedMockData
      .filter(data => data.chosen)
      .map(data => data.key);
    setMockData(updatedMockData);
    setTargetKeys(updatedTargetKeys);
  };

  const handleCancleMembers = () => {
    setIsAssignMembers(false)
  }

const handleUpdateMembers = async () => {
  const updatedMembers = mockData.filter(data => data.chosen).map(data => data.key);
  
  // Prepare the data for the PUT request
  const requestData = {
    members: updatedMembers,
  };

  try {
    const response = await axios.put(`https://eksamaj.in/samajseva/api/teams/${selectedTeamId}`, {data:requestData});

    if (response.status === 200) {
      console.log('Members updated successfully:', response.data);
      setIsAssignMembers(false)
    } else {
      console.error('Error updating members.');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
};



  
  
  return (
    <>
 
    <Transfer
      dataSource={mockData}
      showSearch
      filterOption={filterOption}
      targetKeys={targetKeys}
      onChange={handleChange}
      onSearch={handleSearch}
      render={item => item.title}
      
      listStyle={{ width: '100%', maxWidth: '800px' }} 
    >
      {({ direction, filteredItems }) => {
        const columnsToShow = columns.filter(column =>
          direction === 'left' ? column.dataIndex !== 'firstname' : true
        );
        const tableProps = {
          dataSource: filteredItems,
          columns: columnsToShow,
          pagination: false,
        };
        return <Table {...tableProps} />;
      }}
    </Transfer>
    <Space>
    <Button type="primary" onClick={handleUpdateMembers}>
        Update Members
      </Button>
      <Button type="primary" onClick={handleCancleMembers}>
        Cancel
      </Button>
      </Space>
     
    </>
  );
};

export default UserTransferList;
