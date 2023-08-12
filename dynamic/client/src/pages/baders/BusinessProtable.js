import React, { useState, useEffect } from 'react';
import { Table } from 'antd';

const API_URL = process.env.REACT_APP_API_SERVER;
const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY;

const BusinessProTable = ({businessdata}) => {
    const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
        },
        {
          title: 'Image',
          dataIndex: 'image', // Replace with the actual field name for image URL
          render: (text) => <img src={text} alt="Business Image" width={50} />,
        },
        {
          title: 'Name',
          dataIndex: 'name',
        },
        {
          title: 'Category',
          dataIndex: 'category',
        },
        {
          title: 'Owner Name',
          dataIndex: 'ownername',
        },
        {
          title: 'Business Name',
          dataIndex: 'businessname',
        },
      ];

  return (
    <Table
   
      columns={columns}
      dataSource={businessdata}
      search={false} // Set to true if you want search functionality
      pagination={{ pageSize: 10 }} // Adjust page size as needed
    />
  );
};

export default BusinessProTable;
