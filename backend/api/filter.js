
function getInfo (obj) {
  let {
    id,
    in_stock = true,
    name,
    price,
    spu_id,
    shop_info: {
      limit_num,
      ali_image,
      sub_title,
      title,
      spec_json
    }
  } = obj;

  return {
    id,
    in_stock,
    name,
    price,
    spu_id,
    shop_info: {
      limit_num,
      ali_image,
      sub_title,
      title,
      spec_json
    }
  }
}

function getListInfo (list) {
  return list.map((item) => {
    return getInfo(item)
  })
}

function filterSku(d) {
  d = JSON.parse(d);
  return {
    code: d.code,
    data: {
      list: getListInfo(d.data.list)
    }
  }
}


// 过滤添加购物车商品
exports.filterSku = filterSku

// 过滤商品列表页数据
function filterListData(data){

    return data.map((item) => {
      let {id,name,price,image_pre} = item;
      let sku_list = [];

      item.sku_info.forEach((item2) => {
        if(!sku_list.find((item3) => item3.color_id === item2.color_id )){
          let {direct_to_cart,ali_image,sku_id,sub_title,title,color_id,price} 
            = item2;
          let spec_json = item2.spec_json.map(function (json_item){
            let {image,show_name,spec_value_id} = json_item;
            return  {image};
          })

          sku_list.push({direct_to_cart,ali_image,sku_id,sub_title,title,price,...spec_json[0],color_id})
        }
      })
      
      return {id,name,price,image_pre:'http://img01.smartisanos.cn/',
        sku_list: sku_list
      }
    });
}

exports.filterListData = filterListData;

function filtershopDetails(datas){
  console.log(datas);
    let {
            id,
            sku_info: {
              title,
              sub_title,
              limit_num,
              ali_images,
              ali_image,
              spec_v2:[]
            }
          } = datas;

          let d = {
            id,
            spu_id,
            name,
            shop_info: {
              title,
              sub_title,
              limit_num,
              ali_images,
              ali_image,
              spec_v2:[]
            }
          }
          d.spec_json =  datas.shop_info.spec_json.map(function (item){
                return {
                  spec_id:item.spec_id,
                  spec_value_id: item.spec_value_id,
                  show_name:item.show_name
                }
              })
          d.spec_v2 =  datas.shop_info.spec_v2.map((item2) => {
            return {
                spec_name: item2.spec_name,
                spec_id: item2.spec_id,
                image_pre: item2.image_pre,
                spec_values: item2.spec_values.map((item3) => {
                  return {
                    id:item3.id,
                    show_short_name:item3.show_short_name,
                    image:item3.image
                  }
                })
              }
          })
    return d;
}

exports.filtershopDetails = filtershopDetails;
