import { Input,InputNumber,Select,Form,Button,message,Layout, Menu, Breadcrumb } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from '../../axios';
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
const { Option } = Select;
const { SubMenu } = Menu;
const { Header, Content, Sider,Footer } = Layout;


function Newcourse() {
    const [courses, setCourses] = useState([]);
    const param = useParams();
    const [form] = Form.useForm();
    function cancel(e) {
        console.log(e);
        message.error('放弃删除');
    }
    const onFinish = async (values) => {
        console.log(values)
        const res1 = await axios.post('http://127.0.0.1:8082/api/new_course',{"id":param.id,"course_name":values.course_name,"course_quality":values.course_quality,"fit_major":values.fit_major,"choose_way":values.choose_way,"work_time":values.work_time,"course_introduce":values.course_introduce,"paper_requirement":values.paper_requirement})
        if (res1.data.result == 1) {
            navigate(`/teacher_index/${param.id}`)
            message.info('添加成功')
        }
        if (res1.data.result == 0) {
            message.info(res1.data.message)
        }
        console.log('Received values of form: ', values);
    };
    const site1 = "/submited_course/" + param.id;
    const site2 = "/new_course/" + param.id;
    const site3 = "/audit_course/" + param.id;
    let navigate = useNavigate();
    // const res = await axios.post('http://127.0.0.1:8082/api/submited_course',{"id":param.id})      

    return <>
        <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible>
    <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['/manage']} selectedKeys={['']}  mode="inline">
                <Menu.Item key="/manage" icon={<DesktopOutlined />}>
                <Link to={site1}>已申报选题</Link>
                </Menu.Item>
                <Menu.Item key="/newcompany" icon={<TeamOutlined />}>
                <Link to={site2}>申报选题</Link>
                </Menu.Item>
                <Menu.Item key="/manageradd" icon={<PieChartOutlined />}>
                <Link to={site3}>审核选题</Link>
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
                label="课程名字"
                name="course_name"
                rules={[
                    {
                        required: true,
                        message: '请输课题的名字!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="课程性质"
                name="course_quality"
                rules={[
                    {
                        required: true,
                        message: '请选择课题的性质!',
                    },
                ]}
            >
                <Select placeholder="选择课题的性质">
                    <Option value="设计">设计</Option>
                    <Option value="论文">论文</Option>
                </Select>
            </Form.Item>

            <Form.Item
                label="适合专业"
                name="fit_major"
                rules={[
                    {
                        required: true,
                        message: '请输课题的适合专业!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="choose_way"
                label="选择方式"
                rules={[
                    {
                        required: true,
                        message: '请输入课题的选择方式!',
                    },
                ]}
            >
                <Select placeholder="选择课题的选择方式">
                    <Option value="盲选">盲选</Option>
                    <Option value="抢选">抢选</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="work_time"
                label="完成天数"
                rules={[
                    {
                        required: true,
                        message: '请输入完成天数!',
                    },
                ]}
            >
                <InputNumber />
            </Form.Item>

            <Form.Item
                name="course_introduce"
                label="介绍"
                rules={[
                    {
                        required: true,
                        message: '请输入介绍信息!',
                    },
                ]}
            >
                <Input style={{ height: 120 }}/>
            </Form.Item>
            <Form.Item
                label="课题要求"
                name="paper_requirement"
                rules={[
                    {
                        required: true,
                        message: '请输课题的要求!',
                    },
                ]}
            >
                <Input style={{ height: 120 }}/>
            </Form.Item>
            <Form.Item align='center'>
                <center>
                <Button type="primary" htmlType="submit">
                    提交课题
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
        

export default Newcourse



















