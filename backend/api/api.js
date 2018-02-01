const express = require('express')
const router = express.Router()

const { getPagesHtml} = require('../lib/utils')

const request = require('request')

const baseURL = 'https://www.smartisan.com/product';


const { filterSku,filterListData,filtershopDetails } = require('./filter');

let detailsUrl = baseURL+ `/skus/`;

// 商品列表

router.get('/shop_skus',function (req,res){
  let {ids='',with_spu=false,with_stock=true} = req.query;
  request.get({
      url: detailsUrl,
      method: 'get',
      qs: {
        ids:ids,
        with_spu,
        with_stock
      }
    }, function (error,responese,body) {
      if(error){
        res.send({
          code:1,
          msg: '请求错误',
          error
        })
        return
      }

      let b = JSON.parse(body);
      if(b.code === 400 || b.code === 500){
        res.send(b)
        return;
      }
      res.send(filterSku(b,with_spu))
  })
})

// 商品详情

let detailUrl = `https://www.smartisan.com/product/skus/`;

// 商品详情页

router.get('/shop_detail',function (req,res){
    let {id} = req.query;
    let url = detailUrl + id+'?with_spu_sku=true&with_stock=true';
    request.get(
    {
      url: url
    }, function (error,responese,body) {
    if(error){
        res.send({
          code:1,
          msg: '请求错误',
          error
        })
        return
    }

    let d = JSON.parse(body);

    res.send(filtershopDetails(d))
    })

})

// 获取商品列表数据

let shopListUrl = baseURL +`/spus`
router.get('/shop_list',function (req,res){
  let {
      page_size=20,
      page=1,
      id:category_id=60,
      sort="sort"
    } = req.query;

  request.get(
    {
      method: 'get',
      url:shopListUrl,
      gzip:true,
      qs: {
        page_size,
        page,
        category_id,
        sort
      }
    },
    function (error,req,body){
      if(error){
        res.send({
          code:1,
          msg: '请求错误',
          error
        })
        }else{
          let b = JSON.parse(body);

          if(b.code === 400){
            res.send(b)
            return;
          }

          let list = b.data.list;
          res.send({
            code:1,
            msg: '请求成功',
            data:{
              list: filterListData(list)
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
 * 如果没有传入id，那么说明是获取
 * {
 *  	id:
 *  	count:
 * }
 */

 let shops = [];

router.get('/add_count', function (req, res) {

  if(!("id" in req.query)){
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
router.get('/remove_shop', function (req, res) {
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
