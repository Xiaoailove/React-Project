import storageUtils from './storageUtils' ;
export default {
    users:storageUtils.getUser()//用来存储登录用户的信息，初始值为local中读取的user
}