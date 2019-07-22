import {SET_HEADER_TITLE} from './action_types'
const initHeaderTitle='首页'
function headerTitle (state=initHeaderTitle,action){
    switch (action.type) {
        case SET_HEADER_TITLE:
            return action.data
        default:
            return state
    }
}
export default headerTitle