import React, {Component} from 'react'
//import {Button, message} from 'antd'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Admin from './pages/admin/admin'
import Login from './pages/login/login'
/*
应用根组件
 */
export default class App extends Component {

  render() {
    return (
      <BrowserRouter>
      <Switch>
      <Route path='/login' component={Login}/>
      <Route path='/admin' component={Admin}/>
      </Switch>
      </BrowserRouter>
    )
  }
}


