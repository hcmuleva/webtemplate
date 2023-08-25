import { Form, Checkbox, Radio, Input, Button, Row, Col, Divider } from "antd";
import "../baders/DetailsForm.css";
import { Select } from "antd";
import React, { useState } from "react";

const DetailsForm = ({ formValues, next, formProps }) => {
  const [selectedItems, setSelectedItems] = useState("");
  const [interval, setInterval] = useState("");
  const [salaryRate, setSalaryRate] = useState(""); // Default salary rate is initially empty

  const OPTIONS = [
    "Monday to friday",
    "Weekend Availibility",
    "Day shift",
    "Night shift",
  ];
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));

  const handleIntervalChange = (e) => {
    const selectedInterval = e.target.value;
    setInterval(selectedInterval);
    switch (selectedInterval) {
      case "hourly":
        setSalaryRate("150"); // Set hourly salary rate
        break;
      case "perday":
        setSalaryRate("1050"); // Change this value as needed
        break;
      case "permonth":
        setSalaryRate("50000"); // Change this value as needed
        break;
      case "peryear":
        setSalaryRate("600000"); // Change this value as needed
        break;
      default:
        setSalaryRate("");
        break;
    }
  };
  console.log(salaryRate);

  return (
    <div className="container">
      <Form {...formProps} form={formValues} className="custom-form">
        <div className="card">
          <Row gutter={[16, 16]}>
            <Col span={8} className="label-col">
              {/* <Form.Item
                label="Employment type"
                name="employmenttype"
              ></Form.Item> */}
              <b>Employment type</b>
              <br />
              <span>Pick one or multiple options</span>
            </Col>
            <Col span={16}>
              <Form.Item name="employmenttype">
                <Checkbox.Group className="checkbox-group bordered-checkbox">
                  <Checkbox className="fulltime" value="fulltime">
                    Full-time
                  </Checkbox>
                  <Checkbox className="fulltime" value="parttime">
                    Part-time
                  </Checkbox>
                  <Checkbox className="fulltime" value="ondemand">
                    On Demand
                  </Checkbox>
                  <Checkbox className="fulltime" value="negotiable">
                    Negotiable
                  </Checkbox>
                </Checkbox.Group>
              </Form.Item>
            </Col>
          </Row>
        </div>
        <Divider className="divider" />

        <div className="card">
          <Row gutter={[16, 16]}>
            <Col span={8} className="label-col">
              {/* <Form.Item
                label="Working Schedule"
                name="workingschedule"
              ></Form.Item> */}
              <b>Working Schedule</b>
              <br />
              <span>You can pick multiple Work Schedule</span>
            </Col>
            <Col span={16}>
              <Form.Item name="workingschedule">
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
              {/* <Form.Item label="Salary" name="salary"></Form.Item> */}
              <br />
              <b>salary </b>
              <br />
              <span>Choose how you prefer to pay for this job </span>
            </Col>
            <Col span={16}>
              <Form.Item name="salary">
                <Radio.Group onChange={handleIntervalChange}>
                  <Radio className="fulltime" value="hourly">
                    Hourly
                  </Radio>
                  <Radio className="fulltime" value="perday">
                    per-day
                  </Radio>
                  <Radio className="fulltime" value="permonth">
                    per-month
                  </Radio>
                  <Radio className="fulltime" value="peryear">
                    per-year
                  </Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item  className="rate-input">
                <Input
                  value={salaryRate}
                  addonAfter={
                    interval === "hourly"
                      ? "rs/hour"
                      : " " && interval === "perday"
                      ? "rs/perday"
                      : " " && interval === "permonth"
                      ? "rs/permonth"
                      : " " && interval === "peryear"
                      ? "rs/peryear"
                      : " "
                  }
                 onChange={(event)=>{
                  setSalaryRate(event.target.value)
                  console.log("event.target.value",event.target.value)
                 }}
                />
              </Form.Item>
              <br />
              <Form.Item
                className="fulltime"
                name="issalarynagoriable"
                valuePropName="checked"
              >
                <Checkbox>Salary Negotiable</Checkbox>
              </Form.Item>
            </Col>
          </Row>
        </div>
        <Divider className="divider" />

        <div className="card">
          <Row gutter={[16, 16]}>
            <Col span={8} className="label-col">
              {/* <Form.Item
                label="Hiring Multiple Candidates"
                name="isMultiplePosition"
              ></Form.Item> */}
              <b>Hiring Multiple Candidates</b>
              <br />
              <span>
                This will be displayed on job page for candidates to see
              </span>
            </Col>
            <Col span={16}>
              <Form.Item
                className="fulltime"
                name="isMultiplePosition"
                valuePropName="checked"
              >
                <Checkbox>Yes, I am hiring multiple candidates</Checkbox>
              </Form.Item>
            </Col>
          </Row>
        </div>
        <Divider className="divider" />
        <Button type="primary" onClick={() => next()}>
          Save & Next
        </Button>
      </Form>
    </div>
  );
};

export default DetailsForm;
