import { Create, useForm } from "@refinedev/antd";
import { mediaUploadMapper } from "@refinedev/strapi-v4";
import { Col, Row, Select, Upload } from "antd";
import { Form, Input } from "antd";
// import CreateSubjectFields from "./CreateSubjectFields";
const API_URL = process.env.REACT_APP_API_SERVER;
const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY;
 const ProfileCreate = ({userid, setUserId}) => {
  const { formProps, saveButtonProps } = useForm();
  return (
    <Create saveButtonProps={saveButtonProps}>

      <Form
        {...formProps}
        layout="vertical"
        onFinish={(values) => {
          values = {...values,role:2,password:"Welcome@123"}
          console.log("FINISH time values ", values);
          formProps.onFinish?.(mediaUploadMapper(values));
        }}
      >

        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-8 col-xl-6">
              <div className="card rounded-3">
                <img
                  src="./images/front.jpg"
                  className="w-100"
                  style={{
                    borderTopLeftRadius: ".3rem",
                    borderTopRightRadius: ".3rem",
                  }}
                  alt="Sample photo"
                />
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">
                    Registration Info
                  </h3>

                  <Form.Item name="photo" label="Image">
                    <Upload.Dragger
                      name="files"
                      action={`${API_URL}/api/upload`}
                      // headers={{
                      //   "Access-Control-Allow-Origin": "*",
                      //   Authorization: `Bearer ${localStorage.getItem(
                      //     TOKEN_KEY
                      //   )}`,
                      // }}
                      accept="image/*"
                    >
                    
                      <p className="ant-upload-text">Cover page</p>
                    </Upload.Dragger>
                  </Form.Item>

                  <Form.Item
                    label="Student Full Name"
                    name="username"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Father's Name"
                    name="father"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Mother's Name"
                    name="mother"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Mobile Number"
                    name="mobile"
                    rules={[{ required: true }]}
                  >
                    <Input type="number" />
                  </Form.Item>

                  <Form.Item
                    label="Email ID"
                    name="email"
                    rules={[{ required: true, type: "email" }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Class "
                    name="class"
                    rules={[{ required: true, type: "text" }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Subject"
                    name="subject"
                    rules={[{ required: true, type: "text" }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="DOB"
                    name="dob"
                    rules={[{ required: true }]}
                  >
                    <Input type="date" />
                  </Form.Item>

                  <Form.Item
                    label="Gender"
                    name="sex"
                    rules={[{ required: true }]}
                  >
                    <Select>
                      <Select.Option value="female">Female</Select.Option>
                      <Select.Option value="male">Male</Select.Option>
                      <Select.Option value="other">Other</Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item>
                    <button
                      type="submit"
                      className="btn btn-success btn-lg mb-1"
                    >
                      Submit
                    </button>
                  </Form.Item>
                  <footer className="bg-light text-dark text-center py-5">
                    <div className="container">
                      <h6>
                        {" "}
                        <img
                          style={{ width: "80px" }}
                          src="./images/hph.png"
                        />{" "}
                        &copy; {new Date().getFullYear()} All Rights Reserved By
                        HPH Technologies
                      </h6>
                    </div>
                  </footer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
      
    </Create>
  );
};
export default ProfileCreate