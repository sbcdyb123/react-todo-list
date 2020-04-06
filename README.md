This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

# React笔记

## 事件处理

 你必须谨慎对待 JSX 回调函数中的 `this`，在 JavaScript 中，class 的方法默认不会[绑定](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind) `this`。如果你忘记绑定 `this.handleClick` 并把它传入了 `onClick`，当你调用这个函数的时候 `this` 的值为 `undefined`。 

官方给出了三种解决方案：

1.  使用 class fields.
2.  在回调中使用[箭头函数](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions) 
3.  在构造函数中使用`bind`绑定`this`

案例一==>class fields：

```react
class LoggingButton extends React.Component {
  // 此语法确保 `handleClick` 内的 `this` 已被绑定。
  // 注意: 这是 *实验性* 语法。
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```

案例二==>回调中使用[箭头函数](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions) ：

```react
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // 此语法确保 `handleClick` 内的 `this` 已被绑定。
    return (
      <button onClick={() => this.handleClick()}>
        Click me
      </button>
    );
  }
}
```

但是这种方法存在某些问题：

> 此语法问题在于每次渲染 `LoggingButton` 时都会创建不同的回调函数。在大多数情况下，这没什么问题，但如果该回调函数作为 prop 传入子组件时，这些组件可能会进行额外的重新渲染。我们通常建议在构造器中绑定或使用 class fields 语法来避免这类性能问题。

案例三==>构造器中绑定 ：

```react
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // 为了在回调中使用 `this`，这个绑定是必不可少的
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```



规定一种写法：构造器中绑定。

### 向事件处理程序传递参数

在循环中，通常我们会为事件处理函数传递额外的参数。例如，若 `id` 是你要删除那一行的 ID，以下两种方式都可以向事件处理函数传递参数：

```react
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

上述两种方式是等价的，分别通过[箭头函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)和 [`Function.prototype.bind`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind) 来实现。

在这两种情况下，React 的事件对象 `e` 会被作为第二个参数传递。如果通过箭头函数的方式，事件对象必须显式的进行传递，而通过 `bind` 的方式，事件对象以及更多的参数将会被隐式的进行传递。

# 列表&key

一个好的经验法则是：在 `map()` 方法中的元素需要设置 key 属性。

# refs&DOM

ref的三种方式：

```react
//官方文档版
class Reftest extends React.Component{
  constructor(props){
    super(props)
    this.handClick = this.handClick.bind(this)
    this.input = React.createRef()
  }
  handClick(){
    alert(this.input.current.value)
  }
  render(){
    return(
      <div>
        <input ref={this.input}/>
        <button onClick={this.handClick}>点我</button>
      </div>
    )
  }
}

ReactDOM.render(<Reftest/> , document.getElementById('root'))
```

```react
//网课版
class Reftest extends React.Component{
  constructor(props){
    super(props)
    this.handClick = this.handClick.bind(this)
  }
  handClick(){
    alert(this.input.value)
  }
  render(){
    return(
      <div>
        <input ref={input=>this.input = input}/>
        <button onClick={this.handClick}>点我</button>
      </div>
    )
  }
}


ReactDOM.render(<Reftest/> , document.getElementById('root'))
```

```react
//老版本
class Reftest extends React.Component{
  constructor(props){
    super(props)
    this.handClick = this.handClick.bind(this)
    this.input = React.createRef()
  }
  handClick(){
    alert(this.refs.input.value)
  }
  render(){
    return(
      <div>
        <input ref='input'/>
        <button onClick={this.handClick}>点我</button>
      </div>
    )
  }
}


ReactDOM.render(<Reftest/> , document.getElementById('root'))
```

# React-router 基本使用

### 安装

```shell
 npm install react-router-dom --save
```

### 组件

-  <BrowserRouter> 
-  <HashRouter> 
-  <Route> 
-  <Redirect> 
-  <Link> 
-  <NavLink> 
-  <Switch>

```react
import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, HashRouter} from 'react-router-dom'
import App from './components/app'

import './index.css'

ReactDOM.render(
  (
    <BrowserRouter>
      <App/>
    </BrowserRouter>
    /*<HashRouter>
      <App />
    </HashRouter>*/
  ),

  document.getElementById('root')
)
```

```react
import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import MyNavLink from './my-nav-link'
import About from '../views/about'
import Home from '../views/home'

