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
} from "antd";
import { getValueProps, mediaUploadMapper } from "@refinedev/strapi-v4";
const API_URL = process.env.REACT_APP_API_SERVER;
const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY;

const { Option } = Select;

const AboutJobDetails = ({ formValues, submit, formProps }) => {
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
  const OPTIONS = ["All in india", "State", "In Your cities", "Globaly"];
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));

  return (
    <div
      className="container-fluid"
      style={{ padding: "15px", marginTop: "-100px" }}
    >
      <Form
        {...formProps}
        form={formValues}
        layout="vertical"
        onFinish={(values) => {
          // console.log("FINISH time values ", values);
          formProps.onFinish?.(mediaUploadMapper(values));
        }}
      >
        <Card className="about-job-card" hoverable>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Form.Item
              name="requirementfile"
              valuePropName="requirementfile"
              getValueProps={(data) => getValueProps(data, API_URL)}
              style={{marginRight:"80px", marginTop: "20px" }}
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
              Upload your Job Requirement File
            </span>
          </div>
          <Divider />
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
              <Form.Item label=" Job Applicable" name="jobapplicable">
                <Select
                  mode="multiple"
                  placeholder="Select your job"
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
                  <Option value="interested">Interested</Option>
                  <Option value="later">Later</Option>
                  <Option value="immediate">Immediate</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Button type="primary" onClick={() => submit()}>
            Submit{" "}
          </Button>
        </Card>
      </Form>
    </div>
  );
};

export default AboutJobDetails;
