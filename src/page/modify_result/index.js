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

function Modifyresult() {
    const [form] = Form.useForm();
    const param = useParams();
    const site1 = "/audit_submit/";
    const site2 = "/audit_result/";

    let navigate = useNavigate();
    const onFinish = async (values) => {
        const res = await axios.post('http://127.0.0.1:8082/api/modify_result',{"id":param.id,"state":values.state})      
        message.info('修改成功')
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
                            label="状态"
                            name="state"
                            rules={[
                                {
                                    required: true,
                                    message: '请选择选择状态',
                                },
                            ]}
                        >
                            <Select placeholder="选择状态"> 
                                <Option value="通过">"通过"</Option>
                                <Option value="拒绝">"拒绝"</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}>
                            <center>
                            <Button type="primary" htmlType="submit">
                                确定
                            </Button>
                            </center>
                        </Form.Item>
                    </Form>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>©2021 django mysql</Footer>
            </Layout>
        </Layout>
    </>
}
        

export default Modifyresult