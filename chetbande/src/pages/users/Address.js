import React, { useState } from 'react';
import { Form, Input, Button, Select, Row, Col } from 'antd';

const { Option } = Select;

const AddressForm = ({setAddressObject}) => {
  const [form] = Form.useForm();
  
  const onFinish = (values) => {
   setAddressObject(values)
    // You can handle form submission here, e.g., sending data to a server
  };

  return (
    <div style={{
      border:" 1px solid #d9d9d9",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)"
    }}
    >
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
    >
      <Row gutter={16}>
        
        <Col span={12}>
          <Form.Item label="Address Type" name="addresstype" rules={[{ required: true }]}>
            <Select>
              <Option value="home">Home</Option>
              <Option value="work">Work</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="House Name" name="housename" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
     
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Village" name="village" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Tehsil" name="tehsil" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="District" name="district" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="State" name="state" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Pincode" name="pincode" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  </div>
  );
};

export default AddressForm;
