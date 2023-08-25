import React, { useState } from "react";
import { Button, Modal } from "antd";
import { Create, useForm } from "@refinedev/antd";

import { getValueProps, mediaUploadMapper } from "@refinedev/strapi-v4";
import {
  Avatar,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Upload,
} from "antd";
import Business from "./Business";
import Personal from "./Personal";

import Education from "./Education";
const API_URL = process.env.REACT_APP_API_SERVER;
const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY;

const onChange = (key) => {
  console.log(key);
};
const HCMModaluser = ({ parent_id, isModalOpen, setIsModalOpen }) => {
  console.log("parent_id",parent_id)

  // console.log("parent_id",parent_id)
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const items = [
    {
      key: "1",
      label: `Personal Profile`,
      children: <Personal />,
    },
    {
      key: "2",
      label: `Business Profile`,
      children: <Business />,
    },
    {
      key: "3",
      label: `Education Profile`,
      children: <Education />,
    },
  ];
  const { TextArea } = Input;

  const { formProps, getInputProps, saveButtonProps } = useForm();

  const handleFormFinish = (values) => {
    values = { ...values, role: 2, parentid: parent_id };
    // remain["parents"] = userid;
    // values={...values, classes:selectedClassId,subject:selectedSubjectId,topics:selectedTopicId}

    formProps.onFinish?.(mediaUploadMapper(values));
    // Handle form submission with mappedValues
  };

  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://cdn.dribbble.com/users/1223630/screenshots/8115260/media/8145a871d9c4d67ec06e047ccc6574b4.gif",
    },
  ]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1200}
        footer={null}
        
      >
        <div>
          <Create resource="users" saveButtonProps={saveButtonProps}  >
            <Form {...formProps} layout="vertical" onFinish={handleFormFinish}>
              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item
                    name="pictures"
                    valuePropName="pictures"
                    getValueProps={(data) => getValueProps(data, API_URL)}
                    style={{ marginLeft: "460px" }}
                  >
                    <Upload
                      name="files"
                      action={`${API_URL}/api/upload`}
                      headers={{
                        "Access-Control_Allow-Origin": "*",
                        Authorization: `Bearer ${localStorage.getItem(
                          TOKEN_KEY
                        )}`,
                      }}
                      accept="image/*"
                      listType="picture-card"
                      fileList={fileList}
                      onChange={onChange}
                      onPreview={onPreview}
                    >
                      {fileList.length < 5 && "+ Upload"}
                    </Upload>
                  </Form.Item>
                </Col>
              </Row>
              <br />

              <Row gutter={24}>
                <Col span={8}>
                  <Form.Item
                    label="Username Name"
                    name="username"
                    rules={[
                      { required: true, message: "Please enter your Username" },
                    ]}
                  >
                    <Input placeholder="Username" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="email"
                    name="email"
                    rules={[
                      { required: true, message: "Please enter your email" },
                    ]}
                  >
                    <Input placeholder="Email" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="password"
                    name="password"
                    rules={[
                      { required: true, message: "Please enter your password" },
                    ]}
                  >
                    <Input placeholder=" Password" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={8}>
                  <Form.Item
                    label="First Name"
                    name="firstname"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your first name",
                      },
                    ]}
                  >
                    <Input placeholder="First Name" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Last Name" name="lastname">
                    <Input placeholder="Last Name" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Your Relationship"
                    name="relationship"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your relationship",
                      },
                    ]}
                  >
                    <Input placeholder="relationship" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={8}>
                  <Form.Item label="Father Name" name="father">
                    <Input placeholder=" Father Name" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Mother Name" name="mother">
                    <Input placeholder=" Mother Name" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Gender"
                    name="sex"
                    rules={[
                      { required: true, message: "Please select your gender" },
                    ]}
                  >
                    <Select placeholder="Select Gender">
                      <Option value="male">Male</Option>
                      <Option value="female">Female</Option>
                      <Option value="other">Other</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col span={8}>
                  <Form.Item label="Date of Birth" name="dob">
                    <DatePicker
                      style={{ width: "100%" }}
                      placeholder="Select Date"
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Gotra"
                    name="gotra"
                    rules={[
                      {
                        required: true,
                        message: "Please select your Gotra",
                      },
                    ]}
                  >
                    <Select placeholder="Gotra">
                      <Option value="hammad">Hammad</Option>
                      <Option value="mulewa">Mulewa</Option>
                      <Option value="bhayal">Bhayal</Option>
                      <Option value="kag">kag</Option>
                      <Option value="rathore">Rathore</Option>
                      <Option value="devda">Devda</Option>
                      <Option value="parwar">Parwar</Option>
                      <Option value="solanki">Solanki</Option>
                      <Option value="padiyar">Padiyar</Option>
                      <Option value="satpuda">Satpuda</Option>
                      <Option value="septa">Septa</Option>
                      <Option value="sencha">Sencha</Option>
                      <Option value="choyal">Choyal</Option>
                      <Option value="aaglecha">Aaglecha</Option>
                      <Option value="varfa">Varfa</Option>
                      <Option value="parihar">Parihar</Option>
                      <Option value="gehlot">Gehlot</Option>
                      <Option value="sindadda">Sindadda</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item label="Jati" name="jati">
                    <Select placeholder="Select Jati">
                      <Option value="SEERVI">SEERVI</Option>
                      <Option value="JAAT">JAAT</Option>
                      <Option value="SEN">SEN</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item label="Category" name="occupation">
                    <Select placeholder="Select Category">
                      <Option value="general">General</Option>
                      <Option value="obc">OBC</Option>
                      <Option value="sc/st">SC/ST</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item
                    label="Marital status"
                    name="marital"
                    rules={[
                      {
                        required: true,
                        message: "Please select your Marital staus",
                      },
                    ]}
                  >
                    <Select placeholder="Marital status">
                      <Option value="married">Married</Option>
                      <Option value="unmarried">Unmarried</Option>
                      <Option value="divorced">Divorced</Option>
                      <Option value="divorced">Waiting ForDivorced</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item
                    label="DivyangDescription"
                    name="divyangdescription"
                  >
                    <TextArea
                      rows={4}
                      placeholder="Divyang Description"
                      maxLength={6}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Create>
        </div>
      </Modal>
    </>
  );
};

export default HCMModaluser;
