# 商城接口文档


接口前缀说明：

- 开发环境：http://localhost:5000/api
- 生成环境：http://st.fetoutiao.com/api

## API接口说明
---------
### get /shop_list
---------
- 作用：获取商品列表数据
- request参数
    - page_size *Number* 商品数量，最大为20
    - page *Number* 页数，必填项
    - id *Number* 大块商品id
        - 62 - 全部 
        - 69 - 品牌周边
        - 61 - 第三方商品
        - 60 - 官方配件 
- response数据
```
{
	code: 1失败；0成功;500服务端问题；400参数有误，导致数据不存在
	data: { 存放数据
		list： [  商品列表
			{
				id:   大类商品的id
				name  商品名字
				price 商品单价
				image_pre 商品图片地址
				sku_list: [  大类商品下的小分类
					{
					    
						direct_to_cart： true可直接加入购物车；false到详情页
						ali_image： 展示的大图
						sku_id：分类商品的id
						sub_title： 小标题
						title：大标题
						price: 分类商品的单价
						image： 分类商品的颜色图片（可作为背景，img）
						color_id： 颜色id
					}
				]
			}
		]
	}
}
```

### get /shop_skus
---------
- 作用：获取商品的细节
- request参数
    - ids *String* 商品的id，可以写多个以逗号分隔
    - with_stock *Boolean* 是否需要知道有货
- response数据


### get /shop_detail
---------
- 作用：获取商品详情页具体一个商品的细节
- request参数
    - id *Number* 商品的id
- response数据