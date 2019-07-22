import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd';
import logo from '../../assets/images/logo.png'
import './index.less'
import menuList from '../../config/menuConfig';
import {connect} from 'react-redux'
import {setHeaderTitle} from '../../redux/actions'
const { SubMenu } = Menu
//LeftNav
class LeftNav extends Component {
    getMenuNodes = (menuList) => {
        const path = this.props.location.pathname
        return menuList.map((item) => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key} onClick={() => this.props.setHeaderTitle(item.title)}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
                const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
                if (cItem) {
                    this.openKey = item.key
                }
                // if(item.children.find((cItem)=>path.indexOf(cItem.key)===0)){
                //     this.openKey=item.key
                // }
                return (
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                )
            }
        })
    }
    componentWillMount(){
        this.menuNodes=this.getMenuNodes(menuList)
    }
    render() {
        let selectKey = this.props.location.pathname
        if (selectKey.indexOf('/product') === 0) {
            selectKey = '/product'
        }
        return (
            <div className='left-nav'>
                <Link to='/home' className='left-nav-link'>
                    <img src={logo} alt="logo" />
                    <h1>硅谷后台</h1>
                </Link>
                <Menu
                    selectedKeys={[selectKey]}
                    defaultOpenKeys={[this.openKey]}
                    mode="inline"
                    theme="dark"
                >
                    {this.menuNodes}
                </Menu>
                {/* <Menu
                selectedKeys={[selectKey]}
                defaultOpenKeys={[this.openKey]}
                mode="inline"
                theme="dark">
                {this.getMenuNodes(menuList)}
                </Menu> */}
            </div>
        )
    }
}
export default connect(
    state=>{},
    {setHeaderTitle}
)(withRouter(LeftNav))