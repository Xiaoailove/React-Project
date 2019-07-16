//操作local数据的函数工具模块
//import store from "store";
const USER_KEY = 'user_key'
export default {
    saveUser(user) {
        localStorage.setItem(USER_KEY,JSON.stringify(user))
    },
    getUser(user){
      return JSON.parse(localStorage.getItem(USER_KEY)||'{}')
    },
    removeUser(user){
        localStorage.removeItem(USER_KEY)
    }
}