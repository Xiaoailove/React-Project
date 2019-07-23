import {SET_HEADER_TITLE,LOGIN_SUCCESS,LOGIN_FAIL, LOGOUT} from './action_types'
import {reqLogin} from '../api'
import storageUtils from '../until/storageUtils'
export const setHeaderTitle=(headerTitle)=>({type:SET_HEADER_TITLE,data:headerTitle})
//用户登录的同步action
export const loginSuccess=(user)=>({type:LOGIN_SUCCESS,user})
//用户登录失败的信息
export const loginFail=(errorMsg)=>({type:LOGIN_FAIL,errorMsg})
//退出登录的同步action
export const logout=()=>{
    storageUtils.removeUser()
    return {type:LOGOUT}
}
//用户登录的异步请求
export function login (username,password){
    return async dispatch=>{
        const result=await reqLogin(username,password)
        if(result.status===0){
            const user=result.data
            storageUtils.saveUser(user)
            dispatch(loginSuccess(user))
        }else{
            const msg=result.msg
            dispatch(loginFail(msg))
        }
    }
}