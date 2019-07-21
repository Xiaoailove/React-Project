import React, { Component } from 'react'
import {Form,Card,Icon,Input,Select,Button,} from 'antd'
import {reqCategorys} from '../../api'
import LinkButton from '../../components/link-button'
import memoryUtils from '../../until/memoryUtils'
const Item=Form.Item
const Option=Select.Option

class ProductAddUpdate extends Component {
    state={
        categorys:[]
    }
    
    render() {
        return (
            <div>
                ProductAddUpdate
            </div>
        )
    }
}
export default Form.create()(ProductAddUpdate)