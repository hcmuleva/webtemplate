import React, { useEffect } from 'react';
import { useShow } from "@refinedev/core";
import { Show } from "@refinedev/antd";
import { Collapse, Tabs, Typography } from "antd";
import BusinessDetails from './Business';
import EducationForm from './Education';
import AddressDetails from './Address';
import Family from './Family';
import { image, reducer } from '@uiw/react-md-editor';
const { Title, Text } = Typography;

import { Card } from "antd";

import PersonalDetails from "./PersonalDetails";

import OrganizationalChart from "./orgChart";
import HCMFamily from "./HCMFamily";
import ProfileShow from "../profiles/show";

const { Meta } = Card;

const UserShow = (props) => {
  const { queryResult } = useShow({
    metaData: {
      populate: [
        "children.children",
        "profiles",
        "businesses",
        "educations",
        "pictures",
        "addresses",
        "children",
        "children.pictures",
        "children.parents",
        "children.children",
        "children.children.pictures",
      ],
    },
  });

  const { data, isLoading } = queryResult;
  const record = data?.data;
  console.log("queryResult in show", record);

  let businesslist = record?.businesses;
  let educationlist = record?.educations;
  let addresslist = record?.addresses;
  let children = record?.children;
  let profilelist= record?.profiles;

  let modified = [];
  modified.push(record);
  for (const childObj of record?.children ?? []) {
    let childrenObj = { ...childObj, parentId: record?.id };
    for (const Obj of childObj?.children) {
      let childrenChildObj = { ...Obj, parentId: childObj?.id };
      modified.push(childrenChildObj);
    }
    modified.push(childrenObj);
  }

  useEffect(() => {
    businesslist = record?.businesses ?? [];
    educationlist = record?.educations ?? [];
    addresslist = record?.addresses ?? [];
    profilelist= record?.profiles ??[];
    modified = children
      ? children.map((child) => {
          return { ...child, parentId: record.id };
        })
      : [];
    modified.push(record);
  }, [data]);

  if (isLoading) {
    return <h1>Still loading </h1>
  }
  
  

  let imgurl =
    record && record.pictures && record.pictures[0]
      ? `${record.pictures[0]?.formats?.thumbnail?.url}`
      : "https://www.gauchercommunity.org/wp-content/uploads/2020/09/avatar-placeholder-150x150.png";

  const items = [

    {
      key: '1',
      label: `Personal Details`,
      children: <PersonalDetails userid={record?.id} record={data} />,
    },

    {
      key: '2',
      label: `Business Profile`,

      children: <BusinessDetails userid={record?.id} businesslist={businesslist} />,
    },
    {
      key: '3',
      label: `Education Profile`,
      children: <EducationForm userid={record?.id} educationlist={educationlist} />,
    },

    {
      key: "4",
      label: `families`,
      children: <HCMFamily userid={record?.id} children={children} />,
    },
    {
      key: '5',
      label: `Addresses`,
      children: (
        <AddressDetails userid={record?.id} addresslist={addresslist} />
      ),
    },
    {
      key: "6",
      label: `ProfileList`,
      children: (
        <OrganizationalChart
          data={modified}
          children={children}
          count={(data?.data?.children)?.length}
        />
      ),
    },
    {
      key: "7",
      label: `MeelanProfile`,
      children: (
        <ProfileShow userid={record?.id} profileData={profilelist}/>
      ),
    },
  ];

  const onChange = (key) => {

    // console.log(key);
  };

if(isLoading){
  return <h1> Page loading</h1>
}else {
  console.log("business list in show", businesslist,"record =>", record.businesses)
  return <Show isLoading={isLoading}>

    
      <Card
        style={{
          width: 500,
          margin: "auto",
          background:" white",
          position: "relative",
          display:" flex",
          alignItems: "flex-end",
          transition: "0.4s ease-out",
          boxShadow: "0px 7px 10px rgba(black, 0.5)",
          
        }}
        
      >
        <div style={{
          display: "flex",
          flexDirection: "row"
        }}>

          <img style={{
            borderRadius: '100%',
            display: 'inline',
          }}
            alt="example"
            src={imgurl}
          />

          <div style={{

            // display: 'flex',
            alignItems: 'center',
            alignContent: 'center',
            marginLeft: '60px'

          }}>

            <p>Name : <b>{record.firstname}  {record.lastname}</b></p>
            {/* {console.log(record)} */}
            <p>Caste: {record.cast}</p>
            <p>DOB : {record.dob} </p>
            <p>Marital : {record.marital} </p>
          </div>
        </div>

      </Card>


      {/* <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} /> */}
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </Show> 
}

  
};

export default UserShow;