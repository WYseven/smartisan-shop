let d = require('./data.js');

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



exports.filterSku = filterSku