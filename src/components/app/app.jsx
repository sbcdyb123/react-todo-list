import React from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import { Layout, Breadcrumb } from 'antd';

import './app.css'

import Sidebar from '../Sidebar/Sidebar'
import removeList from '../../containers/removeList'
import todoList from '../../containers/todoList'
import completeList from '../../views/completeList/completeList'

const { Header, Content, Footer } = Layout;

export default class App extends React.Component{
  render(){
    return (
      <div className="flex">
        <Layout>
          <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <Sidebar></Sidebar>
          </Header>
          <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 720 }}>
              <Switch>
                <Route path='/todo' component={todoList} />
                <Route path='/remove' component={removeList} />>
                <Route path='/complete' component={completeList} />>
                <Redirect to="/todo"></Redirect>
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </div>
    )
  }
}