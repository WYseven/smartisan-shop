const express = require('express');
const proxy = require('http-proxy-middleware');//引入代理中间件
const app = express();

const fs = require('fs');
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())  // 解析json的格式

const utils = require('./lib/utils.js')

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})
let shopList = {};
fs.readFile('./data/shop-list.json', (error, data) => {
  shopList = {
    list: JSON.parse(data.toString())
  }
})

let shopItem = {};
fs.readFile('./data/shop-item.json', (error, data) => {
  shopItem = {
    list: JSON.parse(data.toString())
  }
})

app.get('/api/list', (req, res) => {
  // 暂时先已读取的形式
  res.send(shopList)
})

app.post('/api/setShopCarList', (req, res) => {
  let {carList} = req.body
  let isExist = fs.existsSync('./data/carList.json')
  let arr = []
  if(isExist){
    let d = fs.readFileSync('./data/carList.json')
    if(d.toString()){
      arr = JSON.parse(d);
    }

  }

  let getDate = JSON.parse(carList);

  let findData = arr.find((item) => {
    return item.sku_id === getDate.sku_id
  })

  if(findData){
    findData.sku_num = ++findData.sku_num
  }else {
    getDate.sku_num = 1
    getDate.price = shopItem.list[getDate.sku_id].data.price
    arr.push(getDate);
  }

  fs.writeFileSync('./data/carList.json', JSON.stringify(arr))

  res.send({
    car_list: arr
  })
})



app.get('/api/getShopCarList', (req, res) => {
  let isExist = fs.existsSync('./data/carList.json')
  if(isExist){
    let d = fs.readFileSync('./data/carList.json')
    if(d.toString()){
      res.send({
        car_list: JSON.parse(d)
      })
    }
    return

  }
  res.send({
    car_list: []
  })
})
/* fs.readFile('./data/shop-item.json', (error, data) => {
  let data2 = JSON.parse(data.toString());
  let json = {};
  data2.map((item) => {
    if(item.data){
      json[item.data.id] = item
    }
  })
}) */

app.post('/api/removeCarShopById', () => {
  
})

app.get('/item', (req, res) => {
  let {id} = req.query;

})

app.listen(3100, () => {
  console.log('Listening on: http://localhost:3100');
});
