import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { List, Divider,Button,Row,Col,Modal,Input } from 'antd';
import { PlusOutlined,DeleteOutlined } from '@ant-design/icons';

import './todolist.css'

export default class todoList extends Component {
  static propTypes={
    todoList:PropTypes.array.isRequired,
    addTodoList:PropTypes.func.isRequired,
    removeTodoList:PropTypes.func.isRequired,
    addRemoveList:PropTypes.func.isRequired,
  }
  state = { visible: false, inputValue:''};
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    const {inputValue} = this.state
    // debugger
    this.props.addTodoList(inputValue)
    this.setState({
      visible: false,
      inputValue:''
    });
  };

  handleCancel = e => {
    // console.log(e);
    this.setState({
      visible: false,
    });
  };
  handleChange = (event) => {
    let value = event.target.value
    this.setState({
      inputValue: value,
    });
  }
  handleClick = (index) =>{
    let {todoList} = this.props
    this.props.removeTodoList(index)
    this.props.addRemoveList(todoList)
    // this.setState({
    //   inputValue:''
    // });
  }
  render() {
    const {todoList} = this.props
    return (
      <div>
        <Divider orientation="left">代办任务列表</Divider>
        <List
          header={
            <Row>
              <Col span={2}>
                <Button type="primary" icon={<PlusOutlined />} onClick={this.showModal}>添加代办任务</Button>
              </Col>
            </Row>
          } 
          footer={<div>Footer</div>} 
          bordered
          dataSource={todoList}
          renderItem={(item,index) => (
            <List.Item>
              <Button className="delete-icon" size='small' type="primary" shape="circle" icon={ <DeleteOutlined/> } danger onClick={e=>this.handleClick(index,e)}></Button> {item}
            </List.Item>
          )}
        />
        <Modal
          title="任务输入框"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Input placeholder="请输入任务详情" value={this.state.inputValue} onChange={this.handleChange}/>
        </Modal>
      </div>
    )
  }
}
