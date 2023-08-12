import { Col, Form, Input, Row, Select } from 'antd';
import React from 'react'

const CreateAddressForm = ({ formValues }) => {
  

   
  return (
    <div style={{padding:"15px"}}>
     <Form form={formValues} layout="vertical" >
         <Row gutter={24}>
        <Col span={8}>
          <Form.Item
            label="Address Type"
            name="addresstype"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="home">Home</Option>
              <Option value="work">Work</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            label="House Name"
            name="housename"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Village"
            name="village"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={8}>
          <Form.Item label="Tehsil" name="tehsil" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="District"
            name="district"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="State" name="state" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item
            label="Pincode"
            name="pincode"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
        </Col>
      </Row>
      </Form>
    </div>
  )
}

export default CreateAddressForm;