import { INCREMENT,DECREMENT } from './action_types'
//同步增加的action
export const increment=(number)=>({type:INCREMENT,number})
export const decrement=(number)=>({type:DECREMENT,number})
//异步增加的action
export const incrementAsync=number=>dispatch=>{
    setTimeout(()=>{
        //1秒之后分发一个同步执行的action
        dispatch(increment(number))
    },1000)
}