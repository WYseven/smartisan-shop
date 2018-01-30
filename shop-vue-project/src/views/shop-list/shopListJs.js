import { getShopList } from '@/api/api_method'
import Item from './shop-item/item'
export default {
  name: 'ShopList',
  components: { Item },
  data(){
    return {
      list: []
    }
  },
  created () {
    getShopList({page:1}).then((res) => {
      this.list = res.data.data.list;
    })
  }
}