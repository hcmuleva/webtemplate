import { Create, useForm } from "@refinedev/antd";
import { getValueProps, mediaUploadMapper } from "@refinedev/strapi-v4";
import { Form, Input, Modal, Upload } from "antd";
import { useState } from "react";


const API_URL = process.env.REACT_APP_API_SERVER;
const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY;
// ... Other imports and components


const CreateActivityModal = ({ open, setOpen, baderid }) => {
  const [fileList, setFileList] = useState([]);
  const { TextArea } = Input;
  
  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };


  const beforeUpload = (file) => {
    setFileList([...fileList, file]);
    return false; // Prevent default upload behavior
  };
  const { formProps, getInputProps, saveButtonProps } = useForm({
    resource: "activities"
});
  return (
    <>
      <Modal
        title="Create Activity"
        visible={open}
        onCancel={handleCancel}
        footer={null}
      >
        <Create title="Create Activity" saveButtonProps={saveButtonProps}>
          <Form
            {...formProps}
            layout="vertical"
            onFinish={(values) => {
              console.log("FINISH time values ", values);
              values["baders"] = baderid;
              const modifiedValues = mediaUploadMapper(values);
              
              // console.log("FINISH time values ", modifiedValues);
              // formProps.onFinish?.(mediaUploadMapper(values));
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Form.Item
                name="photos"
                valuePropName="photos"
                getValueProps={(data) => getValueProps(data, API_URL)}
              >
                <Upload
                name="files"
                action={`${API_URL}/api/upload`}
                headers={{
                  "Access-Control-Allow-Origin": "*",
                  Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
                }}
                accept="image/*"
                listType="picture-card"
                fileList={fileList}
              >
                {fileList.length < 5 && "+ Upload Activity"}
              </Upload>
              </Form.Item>
            </div>


          <Form.Item label="Activity Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Activity Purpose" name="Purpose">
            <TextArea
              rows={4}
              placeholder="Activity "
              maxLength={306}
            />
          </Form.Item>
            {/* Rest of the form items */}
          </Form>
        </Create>
      </Modal>
    </>
  );
};

export default CreateActivityModal;
