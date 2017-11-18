exports.filterSku = function (d) {
  let {
			code,
      data: {
        list: [
          {
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
          }
        ]
			}
	} = d;

  return {
    code,
    data: {
      list: [
        {
          id,
          in_stock,
          name,
          price,
          spu_id,
          shop_info: {
            ali_image,
            sub_title,
            title,
            spec_json
          }
        }
      ]
    }
  }
}