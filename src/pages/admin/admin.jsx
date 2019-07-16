import React, { Component } from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import { Layout } from 'antd'
import memoryUtils from '../../until/memoryUtils'
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'
import Product from '../product/product';
import Home from '../home/home';
import Bar from '../charts/bar';
import Line from '../charts/line';
import Pie from '../charts/pie';
import Category from '../category/category'
import Role from '../role/role'
import User from '../user/user'
const { Footer, Sider, Content } = Layout
export default class Admin extends Component {

    render() {
        const user = memoryUtils.users
        if (!user._id) {
            return <Redirect to='/login' />
        }
        return (
            <Layout style={{ height: '100%' }}>
                <Sider >
                    <LeftNav />
                </Sider>
                <Layout>
                    <Header />
                    <Content style={{ margin: '20px', backgroundColor: 'white' }}>
                        <Switch>
                            <Route path="/home" component={Home} />
                            <Route path='/category' component={Category} />
                            <Route path='/product' component={Product} />
                            <Route path='/role' component={Role} />
                            <Route path='/user' component={User} />
                            <Route path='/charts/bar' component={Bar} />
                            <Route path='/charts/line' component={Line} />
                            <Route path='/charts/pie' component={Pie} />
                            <Redirect to="/home" />
                        </Switch>
                    </Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        )
    }
}
