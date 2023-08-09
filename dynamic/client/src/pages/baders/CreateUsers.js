import { mediaUploadMapper } from "@refinedev/strapi-v4";
import { useState } from 'react';
  
  import { Create, useForm } from "@refinedev/antd";
import { Button, Form, Input } from "antd";
  
  const API_URL = process.env.REACT_APP_API_SERVER;
  const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY;
  
const CreateUsersDialog = () => {
    const [createdUserId, setCreatedUserId] = useState();
  
    const { formProps: createUserFormProps, saveButtonProps: createUserSaveButtonProps } = useForm({
      resource: 'users',
      onSuccess: (response) => {
        console.log("SUCCESS time response ", response);
        const userId = response?.data?.id;
        if (userId) {
          setCreatedUserId(userId);
        }
      },
    });
    return (
        <Create saveButtonProps={createUserSaveButtonProps}>
        <Form
          {...createUserFormProps}
          layout="vertical"
          onFinish={(values) => {
            console.log("FINISH time values ", values);
            values["role"] = 2;
            // Handle form submission here
            createUserFormProps.onFinish?.(mediaUploadMapper(values));
          }}
        >
          {/* Add form fields for user data */}
          <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please enter a username!' }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter an email address!' },
              { type: 'email', message: 'Please enter a valid email address!' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please enter a password!' },
              { type: 'password', message: 'Please enter a valid password!' },
            ]}
          >
            <Input />
          </Form.Item>

          {/* Add a hidden field for the Bader ID */}
          <Form.Item name="baders" initialValue={record?.id} hidden>
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Create>
    );
};

export default CreateUsers;