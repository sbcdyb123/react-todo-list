import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { List, Divider,Button,Row,Col,Modal,Input } from 'antd';
import { PlusOutlined,DeleteOutlined } from '@ant-design/icons';
export default class removeList extends Component {
  static propTypes = {
    removeList:PropTypes.array.isRequired,
  }
  render() {
    // console.log(this.props.removeList);
    let {removeList} = this.props
    return (
      <div>
        <Divider orientation="left">代办任务列表</Divider>
        <List
          header={
            <Row>
              <Col span={2}>
                <Button type="primary" icon={<PlusOutlined />} >添加代办任务</Button>
              </Col>
            </Row>
          }
          footer={<div>Footer</div>} 
          bordered
          dataSource={removeList}
          renderItem={(item,index) => (
            <List.Item>
              <Button className="delete-icon" size='small' type="primary" shape="circle" icon={ <DeleteOutlined/> } danger></Button> {item}
            </List.Item>
          )}
        />
      </div>
    )
  }
}
