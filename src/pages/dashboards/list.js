import React from "react";
import {
  DateField,
  getDefaultSortOrder,
  ImageField,
  List,
  useSelect,
  useTable,
  ShowButton,
  EditButton,
  DeleteButton,
} from "@refinedev/antd";
import { Show, ListButton } from "@refinedev/antd";
import { Typography } from "antd";
import { useList } from "@refinedev/core";
import { Table } from "antd";

const DashboardList = () => {
  const { tableProps, sorter } = useTable({
    initialSorter: [{ field: "id", order: "desc" }],
  });
  
  const { data, isLoading, isError } = useList(
    {
    resource: "users", 
      filters: [{ field: 'org_name', operator: 'eq', value: 'BADER' }]},
  );
  // const { queryResult } = useShow();
  // const { data, isLoading } = queryResult;
  const userlist = data?.data ?? [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }
  console.log("userlist", userlist);
  const columns = [
    {
      title: "User ID",
      dataIndex: "id",
      key: "id",
    },
    
    {
      title: "User Name",
      dataIndex: "username",
      key: "name",
    },
   

    {
      title: "Business Name",
      dataIndex: "businesses",
      key: "businesses",
      render: (businesses) => (
        <ul>
          {businesses?.map((business) => (
            <li key={business.id}>
              {business.businessrole}- {business.category}-
              {business.businessname}-{business.businessowner}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "Education",
      dataIndex: "educations",
      key: "educations",
      render: (educations) => (
        <ul>
          {educations?.map((education) => (
            <li key={education.id}>{education.name}</li>
          ))}
        </ul>
      ),
    },
  ];
  return (
    <div>
      <h1>DashboardList</h1>
      <Table dataSource={userlist} columns={columns} />
    </div>
  );
};

export default DashboardList;
