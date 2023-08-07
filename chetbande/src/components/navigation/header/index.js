import React, { useState, useEffect } from 'react';
import { useGetIdentity } from '@refinedev/core';
import { Avatar, Layout, Row, Col, Space, Typography } from 'antd';

const { Header: AntdHeader } = Layout;
const { Text } = Typography;
const API_URL = process.env.REACT_APP_API_SERVER
const Header = () => {
  const { data: user } = useGetIdentity();
  const [myphoto, setMyphoto] = useState('');

  useEffect(() => {
    if (user?.url) {
      setMyphoto(`${API_URL}${user.url}`);
    }
  }, [user]);

  const getAvatar = () => {
    if (myphoto) {
      return (
        <Avatar size="large" src={myphoto} alt={user?.email} />
      );
    }
    return null;
  };

  return (
    <AntdHeader style={{ backgroundColor: '#f0f2f5', padding: '0 24px' }}>
      <Row align="middle" justify="space-between">
        <Col xs={0} sm={12}>
          {/* Add your logo or other content here */}
        </Col>
        <Col>
          <Space size="middle" align="center">
            <Text ellipsis strong>
              {user?.email}
            </Text>
            {getAvatar()}
          </Space>
        </Col>
      </Row>
    </AntdHeader>
  );
};

export default Header;
