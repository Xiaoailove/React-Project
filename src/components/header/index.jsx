import React, { Component } from 'react'
import {Modal} from 'antd'
import './index.less'
export default class Header extends Component {
    logout=()=>{
        Modal.confirm()
    }
    render() {
        return (
            <div className='header'>
                <div className='header-top'>
                hello! admin &nbsp; &nbsp;
                <a href="#1" onClick={this.logout}>退出</a>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>用户</div>
                    <div className='header-bottom-right'>
                        <span>2019-07-16 18：17</span>
                        <img src="" alt=""/>
                        <span>晴</span>
                    </div>
                </div>
            </div>
        )
    }
}
