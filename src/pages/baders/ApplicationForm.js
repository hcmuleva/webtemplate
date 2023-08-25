import React, { useState } from 'react';
import { Form, Upload, Button, Select, Divider, Input, Row } from 'antd';
import { getValueProps, mediaUploadMapper } from "@refinedev/strapi-v4";
import { Create } from '@refinedev/antd';
import TextArea from 'antd/es/input/TextArea';

const API_URL = process.env.REACT_APP_API_SERVER
const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY

const { Option } = Select;

const ApplicationForm = () => {
  const [fileList, setFileList] = useState([]);

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleInterestChange = (value) => {
    console.log('Selected Interest:', value);
  };

  return (
   <div className='container-fluid' style={{marginTop:"-400px"}}>
    <Form layout="vertical" onFinish={(values) => {
        console.log("FINISH time values ", values)
             formProps.onFinish?.(mediaUploadMapper(values));
    }}>
        
          {/* <Form.Item style={{marginLeft:"300px" , marginTop:"40px"}}>
    <Avatar/>
  </Form.Item> */}
 
 <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
<Form.Item
name="photo"
valuePropName="photo"
getValueProps={(data) => getValueProps(data, API_URL)}
style={{ maxWidth: "00px", width: "100%", marginLeft:"-200px" }}
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
{fileList.length < 5 && "+ Upload Resume"}
</Upload>
</Form.Item>
</div>
   <Divider />
       
        <Row style={{marginLeft:"400px"}}>
          <Form.Item label="Interest" >
          <Select onChange={handleInterestChange} placeholder="Select Interest">
            <Option value="interested">Interested</Option>
            <Option value="later">Later</Option>
            <Option value="immediate">Immediate</Option>
          </Select>
                </Form.Item>
        </Row>
        <Divider />

        <Form.Item className="next-button">
          <Button type="primary">Submit</Button>
        </Form.Item>
      
    </Form>
   
</div>
  );
};

export default ApplicationForm;
