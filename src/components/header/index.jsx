import React, { Component } from 'react'
import './index.less'
export default class Header extends Component {
    render() {
        return (
            <div className='header'>
                <div className='header-top'>
                hello! admin
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
