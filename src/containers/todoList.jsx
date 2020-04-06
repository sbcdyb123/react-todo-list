/*
包含Counter组件的容器组件
 */
// import React from 'react'
// 引入连接函数
import {connect} from 'react-redux'
// 引入action函数
import {addTodoList, removeTodoList,addRemoveList} from '../redux/actions'
import todoList from '../views/todoList/todoList'

const mapStateToProps = state => ({todoList: state.todoList})

const mapDispatchToProps = {addTodoList,removeTodoList,addRemoveList}
// 向外暴露连接App组件的包装组件

export default connect(mapStateToProps, mapDispatchToProps)(todoList)