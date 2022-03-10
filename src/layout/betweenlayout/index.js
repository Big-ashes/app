import { Layout, Menu, Breadcrumb } from 'antd';
import { Outlet } from 'react-router';
import Background from './background.jpg';

function BetweenLayout() {
  const { Header, Content, Footer} = Layout;
  return <>
    <Layout style={{
      backgroundImage: `url(${Background})`,
      width: '100%',
      height: '100%',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundAttachment: 'fixed'
    }}>
      <Content className="site-layout" style={{ padding: '0 0px', marginTop: 200, minHeight: 300, textAlign: 'center' }}>
        <div className="site-layout-background" style={{ minHeight: 600, textAlign: 'center' }}>
          <Outlet />
        </div>
      </Content>
    </Layout>
  </>
}

export default BetweenLayout;