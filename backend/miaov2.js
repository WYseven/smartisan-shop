const express = require('express');
const proxy = require('http-proxy-middleware');//引入代理中间件
const app = express();

const fs = require('fs');

const utils = require('./lib/utils.js')

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
})
let shopList = {};
fs.readFile('./data/shop-list.json', (error, data) => {
  shopList = {
    list: JSON.parse(data.toString())
  }
})

app.get('/api/list', (req, res) => {
  // 暂时先已读取的形式
  res.send(shopList)
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

app.get('/item', (req, res) => {
  let {id} = req.query;

})

app.listen(3100, () => {
  console.log('Listening on: http://localhost:3100');
});
