import React, { Component } from 'react'
import { Form, Card, Icon, Input, Select, Button, message} from 'antd'
import { reqCategorys,reqAddUpdateProduct } from '../../api'
import LinkButton from '../../components/link-button'
import memoryUtils from '../../until/memoryUtils'
import PicturesWall from './pictures-wall'
import RichTextEditor from './rich-text-editor'
const Item = Form.Item
const Option = Select.Option

class ProductAddUpdate extends Component {
    state = {
        categorys: []
    }
    constructor(props){
        super(props)
        this.pwRef=React.createRef()   
        this.editorRef=React.createRef() 
    }
    getCategorys = async () => {
        const result = await reqCategorys()
        if (result.status === 0) {
            const categorys = result.data
            this.setState({ categorys })
        }
    }
    handleSubmit=(event)=>{
        event.preventDefault()
        //进行表单的统一验证
        this.props.form.validateFields(async(err,values)=>{
            if(!err){
                const {name,desc,price,categoryId}=values
                //收集上传的图片的文件名的数组
                const imgs=this.pwRef.current.getImgs()
                //console.log(imgs)
                //收集富文本编辑器里面的相应的信息
                const detail=this.editorRef.current.getDetail()
                //收集product对象用于传参
                const product={name,desc,price,categoryId,imgs,detail}
                if(this.isUpdate){
                    product._id=this.product._id
                }
                //发送添加或者修改的请求
                const result=await reqAddUpdateProduct(product)
                if(result.status===0){
                    message.success(`${this.isUpdate?'修改':'添加'}商品成功`)
                    this.props.history.replace('/product')
                }else{
                    message.error(result.msg)
                }
            }
        })
    }
    validatePrice=(rule,value,callback)=>{
        if(value===''){
            callback()
        }else if(value*1<=0){
            callback('价格必须大于0')
        }else{
            callback()
        }
    }
    componentWillMount() {
        this.product = memoryUtils.product
        this.isUpdate = !!this.product._id
    }
    componentDidMount() {
        this.getCategorys()
    }
    render() {
        const { categorys } = this.state
        const { product, isUpdate } = this
        const { getFieldDecorator } = this.props.form
        const title = (
            <span>
                <LinkButton>
                    <Icon type="arrow-left" onClick={() => { this.props.history.goBack() }} />
                </LinkButton>
                <span>{isUpdate ? '修改商品' : '添加商品'}</span>
            </span>
        )
        const formLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 8 }
        }
        return (
            <Card title={title}>
                <Form {...formLayout} onSubmit={this.handleSubmit}>
                <Item label="商品名称">
                    {getFieldDecorator('name',{
                        initialValue:product.name,
                        rules:[
                            {
                                required:true,
                                message:'商品名称必须输入！'
                            }
                        ]
                    })(<Input placeholder="商品名称"/>)  
                    }
                </Item>
                <Item label="商品描述">
                    {getFieldDecorator('desc',{
                        initialValue:product.desc,
                        rules:[
                            {
                                required:true,
                                message:'商品描述必须输入！'
                            }
                        ]
                    })(<Input placeholder="商品描述"/>)  
                    }
                </Item>
                <Item label="商品价格">
                    {getFieldDecorator('price',{
                        initialValue:product.price,
                        rules:[
                            {
                                required:true,
                                message:'商品价格必须输入！'
                            },
                            {validator:this.validatePrice}
                        ]
                    })(<Input type="number" placeholder="商品价格" addonAfter="元"/>)  
                    }
                </Item>
                <Item label="商品分类">
                    {getFieldDecorator('categoryId',{
                        initialValue:product.categoryId||'',
                        rules:[
                            {
                                required:true,
                                message:'商品分类必须输入！'
                            }
                        ]
                    })(
                        <Select>
                            <Option value=''>未选择</Option>
                            {categorys.map(c=><Option value={c._id} key={c._id}>{c.name}</Option>)}
                        </Select>
                    )  
                    }
                </Item>
                <Item label="商品图片">
                    <PicturesWall ref={this.pwRef} imgs={product.imgs}/>
                </Item>
                <Item label="商品详情" wrapperCol={{span:20}}>
                    <RichTextEditor ref={this.editorRef} detail={product.detail}/>
                </Item>
                <Item >
                    <Button type="primary" htmlType="submit" >提交</Button>
                </Item>
                </Form>
            </Card>
        )
    }
}
export default Form.create()(ProductAddUpdate)