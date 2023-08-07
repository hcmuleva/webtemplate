import React, { useState } from "react";
import { Create, SaveButton, useSelect, useStepsForm } from "@refinedev/antd";
import { Form, Input, Select, Button, Steps, Row, Col, Upload } from "antd";
import { useCreate } from "@refinedev/core";
import { mediaUploadMapper } from "@refinedev/strapi-v4";
import axios from "axios";
import { useNavigation } from "@refinedev/core";
import { useNavigate } from "react-router-dom";
const API_URL = process.env.REACT_APP_API_SERVER;
const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY;

function ConnectedForm(props) {
  const record = props.record;
  const setActiveTab = props.setActiveTab;
  const navigate = useNavigate();
  console.log("record", record);

  const { mutate } = useCreate();

  const registerUser = async (userData) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/local/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message[0].messages[0].message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Example usage

  const { current, gotoStep, stepsProps, formProps, saveButtonProps } =
    useStepsForm({
      submit: (values) => {
        values = { ...values, role: 2, password: "Welcome@123",org_name: "CHETBANDE", };
        const myemail = values["email"];
        values["email"] = myemail ? myemail : values["mobile"] + "@hph.com";
        formProps.onFinish?.(mediaUploadMapper(values));

        registerUser(values)
          .then((userData) => {
            console.log("in register", userData);
            // console.log("User registered:", userData);
            const addressdata = {
              users_permissions_users: userData?.user?.id,
              addresstype: values.addresstype,
              housename: values.housename,
              village: values.village,
              tehsil: values.tehsil,
              district: values.district,
              state: values.state,
              pincode: values.pincode,
              
            };
            // console.log("inmuted submit", aaaaa);
            fetch(`${API_URL}/api/addresses`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ data: addressdata }),
              // console.log("inmuted submit",aaaaa)
            });
            console.log("inmuted submit", bbbbb);
           
          })

          .catch((error) => {
            console.error("Registration error:", error.message);
          });
          console.log("End subbmit")
         
          navigate("/dashboards");
          
      },
    });
  const [isSecond, setIsSecond] = useState(true);

  const { Step } = Steps;
  const formList = [
    <div
      style={{
        border: " 1px solid #d9d9d9",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Form.Item name="photo" label="Image">
        <Upload.Dragger
          name="files"
          action={`${API_URL}/api/upload`}
          accept="image/*"
        >
          <p className="ant-upload-text">Profile Photo</p>
        </Upload.Dragger>
      </Form.Item>
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item
            label="Student Name"
            name="username"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Student Name" />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            label="Father Name"
            name="father"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input placeholder="father name" />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            label="Mother Name"
            name="mother"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input placeholder="Mother name" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={8}>
          <Form.Item
            label="Mobile No."
            name="mobile"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input type="number" placeholder="mobile no." />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Email ID"
            name="email"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input type="email" placeholder="email" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label=" DOB"
            name="dob"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input type="date" placeholder="DOB" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item
            label="Class"
            name="class"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input placeholder="Class" />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            label="Subject"
            name="subject"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input placeholder="Subject" />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item label="Gender" name="sex" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="female">Female</Select.Option>
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="other">Other</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </div>,

    <div
      style={{
        border: " 1px solid #d9d9d9",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
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
    </div>,
  ];

  const isCurrentStepFormValid = async () => {
    try {
      const values = await formProps?.form?.validateFields();
      console.log(formProps);
      if (current == 0) {
        setIsSecond(false);
      }
      return true;
    } catch (error) {
      if (current !== 1) {
        setIsSecond(true);
      }
      return false;
    }
  };

  return (
    <Create
      footerButtons={
        <div>
          {current > 0 && (
            <Button
              onClick={() => {
                gotoStep(current - 1);
              }}
            >
              Previous
            </Button>
          )}
          {current < formList.length - 1 && (
            <Button
              onClick={async () => {
                const isFormValid = await isCurrentStepFormValid();
                if (isFormValid) {
                  gotoStep(current + 1);
                }
              }}
            >
              Next
            </Button>
          )}
          {current === formList.length - 1 && (
            <SaveButton {...saveButtonProps} />
          )}
        </div>
      }
    >
      <Steps {...stepsProps}>
        <Step title="Student Info" />
        <Step title="Student Address" disabled={isSecond} />
      </Steps>

      <Form
        {...formProps}
        layout="vertical"
        style={{ marginTop: 30 }}
        onchange={async () => {
          await isCurrentStepFormValid();
        }}
      >
        {formList[current]}
      </Form>
    </Create>
  );
}

export default ConnectedForm;
