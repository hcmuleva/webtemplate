import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import DetailsForm from './DetailsForm';
import AboutJobDetails from './AboutJobDetails ';
import ApplicationForm from './ApplicationForm';



const { Sider, Content } = Layout;

const JobOpportunity = () => {
  const [currentTab, setCurrentTab] = useState('about'); // Default selected tab

  const handleTabClick = (tab) => {
    setCurrentTab(tab);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="light" width={200}>
        <Menu
          mode="vertical"
          selectedKeys={[currentTab]}
          onClick={({ key }) => handleTabClick(key)}
        >
          <Menu.Item key="about">About</Menu.Item>
          <Menu.Item key="details">Details</Menu.Item>
          <Menu.Item key="application">Application</Menu.Item>
      
        </Menu>
        
      </Sider>
      
    &nbsp; &nbsp; &nbsp;
      <Layout  style={{width:"1030px"}}>
      <Content>
          {currentTab === 'about' && <div><AboutJobDetails /></div>}
        </Content>
        <Content>
          {currentTab === 'details' && <div><DetailsForm /> </div>}
        </Content>
        <Content>
          {currentTab === 'application' && <div><ApplicationForm /> </div>}
        </Content>
      </Layout>
    </Layout>
  );
};

export default JobOpportunity;
