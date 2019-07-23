import {combineReducers} from 'redux'
import {SET_HEADER_TITLE,LOGIN_FAIL,LOGIN_SUCCESS, LOGOUT} from './action_types'
import storageUtils from '../until/storageUtils'

const initHeaderTitle='首页'
function headerTitle (state=initHeaderTitle,action){
    switch (action.type) {
        case SET_HEADER_TITLE:
            return action.data
        default:
            return state
    }
}
const initUser=storageUtils.getUser()
function user(state=initUser,action){
    switch (action.type) {
        case LOGIN_SUCCESS:
            return action.user
        case LOGIN_FAIL:
            return {...state,errorMsg:action.errorMsg}
        case LOGOUT:
            return {}
        default:
            return state
    }
}
 const reducer=combineReducers({
     headerTitle,
     user
 })
export default reducer
