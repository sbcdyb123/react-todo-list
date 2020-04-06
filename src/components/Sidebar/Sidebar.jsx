import React from 'react'
import { Menu } from 'antd';
import {
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
} from '@ant-design/icons';

import {NavLink} from 'react-router-dom'

import './sidebar.css'

export default class Sidebar extends React.Component {
  state = {
    collapsed: false,
  };


  render() {
    return (
      <div>
        <div className="logo" />
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="horizontal"
          theme="dark"
          className='sider'
        >
          <Menu.Item key="1">
            <NavLink to='/todo'>
              <PieChartOutlined />
              <span>代办任务</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="2">
            <NavLink to='/complete'>
              <DesktopOutlined />
              <span>已完成任务</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="3">
            <NavLink to='/remove'>
            <ContainerOutlined />
            <span>已删除任务</span>
            </NavLink>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}