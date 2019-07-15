import React, { Component } from 'react'
import logo from './images/logo.png'
import './login.less'
import { Form, Icon, Input, Button } from 'antd'
class Login extends Component {
    handleSubmit = e => {
        e.preventDefault();
        //const form=this.props.form;
        //const values = form.getFieldsValue()
        //const username = form.getFieldValue('username')
        //const password = form.getFieldValue('password')
        this.props.form.validateFields((err, {username,password}) => {
            if (!err) {
              alert(`登录成功用户${username}发送ajax请求`)
            }else{
                alert('登录失败')
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
