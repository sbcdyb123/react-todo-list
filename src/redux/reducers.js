import {combineReducers} from 'redux'
import {ADD_TODO_LIST,REMOVE_TODO_LIST,ADD_REMOVE_LIST} from './action-types'

function todoList(state = [] ,action){
  switch (action.type){
    case ADD_TODO_LIST:
      let list = state
      list.push(action.item)
      return list
    case REMOVE_TODO_LIST:
      return state.filter((item,index)=>index!==action.item)
    default:
      return state
  }
}

function removeList(state = [] ,action){
  switch (action.type){
    case ADD_REMOVE_LIST:
      let list = state
      list.push(action.item)
      return list
    default:
      return state
  }
}

export default combineReducers({
  todoList,
  removeList
})