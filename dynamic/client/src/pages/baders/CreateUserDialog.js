import { Create, useForm } from "@refinedev/antd";

import { getValueProps, mediaUploadMapper } from "@refinedev/strapi-v4";
import {
    Avatar,
    Col,
    Modal,
    Button,
    DatePicker,
    Form,
    Input,
    Row,
    Select,
    Upload,
} from "antd";


import { useState } from "react";
import { useUserContext } from "./BaderUserContext";
import CreateUserSteps from "./CreateUserSteps";

const API_URL = process.env.REACT_APP_API_SERVER;
const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY;

const CreateUserDialog = ({ baderid, baderdata }) => {
    const { baderId, setBaderId, userId, setUserId,open, setOpen} = useUserContext();

    console.log("Bader id in Create user dialog", baderdata.id, " baderdata", baderdata)
    setBaderId(baderdata.id);
    const [loading, setLoading] = useState(false);
    

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOpen(false);
        }, 3000);
    };




    const { TextArea } = Input;

    const { formProps, getInputProps, saveButtonProps } = useForm({
        onMutationSuccess: (data, variables, context, isAutoSave) => {
            console.log({ data, variables, context, isAutoSave });
        },
    });
    const handleFormFinish = (values) => {
        values = { ...values, role: 2 };
        console.log("values", values);
        // values={...values, classes:selectedClassId,subject:selectedSubjectId,topics:selectedTopicId}

        formProps.onFinish?.(mediaUploadMapper(values));
        // Handle form submission with mappedValues
    };
    const PersonalProfile = () => { };
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

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Create User
            </Button>
            <Modal
                open={open}
                title="Create User"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                   
                ]}
            >
                <CreateUserSteps baderid={baderdata.id}/>


            </Modal>
        </>
    );
}

export default CreateUserDialog;