import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Form,
  Input,
  Button,
  Select,
  Upload,
  Divider,
  Modal,
} from "antd";
import { getValueProps, mediaUploadMapper } from "@refinedev/strapi-v4";
import TextArea from "antd/es/input/TextArea";
import { useForm } from "@refinedev/antd";
import { useGetIdentity } from "@refinedev/core";

 
const API_URL = process.env.REACT_APP_API_SERVER;
const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY;

const { Option } = Select;

const Apply = ({ isModalOpenApply, setIsModalOpenApply,opportunityid  }) => {
  console.log("opportunityid", opportunityid);
  const {data:identity}=useGetIdentity()
  console.log("identity",identity)
  const showModalApply = () => {
    setIsModalOpenApply(true);
  };
  const handleCancelApply = () => {
    setIsModalOpenApply(false);
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
  const handleInterestChange = (value) => {
    console.log("Selected Interest:", value);
  };
  const [selectedItems, setSelectedItems] = useState([]);
  const OPTIONS = ["Freasher", "0-2 Year", "2-4 Year", "4-6 Year"];
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));

  const { formProps, saveButtonProps } = useForm({
    resource: "applicants",
  });
  // console.log("object", formProps);

  const handleSubmit = (values) => {
    // const values = formValues.getFieldsValue()
    console.log("FINISH time values ", values);
    values['opportunity']=opportunityid
    values['userid']=identity?.id
    formProps?.onFinish?.(mediaUploadMapper(values));
    formProps?.form?.resetFields()
    setIsModalOpenApply(false);
   
  };
  return (
    <div>
      <Modal
        title="Apply"
        open={isModalOpenApply}
        onCancel={handleCancelApply}
        footer={null}
        width={1200}
      >
        <div
          className="container-fluid"
          style={{ padding: "15px", marginTop: "-0px" }}
        >
          <Form {...formProps} layout="vertical" onFinish={handleSubmit}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Form.Item
                name="profile"
                valuePropName="profile"
                getValueProps={(data) => getValueProps(data, API_URL)}
                style={{ marginRight: "80px", marginTop: "20px" }}
              >
                <Upload
                  name="files"
                  action={`${API_URL}/api/upload`}
                  headers={{
                    "Access-Control_Allow-Origin": "*",
                    Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
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
              <span style={{ marginRight: "70px", color: "silver" }}>
                Upload your resume
              </span>
            </div>
            <Divider />
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label=" Full Name" name="fullname">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label=" Email Id" name="email">
                  <Input type="email" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Your Experience" name="experience">
                  <Select
                    placeholder="Select your experience"
                    value={selectedItems}
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
              <Col span={12}>
                <Form.Item label="Interest" name="intrest">
                  <Select
                    onChange={handleInterestChange}
                    placeholder="Select Interest"
                  >
                    <Option value="immediate">Immediate</Option>
                    <Option value="interested">Interested</Option>
                    <Option value="later">Later</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Preference" name="preferences">
                  <Input type="text" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Joining Date" name="joiningdate">
                  <Input type="date" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Skill" name="skill">
                  <TextArea rows={4} placeholder="Enter your skill" />
                </Form.Item>
              </Col>
            </Row>
            <Button type="primary" htmlType="submit">
              Submit{" "}
            </Button>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default Apply;
