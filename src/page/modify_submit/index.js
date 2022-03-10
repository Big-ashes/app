import { Table, Select, Tag, Space,Input, Form, Button,message,Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
  } from '@ant-design/icons';
import {
    Routes,
    Route,
    Link,
    Outlet,
    NavLink,
    useNavigate,
    useParams
  } from "react-router-dom";
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

const { SubMenu } = Menu;
const { Header, Content, Sider,Footer } = Layout;
const { Option } = Select;

function Modifysubmit() {
    const [form] = Form.useForm();
    const param = useParams();
    const site1 = "/audit_submit/";
    useEffect(async () => {
        await init();
    }, [])
    const site2 = "/audit_result/";
    const [info, setinfo] = useState([]);
    const init = async () => {
        const res = await axios.post('http://127.0.0.1:8082/api/course_info', { "id": param.id });
        setinfo(res.data.data)
        form.setFieldsValue(res.data.data);
    }

    let navigate = useNavigate();
    const onFinish = async (values) => {
        const res = await axios.post('http://127.0.0.1:8082/api/modify_course',{"id":param.id,"course_name":values.course_name,"course_quality":values.course_quality,"fit_major":values.fit_major,"choose_way":values.choose_way,"advice":values.advice,"state":values.state})      
        message.info('审核成功')
        navigate('/audit_submit/')
    }

    return <>
        <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible>
    <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['/manage']} selectedKeys={['']}  mode="inline">
                <Menu.Item key="/manage" icon={<DesktopOutlined />}>
                <Link to={site1}>审核选题</Link>
                </Menu.Item>
                <Menu.Item key="/newcompany" icon={<TeamOutlined />}>
                <Link to={site2}>审核选题情况</Link>
                </Menu.Item>
            </Menu>
            </Sider>
            <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                </Breadcrumb>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                <Form
                        {...formItemLayout}
                        form={form}
                        name="register"
                        onFinish={onFinish}
                        scrollToFirstError
                    >
                        <Form.Item
                            label="课题名称"
                            name="course_name"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入keti名称!',
                                },
                            ]}
                        >
                            <Input value={info.course_name} disabled />
                        </Form.Item>

                        <Form.Item
                            label="课题性质"
                            name="course_quality"
                            rules={[
                                {
                                    required: true,
                                    message: '请选择该课题性质!',
                                },
                            ]}
                        >
                            <Select placeholder="选择课题的性质" value={info.course_quality}> 
                                <Option value="设计">设计</Option>
                                <Option value="论文">论文</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="fit_major"
                            label="适合专业"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入适合专业',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input value={info.fit_major} />
                        </Form.Item>

                        <Form.Item
                            label="选择方式"
                            name="choose_way"
                            rules={[
                                {
                                    required: true,
                                    message: '请选择该课题选择方式',
                                },
                            ]}
                        >
                            <Select placeholder="选择课题的选择方式" value={info.choose_way}> 
                                <Option value="盲选">盲选</Option>
                                <Option value="抢选">抢选</Option>
                            </Select>
                        </Form.Item>
                        
                        <Form.Item
                            name="advice"
                            label="建议"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入意见',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input value={info.advice} />
                        </Form.Item>
                        <Form.Item
                            name="state"
                            label="状态"
                            rules={[
                                {
                                    required: true,
                                    message: '请选择状态',
                                },
                            ]}
                        >
                            <Select placeholder="课题状态" value={info.choose_way}> 
                                <Option value="通过">通过</Option>
                                <Option value="拒绝">拒绝</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">
                                审核完成
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>©2021 django mysql</Footer>
            </Layout>
        </Layout>
    </>
}
        

export default Modifysubmit





