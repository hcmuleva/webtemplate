import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import First from './First';
import Second from './Second';
import Third from './Third';
import Fourth from './Fourth';
import Fifth from './Fifth';

const { Header, Sider, Content } = Layout;

class Structure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMenuItem: 'A',
    };
  }

  handleMenuItemClick = (menuItem) => {
    this.setState({ selectedMenuItem: menuItem });
  };

  renderContent = () => {
    switch (this.state.selectedMenuItem) {
      case 'A':
        return <div>
          <First />
        </div>;
        case 'B':
          return <div>
           <Second />
          </div>;
           case 'C':
            return <div>
             <Third />
            </div>;
            case 'D':
              return <div>
               <Fourth />
              </div>;
               case 'E':
                return <div>
                 <Fifth />
                </div>;
     
      default:
        return null;
    }
  };

  renderHeaderContent = () => {
    switch (this.state.selectedMenuItem) {
      case 'A':
        return 'Newsletter Sections';
      case 'B':
        return 'LifeTime Membership Section';
      case 'C':
        return 'Team List section Section';
      case 'D':
        return 'Sign in form Section';
      case 'E':
        return 'E Section Header Content';
      case 'F':
        return 'F Section Header Content';
      case 'G':
        return 'G Section Header Content';
      default:
        return '';
    }
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider width={120} theme="dark"> 
          <Menu mode="vertical" style={{ marginTop: "60px", backgroundColor: "black", color: "white" }} selectedKeys={[this.state.selectedMenuItem]}>
            <Menu.Item key="A" onClick={() => this.handleMenuItemClick('A')}>
              A
            </Menu.Item>
            <Menu.Item key="B" onClick={() => this.handleMenuItemClick('B')}>
              B
            </Menu.Item>
            <Menu.Item key="C" onClick={() => this.handleMenuItemClick('C')}>
              C
            </Menu.Item>
            <Menu.Item key="D" onClick={() => this.handleMenuItemClick('D')}>
              D
            </Menu.Item>
            <Menu.Item key="E" onClick={() => this.handleMenuItemClick('E')}>
              E
            </Menu.Item>
            <Menu.Item key="F" onClick={() => this.handleMenuItemClick('F')}>
              F
            </Menu.Item>
            <Menu.Item key="G" onClick={() => this.handleMenuItemClick('G')}>
              G
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#001529', color: 'white', }}>
            <h1 style={{ color: 'white', margin: "0px 0px 0px 0px" }}>{this.renderHeaderContent()}</h1>
            
          </Header>
          <Content style={{ padding: 24,backgroundColor:"white" }}>{this.renderContent()}</Content>
        </Layout>
      </Layout>
    );
  }
}

export default Structure;
