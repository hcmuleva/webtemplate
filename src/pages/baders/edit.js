import React,{useState} from 'react';
import { Edit, useForm } from "@refinedev/antd";
import { mediaUploadMapper } from "@refinedev/strapi-v4";
import { Form, Input, Upload, Button } from "antd";
import MDEditor from "@uiw/react-md-editor";
import ImgCrop from 'antd-img-crop';


const API_URL = process.env.REACT_APP_API_SERVER;
const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY;

const BaderEdit = () => {
  const { formProps, saveButtonProps, queryResult } = useForm({
    metaData: { populate: ["photo", "users"] },
  });

  const initialDescription = queryResult?.data?.data?.description;
  const initialPhotoUrl = queryResult?.data?.data?.photo?.[0]?.url;
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
  // Function to handle photo change
  const handlePhotoChange = ({ fileList: newFileList }) => {
   
    setFileList(newFileList);
  };
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: initialPhotoUrl,
    },
  ]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form
        {...formProps}
        layout="vertical"
        onFinish={(values) => {
          formProps.onFinish?.(mediaUploadMapper(values));
        }}
      >
        <h1>Edit Bader</h1>

        <Form.Item
          label="Photo"
          name="photo"
          valuePropName="fileList"
          getValueFromEvent={(e) => e && e.fileList}
          initialValue={initialPhotoUrl} // Set the initial value for the photo field
        >
               <ImgCrop rotationSlider>
          <Upload
            listType="picture-card"
            action={`${API_URL}/api/upload`}
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
          >
             {fileList.length < 5 && '+ Upload'}
          </Upload>
          </ImgCrop>
        </Form.Item>

        <Form.Item
          label="Name"
          name="name"
          initialValue={queryResult?.data?.data?.name}
          rules={[{ required: true, message: 'Please enter the name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          initialValue={initialDescription}
          rules={[{ required: true, message: 'Please enter the description!' }]}
        >
          <MDEditor value={initialDescription} height={200} />
        </Form.Item>
      </Form>
    </Edit>
  );
};

export default BaderEdit;
