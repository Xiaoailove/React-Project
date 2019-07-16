import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import memoryUtils from '../../until/memoryUtils'
export default class Admin extends Component {
   
    render() {
        const user=memoryUtils.users
        if(!user._id){
            return <Redirect to='/login'/>
        }
        return <div>admin组件{user.username}</div>
    }
}
