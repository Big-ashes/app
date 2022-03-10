import React, { useEffect, useState } from 'react';
import { Input,InputNumber,Select,Form,Button,message,Layout,Table, Menu, Breadcrumb } from 'antd';
import axios from '../../axios';
import { useNavigate,Link,useParams } from "react-router-dom"
import { renderMatches } from 'react-router';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
  } from '@ant-design/icons';

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

const { SubMenu } = Menu;
const { Header, Content, Sider,Footer } = Layout;


function Searchstudent() {
    const [courses, setCourses] = useState([]);
    const param = useParams();
    const [form] = Form.useForm();
    const site1 = "/course_list/" + param.id;
    const site2 = "/choose_result/" + param.id;
    const site3 = "/searchstudent/" + param.id;
    let navigate = useNavigate();
    const onFinish = async (values) => {
        console.log(values)
        const res1 = await axios.post('http://127.0.0.1:8082/api/search',{"course_name":values.course_name})
        setCourses(res1.data.data)
        if (res1.data.result == 0) {
            message.info(res1.data.message)
        }
    };
    const columns = [
        {
            title: '课题名称',
            dataIndex: 'course_name',
            key: 'course_name',
            render: text => <a>{text}</a>,
        },
        {
            title: '课题性质',
            dataIndex: 'course_quality',
            key: 'course_quality',
        },
        {
            title: '适合专业',
            dataIndex: 'fit_major',
            key: 'fit_major',
        },
        {
            title: '状态',
            dataIndex: 'state',
            key: 'state',
        },
    ];

    return <>
        <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible>
    <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['/manage']} selectedKeys={['']}  mode="inline">
                <Menu.Item key="/manage" icon={<DesktopOutlined />}>
                <Link to={site1}>选题列表</Link>
                </Menu.Item>
                <Menu.Item key="/newcompany" icon={<TeamOutlined />}>
                <Link to={site2}>选题结果</Link>
                </Menu.Item>
                <Menu.Item key="/newcompany" icon={<TeamOutlined />}>
                <Link to={site3}>搜索课题</Link>
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
                                    message: '请输入课题名称!',
                                },
                            ]}
                        >
                            <Input  />
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">
                                搜索
                            </Button>
                        </Form.Item>
                    </Form>
                    <Table columns={columns} dataSource={courses} />
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>©2021 django mysql</Footer>
            </Layout>
        </Layout>
    </>
}
        
export default Searchstudent