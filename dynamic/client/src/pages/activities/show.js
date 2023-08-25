import {
    EditButton,
    ListButton,
    RefreshButton,
    Show,
} from "@refinedev/antd";
import { mediaUploadMapper } from "@refinedev/strapi-v4";
import { useState } from 'react';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
import { Create, useForm } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Avatar, Button, Card, Col, Form, Input, Row, Space, Typography } from "antd";
import { UserOutlined } from '@ant-design/icons'; // Correct import for the UserOutlined icon
import { UserAddOutlined, TeamOutlined, PlusOutlined } from '@ant-design/icons';
import { EnvironmentOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
const { Text } = Typography;


const API_URL = process.env.REACT_APP_API_SERVER;
const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY;

const ActivityShow = () => {


    const { queryResult } = useShow({
        metaData: { populate: ['photo', 'address','users_permissions_users', 'businesses','activities','jobs','sanskar'] },
    });

    const { data, isLoading } = queryResult;
    if (isLoading) return <h1>Loading...</h1>;
    const record = data?.data;

    const { Title } = Typography;

    const handleRefresh = () => {
        queryResult.refetch();
    };
    const photoUrl = record?.photo?.[0]?.url;
    const address = record?.address??null
    const {addresstype,housename,landmark,village,tehsil,district,state, country,pincode} = address
    const mapUrl = "https://via.placeholder.com/300x200.png?text=Sample+Map"
    console.log("record ", record)
    return (
        <Show
            isLoading={isLoading}
            headerProps={{
                extra: (
                    <>
                        <ListButton />
                        <EditButton />
                        <RefreshButton onClick={handleRefresh} />
                    </>
                ),
            }}
        >
              <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
                    <Card style={{ width: 'calc(50% - 8px)' }}>
                        <div style={{ textAlign: 'center' }}>
                            <h2>{record.name}</h2>
                        </div>
                        {/* First half - Avatar and title */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                            {/* Left section - Add User button */}



                            {/* Avatar and title */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Avatar src={photoUrl} size={100} icon={<UserOutlined />} />
                                <div style={{ textAlign: 'center' }}>

                                    <p>{"Samaj ka pahala bader"}</p>
                                </div>
                            </div>

                            {/* Right section - Add Team button */}
                            <div>

                            </div>
                        </div>
                        <Space>

                            <Button type="primary" onClick={() => console.log('Add User')} icon={<UserAddOutlined />}>
                                User
                            </Button>
                            <Button type="primary" onClick={() => console.log('Add Team')} icon={<TeamOutlined />}>
                                Team
                            </Button>
                            <Button type="primary" onClick={() => console.log('Add Activity')} icon={<PlusOutlined />}>
                                Activity
                            </Button>
                        </Space>
                        {/* Second half - Map and address details */}
                        <br></br>
                        <div style={{ marginBottom: 16 }}>
                            {/* Replace the following line with your map component or embed the map */}
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15546.74472577956!2d77.63380960183059!3d13.05563644942778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17586ac5cb01%3A0xe2c53d2f2e12355c!2sKothanur%2C%20Bengaluru%2C%20Karnataka%20560077!5e0!3m2!1sen!2sin!4v1691328654132!5m2!1sen!2sin"
                                width="200"
                                height="200"
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />

                        </div>
                        <div style={{ padding: '20px' }}>
      <Row gutter={16}>
        <Col span={8}>
           <Card title="Contact Information" style={{ width: 300 }}>
      <Space direction="vertical" size="small">
        <Text strong>{name}</Text>
        <Text> {housename}</Text>
        {landmark && <Text><strong>Landmark:</strong> {landmark}</Text>}
        {district && <Text><strong>District:</strong> {district}</Text>}
        {state && <Text><strong>State:</strong> {state}</Text>}
        {country && <Text><strong>Country:</strong> {country}</Text>}
        {pincode && <Text><strong>Pincode:</strong> {pincode}</Text>}
        
      </Space>
    </Card>
        </Col>
        {/* Add more AddressCard instances as needed */}
      </Row>
    </div>
                    </Card>
                    </Col>
          <Col xs={24} md={12}>

                    
                    </Col>
        </Row>
        <Row>
        <Tabs defaultActiveKey="1">
  <TabPane tab="Business" key="1">
    Content of Tab Pane 1
  </TabPane>
  <TabPane tab="Users" key="2">
    Content of Tab Pane 2
  </TabPane>
 
</Tabs>
        </Row>
        </Show>
    );
};

export default ActivityShow;
