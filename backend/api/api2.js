const express = require('express')
const router = express.Router()

const { getPagesHtml} = require('../lib/utils')

const request = require('request')

const baseURL = 'https://www.smartisan.com/product';


const { filterSku,filterListData,filtershopDetails } = require('./filter');

let detailsUrl = baseURL+ `/skus/`;

// 商品详情页

router.get('/shop_details',function (req,res){
    let {id} = req.query;
    console.log(id)
    let url = detailsUrl + id+'?with_spu_sku=true&with_stock=true';
    console.log(url)
    request.get(url, function (error,responese,body) {
      if(error){
        
        return
      }
     
      let d = JSON.parse(body);
     
      res.send(filtershopDetails(d))
    })
    
})

// 获取商品列表数据

let shopListUrl = baseURL +
              `/spus?page_size=20&category_id=60&page=1&sort=sort`

router.get('/shop_list',function (req,res){
  request.get({
    url:shopListUrl,
    gzip:true,
    },function (error,req,body){
      if(error){
        res.send({
          code:1,
          msg: '请求错误',
          error
        })
        }else{
          let b = JSON.parse(body).data.list;

          res.send({
            code:1,
            msg: '请求成功',
            data:{
              list: filterListData(b)
            }
          })
        }
  });
})

// 添加到购物车之后返回商品数据
router.get('/add_cart', function (req,res) {
  let { skuId = 100036002} = req.query;
  request.get(baseURL + `/skus?ids=${skuId}`,{
    headers: {
      Referer: 'http://www.smartisan.com/shop/'
    }
  },function(error,responese,body) {
    if(error){
      res.send({
        code:1,
        error: '请求错误'
      })
    }else{
      res.send(filterSku(body))
    }
  })
})

/**
 *
 * 发送商品id和数量，用来记录购买的商品的id和数量
 * 如果没有传入skuId，那么说明是获取
 * {
 *  skuId:
 *  count:
 * }
 */

 let shops = [];

router.get('/count', function (req, res) {

  if(!("skuId" in req.query)){
    res.send({
      code: 0,
      idsList: shops
    })
    return
  }

  let {count, skuId} = req.query;
  let index = shops.findIndex(item => skuId === item.skuId);
  if(index !== -1){
    shops.splice(index,1,{
      count, skuId
    })
  }else{
    shops.push({
      count, skuId
    })
  }

  res.send({
    code: 0,
    idsList: shops
  })
})

// 根据id移除购物车商品
router.get('/remove_ount', function (req, res) {
    let {skuId} = req.query;

    shops = shops.filter((item) => {
      return item.skuId !== skuId
    })

    res.send({
      code: 0,
      idsList: shops
    })

})


module.exports = router
