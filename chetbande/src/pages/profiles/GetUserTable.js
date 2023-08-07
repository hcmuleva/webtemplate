import { Table } from 'antd';
import React from 'react';

const GetUserTable = ({profileData}) => {
    console.log("GetUserTable profileData", profileData)
      const userdata = profileData.map(profile=>profile.attributes)
      console.log("GetUserTable userdata", userdata)
      const columns = [
        {
          title: 'First Name',
          dataIndex: 'firstname',
          key: 'firstname',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastname',
            key: 'lastname',
          },
        {
            title: 'Gender',
            dataIndex: 'sex',
            key: 'sex',
          },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        }
      ];
    return ( <Table dataSource={userdata} columns={columns} /> );
};

export default GetUserTable;