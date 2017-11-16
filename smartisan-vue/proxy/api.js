const express = require('express')
const router = express.Router()

const { getPagesHtml} = require('../lib/utils')


router.get('/add_cart', function (req,res) {
  let { skuId = 100036002} = req.query;
  getPagesHtml(`http://www.smartisan.com/product/skus?ids=${skuId}`, {
    headers: {
      Referer: 'http://www.smartisan.com/shop/'
    }
  })
  .then((data) => {
    res.set({
      'Content-Type': 'text/json'
      // 'Cache-Control': 'max-age=40000000'  // 设置过期时间
    })
    let d = data.toString();
    res.send(d)
  }).catch((e) => {
    console.log(e)
    res.send({
      error: '请求错误',
      e
    })
  })
})

/**
 * 
 * 发送商品id和数量，用来记录
 * {
 *  skuId:
 *  count:
 * }
 */

router.get('/count', function (req, res) {
  let {count, skuId} = req.query;
  res.send('ok')
})

module.exports = router


