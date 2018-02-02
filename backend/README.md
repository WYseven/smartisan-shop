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


### get /shop_detail
---------
- 作用：获取商品详情页具体一个商品的细节
- request参数
    - id *Number* 商品的id
- response数据

精简版
```

{
    code: 0
    data: {
        id: 100027004 // 当前商品的id
        in_stock: true // 是否有货
        price: 199 价格
        spu_id: 1000270 // 大类的id
        attr_info: 当前商品的规格 < 对象 >
            shop_info： 商品的数据， 里面图片地址和title和小标题
        spec_json： 当前商品的规格 < 数组 >

        spec_v2： 这一大类商品所有有的规则
        sku_list： 这一大类商品所有的商品
    }
}
```
详细版
```
{
    "code": 0,
    "data":
    {
        "id" // 当前查看详情的商品的id
        "in_stock" // 有货，可以直接加购物车 tue有货，false无货
        "name"
        "price"
        "spu_id" // 大类商品的id
        "attr_info" // 当前商品的规格
        {
            "1": // 规格的id
            {
                "spec_id" // 规格的id
                "spec_name" // 规则要显示的文字
                "spec_value_id": "86" // 所属规格下某个值的id
            }
        },
        "shop_info":
        { // 商品的详细信息
            "ali_images" [] // 左侧要展示和切换的图
            "sub_title"
            "title"
            "spec_json": [ // 当前商品的规格信息数据
                {
                    "spec_id"
                    规格的id "spec_value_id"
                    所属规格下某个值的id "show_name" // 要显示的名字
                    "image"
                    是需要在颜色块中展示的图片
                }
            ],
            "spec_v2": [ // 这一类商品分了多个个规格，以及每一个规范中的详细信息
                {
                    "spec_id" // 规格的id
                    "spec_name" // 规则要显示的文字
                    "spec_values": [ // 一个规格下分为多种值
                        {
                            "id" // 值的id
                            "spec_id" // 所属的规格id
                            "show_name" // 要显示的名字
                            "image" // 如果是颜色，显示图片
                        }
                    ]
                }
            ]
            "sku_list": [ // 这一大类中所有的商品的id
                {
                    "id"  // 商品的id,
                    "attr_info": // 每一个商品的规格
                    {
                        "1":
                        {
                            "spec_id"
                            "spec_name"
                            "value"
                            "spec_value_id"
                        }
                    }
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

详细参考**shop_detail**的接口
```
{
    code: 0
    data: {
        id: 100027004 // 当前商品的id
        in_stock: true // 是否有货
        price: 199 价格
        spu_id: 1000270 // 大类的id
        attr_info: 当前商品的规格 < 对象 >
            shop_info： 商品的数据， 里面图片地址和title和小标题
        spec_json： 当前商品的规格 < 数组 >
        spec_v2： 这一大类商品所有有的规则
    }
}
```
