import { Create, useForm, useSimpleList } from "@refinedev/antd";
import { mediaUploadMapper } from "@refinedev/strapi-v4";
import { Button, Form, Input, Modal, Select, Upload } from "antd";
import { useState } from "react";
const { TextArea } = Input;

const API_URL = process.env.REACT_APP_API_SERVER;
const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY;

const CreateActivityForm = ({
  baderid,
  setOpen,
  teamid,
  isCreateActivityModalVisible,
  setIsCreateActivityModalVisible,
}) => {
  console.log("teamid", teamid);
  const [fileList, setFileList] = useState([]);

  const { formProps, saveButtonProps } = useForm({
    resource: "activities",
    onMutationSuccess: (data, variables, context, isAutoSave) => {
      console.log("Mutation success!");
      console.log("Data:", data);
      console.log("Variables:", variables);
      console.log("Context:", context);
      console.log("Is Auto Save:", isAutoSave);
      setOpen(false);

      // You can perform additional actions or update state here
    },
  });

  const { listProps } = useSimpleList({
    resource: "teams",
    filters: {
      permanent: [
          {
              field: "baders.id",
              operator: "contains",
              value: baderid,
          },
      ],
  },
  });
  console.log("listprops", listProps);

  const handleFormFinish = async (values) => {
    const { teamtype, ...newObject } = values;
    newObject["baders"] = baderid;
    newObject["teams"] = [teamtype];
    console.log("values",newObject)
    formProps.onFinish?.(mediaUploadMapper(newObject));
    setFileList([]); // Reset file list
    formProps.form.resetFields(); // Reset the form fields
    setIsCreateActivityModalVisible(false);
  };

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const handleCancel = () => {
    setIsCreateActivityModalVisible(false);
  };

  return (
    <div style={{ padding: "25px" }}>
      <Modal
        title="Create Activity"
        visible={isCreateActivityModalVisible}
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

          <Form.Item label="Select Team" name="teamtype">
            <Select placeholder="Select Team">
              {listProps?.dataSource?.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Purpose"
            name="purpose"
            rules={[{ required: true, message: "Please enter a purpose" }]}
          >
            <TextArea rows={4} placeholder="Enter purpose" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" {...saveButtonProps}>
              Submit Activty
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateActivityForm;
