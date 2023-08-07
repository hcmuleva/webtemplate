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
import RegisterUser from "../users";

const DashboardList = () => {
  const { tableProps, sorter } = useTable({
    initialSorter: [{ field: "id", order: "desc" }],
  });
  const { data, isLoading, isError } = useList({
    resource: "users",
    metaData: { populate: ["businesses", "educations"] },
  });
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
      title: "Student ID",
      dataIndex: "id",
      key: "id",
    },
    
    {
      title: "Student Name",
      dataIndex: "username",
      key: "name",
    },
    {
      title: "Email.",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Mobile No.",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "DOB",
      dataIndex: "dob",
      key: "dob",
    },
    {
      title: "Gender",
      dataIndex: "sex",
      key: "sex",
    },

   


  ];
  return (
    <div>
      <h1>DashboardList</h1>
      <Table dataSource={userlist } columns={columns}  />
     
      
    </div>
  );
};

export default DashboardList;
