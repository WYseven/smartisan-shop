var url = require("url");
var http = require("http");
let fs = require('fs');
function getPagesHtml(urls,option){
    return new Promise((resolve,reject) => {
        var urlParse = url.parse(urls);

        let options = {
          hostname:urlParse.hostname,
          path:urlParse.path,
          ...option
        }

        let req = http.request(options,(res)=>{
          var arr = [];
          res.on('data', (chunk) => {
            arr.push(chunk);
          });
          res.on('end', () => {
            resolve(arr.join(''));
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


module.exports = {
  getPagesHtml
}
