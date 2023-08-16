import React from 'react';
import { Col, Row, Form, Input, Select,Upload,Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { getValueProps, mediaUploadMapper } from "@refinedev/strapi-v4";
import { Radio } from 'antd';
import { useState } from 'react';
import { Checkbox } from 'antd';

const { Option } = Select;
const TextOptionArray = ({key,  name, restField }) => {
    return (
        <>
        <Row>
         <Col span={12}>
            <Form.Item
                {...restField}
                name={[name, 'isCorrect']}
                valuePropName="checked" // Set the valuePropName to "checked" for Checkbox
            >
                <Checkbox>IsCorrect?</Checkbox>
            </Form.Item></Col>
            <Col span={12}>
            <Form.Item
                {...restField}
                name={[name, 'optionval']}
                rules={[{ required: true, message: 'Missing Option' }]}
            >
                <Input placeholder="Enter Option" />
            </Form.Item>
            </Col>       
            </Row>             
        </>
    );
};

export default TextOptionArray;