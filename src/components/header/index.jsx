import React, { Component } from 'react'
import {Modal} from 'antd'
import {withRouter} from 'react-router-dom'
import './index.less'
//import  storageUtils from '../../until/storageUtils'
//import   memoryUtils from '../../until/memoryUtils'
import menuList from '../../config/menuConfig'
import {formateDate} from '../../until/dateUtils'
import {reqWeather} from '../../api'
import LinkButton from '../../components/link-button'
import {connect} from 'react-redux'
import {logout} from '../../redux/actions'
 class Header extends Component {
     state={
         currentTime:formateDate(Date.now()),
         dayPictureUrl:'',
         weather:''
     }
    logout=()=>{
        Modal.confirm({
            title:'确认退出吗？',
            onOk:()=>{
                //确定删除之后删除存储的信息以及本地内存中的用户信息
                // storageUtils.removeUser()
                // memoryUtils.users={}
                // this.props.history.replace('/login')
                this.props.logout()
            },
            onCancel(){
                console.log('取消')
            }
        })
    }
    //根据请求的路径得到相对应的title；
    getTitle=()=>{
      let  title=''
      //获取当前的请求路径
      const path=this.props.location.pathname
      menuList.forEach((item)=>{
        if(item.key===path){
            title=item.title
        }else if(item.children){
            const cItem=item.children.find(cItem=>path.indexOf(cItem.key)===0)
            if(cItem){
                title=cItem.title
            }
        }
      })
      return title;
    }
    //发送请求获取天气信息的显示
    getWeather=async()=>{
        const {dayPictureUrl, weather}=await reqWeather('北京')
        //获取到天气信息之后立马更新天气信息的状态
        this.setState({
            dayPictureUrl,
            weather
        })
    }
    componentDidMount(){
        setInterval(()=>{
            this.setState({
                currentTime:formateDate(Date.now())
            })
        },1000)
        this.getWeather();
    }
    render() {
        //const title=this.getTitle();
        const title=this.props.headerTitle
        const {currentTime,dayPictureUrl,weather}=this.state;
        const user=this.props.user
        return (
            <div className='header'>
                <div className='header-top'>
                hello! {user.username} &nbsp; &nbsp;
                <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>{title}</div>
                    <div className='header-bottom-right'>
                        <span>{currentTime}</span>
                        <img src={dayPictureUrl} alt="weather"/>
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(
    (state)=>({
        headerTitle:state.headerTitle,
        user:state.user
    }),
    {logout}
)(withRouter(Header))