import { Table, Tag, Space, Button,message,Popconfirm } from 'antd';
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

const { SubMenu } = Menu;
const { Header, Content, Sider,Footer } = Layout;


function Auditcourse() {
    const [courses, setCourses] = useState([]);
    const param = useParams();
    const init = async () => {
        const res = await axios.post('http://127.0.0.1:8082/api/check_course',{"id":param.id});      
        setCourses(res.data.data)
    }
    useEffect(async () => {
        await init();
    }, [])
    
    function cancel(e) {
        console.log(e);
        message.error('放弃删除');
    }
    
    async function pass(id) {
        const res = await axios.post('http://127.0.0.1:8082/api/choose_state', { "id": id,"act": '通过' })       
        message.info('通过成功')
    }
    async function refuse(id) {
        const res = await axios.post('http://127.0.0.1:8082/api/choose_state', { "id": id,"act": '拒绝' })       
        message.info('拒绝成功')
    }
    const site1 = "/submited_course/" + param.id;
    const site2 = "/new_course/" + param.id;
    const site3 = "/audit_course/" + param.id;
    let navigate = useNavigate();
    
    const columns = [
        {
            title: '课题名字',
            dataIndex: 'course_name',
            key: 'course_name',
        },
        {
            title: '适合专业',
            dataIndex: 'fit_major',
            key: 'fit_major',
        },
        {
            title: '课题性质',
            dataIndex: 'course_quality',
            key: 'course_quality',
        },
        {
            title: '学生学号',
            dataIndex: 'user_id',
            key: 'user_id',
        },
        {
            title: '学生姓名',
            dataIndex: 'user_name',
            key: 'user_name',
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={() => pass(record.id)}><a>通过</a></Button>
                    <Button onClick={() => refuse(record.id)}><a>拒绝</a></Button>
                </Space>
            ),
        },

    ];

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
                <Table columns={columns} dataSource={courses} />
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>©2021 django mysql</Footer>
            </Layout>
        </Layout>
    </>
}
        

export default Auditcourse































