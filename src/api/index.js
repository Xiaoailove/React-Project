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
//根据ID获取分类
export const reqCategory=(categoryId)=>ajax(BASE+'/manage/category/info',{
    params:{
        categoryId
    }
})
//获取商品管理的列表
export const reqProducts = (
    pageNum,
    pageSize
) => ajax(BASE + '/manage/product/list', {
    params: {
        pageNum,
        pageSize
    }
})
//根据Name/desc搜索产品分页列表
export const reqSearchProduct = ({
    pageNum,
    pageSize,
    searchName,
    searchType
}) => ajax(BASE + '/manage/product/search', {
    params: {
        pageNum,
        pageSize,
        [searchType]: searchName
    }
})
//对商品进行上下架处理
export const reqUpdateStatus=(productId,status)=>ajax(BASE+'/manage/product/updateStatus',{
    method:'POST',
    data:{
        productId,
        status
    }
})
//删除图片处理
export const reqDeleteImg=(name)=>ajax.post(BASE+'/manage/img/delete',{name})
//添加或者修改商品
export const reqAddUpdateProduct=(procudt)=>ajax.post(BASE+'/manage/product/'+(procudt._id?'update':'add'),procudt)
//获取所有角色的列表
export const reqRoles=()=>ajax(BASE+'/manage/role/list')
//添加角色
export const reqAddRole=(roleName)=>ajax.post(BASE+'/manage/role/add',{roleName})
//给角色添加权限的时候调用
export const reqUpdateRole=(role)=>ajax.post(BASE+'/manage/role/update', role)