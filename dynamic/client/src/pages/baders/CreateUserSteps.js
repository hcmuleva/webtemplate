import React, { useState } from "react";
import CreateBaderUserForm from "./CreateBaderUserForm";
import CreateAddressForm from "./CreateAddressForm";
import CreateBusiness from "./CreateBusiness";
import CreateEducation from "./CreateEducation";
import { Steps,theme } from 'antd';
import { useUserContext } from "./BaderUserContext";

const CreateUserSteps = ({baderid}) => {
    const { baderId, setBaderId, userId, setUserId,done,setDone,current, setCurrent } = useUserContext();

    console.log("baderid",baderid)
  const [formobj, setFormobj] = useState({});

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: "Profile",
      content: (
        <CreateBaderUserForm baderid={baderid}  moveToNextStep={next}
        />
      ),
    },
    {
      title: "Address",
      content: <CreateAddressForm user={formobj}  moveToNextStep={next} />,
    },
    {
      title: "Business",
      content: <CreateBusiness user={formobj}   moveToNextStep={next}/>,
    },
    {
      title: "Education",
      content: <CreateEducation user={formobj}  setDone={setDone}/>,
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const onFinishData = () => {
    setDone(true);

  };
  const handleNextClick = () => {
    if (current < steps.length - 1) {
      next();
    } else {
      onFinishData();
    }
  };
  return (
    <>
    <Steps current={current} items={items} />

    {steps[current].content}
    <div>
      {current > 0 && (
        <button onClick={prev}>Previous</button>
      )}
      {current < steps.length - 1 && (
        <button onClick={handleNextClick}>Next</button>
      )}
    </div>
  </>
  );
};

export default CreateUserSteps;
