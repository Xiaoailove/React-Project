import axios from 'axios'
import qs from 'qs'
import {message} from 'antd'
//添加请求拦截器，让POST请求的格式为urlencoded格式,在真正发请求前执行，
//因为axios发送ajax请求采用data传参的方式默认请求的参数格式为json字符串格式
axios.interceptors.request.use(function(config){
//得到请求方式和请求体数据
    const {method,data}=config;
    if(method.toLowerCase()==='post' && typeof data==='object'){
            config.data=qs.stringify(data)
            //console.log(config.data);
    }
    
    return config;
})
  axios.interceptors.response.use(function(response){
    return response.data
    
  },function(error){
    message.error('请求出错'+error.message)
    return new Promise(()=>{});
  })

export default axios;