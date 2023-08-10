import React, { useState } from "react";
import { Form, Button, Input, message, Steps, theme } from "antd";
import CreateActivity from "./CreateActivity";

import { Create, useForm } from "@refinedev/antd";
import CreateForm from "./CreateForm";
import CreateAddressForm from "./CreateAddressForm";
import CreateBusiness from "./CreateBusiness";
import CreateEducation from "./CreateEducation";


const TBD = () => {
  const [done, setDone] = useState(false);
  const steps = [
    {
      title: "Profile",
      content: <CreateForm />,
    },
    {
      title: "Address",
      content:  <CreateAddressForm />,
    },
    {
      title: "Business",
      content: <CreateBusiness />,
    },
    {
      title: "Education",
      content: <CreateEducation />,
    },
    
  ];
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const { formProps, saveButtonProps } = useForm();

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    lineHeight: "260px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  const onFinishData = (values) => {
    if (done) {
      console.log("FINISH time values ", values);
      formProps.onFinish?.(mediaUploadMapper(values));
    } else {
      message.error("Erorr in submit, please fill mandatory field");
    }
  };

  return (
    <>
      <Create saveButtonProps={saveButtonProps } >
        <Form
          {...formProps}
          layout="vertical"
          onFinish={(values) => {
            onFinishData(values);
          }}
        >
          <Steps current={current} items={items} />
          <div style={contentStyle}>{steps[current].content}</div>
          <div
            style={{
              marginTop: 24,
            }}
          >
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => next()}>
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                type="primary"
                onClick={() => {
                  setDone(true);
                  return message.success("Processing complete!");
                }}
              >
                Done
              </Button>
            )}
            {current > 0 && (
              <Button
                style={{
                  margin: "0 8px",
                }}
                onClick={() => prev()}
              >
                Previous
              </Button>
            )}
          </div>
        </Form>
      </Create>
    </>
  );
};

export default TBD;
