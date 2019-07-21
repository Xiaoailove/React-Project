import React, { Component } from 'react'
import { Card, Icon, List } from 'antd'
import {Redirect} from 'react-router-dom'
import LinkButton from '../../components/link-button'
import { bold } from 'ansi-colors'
import { reqCategory } from '../../api'
import memoryUtils from '../../until/memoryUtils'
import { BASE_IMG } from '../../until/Constants'
const Item = List.Item
export default class ProductDetail extends Component {
    state = {
        categoryName: ''
    }
    getCategory = async (categoryId) => {
        const result = await reqCategory(categoryId)
        if (result.status === 0) {
            const categoryName = result.data.name
            this.setState({ categoryName: categoryName })
        }
    }
    componentDidMount() {
        const product = memoryUtils.product
        console.log(product)
        if (product._id) {
            this.getCategory(product.categoryId)
        }
    }
    render() {
        const { categoryName } = this.state
        const product = memoryUtils.product
        if (!product || !product._id) {
            return <Redirect to="/product"/>
          }
        const title = (
            <span>
                <LinkButton onClick={() => this.props.history.goBack()}>
                    <Icon
                        type='arrow-left'
                        style={{ marginRight: 10, fontSize: 20 }}
                    />
                </LinkButton>
                <span style={{ fontSize: 20, fontWeight: bold }}>商品详情</span>
            </span>
        )
        return (
            <Card title={title} className='product-details'>
                <List>
                    <Item>
                        <span className='left'>商品名称</span>
                        <span>{product.name}</span>
                    </Item>
                    <Item>
                        <span className='left'>商品描述</span>
                        <span>{product.desc}</span>
                    </Item>
                    <Item>
                        <span className='left'>商品价格</span>
                        <span>{product.price}元</span>
                    </Item>
                    <Item>
                        <span className='left'>所属分类 </span>
                        <span>{categoryName}</span>
                    </Item>
                    <Item>
                        <span className='left'>商品图片</span>
                        <span>
                            {  
                            product.imgs.map((img)=><img key={img} src={BASE_IMG+img} className="detail-img" alt="img"/>)
                            }
                        </span>
                    </Item>
                    <Item>
                        <span className='left'>商品详情</span>
                        <div dangerouslySetInnerHTML={{__html:product.detail}}></div>
                    </Item>
                </List>
            </Card>
        )
    }
}
