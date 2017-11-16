var url = require("url");
var http = require("http");
let fs = require('fs');
function getPagesHtml(urls){
    return new Promise((resolve,reject) => {
        var urlParse = url.parse(urls);

        let options = {
          hostname:urlParse.hostname,
          path:urlParse.path
        }

        let req = http.request(options,(res)=>{
          var arr = [];
          res.on('data', (chunk) => {
            arr.push(chunk);
          });
          res.on('end', () => {
            resolve(arr);
          });

          res.on("error",(err)=>{
            reject(err)
          });

         });

        req.on("error", (err)=>{
          reject(err)
        })

        req.end();
    });
}
/*
let urls = [
  {'zhangguorong': 'http://c.hiphotos.baidu.com/baike/pic/item/63d9f2d3572c11dfa3e99dbc642762d0f703c270.jpg'}
]

function createImg(url){
  return new Promise((resolve, reject) => {
    http.get(url, function(res){
       res.setEncoding("binary");
       let d = '';
        res.on("data", function(chunk){
            d+=chunk;
        });
        res.on("end", function(){
          resolve(d)
        });
    })
  })

}

let urlsData = urls.map( async (item) => {
  let url = Object.values(item)[0]
  let data = await createImg(url)
  return [Object.keys(item)[0],data];
})

urlsData.forEach((item) => {
  item.then((data) => {
    fs.writeFile(`./data/img/${data[0]}.png`, data[1],{encoding :'binary', flag:'w'}, function(err){
        if(err){
            console.log(err);
        }
        console.log("down success");
    });
  })
})
*/



module.exports = {
  getPagesHtml
}
