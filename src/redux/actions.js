import {ADD_TODO_LIST,REMOVE_TODO_LIST,ADD_REMOVE_LIST} from './action-types'

export const addTodoList = item => ({type:ADD_TODO_LIST,item})
export const removeTodoList = item => ({type:REMOVE_TODO_LIST,item})


export const addRemoveList = item => ({type:ADD_REMOVE_LIST,item})