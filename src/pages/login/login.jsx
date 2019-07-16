import React, { Component } from 'react'
import logo from './images/logo.png'
import './login.less'
import { Form, Icon, Input, Button,message } from 'antd'
import {reqLogin} from '../../api'
import storageUtils from '../../until/storageUtils'
import memoryUtils from '../../until/memoryUtils'
class Login extends Component {
    handleSubmit = e => {
        e.preventDefault();
        //const form=this.props.form;
        //const values = form.getFieldsValue()
        //const username = form.getFieldValue('username')
        //const password = form.getFieldValue('password')
        this.props.form.validateFields(async (err, {username,password}) => {
            if (!err) {
             //const result= await reqLogin(username,password);
             const result = await reqLogin(username, password)
             //console.log(result)
             if(result.status===0){
                 //登录成功之后需要将将消息保存到本地进而保存到内存中
                const user=result.data
                //console.log(user);
                storageUtils.saveUser(user);
                memoryUtils.users=user;
                 //登录成功以后将会跳转到admin页面
                 this.props.history.replace('/');
                 message.success('登录成功')

             }
            }
        });

    };
    validatorPwd=(rule, value, callback)=>{
        value=value.trim();
        if(!value){
            callback('密码必须输入')
        } else if(value.length<4){
            callback('输入的密码长度不能小于4位')
        } else if(value.length>12){
            callback('输入的密码长度不能大于12位')
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            callback('密码必须是英文、数字或下划线组成')
          }else{
              callback();//最后调用表示验证通过
          }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='login'>
                <div className='login-header'>
                    <img src={logo} alt='logo' />
                    <h1>后台管理系统</h1>
                </div>
                <div className='login-content'>
                    <h1>用户登录</h1>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {
                                getFieldDecorator('username', {
                                    initialValue:'',
                                    rules: [
                                        { required: true, message: '用户名为必填项' },
                                        { min: 4, message: '应户名不能小于四位' },
                                        { max: 12, message: '用户名不能大于12位' },
                                        { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须为英文、数字或者下划线' }

                                    ]
                                })(<Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="用户名"
                                />)
                            }
                        </Form.Item>
                        <Form.Item>
                        {
                            getFieldDecorator('password', {
                                initialValue:'',
                                rules: [
                                    {validator:this.validatorPwd},
                                ]
                            })(<Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="密码"
                            />)
                        }
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                        </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}
const WrapperForm = Form.create()(Login);
export default WrapperForm
