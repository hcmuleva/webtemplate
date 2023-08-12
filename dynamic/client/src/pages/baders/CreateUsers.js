import React, { useState, useMemo } from "react";
import { Form, Button, Steps, theme } from "antd";
import CreateUserBasicInfo from "./CreateUserBasicInfo";
import CreateAddressForm from "./CreateAddressForm";
import CreateBusiness from "./CreateBusiness";
import CreateEducation from "./CreateEducation";
import { getValueProps, mediaUploadMapper } from "@refinedev/strapi-v4";

import { useUpdate } from "@refinedev/core";
import { Create, useForm } from "@refinedev/antd";
const API_URL = process.env.REACT_APP_API_SERVER;
const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY;

const { Step } = Steps;

const CreateUsers = ({baderid}) => {
  let [myArray, setMyArray] = useState([]);
  const[userid,setUserId]=useState(null);
  const { mutate } = useUpdate();
  const [formValues] = Form.useForm();
  const [AddressForm] = Form.useForm();
  const [BusinessForm] = Form.useForm();
  const [EducationForm] = Form.useForm();
  const [done, setDone] = useState(false);
  const [current, setCurrent] = useState(0);
 

  // console.log("addressformvalues", AddressForm.getFieldsValue());
  // console.log("businessformvalues", BusinessForm.getFieldsValue());
  // console.log("educationformvalues", EducationForm.getFieldsValue());

  const nextStep = () => {
    setMyArray((prevObj) => ([
      ...prevObj,
      formValues.getFieldsValue(),
      
    ]));
    // values = [... ProfileForm.getFieldsValue(),]
    // console.log("profileformvalues values", values);

    setCurrent(current + 1);

  };
  const createAddress=async(values)=>{
    console.log("values in create address",values)
    const response = await fetch(`${API_URL}/api/addresses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
      },
      body: JSON.stringify({data:values}),
    });
    const data = await response.json();
    console.log("Create  address data", data);
    return data;
  }
  const createBusiness=async(values)=>{
    const response = await fetch(`${API_URL}/api/businesses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
      },
      body: JSON.stringify({data:values}),
    });
    const data = await response.json();
    console.log("Create Business data data", data);
    return data;
  }
  const createEducation=async(values)=>{
    console.log("values in create education",values)
    const response = await fetch(`${API_URL}/api/educations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
      },
      body: JSON.stringify({data:values}),
    });
    const data = await response.json();
    console.log("create edication data data", data);
    return data;
  }
  const handleFormFinish = async (values) => {
    // Other value modifications and logic here...
    console.log("values of array in handleformfinish", values);
    try {
      // Upload the user's photo using mediaUploadMapper
      const photoData = await mediaUploadMapper({
        files: values[0].photo,
      });
  
      // Create the user with the updated photo data
      const response = await createUser({
        ...values[0],
        role: 2,
        // username: values[0].mobile + "_" + values[0].firstname,
        // email: values[0].mobile + "_" + values[0].firstname + "@hph.com",
        // password: values[0].mobile,
        cast: "OBC",
        jati: "SEERVI",
        org_name: "BADER",
        baders: baderid,
        photo: photoData, // Attach the uploaded photo data
      });
  
      console.log("response", response);
      setUserId(response.id);
      //Create Address Business and Education
      const addressData = await createAddress({
        ...values[1],
        users_permissions_users: response.id,
      });
      console.log("addressData", addressData);
      const businessData = await createBusiness({
        ...values[2],
        userids: response.id,
      }); 
      console.log("businessData", businessData);
      const educationData = await createEducation({
        ...values[3],
        userid: response.id,
      });
     
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };
  

  const { formProps, getInputProps, saveButtonProps } = useForm({
    resource: "users",
     onMutationSuccess: (data, variables, context, isAutoSave) => {
    console.log("DATA for create USER",{data, variables, context, isAutoSave });
    setUserId()
},
});

  const createUser = async (values) => {
    console.log("createUser values", values)
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


  console.log("myArray=>", myArray)
  const onFinish = (values) => {

    setMyArray((prevObj) => ([
      ...prevObj,
      formValues.getFieldsValue(),
     
    ]));
    handleFormFinish(myArray)
    
    //console.log("onFinish myarray", myArray);
    // console.log("formvalues", formValues.getFieldsValue());
    // console.log("profileformvalues myArray", myArray);
    // console.log("addressformvalues", AddressForm.getFieldsValue());
    // console.log("businessformvalues", BusinessForm.getFieldsValue());
    // console.log("educationformvalues", EducationForm.getFieldsValue());
    // const updatedValues = [ ...values, ...myArray ];
    // console.log("All form values:", updatedValues);
    // setDone(true);

    // mutate({
    //   resource: "users",
    //   action : "create",
    //   values: {userid: values.userid  },
    // });
    // mutate({
    //   resource: "addresses",
    //   action : "create",
    //   values: updatedValues,
    // });
    // mutate({
    //   resource: "businesses",
    //   action : "create",
    //   values: updatedValues,
    // });
    // mutate({
    //   resource: "educations",
    //   action : "create",
    //   values: updatedValues,
    // });
    // formProps.onFinish?.(mediaUploadMapper(updatedValues));
  };

  const steps = [
    { title: "Profile", content: <CreateUserBasicInfo formValues={formValues} baderid={baderid} /> },
    {
      title: "Address",
      content: <CreateAddressForm formValues={formValues} />,
    },
    {
      title: "Business",
      content: <CreateBusiness formValues={formValues} />,
    },
    {
      title: "Education",
      content: <CreateEducation formValues={formValues} />,
    },
  ];

  return (
    <>
      <Form {...formProps} onFinish={handleFormFinish}  layout="vertical">
        <Steps current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div style={{ marginTop: 24 }}>{steps[current].content}</div>
        <div style={{ marginTop: 24 }}>
          {current > 0 && (
            <Button
              style={{ marginRight: 8 }}
              onClick={() => {
                myArray.pop();
                setCurrent(current - 1);
              }}
            >
              Previous
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button type="primary" onClick={nextStep}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => onFinish()}>
              Done
            </Button>
          )}
        </div>
      </Form>
    </>
  );
};

export default CreateUsers;