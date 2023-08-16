import { Create, useForm } from "@refinedev/antd";
import { mediaUploadMapper } from "@refinedev/strapi-v4";
import { Button, Form, Input, Select, Upload } from "antd";
import { useState } from "react";
const { TextArea } = Input;

const API_URL = process.env.REACT_APP_API_SERVER;
const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY;

const CreateActivityForm = ({baderid, open,setOpen,teamid}) => {
console.log('teamid', teamid)
  const [fileList, setFileList] = useState([]);

  const { formProps, saveButtonProps } = useForm({
    resource: "activities",
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
    values['teams'] = [teamid]
    formProps.onFinish?.(mediaUploadMapper(values));
    
  };

  
  const handleCancel = () => {
    setOpen(false);
  };

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };


  return (
    <div style={{ padding: "25px" }}>
        <Modal
        title="Create Activity"
        visible={open}
        onCancel={handleCancel}
        footer={null}
      >
      <Form {...formProps} onFinish={handleFormFinish}>
      <Form.Item label="activity Logo" name="photos">
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
            multiple={true}
            onChange={onChange}
          >
            {fileList.length < 6 && "+ Upload"}
          </Upload>
        </Form.Item>
   
        <Form.Item
          label="Activity Name"
          name="name"
          rules={[
            { required: true, message: "Please enter the activity name" },
          ]}
        >
          <Input placeholder="Activity Name" />
        </Form.Item>

       
        <Form.Item label="Purpose" name="purpose" rules={[{ required: true, message: "Please enter a purpose" }]}>
        <TextArea rows={4} placeholder="Enter purpose" />
      </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            {...saveButtonProps}
          >
            Submit Activty
          </Button>
        </Form.Item>
      </Form>
      </Modal>
    </div>
  );
};

export default CreateActivityForm;