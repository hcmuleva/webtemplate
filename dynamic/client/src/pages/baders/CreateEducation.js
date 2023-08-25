import { Col, Form, Input, Row, Select } from 'antd';
import React from 'react'

const CreateEducation = ({ formValues }) => {
      
  return (
    <div style={{padding:"15px"}}>
     <Form form={formValues} layout="vertical">
         <Row gutter={24}>
        <Col span={8}>
          <Form.Item
            label="Student Name"
            name="name"
            rules={[{ required: true }]}
          >
           <Input />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            label="Class"
            name="class"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Subject"
            name="subject"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={8}>
          <Form.Item label="Branch" name="branch" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="College/Institute"
            name="institute"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Percentage" name="Percentage" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      </Form>
    </div>
  )
}

export default CreateEducation;