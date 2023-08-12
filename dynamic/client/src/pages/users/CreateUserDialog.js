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

const API_URL = process.env.REACT_APP_API_SERVER;
const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY;

const CreateUserDialog = ({ baderid, baderdata }) => {
    console.log("Bader id in Create user dialog", baderid, " baderdata", baderdata)

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

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

    const { formProps, getInputProps, saveButtonProps } = useForm();
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
                    <Button key="back" onClick={handleCancel}>
                        Return
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                        Submit
                    </Button>,
                    <Button
                        key="link"
                        href="https://google.com"
                        type="primary"
                        loading={loading}
                        onClick={handleOk}
                    >
                        Search on Google
                    </Button>,
                ]}
            >

                <div>
                    <Create saveButtonProps={saveButtonProps}>
                        <Form {...formProps} layout="vertical" onFinish={handleFormFinish}>
                            <Row gutter={24}>
                                <Col span={24}>
                                    <Form.Item
                                        name="pictures"
                                        valuePropName="pictures"
                                        getValueProps={(data) => getValueProps(data, API_URL)}
                                        style={{ marginLeft: "400px" }}
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
                                    {/* <Form.Item
                name="pictures"
                // valuePropName="pictures"
                label="Username Name"
                // getValueProps={(data) => getValueProps(data, API_URL)}
                noStyle
              >
                <Upload.Dragger
                  name="files"
                  action={`${API_URL}/api/upload`}
                  headers={{
                    "Access-Control_Allow-Origin": "*",
                    Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
                  }}
                  accept="image/*"
                >
                  <p className="ant-upload-text">pictures</p>
                </Upload.Dragger>
              </Form.Item> */}
                                </Col>
                            </Row>
                            <br />

                            <Row gutter={24}>
                                <Col span={8}>
                                    <Form.Item
                                        label="Username Name"
                                        name="username"
                                        rules={[
                                            { required: true, message: "Please enter your Username" },
                                        ]}
                                    >
                                        <Input placeholder="Username" />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item
                                        label="email"
                                        name="email"
                                        rules={[{ required: true, message: "Please enter your email" }]}
                                    >
                                        <Input placeholder="Email" />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item
                                        label="password"
                                        name="password"
                                        rules={[
                                            { required: true, message: "Please enter your password" },
                                        ]}
                                    >
                                        <Input placeholder=" Password" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={8}>
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
                                <Col span={8}>
                                    <Form.Item label="Last Name" name="lastname">
                                        <Input placeholder="Last Name" />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Mobile No." name="mobile">
                                        <Input type="number" placeholder=" Mobile No." />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={8}>
                                    <Form.Item label="Father Name" name="father">
                                        <Input placeholder=" Father Name" />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Mother Name" name="mother">
                                        <Input placeholder=" Mother Name" />
                                    </Form.Item>
                                </Col>

                                <Col span={8}>
                                    <Form.Item label="Date of Birth" name="dob">
                                        <DatePicker
                                            style={{ width: "100%" }}
                                            placeholder="Select Date"
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={24}>
                                <Col span={8}>
                                    <Form.Item label="Category" name="cast">
                                        <Select placeholder="Select Category">
                                            <Option value="general">General</Option>
                                            <Option value="obc">OBC</Option>
                                            <Option value="sc/st">SC/ST</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Jati" name="jati">
                                        <Select placeholder="Select Jati">
                                            <Option value="SEERVI">SEERVI</Option>
                                            <Option value="JAAT">JAAT</Option>
                                            <Option value="SEN">SEN</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>

                                <Col span={8}>
                                    <Form.Item
                                        label="Marital status"
                                        name="marital"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please select your Marital staus",
                                            },
                                        ]}
                                    >
                                        <Select placeholder="Marital status">
                                            <Option value="married">Married</Option>
                                            <Option value="unmarried">Unmarried</Option>
                                            <Option value="divorced">Divorced</Option>
                                            <Option value="waitingdivorced">Waiting ForDivorced</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item
                                        label="Gender"
                                        name="sex"
                                        rules={[
                                            { required: true, message: "Please select your gender" },
                                        ]}
                                    >
                                        <Select placeholder="Select Gender">
                                            <Option value="male">Male</Option>
                                            <Option value="female">Female</Option>
                                            <Option value="other">Other</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
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
                                            <Option value="hambad/hammad/hamad">
                                                Hambad/Hammad/Hamad
                                            </Option>
                                            <Option value="muleva/molwa">Muleva/Molwa</Option>
                                            <Option value="bhayal">Bhayal</Option>
                                            <Option value="kag">kag</Option>
                                            <Option value="rathore/rathod">Rathore</Option>
                                            <Option value="devda">Devda</Option>
                                            <Option value="parwar">Parwar</Option>
                                            <Option value="pawar">Pawar</Option>
                                            <Option value="solanki">Solanki</Option>
                                            <Option value="padiyar">Padiyar</Option>
                                            <Option value="sanupura/satpura/sanpada">
                                                Sanupura/Satpura/Sanpada
                                            </Option>
                                            <Option value="septa">Septa</Option>
                                            <Option value="sencha">Sencha</Option>
                                            <Option value="choyal">Choyal</Option>
                                            <Option value="aaglecha">Aaglecha</Option>
                                            <Option value="barfa/varfa">Barfa/Varfa</Option>
                                            <Option value="parihar">Parihar</Option>
                                            <Option value="gehlot">Gehlot</Option>
                                            <Option value="sindarha">Sindarha</Option>
                                            <Option value="lachheta">Lachheta</Option>
                                            <Option value="mogrecha/moglecha">Mogrecha/Moglecha</Option>
                                            <Option value="parmar">Parmar</Option>
                                            <Option value="chaanwdia">Chaanwdia</Option>
                                            <Option value="khandala">Khandala</Option>
                                            <Option value="chouhan">Chouhan</Option>
                                            <Option value="parihariya">Parihariya</Option>
                                            <Option value="bhumblia">Bhumblia</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="DivyangDescription" name="divyangdescription">
                                        <TextArea
                                            rows={4}
                                            placeholder="Divyang Description"
                                            maxLength={6}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Create>
                </div>


            </Modal>
        </>
    );
}

export default CreateUserDialog;