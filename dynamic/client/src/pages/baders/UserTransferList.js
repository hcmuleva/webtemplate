import React, { useState, useEffect } from 'react';
import { Transfer, Table, Checkbox, Divider, Button } from 'antd';
import { Radio, Select, Space } from 'antd';
import { useShow } from "@refinedev/core";
import { useCreate, useGetIdentity } from "@refinedev/core";
import axios from 'axios'; // Import Axios

const UserTransferList = ({ setIsAssignMembersModalVisible,selectedTeamId,baderdata}) => {
  const { mutate } = useCreate();

  console.log("selectedTeamId in transfer comp ln7",selectedTeamId)
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

  }
}, [teamData, teamLoading]);


useEffect(() => {
  if (myorglist.length > 0) { // Wait until myorglist is populated
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

  const getMock = () => {
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

    setTargetKeys(tempTargetKeys);
    setMockData(tempMockData);
  };

  useEffect(() => {
    getMock();
  }, []);

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
      setIsAssignMembersModalVisible(false)
    } else {
      console.error('Error updating members.');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
};



  
  
  return (
    <>
       <Divider />  
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
    <Button type="primary" onClick={handleUpdateMembers}>
        Update Members
      </Button>
    </>
  );
};

export default UserTransferList;
