import React, { useEffect, useState } from "react";
import { Form, Layout, Menu, Modal } from "antd";
import DetailsForm from "./DetailsForm";
import AboutJobDetails from "./AboutJobDetails ";
import { mediaUploadMapper } from "@refinedev/strapi-v4";
import { Create, useForm } from "@refinedev/antd";
import { useParsed } from "@refinedev/core";

const { Sider, Content } = Layout;

const JobOpportunity = ({isModalOpen,setIsModalOpen}) => {
  
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [formValues] = Form.useForm();
  // console.log("formprops", formValues);
  const [currentTab, setCurrentTab] = useState("details"); // Default selected tab
  const [myData, setMyData] = useState(); // Default selected tab
  const [myData1, setMyData1] = useState({}); // Default selected tab
 

  const { formProps, saveButtonProps, setId } = useForm({
    resource: "opportunities",
   
  });
  console.log("formprops", formProps);
  const handleTabClick = (tab) => {
    setCurrentTab(tab);
  };

  //  console.log("formprops in job opportunity", formValues.getFieldsValue())
  function next() {
    console.log("next next");
    setMyData(formValues.getFieldsValue());
    setCurrentTab("description");
  }
  function submit() {
    console.log("submit");
    const formData = formValues.getFieldsValue();
       const values = { ...myData, ...formData };
    console.log("FINISH time values ", values);
    formProps.onFinish?.(mediaUploadMapper(values));
    setIsModalOpen(false);
    formValues.resetFields()
    setCurrentTab("details");
  }
  console.log("mydata in job opportunity", formValues);

  return (
    <Modal
      title="Create Opportunity"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null} 
      width={1200}
      
    >
      <Layout style={{ minHeight: "100vh" }}>
        <Sider theme="light" width={200}>
          <Menu
            mode="vertical"
            selectedKeys={[currentTab]}
            onClick={({ key }) => handleTabClick(key)}
          >
            <Menu.Item key="details">Details</Menu.Item>
            <Menu.Item key="description">Description</Menu.Item>
          </Menu>
        </Sider>
        &nbsp; &nbsp; &nbsp;
        <Layout style={{ width: "1030px" }}>
          <Content>
            {currentTab === "details" && (
              <div>
                <DetailsForm
                  formValues={formValues}
                  next={next}
                  formProps={formProps}
                />{" "}
              </div>
            )}
          </Content>
          <Content>
            {currentTab === "description" && (
              <div>
                <AboutJobDetails
                  formValues={formValues}
                  submit={submit}
                  formProps={formProps}
                />
              </div>
            )}
          </Content>
        </Layout>
      </Layout>
    </Modal>
  );
};

export default JobOpportunity;
