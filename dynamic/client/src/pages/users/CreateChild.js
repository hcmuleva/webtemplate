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

const CreateChild = ({parentId, isModalOpen, setIsModalOpen}) => {
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
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1220}>
           
            <Form {...formProps} layout="vertical" onFinish={handleFormFinish}>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                {/* <Form.Item
                    label="UserName"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter username',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter Password',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter Email',
                        },
                    ]}
                >
                    <Input />
                </Form.Item> */}
            </Form>
           
            </Modal>
        </div>
    );
};

export default CreateChild;