import { getShopList } from '@/api/api_method'
import Item from './shop-item/item'
export default {
  name: 'ShopList',
  components: { Item },
  data(){
    return {
      list: [],
      show: false
    }
  },
  watch: {
    $route: {
      async handler() {
        // 使用async await
        let {data} = await getShopList({ page: 1, id: this.$route.query.id });
          this.list = data.list;
          this.$store.commit('updateLoading', { loading: false })

      },
      immediate: true
    }
  }
}