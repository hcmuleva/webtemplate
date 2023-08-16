import React from "react";
import { Create, useForm } from "@refinedev/antd";
import { Select, Input, Row, Col, Form, Button } from "antd";

const CreateBusiness = ({ formValues }) => {
  // const { formProps, saveButtonProps } = useForm();

   
  return (
    <div style={{padding:"15px"}}>
      <Form form={formValues} layout="vertical">
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              label="Business Name"
              name="businessname"
              rules={[
                { required: true, message: "Please enter business name" },
              ]}
            >
              <Input placeholder="Business Name" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Owner Name"
              name="ownername"
              rules={[
                { required: true, message: "Please enter owner name" },
              ]}
            >
              <Input placeholder="Owner Name" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: "Please select category" }]}
            >
              <Select placeholder="Select Category">
                <Option value="construction">Construction</Option>
                <Option value="hardware">Hardware</Option>
                <Option value="software">Software</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              label="Business Type"
              name="businesstype"
              rules={[
                { required: true, message: "Please enter business type" },
              ]}
            >
              <Input placeholder="Business Type" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Business Role"
              name="businessrole"
              rules={[
                { required: true, message: "Please enter business role" },
              ]}
            >
              <Input placeholder="Business Role" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Business Sector"
              name="businesssector"
              rules={[
                { required: true, message: "Please enter business sector" },
              ]}
            >
              <Input placeholder="Business Sector" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
        
          <Col span={8}>
            <Form.Item
              label="Turnover"
              name="turnover"
              rules={[
                { required: true, message: "Please enter turnover" },
              ]}
            >
              <Input placeholder="Turnover" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Size"
              name="size"
              rules={[
                { required: true, message: "Please enter size" },
              ]}
            >
              <Input placeholder="Size" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          
        </Row>       
        
      </Form>
    </div>
  );
};

export default CreateBusiness;