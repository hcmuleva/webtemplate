import { Create, useForm } from "@refinedev/antd";
import { getValueProps, mediaUploadMapper } from "@refinedev/strapi-v4";
import {
  Avatar,
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Upload,
} from "antd";

import { useState } from "react";
import { useUserContext } from "./BaderUserContext";
const API_URL = process.env.REACT_APP_API_SERVER;
const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY;

const onChange = (key) => {
  console.log(key);
};

const { TextArea } = Input;

const CreateBaderUserForm = ({baderid,setFormobj,moveToNextStep }) => {
  const { baderId, setBaderId, userId, setUserId } = useUserContext();

  const [isDivyang, setIsDivyang] = useState(0);
  console.log("Bard id ", baderid, " context baderid",baderId)
  const { formProps, getInputProps, saveButtonProps } = useForm({
    resource: "users",
     onMutationSuccess: (data, variables, context, isAutoSave) => {
    console.log("DATA for create USER",{data, variables, context, isAutoSave });
},
});
const createUser = async (values) => {
    const response = await fetch(`${API_URL}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
      },  
      body: JSON.stringify(values),
    });
    const data = await response.json();
    console.log("data", data);
    return data;
  };
  
  const handleFormFinish = async (values) => {
    // Other value modifications and logic here...
  
    try {
      // Upload the user's photo using mediaUploadMapper
      const photoData = await mediaUploadMapper({
        files: values.photo,
      });
  
      // Create the user with the updated photo data
      const response = await createUser({
        ...values,
        role: 2,
        username: values.mobile + "_" + values.firstname,
        email: values.mobile + "_" + values.firstname + "@hph.com",
        password: values.mobile,
        cast: "OBC",
        jati: "SEERVI",
        org_name: "BADER",
        baders: baderid,
        photo: photoData, // Attach the uploaded photo data
      });
  
      console.log("response", response);
      setUserId(response.id);
      moveToNextStep();
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };
  
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
  return (
    <div style={{padding:"25px"}}>
 <Form {...formProps} onFinish={handleFormFinish}>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="photo"
                valuePropName="photo"
                getValueProps={(data) => getValueProps(data, API_URL)}
                style={{ marginLeft: "0px",marginTop:"20px" }}
              >
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
                  onPreview={onPreview}
                >
                  {fileList.length < 5 && "+ Upload"}
                </Upload>
              </Form.Item>
             
            </Col>
          </Row>

          
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="First Name"
                name="firstname"
                rules={[
                  { required: true, message: "Please enter your first name" },
                ]}
              >
                <Input placeholder="First Name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Mobile Number"
                name="mobile"
                rules={[
                  { required: true, message: "Please enter your Mobile " },
                ]}
              >
                <Input placeholder="Mobile" />
              </Form.Item>
            </Col>
            </Row>
            <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="Father Name" name="father">
                <Input placeholder=" Father Name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Mother Name" name="mother">
                <Input placeholder=" Mother Name" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
           
            <Col span={12}>
              <Form.Item
                label="Gender"
                name="sex"
                
              >
                <Select placeholder="Select Gender">
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                  <Option value="other">Other</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Date of Birth" name="dob">
                <DatePicker
                  style={{ width: "100%" }}
                  placeholder="Select Date"
                />
              </Form.Item>
            </Col>
            </Row>
            <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Marital status"
                name="marital"
                
              >
                <Select placeholder="Marital status">
                  <Option value="married">Married</Option>
                  <Option value="unmarried">Unmarried</Option>
                  <Option value="divorced">Divorced</Option>
                  <Option value="waitingdivorced">Waiting ForDivorced</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Gotra"
                name="gotra"
                rules={[
                  {
                    required: true,
                    message: "Please select your Gotra",
                  },
                ]}
              >
                <Select placeholder="Gotra">
                  <Option value="hammad">Hammad</Option>
                  <Option value="mulewa">Mulewa</Option>
                  <Option value="bhayal">Bhayal</Option>
                  <Option value="kag">kag</Option>
                  <Option value="rathore">Rathore</Option>
                  <Option value="devda">Devda</Option>
                  <Option value="parwar">Parwar</Option>
                  <Option value="solanki">Solanki</Option>
                  <Option value="padiyar">Padiyar</Option>
                  <Option value="satpuda">Satpuda</Option>
                  <Option value="septa">Septa</Option>
                  <Option value="sencha">Sencha</Option>
                  <Option value="choyal">Choyal</Option>
                  <Option value="aaglecha">Aaglecha</Option>
                  <Option value="varfa">Varfa</Option>
                  <Option value="parihar">Parihar</Option>
                  <Option value="gehlot">Gehlot</Option>
                  <Option value="sindadda">Sindadda</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

        
              <Row gutter={24}>
              <Col span={12}>
              <Form.Item  label="isDivyag?" name="isdivyang">
                <Checkbox>isDivyang</Checkbox>
              </Form.Item>
              </Col>
            <Col span={12}>
              <Form.Item label="Divyang Description" name="divyangdescription">
                <TextArea
                  rows={4}
                  placeholder="Divyang Description"
                  maxLength={6}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
          <Form.Item>
          <Button type="primary" htmlType="submit">
            Create User
          </Button>
        </Form.Item>
          </Row>
          </Form>

    </div>
  );
};

export default CreateBaderUserForm;