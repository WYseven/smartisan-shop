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
  watch: {
    $route: {
      handler() {
        console.log(456)
        getShopList({ page: 1, id: this.$route.query.id }).then((res) => {
          this.list = res.data.data.list;
        })
      },
      immediate: true
    }
  }
}