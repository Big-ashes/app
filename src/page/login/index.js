import { Form, Row, Col, Card, Input, Button, Checkbox, message, Select } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from '../../axios';
import { Link, useNavigate } from "react-router-dom"
import React, { useEffect, useState } from 'react';

const { Option } = Select;


function Loginlayout() {
    let navigate = useNavigate();
    const [userid, setUserid] = useState('0');
    const onFinish = async (values) => {
      const res = await axios.post('http://127.0.0.1:8082/api/user_login', { "username": values.username, "password": values.password })
      setUserid(String(res.data.id))
      if (res.data.result==1){
          console.log(1)
          navigate(`/teacher_index/${res.data.id}`)
      }
      if (res.data.result == 2) {
        navigate('/manager_index/');
     }
      if (res.data.result == 3) {
          navigate(`/student_index/${res.data.id}`);
       }
      else {
          message.info(res.data.message)
      }
    };
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
  return <>
    <Row>
      <Col span={8}></Col>
      <Col span={8}>
        <Card style={{ height: '100%',background:'rgba(255,255,255,0.6)',border:0}}>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="账号"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input style={{width:'100%'}}/>
            </Form.Item>
            <Form.Item
              label="密码"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  min: 8,
                  type: "string",
                  message: '最短为8',
                },
              ]}
            >
              <Input.Password style={{width:'100%'}}/>
            </Form.Item>
            <Form.Item
              align='center'
            >
              <Button type="primary" htmlType="submit">
                登陆
              </Button>
              
            </Form.Item>
          </Form>
          <Link to="/signup">
            注册
          </Link>
        </Card>
      </Col>
      <Col span={8}></Col>
    </Row>
  </>
};


export default Loginlayout;