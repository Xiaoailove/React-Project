import React, {Component} from 'react'
//import {Button, message} from 'antd'
import { Switch, Route,HashRouter} from 'react-router-dom'
//BrowserRouter,
import Admin from './pages/admin/admin'
import Login from './pages/login/login'
/*
应用根组件
 */
export default class App extends Component {

  render() {
    return (
      <HashRouter>
      <Switch>
      <Route path='/login' component={Login}/>
      <Route path='/' component={Admin}/>
      </Switch>
      </HashRouter>
    )
  }
}


