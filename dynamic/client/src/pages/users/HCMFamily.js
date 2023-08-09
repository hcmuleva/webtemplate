import React, { useState } from "react";
import { Table, Button } from "antd";
import HCMModaluser from "./HCModalUser";


export default function HCMFamily({ userid, children }) {
 console.log("HCM Family ", children)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    console.log("clicked");
    setIsModalOpen(true);
   
  };
  
  
  const columns = [
    {
      title: "User Name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "First Name",
      dataIndex: "firstname",
      key: "firstname",
    },
    {
      title: "Last Name",
      dataIndex: "lastname",
      key: "lastname",
    },
    {
      title: "Relationship",
      dataIndex: "relationship",
      key: "relationship",
    },
    {
      title: "Father Name",
      dataIndex: "father",
      key: "father",
    },
    {
      title: "Mother Name",
      dataIndex: "mother",
      key: "mother",
    },
    {
      title: "Gender",
      dataIndex: "sex",
      key: "sex",
    },
    {
      title: "DOB",
      dataIndex: "dob",
      key: "dob",
    },
    {
      title: "Marital",
      dataIndex: "marital",
      key: "marital",
    },
    {
      title: "Jati",
      dataIndex: "jati",
      key: "jati",
    },
    {
      title: "Gotra",
      dataIndex: "gotra",
      key: "gotra",
    },
    {
      title: "Category",
      dataIndex: "occupation",
      key: "occupation",
    },
    {
      title: "Divyang Description",
      dataIndex: "divyangdescription",
      key: "divyangdescription",
    },
    // Add more columns as needed
  ];

  const data = [];
  for (let i = 0; i < children?.length; i++) {
    data.push({
      // id: children.id,
      username: children[i].username,
      email: children[i].email,
      firstname: children[i].firstname,
      lastname: children[i].lastname,
      father: children[i].father,
      mother: children[i].mother,
      sex: children[i].sex,
      dob: children[i].dob,
      divyangdescription: children[i].divyangdescription,
      occupation: children[i].occupation,
      relationship: children[i].relationship,
      gotra: children[i].gotra,
      jati: children[i].jati,
      sex: children[i].sex,
      marital: children[i].marital,
    });
  }
  // return <Table columns={columns} dataSource={data} pagination={false} />;

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Add Family Members
      </Button>

      <Table
        columns={columns}
        dataSource={data}
      />

      <HCMModaluser
        parent_id={userid}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
}
