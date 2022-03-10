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


function Submitedcourse() {
    const [courses, setCourses] = useState([]);
    const param = useParams();
    function cancel(e) {
        console.log(e);
        message.error('放弃删除');
    }
    useEffect(async () => {
        await init();
    }, [courses])
    const site1 = "/submited_course/" + param.id;
    const site2 = "/new_course/" + param.id;
    const site3 = "/audit_course/" + param.id;
    let navigate = useNavigate();
    async function delete1(course_id) {
        const res = await axios.post('http://127.0.0.1:8082/api/delete_course',{"id":course_id})      
        message.info('删除成功')
        navigate(site1)
    }
    const init = async () => {
        const res = await axios.post('http://127.0.0.1:8082/api/submited_course',{"id":param.id});      
        setCourses(res.data.data)
    }
    const columns = [
        {
            title: '课题名称',
            dataIndex: 'course_name',
            key: 'course_name',
            render: text => <a>{text}</a>,
        },
        {
            title: '课题编号',
            dataIndex: 'id',
            key: 'id',
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
            title: '选择方式',
            dataIndex: 'choose_way',
            key: 'choose_way',
        },
        {
            title: '审核意见',
            dataIndex: 'advice',
            key: 'advice',
        },
        {
            title: '状态',
            dataIndex: 'state',
            key: 'state',
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Popconfirm
                        title="Are you sure to delete this task?"
                        onConfirm={() => delete1(record.id)}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                    <Button><a>删除</a></Button>
                    </Popconfirm>
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
        

export default Submitedcourse









