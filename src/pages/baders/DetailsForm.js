import { Form, Checkbox, Radio, Input, Button, Row, Col, Divider } from "antd";
import "../baders/DetailsForm.css";
import { Select } from 'antd';
import React, { useState } from 'react';
import { Create } from "@refinedev/antd";


const DetailsForm = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const OPTIONS = ['Monday to friday', 'Weekend Availibility', 'Day shift', 'Night shift'];
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));
  return (
    <div className="container">
    
      <Form  hoverable>
        <div className="card">
          <Row gutter={[16, 16]}>
            <Col span={8} className="label-col">
              <Form.Item label="Employment type"></Form.Item>
              <span>Pick one or multiple options</span>
            </Col>
            <Col span={16}>
              <Form.Item>
                <Checkbox.Group className="checkbox-group bordered-checkbox">
                  <Checkbox className="fulltime"  value="fullTime">Full-time</Checkbox>
                  <Checkbox className="fulltime" value="partTime">Part-time</Checkbox>
                </Checkbox.Group>
              </Form.Item>
              <Form.Item>
                <Checkbox.Group className="checkbox-group bordered-checkbox">
                  <Checkbox className="fulltime"  value="onDemand">On Demand</Checkbox>
                  <Checkbox className="fulltime"  value="negotiable">Negotiable</Checkbox>
                </Checkbox.Group>
              </Form.Item>
            </Col>
          </Row>
        </div>
        <Divider className="divider" />

        <div className="card">
          <Row gutter={[16, 16]}>
            <Col span={8} className="label-col">
              <Form.Item label="Working Schedule"></Form.Item>
              <span>You can pick multiple Work Schedule</span>
            </Col>
            <Col span={16}>
              <Form.Item>
                <Select
                  mode="multiple"
                  placeholder="Inserted are removed"
                  value={selectedItems}
                  onChange={setSelectedItems}
                  style={{
                    width: "100%",
                  }}
                  options={filteredOptions.map((item) => ({
                    value: item,
                    label: item,
                  }))}
                />
              </Form.Item>
            </Col>
          </Row>
        </div>
        <Divider className="divider" />

        <div className="card">
          <Row gutter={[16, 16]}>
            <Col span={8} className="label-col">
              <Form.Item label="Salary"></Form.Item>
              <span>Choose how you prefer to pay for this job </span>
            </Col>
            <Col span={16}>
              <Form.Item>
                <Radio.Group>
                  <Radio className="fulltime"   value="hourly">Hourly</Radio>
                  <Radio className="fulltime"   value="custom">Custom</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item name="hourlyRate" className="rate-input">
                <Input value="35" addonAfter="$/hour" />
              </Form.Item>
              <br/>
              <Form.Item className="fulltime" >
                <Checkbox >Salary Negotiable</Checkbox>
              </Form.Item>
            </Col>
          </Row>
        </div>
        <Divider className="divider" />

        <div className="card">
          <Row gutter={[16, 16]}>
            <Col span={8} className="label-col">
              <Form.Item  label="Hiring Multiple Candidates"></Form.Item>
              <span>
                This will be displayed on job page for candidates to see
              </span>
            </Col>
            <Col span={16}>
              <Form.Item className="fulltime" >
                <Checkbox>Yes, I am hiring multiple candidates</Checkbox>
              </Form.Item>
            </Col>
          </Row>
        </div>
        <Divider className="divider" />
        <Form.Item className="next-button">
          <Button type="primary">Save & Next</Button>
        </Form.Item>
      </Form>
      
    </div>
  );
};

export default DetailsForm;
