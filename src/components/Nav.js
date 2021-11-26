import React, { Component } from 'react'
import { BrowserRouter,NavLink,Link,Route,Switch } from 'react-router-dom';
import { Menu, Button } from 'antd';
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';

import Option2 from './Option2'
import Option3 from './Option3'

const { SubMenu } = Menu;

export default class Nav extends Component {
  state = {
    collapsed: false,
  };

  // toggleCollapsed = () => {
  //   this.setState({
  //     collapsed: !this.state.collapsed,
  //   });
  // };

  render() {
    return (
      <div style={{ width: 200 }}>
        <Button type="primary" onClick={()=>this.props.toggleCollapsed()} style={{ marginBottom: 16 }}>
          {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
        </Button>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={[]}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
        >
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <NavLink to='/option1'>Option 1</NavLink>
          </Menu.Item>
          
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            <NavLink to='/option2'>Option 2</NavLink>
          </Menu.Item>
          <Menu.Item key="3" icon={<ContainerOutlined />}>
            <NavLink to='/option3'>Option 3</NavLink>
          </Menu.Item>
          <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
            </SubMenu>
          </SubMenu>
        </Menu>
          <Route path="/option2" component={Option2}></Route>
          <Route path="/option3" component={Option3}></Route>
      </div>
    );
  }
}