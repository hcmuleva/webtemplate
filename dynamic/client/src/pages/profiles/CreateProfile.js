import React,{useState} from 'react';

import { Create, useForm } from '@refinedev/antd';
import { Col, Row, Form, Input, Select, Upload, Button, Space ,Modal} from 'antd';
import MDEditor from "@uiw/react-md-editor";
import { getValueProps, mediaUploadMapper } from "@refinedev/strapi-v4";

const API_URL = process.env.REACT_APP_API_SERVER;
const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY;

const onChange = (key) => {
  console.log(key);
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
const CreateProfileDialog = ({userid, isModalOpen, setIsModalOpen}) => {
    console.log("userid",userid)
    const { formProps, getInputProps, saveButtonProps } = useForm({
        resource: "profiles",
        action: "create"
    });
    const [fileList, setFileList] = useState([
        {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: "https://cdn.dribbble.com/users/1223630/screenshots/8115260/media/8145a871d9c4d67ec06e047ccc6574b4.gif",
        },
    ]);
    const showModal = () => {
        setIsModalOpen(true);
      };
      const handleOk = () => {
        const formValues = formProps.form.getFieldsValue();
        formValues['userid']=userid
        console.log("Form values", formValues);
        formProps.onFinish?.(mediaUploadMapper(formValues));
        setIsModalOpen(false);
      };
      const handleCancel = () => {
        setIsModalOpen(false);
      };
      const handleFormFinish = (values) => {
        values={...values, role:2}
        console.log("values", values)
        formProps.onFinish?.(mediaUploadMapper(values));
    };

    return (
        <div>
            <Modal title="ProfileCreate" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1220}>   

            <Form {...formProps} layout="vertical" onFinish={handleFormFinish}>
                <Row gutter={24}>

                    {/* <Form.Item style={{marginLeft:"300px" , marginTop:"40px"}}>
                <Avatar/>
              </Form.Item> */}
                    <Col span={24}>
                        <Form.Item
                            name="reciept"
                            valuePropName="photo"
                            getValueProps={(data) => getValueProps(data, API_URL)}
                            style={{ marginLeft: "400px" }}
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
                                {fileList.length < 5 && "+ Recipts"}
                            </Upload>
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                  <Form.Item label="Plan" name="plan">
                    <Select placeholder="Select Plan">
                      <Option value="BRONZE">BRONZE</Option>
                      <Option value="SILVER">SILVER</Option>
                      <Option value="GOLD">GOLD</Option>
                      <Option value="PLATINUM">PLATINUM</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Payment Mod" name="paymentmod">
                    <Select placeholder="Select Payment">
                      <Option value="RTGS">RTGS</Option>
                      <Option value="CARD">CARD</Option>  
                      <Option value="UPI">UPI</Option>
                      <Option value="CHEQUE">CHEQUE</Option>
                      <Option value="TRANSFER">ACCOUNTTRANSFER</Option>
                      <Option value="CASH">CASH</Option>
                      <Option value="OTHER">OTHER</Option>
                      <Option value="NA">NA</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Payment" name="payment">
                    <Select placeholder="Select Payment">
                      <Option value="PENDING">PENDING</Option>
                      <Option value="PROCESSING">PROCESSING</Option>
                      <Option value="COMPLETED">COMPLETED</Option>
                      <Option value="PARTIAL">PARTIAL</Option>
                      <Option value="FULLY">FULLY</Option>
                      <Option value="EXCEMPTION">EXCEMPTION</Option>
                    </Select>
                  </Form.Item>
                </Col>

                </Row>
                <Row gutter={24}>
                <Col span={8}>
                  <Form.Item label="ProfileStatus" name="status">
           <Select placeholder="Select Status">
                      <Option value="ACTIVE">ACTIVE</Option>
                      <Option value="DORMENT">DORMENT</Option>
                      <Option value="DISABLED">DISABLED</Option>
                      <Option value="REJECTED">REJECTED</Option>
                      <Option value="REPORTED">REPORTED</Option>
                    </Select>
                  </Form.Item>
                </Col>
              
                       
                    </Row>  

                <Row gutter={24}>
                <Col span={24}>
                <Form.Item
                    label="Requirement"
                    name="requirement"
                   
                >
                    <MDEditor data-color-mode="light" />
                </Form.Item>
                </Col>
                <Col span={24}>
                <Form.Item
                    label="Description"
                    name="description"
                    
                >
                    <MDEditor data-color-mode="light" />
                </Form.Item>
                </Col>
                </Row>

            </Form>
       
            </Modal>
        </div>
    );
};



export default CreateProfileDialog;