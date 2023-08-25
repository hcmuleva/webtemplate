import { Create, useForm } from "@refinedev/antd";
import { mediaUploadMapper } from "@refinedev/strapi-v4";
import { Button, Form, Input, Select, Upload } from "antd";
import { useState } from "react";
const { TextArea } = Input;

const API_URL = process.env.REACT_APP_API_SERVER;
const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY;

const CreateTeamForm = ({baderid, setOpen,teamid}) => {
  const [fileList, setFileList] = useState([]);

  const { formProps, saveButtonProps } = useForm({
    resource: "teams",
    onMutationSuccess: (data, variables, context, isAutoSave) => {
        console.log("Mutation success!");
        console.log("Data:", data);
        console.log("Variables:", variables);
        console.log("Context:", context);
        console.log("Is Auto Save:", isAutoSave);
        setOpen(false)
        // You can perform additional actions or update state here
      },
  });

  const handleFormFinish = async (values) => {
   
    values['baders']   =baderid
    

    formProps.onFinish?.(mediaUploadMapper(values));
  };

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  return (
    <div style={{ padding: "25px" }}>
      <Form {...formProps} onFinish={handleFormFinish}>
      <Form.Item label="Team Logo" name="photo">
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
          >
            {fileList.length < 1 && "+ Upload"}
          </Upload>
        </Form.Item>
      <Form.Item label="Team Type" name="teamtype"   initialValue="EDUCATION" 
         rules={[{ required: true, message: "Please select a team type" }]}>
        <Select placeholder="Select Team Type">
          <Option value="EDUCATION">EDUCATION</Option>
          <Option value="TRUSTTEE">TRUSTTEE</Option>
          <Option value="SPORTS">SPORTS</Option>
          <Option value="SANSKAR">SANSKAR</Option>
          <Option value="TUITION">TUITION</Option>
          <Option value="BHAJAN">BHAJAN</Option>
        </Select>
      </Form.Item>
        <Form.Item
          label="Team Name"
          name="name"
          rules={[
            { required: true, message: "Please enter the team name" },
          ]}
        >
          <Input placeholder="Team Name" />
        </Form.Item>

       
        <Form.Item label="Description" name="description" rules={[{ required: true, message: "Please enter a description" }]}>
        <TextArea rows={4} placeholder="Enter Description" />
      </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            {...saveButtonProps}
          >
            Create Team
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateTeamForm;
