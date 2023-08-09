import { Edit,useForm } from '@refinedev/antd';
import React from 'react';

import { Col, Row, Form, Input, Select, Upload, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { getValueProps, mediaUploadMapper } from "@refinedev/strapi-v4";
const UserEdit = () => {
    const { formProps, getInputProps, saveButtonProps } = useForm();
    const handleFormFinish = (values) => {
        values={...values, role:2}
        console.log("values", values)
        // values={...values, classes:selectedClassId,subject:selectedSubjectId,topics:selectedTopicId}

        formProps.onFinish?.(mediaUploadMapper(values));
        // Handle form submission with mappedValues

    };
    return (
        <div>
        <Edit saveButtonProps={saveButtonProps}>
           <Form {...formProps} layout="vertical" onFinish={handleFormFinish}>
               <Form.Item
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
               </Form.Item>
           </Form>
           </Edit>
       </div>
   );
};

export default UserEdit;