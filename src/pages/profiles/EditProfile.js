import React, { useEffect, useState } from 'react';

import { Create, useForm } from '@refinedev/antd';
import { Col, Row, Form, Input, Select, Upload, Button, Space, Modal } from 'antd';
import MDEditor from "@uiw/react-md-editor";
import { getValueProps, mediaUploadMapper } from "@refinedev/strapi-v4";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const API_URL = process.env.REACT_APP_API_SERVER;
const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY;
const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };
  
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 },
    },
  };
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
const EditProfileDialog = ({ parentId, isEditModalOpen, setIsEditModalOpen, profileData }) => {
    console.log("parentId", parentId, "profileData", profileData, "ProfileId", profileData.id)
    console.log("isEditModalOpen", isEditModalOpen)
    // const { formProps, getInputProps, saveButtonProps } = useForm();
    const { formProps, getInputProps, saveButtonProps } = useForm({
        resource: "profiles",
        action: "edit",
        id: profileData?.id,
    });
    useEffect(() => {
        // Set the initial form values based on profileData
        if (profileData) {
            const initialFormValues = {
                plan: profileData.attributes.plan,
                paymentmod: profileData.attributes.paymentmod,
                // Add other fields here based on your data structure
            };
            formProps.form.setFieldsValue(initialFormValues);
        }
    }, [profileData, formProps.form]);
    const [fileList, setFileList] = useState([
        {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: "https://cdn.dribbble.com/users/1223630/screenshots/8115260/media/8145a871d9c4d67ec06e047ccc6574b4.gif",
        },
    ]);
    // useEffect(() => {
    //     // Set the initial form values based on profileData
    //     if (profileData) {
    //         const initialFormValues = {
    //           plan: profileData.attributes.plan,
    //           paymentmod: profileData.attributes.paymentmod,
    //           // Add other fields here based on your data structure
    //         };
    //         formProps.setFields(initialFormValues);
    //       }
    //   }, [profileData, formProps]);

    const showModal = () => {
        setIsEditModalOpen(true);
        fetchProfileData(); // Call the fetchProfileData function when the modal is opened

    };
    const handleOk = () => {
        const formValues = formProps.form.getFieldsValue();
        handleFormFinish(formProps.form.getFieldsValue());
        // Close the modal after the actions are performed

        setIsEditModalOpen(false);
    };
    const handleCancel = () => {
        setIsEditModalOpen(false);
    };
    const handleFormFinish = async (values) => {
        // /**
        //  * Below is for file upload and need to change accordingly. 
        //  * 
        //  * 
        // */
         const formattedValues = mediaUploadMapper(values);
        try {
            const data = {
                ...values,
               ...formattedValues,
                accepted: parseInt(values.accepted, 10),
                rejected: parseInt(values.rejected, 10),
              };
              const { names, ...remaining } = data;
              console.log("names",names)
             const meelan = names.map(Number).filter((value) => value !== undefined);
              console.log("meelan",meelan)
            // Make the PUT request to update the profile data
            //const requestBody = { values };
            remaining['meelan']=meelan
              console.log("remaining request before post",remaining)
            const response = await fetch(`${API_URL}/api/profiles/${profileData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                  
                },
                body: JSON.stringify({data:remaining}),
            });
            console.log("response", response   )
            if (!response.ok) {
                // Handle the error if the response is not OK
                const errorData = await response.json();
                console.error('Error:', errorData);
                return;
            }

            // Handle the successful response if needed
            const updatedProfileData = await response.json();
            console.log('Profile updated:', updatedProfileData);

            // Close the modal after the profile is updated
            setIsEditModalOpen(false);
        } catch (error) {
            // Handle any other errors that might occur during the request
            console.error('Error:', error);
        }

    };

    return (
        <div>
            <Modal title="Profile Edit" open={isEditModalOpen} onOk={handleOk} onCancel={handleCancel} width={1220}>

                <Form {...formProps} layout="vertical" onFinish={handleFormFinish}  >
                    <Row gutter={24}>

                        {/* <Form.Item style={{marginLeft:"300px" , marginTop:"40px"}}>
                <Avatar/>
              </Form.Item> */}
                        <Col span={24}>
                            <Form.Item
                                name="photo"
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
                        <Col span={8}>
                            <Form.Item label="Accepted Count" name="accepted">
                                <Input placeholder="Accepted Count" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Rejected Count" name="rejected">
                                <Input placeholder="Rejected Count" />
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
                        <Col span={8}>  
                        <Form.List
        name="names"
      
      >
        {(fields, { add, remove }, { errors }) => (
          <>
          {console.log("Fields ", fields)}
            {fields.map((field, index) => (
              <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? 'Passengers' : ''}
                required={false}
                key={field.key}
              >
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                 
                  noStyle
                >
                  <Input placeholder="Profile Id" style={{ width: '60%' }} />
                </Form.Item>
                {fields.length > 1 ? (
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                  />
                ) : null}
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{ width: '60%' }}
                icon={<PlusOutlined />}
              >
                Add Profile Id
              </Button>
             
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
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



export default EditProfileDialog;