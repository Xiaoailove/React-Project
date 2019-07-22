import React from "react"
import ReactDom from "react-dom"
import App from "./App"
import store from './redux/store'
import {Provider} from 'react-redux'
//import './api'
ReactDom.render(
    //Provider这个组件会将store传递给所有的容器组件，
    //而现在经过更改之后的容器组件变成了App也就是说App变成了counter这个组件的父组件
    (<Provider store={store}>
        <App/>
    </Provider>
    ),document.getElementById('root'))