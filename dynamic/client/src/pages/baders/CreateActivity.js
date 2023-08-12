import { Create, useForm } from "@refinedev/antd";
import { getValueProps, mediaUploadMapper } from "@refinedev/strapi-v4";
import { Divider, Form, Input, Upload } from "antd";
import { useState } from "react";

import { Radio } from "antd";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_SERVER;
const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY;

const CreateActivity = () => {
  const { formProps, saveButtonProps } = useForm();
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://cdn.dribbble.com/users/1223630/screenshots/8115260/media/8145a871d9c4d67ec06e047ccc6574b4.gif",
    },
  ]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
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
  const { TextArea } = Input;

  return (
    <>
      <Create title="Create Activity" saveButtonProps={saveButtonProps}>
        <Form
          {...formProps}
          layout="vertical"
          onFinish={(values) => {
            console.log("FINISH time values ", values);

            formProps.onFinish?.(mediaUploadMapper(values));
          }}
        >
          {/* <Form.Item style={{marginLeft:"300px" , marginTop:"40px"}}>
                <Avatar/>
              </Form.Item> */}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Form.Item
              name="photo"
              valuePropName="photo"
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
        </Form>
      </Create>
    </>
  );
};

export default CreateActivity;