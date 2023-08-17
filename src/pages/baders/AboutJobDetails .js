import React from 'react';
import { Card, Row, Col, Form, Input, Button } from 'antd';
import TextArea from '@uiw/react-md-editor/lib/components/TextArea';

const AboutJobDetails = () => {
  return (
    <div className='container-fluid' style={{padding:"15px"}}>
<Card
      className="about-job-card"
      hoverable
    >
      <Row gutter={24}>
        <Col span={12}>
        <Form.Item label=" Name" name="name">
                <Input />
              </Form.Item>
        </Col>
        <Col span={12}>
        <Form.Item label=" Category" name="category">
                <Input />
              </Form.Item>
        </Col>
        <Col span={12}>
        <Form.Item label=" Location" name="location">
                <Input />
              </Form.Item>
        </Col>
        <Col span={12}>
        <Form.Item label=" Description" name="description">
        <TextArea
                
                placeholder=" Description"
               
              />
              </Form.Item>
        </Col>
      </Row>
      <Form.Item className="next-button">
          <Button type="primary">Save & Next </Button>
        </Form.Item>
    </Card>
    </div>
  );
};

export default AboutJobDetails;
