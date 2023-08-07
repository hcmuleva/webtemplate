import React from 'react'
import { Form, Input, Select, DatePicker, Button } from 'antd';
 import { Row, Col } from 'antd';

const { Option } = Select;
 function Personal ({onFinish}) {
    // const onFinish = (values) => {
    //     console.log('Form values:', values);
    //   };
  return (
    
    <div style={{    margin: '70px'}}>
     <Row>
          <Col span={8}>
    <Form.Item label="Username Name" name="username" 
    rules={[{ required: true, message: 'Please enter your Username' }]}>
      <Input placeholder="Username" />
    </Form.Item>
    </Col>
    <Col span={8}>
    <Form.Item label="email" name="email" 
    rules={[{ required: true, message: 'Please enter your email' }]}>
      <Input placeholder="Email" />
    </Form.Item>
</Col>
    <Col span={8}>
    <Form.Item label="password" name="password" 
    rules={[{ required: true, message: 'Please enter your password' }]}>
      <Input placeholder=" Password" />
    </Form.Item>
    </Col>
    </Row>

   
    <Row>
          <Col span={8}>
    <Form.Item label="First Name" name="firstName" 
    rules={[{ required: true, message: 'Please enter your first name' }]}>
      <Input placeholder="First Name" />
    </Form.Item>
    </Col>
    <Col span={8}>
    <Form.Item label="Last Name" name="lastName" 
    rules={[{ required: true, message: 'Please enter your last name' }]}>
      <Input placeholder="Last Name" />
    </Form.Item>
</Col>
    <Col span={8}>
    <Form.Item label="Father Name" name="fatherName" 
    rules={[{ required: true, message: 'Please enter your Father name' }]}>
      <Input placeholder=" Father Name" />
    </Form.Item>
    </Col>
    </Row>

   

    <Row>

    <Col span={8}>
    <Form.Item label="Mother Name" name="motherName" 
    rules={[{ required: true, message: 'Please enter your Mother name' }]}>
      <Input placeholder=" Mother Name" />
    </Form.Item>
    </Col>
    <Col span={8}>
    <Form.Item label="Gender" name="gender" rules={[{ required: true, message: 'Please select your gender' }]}>
      <Select placeholder="Select Gender">
        <Option value="male">Male</Option>
        <Option value="female">Female</Option>
        <Option value="other">Other</Option>
      </Select>
    </Form.Item>
    </Col>
  
    <Col span={8}>
    <Form.Item label="Date of Birth" name="dob" rules={[{ required: true, message: 'Please select your date of birth' }]}>
      <DatePicker style={{ width: '100%' }} placeholder="Select Date" />
    </Form.Item>
    </Col>
    </Row>


    <Row>

    <Col span={8}>
    <Form.Item label="Caste" name="caste" rules={[{ required: true, message: 'Please select your gender' }]}>
      <Select placeholder="Select Caste">
        <Option value="general">General</Option>
        <Option value="obc">OBC</Option>
        <Option value="sc/st">SC/ST</Option>
      </Select>
    </Form.Item>
    </Col>

    
   
    <Col span={8}>
    <Form.Item label="Martial status" name="martial" 
    rules={[{ required: true, message: 'Please select your Martial staus' }]}
    >
      <Select placeholder="martial status">
        <Option value="married">Married</Option>
        <Option value="unmarried">Unmarried</Option>
        <Option value="divorced">Divorced</Option>
        
      </Select>
    </Form.Item>
    </Col>
{/* 
    <Col span={8}>
    <Form.Item label="Your work" name="yourwork" rules={[{ required: true, message: 'Please select your work' }]}>
      <Select placeholder="Select Caste">
        <Option value="">student</Option>
        <Option value="">private job</Option>
        <Option value="">business</Option>
      </Select>
    </Form.Item>
    </Col>
  
    </Row>
    
    <Row>
          <Col span={8}>
    <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter your valid Email Address' }]}>
      <Input placeholder="@example.com" />
    </Form.Item>
    </Col>


    <Col span={8}>
    <Form.Item label="Contact" name="lastName" rules={[{ required: true, message: 'Please enter your Contact Number' }]}>
      <Input placeholder="Contact Number" type='Number' />
    </Form.Item>
    </Col>




    <Col span={8}>
<Form.Item label="State" name="state" rules={[{ required: true, message: 'Please select your State' }]}>
      <Select placeholder="Select State">
        <Option value="">Madhya pradesh</Option>
        <Option value="">Karnatak</Option>
        <Option value="">Punjab</Option>
        <Option value="">Haryana</Option>
        <Option value="">Jammu Kashmir</Option>
        <Option value="">kerala</Option>
        <Option value="">Bihar</Option>
        <Option value="">Uttar Pradesh</Option>
        <Option value="">Telangana</Option>
        
      </Select>
    </Form.Item>
    </Col>
    </Row>

    <Row>
  

    <Col span={8}>
    <Form.Item label="Pincode" name="pincode" rules={[{ required: true, message: 'Please enter your Pincode Number' }]}>
      <Input placeholder="Pincode" />
    </Form.Item>
    </Col>
    
    <Col span={8}>
    <Form.Item label="District" name="district" rules={[{ required: true, message: 'Please enter your district Name' }]}>
      <Input placeholder="District" />
    </Form.Item>
    </Col>



    <Col span={8}>
    <Form.Item label="City" name="district" rules={[{ required: true, message: 'Please enter your City Name' }]}>
      <Input placeholder="City" />
    </Form.Item>
    </Col> */}
    </Row>
    {/* <Form.Item>
      <Button type="primary" htmlType="submit">Submit</Button>
    </Form.Item> */}
  
  </div>
  )
}


export default  Personal;