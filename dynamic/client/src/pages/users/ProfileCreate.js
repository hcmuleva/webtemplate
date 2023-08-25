import React, { useEffect, useState } from 'react';
import { useList } from '@refinedev/core';
import { Input, Space, Switch } from 'antd';
import { Transfer } from 'antd';

const CreateProfile = ({ userid }) => {
  console.log("Profiles", userid);
  const [mobilenum, setMobilenum] = useState('');
  const [email, setEmail] = useState('');
  const { data, isLoading, isError } = useList({
    resource: 'users',
  });

  console.log("data", data)
  const userlist = data?.data ?? [];
  console.log("userlist", userlist)
  const [targetKeys, setTargetKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [filteredData, setFilteredData] = useState(userlist); // New state for filtered data

 
  useEffect(() => {
    // Filter the data based on 'mobilenum' and 'email'
    const filteredData = userlist.filter((item) => {
      item['key'] = item.id
      const mobileMatch = (item.mobile ?? '').toString().includes(mobilenum.toString());
      const emailMatch = (item.email ?? '').toLowerCase().includes(email.toLowerCase());
      return mobileMatch && emailMatch;
    });
    setFilteredData(filteredData);
  }, [mobilenum, email, userlist]);

console.log("filteredData",filteredData)
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  const triggerDisable = (checked) => {
    setDisabled(checked);
  };

  const onChange = (nextTargetKeys, direction, moveKeys) => {
    console.log('targetKeys:', nextTargetKeys);
    console.log('direction:', direction);
    console.log('moveKeys:', moveKeys);
    setTargetKeys(nextTargetKeys);
  };

  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    console.log('sourceSelectedKeys:', sourceSelectedKeys);
    console.log('targetSelectedKeys:', targetSelectedKeys);
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  const triggerShowSearch = (checked) => {
    setShowSearch(checked);
  };

  const onScroll = (direction, e) => {
    console.log('direction:', direction);
    console.log('target:', e.target);
  };

  const leftTableColumns = [
    {
      dataIndex: 'tempid',
      title: 'OldId',
    },
    {
      dataIndex: 'id',
      title: 'NewId'
    },
    {
      dataIndex: 'mobile',
      title: 'Mobile'
    },
    {
      dataIndex: 'sex',
      title: 'Sex',
    },
  ];

  const rightTableColumns = [
    {
      dataIndex: 'tempid',
      title: 'OldId',
    },
    {
      dataIndex: 'id',
      title: 'NewId'
    },
    {
      dataIndex: 'mobile',
      title: 'Mobile'
    },
    {
      dataIndex: 'sex',
      title: 'Sex',
    },
  ];

  return (
    <>
      <button
        onClick={() => {
          // setFilterdata([
          //   {
          //     field: 'mobile',
          //     operator: 'contains',
          //     value: mobilenum,
          //   },
          //   {
          //     field: 'email',
          //     operator: 'contains',
          //     value: email,
          //   },
          // ]);
        }}
      >
        User Filter
      </button>
      <Input
        placeholder="Filter by Mobile"
        onChange={(event) => {
          console.log('Change in mobile', event.target.value);
          setMobilenum(event.target.value);
        }}
      />
      <Input
        placeholder="Filter by Email"
        onChange={(event) => {
          console.log('Change in email', event.target.value);
          setEmail(event.target.value);
        }}
      />
      <ul>
        {/* Uncomment this section once you want to display the user list */}
        {filteredData.map((user) => (
          <li key={user.id}>
            <h4>
              {user.id}-{user.username} - ({user.mobile}) -({user.tempid}) -({user.email})
            </h4>
          </li>
        ))}
      </ul>
      <Transfer
        dataSource={filteredData} // Use filteredData instead of userlist
        titles={['Source', 'Target']}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        onChange={onChange}
        onSelectChange={onSelectChange}
        onScroll={onScroll}
        leftColumns={leftTableColumns}
        rightColumns={rightTableColumns}
        render={(item) => `${item.username} - ${item.mobile} - ${item.email}`}
      />
      <Space
        style={{
          marginTop: 16,
        }}
      >
        <Switch
          unCheckedChildren="disabled"
          checkedChildren="disabled"
          checked={disabled}
          onChange={triggerDisable}
        />
        <Switch
          unCheckedChildren="showSearch"
          checkedChildren="showSearch"
          checked={showSearch}
          onChange={triggerShowSearch}
        />
      </Space>
    </>
  );
};

export default CreateProfile;
