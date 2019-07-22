import { INCREMENT,DECREMENT } from './action_types'
export const increment=(number)=>({type:INCREMENT,number})
export const decrement=(number)=>({type:DECREMENT,number})