import React, { useEffect, useState } from 'react';
import {
    Form,
    Input,
    InputNumber,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    Card,
    AutoComplete,
    message,
} from 'antd';
import axios from '../../axios';
import { useNavigate } from "react-router-dom"
import { renderMatches } from 'react-router';


const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};


function Signup() {
    const [companies, setCompanies] = useState([]);
    let navigate = useNavigate();
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        console.log(values)
        const res1 = await axios.post('http://127.0.0.1:8082/api/signup', { "state": values.state ,"name": values.name ,"username": values.username, "password": values.password})
        if (res1.data.result == 1) {
            navigate("/login")
            message.info('注册成功')
        }
        if (res1.data.result == 0) {
            message.info(res1.data.message)
        }
    };


    return <>
    <Row >
      <Col span={8}></Col>
      <Col span={8}>
        <Card style={{ height: '100%',background:'rgba(255,255,255,0.6)',border:0}}>

        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
        >

            <Form.Item
                name="state"
                label="身份"
                rules={[
                    {
                        required: true,
                        message: '请选择你的身份!',
                    },
                ]}
            >
                <Select placeholder="选择你的身份">
                        <Option value='学生'>学生</Option>
                        <Option value='管理员'>管理员</Option>
                        <Option value='教师'>教师</Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="名字"
                name="name"
                rules={[
                    {
                        required: true,
                        message: '请输入您的姓名!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="账号"
                name="username"
                rules={[
                    {
                        required: true,
                        message: '请输入您的账号!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="密码"
                rules={[
                    {
                        required: true,
                        message: '请输入您的密码!',
                    },
                    {
                        min: 8,
                        type: "string",
                        message: '最短为8',
                    },
                    {
                        max: 16,
                        type: "string",
                        message: '最短为8',
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>


            <Form.Item align='center'>
                <Button type="primary" htmlType="submit">
                    注册
                </Button>
            </Form.Item>
        </Form>
        </Card>
      </Col>
      <Col span={8}></Col>
    </Row>
    </>
};



export default Signup;
