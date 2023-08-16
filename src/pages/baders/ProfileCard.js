import React, { useState } from 'react';
import { Card, Avatar, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

const { Title, Paragraph } = Typography;

const ProfileCard = ({profile,profileindex}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped((prevIsFlipped) => !prevIsFlipped);
  };

  function callback(key) {
    console.log(key);
  }

  return (
    <Card
      style={{
        width: 300,
        height: 300,
        transition: 'transform 0.6s',
        transformStyle: 'preserve-3d',
        cursor: 'pointer',
        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
        transformOrigin: 'right',
      }}
      onClick={handleCardClick}
    >
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          transform: isFlipped ? 'rotateY(180deg) scaleX(-1)' : 'rotateY(0)',
          transformOrigin: 'right',
        }}
      >
        {/* Front of the card */}
        <div style={{ textAlign: 'center' }}>
          <Avatar size={100} icon={<UserOutlined />} />
        </div>

        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <Title level={3}>{profile.name}</Title>
          <Paragraph>{profile.designation}</Paragraph>
          <Paragraph>Mobile: {profile.mobile}</Paragraph>
          <Paragraph>Email: {profile.email}</Paragraph>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          transform: isFlipped ? 'rotateY(0) scaleX(-1)' : 'rotateY(180deg)',
          transformOrigin: 'right',
        }}
      >
        {/* Back of the card */}
        <div style={{ padding: '30px 24px', marginLeft: '20px' }}>
        <Tabs defaultActiveKey="1" onChange={callback}>
            
          <TabPane tab="Education" key="1">
          <div style={{ padding: '30px 24px', marginLeft: '20px' }}>

              <h3>Education:</h3>
              <Paragraph>{`Bachelor of Science in Computer Science`}</Paragraph>
            </div>
          </TabPane>
          <TabPane tab="Business" key="2">
            <div style={{ padding: '16px 24px' }}>
              <h3>Business:</h3>
              <Paragraph>{`Software Development`}</Paragraph>
            </div>
          </TabPane>
          <TabPane tab="Address" key="3">
            <div style={{ padding: '16px 24px' }}>
              <h3>Address:</h3>
              <Paragraph>{`Insert address here`}</Paragraph>
            </div>
          </TabPane>
        </Tabs>
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;
