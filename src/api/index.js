import jsonp from 'jsonp'
import ajax from './ajax';
import {
    message
} from 'antd'
const BASE = ''
export function reqLogin(username, password) {
    return ajax({
        method: 'post',
        url: BASE + '/login',
        data: {
            username,
            password
        }
    })
}
//发送jsonp请求得到天气信息
export const reqWeather = (city) => {
    return new Promise((resolve, reject) => {
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        jsonp(url, {}, (error, data) => {
            if (!error && data.error === 0) {
                const {
                    dayPictureUrl,
                    weather
                } = data.results[0].weather_data[0];
                resolve({
                    dayPictureUrl,
                    weather
                })
            } else {
                message.error('获取天气信息失败')
            }
        })

    })
}
//获取分类列表的请求
export const reqCategorys = () => ajax(BASE + '/manage/category/list')
//获取添加分类的请求
export const reqAddCategory = (categoryName) => ajax.post(BASE + '/manage/category/add', {
    categoryName
})
//获取修改分类的请求
export const reqUpdateCategory = ({
    categoryId,
    categoryName
}) => ajax.post(BASE + '/manage/category/update', {
    categoryId,
    categoryName
})
//获取商品管理的列表
export const reqProducts = ({
    pageNum,
    pageSize
}) => ajax(BASE + 'manage/product/list', {
    params: {
        pageNum,
        pageSize
    }
})