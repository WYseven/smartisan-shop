const express = require('express');
const proxy = require('http-proxy-middleware');//引入代理中间件
const app = express();

const fs = require('fs');

const utils = require('./lib/utils.js')

app.get('/list', (req, res) => {
  fs.readFile('./data/shop-list.json', (error, data) => {
    res.send(data.toString())
  })
})

fs.readFile('./data/shop-item.json', (error, data) => {
  let data2 = JSON.parse(data.toString());
  let json = {};
  data2.map((item) => {
    if(item.data){
      json[item.data.id] = item
    }
  })
})

app.get('/item', (req, res) => {
  let {id} = req.query;

})

app.listen(3100, () => {
  console.log('Listening on: http://localhost:3100');
});
