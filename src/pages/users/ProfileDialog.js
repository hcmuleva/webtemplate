import React from 'react';

import { Create, useForm } from '@refinedev/antd';
import { Col, Row, Form, Input, Select, Upload, Button, Space ,Modal} from 'antd';
import Personal from './Personal';
import Business from './Business';

import { Tabs } from 'antd';
import Education from './Education';
const onChange = (key) => {
  console.log(key);
};

const ProfileDialog = ({parentId, isModalOpen, setIsModalOpen}) => {
    console.log("parentId",parentId)
    const { formProps, getInputProps, saveButtonProps } = useForm();

    const showModal = () => {
        setIsModalOpen(true);
      };
      const handleOk = () => {
        setIsModalOpen(false);
      };
      const handleCancel = () => {
        setIsModalOpen(false);
      };
      const handleFormFinish = (values) => {
        values={...values, role:2}
        console.log("values", values)
        // values={...values, classes:selectedClassId,subject:selectedSubjectId,topics:selectedTopicId}

        formProps.onFinish?.(mediaUploadMapper(values));
        // Handle form submission with mappedValues

    };

    return (
        <div>
            <Modal title="Profile Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1220}>
           
            <Form {...formProps} layout="vertical" onFinish={handleFormFinish}>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                <Form.Item
                    label="name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter profile name',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="plan"
                    name="plan"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter Plan detail',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Enter profileId"
                    name="profileid"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter ProfileId',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Enter description"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter desscription',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Enter requirement"
                    name="requirement"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter requirement',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Enter payment"
                    name="requirement"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter payment',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
           
            </Modal>
        </div>
    );
};


};

export default ProfileDialog;