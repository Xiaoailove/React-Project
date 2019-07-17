import jsonp from 'jsonp'
import ajax from './ajax';
import {message} from 'antd'
export function reqLogin(username,password){
    const BASE=''
   return ajax(
        {
            method: 'post',
            url: BASE+'/login',
            data: {
                username,
                password
            }
        }
    )
}
//发送jsonp请求得到天气信息
export const reqWeather=(city)=>{
    return new Promise((resolve,reject)=>{
        const url=`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        jsonp(url,{},(error,data)=>{
            if(!error&& data.error===0){
                const {dayPictureUrl, weather}=data.results[0].weather_data[0];
                resolve({dayPictureUrl, weather})
            }else{
                message.error('获取天气信息失败')
            }
        })

    })
}
