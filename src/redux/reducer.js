import { INCREMENT,DECREMENT } from './action_types'

//真正管理状态数据的函数作用根据老的state和action产生新的state
function count(state=0,action){
    switch (action.type) {
        case INCREMENT:
           return state+action.number
        case DECREMENT:
            return state-action.number    
        default:
            return state
    }
}
export default count