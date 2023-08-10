import { EditButton, ListButton, RefreshButton, Show } from "@refinedev/antd";
import { mediaUploadMapper } from "@refinedev/strapi-v4";
import { useState } from "react";
import { Tabs } from "antd";
const { TabPane } = Tabs;
import { Create, useForm } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import {
  Avatar,
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Space,
  Typography,
} from "antd";
import { UserOutlined } from "@ant-design/icons"; // Correct import for the UserOutlined icon
import { UserAddOutlined, TeamOutlined, PlusOutlined } from "@ant-design/icons";
import {
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
const { Text } = Typography;

import ProfileCard from "./ProfileCard";
import ProfileSlider from "./ProfileSlider";
import Dharmsiksha from "./Dharmsiksha";
import Activities from "./Activities";
import JobOpprtunity from "./JobOpprtunity";
import CreateUser from "./CreateForm";
import { Modal } from "antd";
import CreateTeam from "./CreateTeam";
import CreateActivity from "./CreateActivity";
import TBD from "./tbd";

const API_URL = process.env.REACT_APP_API_SERVER;
const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY;

const BaderShow = () => {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);

  const showUserModal = () => {
    setIsUserModalOpen(true);
  };

  const hideUserModal = () => {
    setIsUserModalOpen(false);
  };

  const showTeamModal = () => {
    setIsTeamModalOpen(true);
  };

  const hideTeamModal = () => {
    setIsTeamModalOpen(false);
  };

  const showActivityModal = () => {
    setIsActivityModalOpen(true);
  };

  const hideActivityModal = () => {
    setIsActivityModalOpen(false);
  };

  const { queryResult } = useShow({
    metaData: {
      populate: [
        "photo",
        "address",
        "users_permissions_users",
        "businesses",
        "activities",
        "jobs",
        "sanskar",
      ],
    },
  });

  const { data, isLoading } = queryResult;
  if (isLoading) return <h1>Loading...</h1>;
  const record = data?.data;

  const { Title } = Typography;

  const handleRefresh = () => {
    queryResult.refetch();
  };
  const photoUrl = record?.photo?.[0]?.url;
  const address = record?.address ?? null;
  const {
    addresstype,
    housename,
    landmark,
    village,
    tehsil,
    district,
    state,
    country,
    pincode,
  } = address;
  const mapUrl = "https://via.placeholder.com/300x200.png?text=Sample+Map";
  console.log("record ", record);
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
          <Card style={{ width: "calc(50% - 8px)" }}>
            <div style={{ textAlign: "center" }}>
              <h2>{record.name}</h2>
            </div>
            {/* First half - Avatar and title */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              {/* Left section - Add User button */}

              {/* Avatar and title */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar src={photoUrl} size={100} icon={<UserOutlined />} />
                <div style={{ textAlign: "center" }}>
                  <p>{"Samaj ka pahala bader"}</p>
                </div>
              </div>
            </div>
            <Space>
        <Button
          type="primary"
          onClick={showUserModal}
          icon={<UserAddOutlined />}
        >
          User
        </Button>
        <Button type="primary" onClick={showTeamModal} icon={<TeamOutlined />}>
          Team
        </Button>
        <Button
          type="primary"
          onClick={showActivityModal}
          icon={<PlusOutlined />}
        >
          Activity
        </Button>
      </Space>

      <Modal
        title="Add User"
        visible={isUserModalOpen}
        onCancel={hideUserModal}
        footer={null}
        width={1200}
        
      >
      <TBD/>
        
      </Modal>

      {/* Team Modal */}
      <Modal
        title="Add Team"
        visible={isTeamModalOpen}
        onCancel={hideTeamModal}
        footer={null}
        width={800}
      >
        <CreateTeam
          isModalOpen={isTeamModalOpen}
          setIsModalOpen={setIsTeamModalOpen}
        />
      </Modal>
      <Modal
        title="Add Activity"
        visible={isActivityModalOpen}
        onCancel={hideActivityModal}
        footer={null}
        width={800}
      >
        <CreateActivity
          isModalOpen={isActivityModalOpen}
          setIsModalOpen={setIsActivityModalOpen}
        />
      </Modal>

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
            <div style={{ padding: "20px" }}>
              <Row gutter={16}>
                <Col span={8}>
                  <Card title="Contact Information" style={{ width: 300 }}>
                    <Space direction="vertical" size="small">
                      <Text strong>{name}</Text>
                      <Text> {housename}</Text>
                      {landmark && (
                        <Text>
                          <strong>Landmark:</strong> {landmark}
                        </Text>
                      )}
                      {district && (
                        <Text>
                          <strong>District:</strong> {district}
                        </Text>
                      )}
                      {state && (
                        <Text>
                          <strong>State:</strong> {state}
                        </Text>
                      )}
                      {country && (
                        <Text>
                          <strong>Country:</strong> {country}
                        </Text>
                      )}
                      {pincode && (
                        <Text>
                          <strong>Pincode:</strong> {pincode}
                        </Text>
                      )}
                    </Space>
                  </Card>
                </Col>
                {/* Add more AddressCard instances as needed */}
              </Row>
            </div>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <ProfileSlider />
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
          <TabPane tab="Activity" key="3">
            <Activities activitylist={record.activities} />
          </TabPane>
          <TabPane tab="Opportunity" key="4">
            <JobOpprtunity opprtunitylist={record.jobs} />
          </TabPane>
          <TabPane tab="Sanskar" key="5">
            <Dharmsiksha dharmsiksha={record.sanskar} />
          </TabPane>
        </Tabs>
      </Row>
    </Show>
  );
};

export default BaderShow;
