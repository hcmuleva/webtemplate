import React, { useState, useEffect } from 'react';
import { Transfer, Table, Checkbox, Divider } from 'antd';
import { Radio, Select, Space } from 'antd';
import { useShow } from "@refinedev/core";

const UserTransferList = ({ selectedTeamId,baderdata}) => {
  console.log("selectedTeamId in transfer comp ln7",selectedTeamId)
  const [orgdata,setOrgdata]=useState([])
  const { data: teamData, loading: teamLoading } = useShow({
    resource: 'teams', // Replace with the appropriate resource name for teams
    
  });
  const getOrgData= async()=>{
    if(!teamLoading&&teamData){
      console.log("Assigning data")
      setOrgdata(teamData.data)
    }
  }
  useEffect(() => {
    getOrgData()
  }, [teamData,teamLoading])

  console.log("teamData in transfer comp ln 21",teamData)
  const totaluserlist =baderdata?.users_permissions_users??  []
  const [myorglist,setMyorglist]=useState([totaluserlist?.[0]])
  const [targetKeys, setTargetKeys] = useState([]);
  const [mockData, setMockData] = useState([]);
  const teamtypelist=['EDUCATION','COMMITEE','BUSINESS','SOCIAL','OTHER']
  const [teamtype,setTeamtype]=useState('Education')
console.log("baderdata in transfer comp",baderdata)
const id=selectedTeamId

useEffect(() => {
  if (!teamLoading && teamData) {
    console.log("teamLoading TeamData",teamData)
    const membersInTeam = teamData.members; // Replace 'members' with the actual field name for members in your team data
    // Update your state or mockData accordingly based on the membersInTeam
  }
}, [teamData, teamLoading]);
console.log("TeamData",teamData);
  const options = [];
  for (let i = 0; i < teamtypelist.length; i++) {
      options.push({
          value: teamtypelist[i],
          label: teamtypelist[i],
      })
  }
  const handleChangeTeamtype = (value) => {
    console.log(`selected ${value}`);
    setTeamtype(value);
    let newMyOrgList;
    if ("EDUCATION" === value) {
        newMyOrgList = [totaluserlist?.[0]];
    } else {
        newMyOrgList = [totaluserlist?.[1]];
    }
    setMyorglist(newMyOrgList);

    const updatedMockData = totaluserlist.map(user => ({
        key: user.id.toString(),
        title: user.username,
        mobile: user.mobile,
        description: user.description,
        chosen: newMyOrgList.some(orgUser => orgUser.id === user.id),
    }));

    setMockData(updatedMockData);

    const updatedTargetKeys = updatedMockData
        .filter(data => data.chosen)
        .map(data => data.key);

    setTargetKeys(updatedTargetKeys);
};

  const getMock = () => {
    const tempTargetKeys = [];
    const tempMockData = totaluserlist.map(user => ({
      key: user.id.toString(),
      title: user.username,
      mobile: user.mobile,
      description: user.description,
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
      title: 'Username',
      dataIndex: 'title',
      key: 'title',
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

  
  useEffect(() => { 
    console.log("teamtype",teamtype)
    if("EDUCATION"===teamtype){
        setMyorglist([totaluserlist?.[0]])  
    }else{     
        setMyorglist([totaluserlist?.[1]])
    }   
    }, [teamtype]);

  return (
    <>
     <Select
         
         
         placeholder="Please select type"
         defaultValue={teamtypelist[0]}
         onChange={handleChangeTeamtype}
         style={{
           width: '20%',
         }}
         options={options}
       />
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
          direction === 'left' ? column.dataIndex !== 'description' : true
        );
        const tableProps = {
          dataSource: filteredItems,
          columns: columnsToShow,
          pagination: false,
        };
        return <Table {...tableProps} />;
      }}
    </Transfer>
    </>
  );
};

export default UserTransferList;
