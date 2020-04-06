/*
包含Counter组件的容器组件
 */
// import React from 'react'
// 引入连接函数
import {connect} from 'react-redux'
// 引入action函数
// import {} from '../redux/actions'
import removeList from '../views/removeList/removeList'

const mapStateToProps = state => ({removeList: state.removeList})

const mapDispatchToProps = {}
// 向外暴露连接App组件的包装组件

export default connect(mapStateToProps, mapDispatchToProps)(removeList)