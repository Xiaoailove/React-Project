import React from "react"
import ReactDom from "react-dom"
import App from "./App"
import store from './redux/store'
//import './api'
store.subscribe(()=>{
    ReactDom.render(<App store={store}/>,document.getElementById('root'))
})