export default class App extends React.Component {

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-offset-2 col-xs-8">
            <div className="page-header">
              <h2>React Router Demo</h2>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-2 col-xs-offset-2">
            <div className="list-group">
              {/*导航路由链接*/}
              <MyNavLink className="list-group-item" to='/about'>About</MyNavLink>
              <MyNavLink className="list-group-item" to='/home'>Home</MyNavLink>
            </div>
          </div>
          <div className="col-xs-6">
            <div className="panel">
              <div className="panel-body">
                {/*可切换的路由组件*/}
                <Switch>
                  <Route path='/about' component={About}/>
                  <Route path='/home' component={Home}/>
                  <Redirect to='/about'/>
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

```

# React-redux 基本使用

## 安装

### 1.安装redux和react-redux

```shell
npm install react-redux redux --save 
```

### 2.使用`chrome`调试工具

chrome应用商店搜索redux 安装插件

```
npm install redux-devtools-extension -S -D 
```



### 3.项目中使用redux先创建目录文件夹.



![1586170885871]( https://s1.ax1x.com/2020/04/06/GybZUU.png )



### 4.文件内容

#### store.js

```js
// import React from 'react'
import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import reducers from './reducers'

// 根据counter函数创建store对象
export default createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk)) // 应用上异步中间件
)
```

在该文件中引入`redux-thunk` ：

默认的`redux`是无法进行异步操作的，只能进行同步操作。

`redux-thunk`是一个可以让`redux`可以进行异步编程的`redux`插件



**createStore()**：作用是创建包含指定 `reducer` 的 `store` 对象

**applyMiddleware()**：作用应用上基于 redux 的中间件(插件库)



#### reducers.JS

```js
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
```

**combineReducers()**：作用是合并多个 `reducer` 函数 

#### actions.js

```javascript
import {ADD_TODO_LIST,REMOVE_TODO_LIST,ADD_REMOVE_LIST} from './action-types'

export const addTodoList = item => ({type:ADD_TODO_LIST,item})
export const removeTodoList = item => ({type:REMOVE_TODO_LIST,item})

export const addRemoveList = item => ({type:ADD_REMOVE_LIST,item})
```

异步的操作：(前提是在storejs中配置了`redux-thunk`)

```javascript
// 异步action creator(返回一个函数)
export const addTodoListAsync = item => {
  return dispatch => {
    setTimeout(() => {
      dispatch(addTodoList(item))
    }, 1000)
  }
}
```



#### action-types.js

```javascript
export const ADD_TODO_LIST = 'ADD_TODO_LIST'
export const REMOVE_TODO_LIST = 'REMOVE_TODO_LIST'
export const ADD_REMOVE_LIST = 'ADD_REMOVE_LIST'
```

#### index.js

```react
import React from 'react'
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux';

import App from './components/app/app'

import store from './redux/store';

ReactDOM.render((
  <BrowserRouter>
    <Provider store={store}>
      <App/>
    </Provider>
  </BrowserRouter>
),document.getElementById('root'))
```

到此为止，在react中使用redux的配置就算好了。

### 5.react-redux的介绍

`react-redux`是一个react 插件库，专门用来简化 react 应用中使用 redux 。

**React-Redux** **将所有组件分成两大类** 

**UI组件**

1. 专门负责 UI 的呈现，不带有任何业务逻辑。
2. 通过props接受redux里的属性和方法。
3. 且不使用任何 Redux 的 API。
4. 一般保存在 components 文件夹下 



**容器组件**

1. 负责管理数据和业务逻辑，不负责 UI 的呈现
2. 使用 Redux 的 API
3. 一般保存在 containers 文件夹下

相关API

`Provider`：让所有组件都可以得到 state 数据 

`connect`：用于包装 UI 组件生成容器组件

`mapStateToprops：将外部的数据（即 state 对象）转换为 UI 组件的标签属性`

`mapDispatchToProps`：将分发 action 的函数转换为 UI 组件的标签属性 简洁语法可以直接指定为 actions 对象或包含多个 action 方法的对象

![1586175105625](https://s1.ax1x.com/2020/04/06/GybGVK.png)

通过容器组件将UI组件包装在内，这样UI组件就可以通过props接收redux的属性和方法。



在引入组件的时候，需要引入容器组件。![1586175203082](https://s1.ax1x.com/2020/04/06/GybY5D.png)



UI组件引入props就行了

![1586175247117](https://s1.ax1x.com/2020/04/06/GybNPe.png)



