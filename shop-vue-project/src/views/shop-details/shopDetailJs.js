import { getShopDetail } from '@/api/api_method'
import Tab from './tab/tab'
export default {
  name: 'detail',
  components: {
    Tab
  },
  data () {
    return {
      shopInfo: {
        shop_info: {}
      },
      spuInfo: {},
      count: 1 // 商品购买数量，默认是1件
    }
  },
  methods: {
    curClass(id){
      return !!this.spec_json.find(item => item.spec_value_id == id)
    },

    /**
     * 获取多项组合起来的id
     * @param {*} spec_id 每一行的id 例如 颜色 型号 尺寸 款式 
     * @param {*} spec_value_id 每一行单独的每一个选项的id 例如 颜色中的红 黄 蓝 型号中的 3.5 typeC 尺寸中的 X XXL
     */
    getCombId(spec_id, option) {
      let { id: spec_value_id} = option;
      let { attr_info, sku_list } = this.shopInfo;
      
      // 当前的属性组合
      let newAttrInfo = {
        ...attr_info,
        [spec_id]: { spec_id, spec_value_id }
      };

      let bl = sku_list.reduce((accu, elt) => {
        // 遍历sku_list，期望找到一个存在的商品
        // sku_list 是所有商品的组合
        for (let key in elt.attr_info) {
          let curtID = newAttrInfo[key].spec_value_id,
              eltID = elt.attr_info[key].spec_value_id;
          // 发现同一属性 的选项不一样，就退出这一次比较
          // 比如： 颜色比较的时候， 一个是红色，一个是绿色，就退出，说明不是这个商品
          // 如果每一个属性的选项都符合， 红色-红色， 3.5-3.5，
          // 就说明找到了， for 能够正常结束
          if (curtID !== eltID) {
            return accu;
          };
        };
        // 如果躲避过了这一次循环，那么说明有这件商品存在

        return elt.id;

      }, undefined);

      option.custom_sku_id = bl;
      
      return bl;
    },
    getShopInfoMethod (option) {
      let id = option.custom_sku_id;
      if(id) {
        getShopDetail({ id }).then((res) => {
          this.shopInfo = res.data.data;
        })
      }
    },
    minus () {
      if(this.downDisabled) return;
      this.count--;
    },
    add () {
      if (this.upDisabled) return;
      this.count++;
    },
    addCar () {
      // 添加到购物车
      let smallCarList = this.$store.state.smallCarList;
      let item = smallCarList.find(item => item.id === this.shopInfo.id)
      // 判断是否已经到最大购买数量
      if (item && item.count + this.count > this.shopInfo.shop_info.limit_num ) {
        return;
      }
      // 给加入购物车的对象，添加上选中的标识，在购物车中使用
      if (!this.shopInfo.checked) {
        this.shopInfo.checked = true;
      }
      this.$store.commit('updatedSmallCarList', {
        list: this.shopInfo
      })
    }
  },
  computed: {
    shop_info () {
      document.title = this.shopInfo.shop_info.title;
      return this.shopInfo.shop_info
    },
    spec_v2 () {  // 这一类商品下所有的信息
      return this.shop_info.spec_v2
    },
    // 当前这个商品的信息
    spec_json () {
      return this.shop_info.spec_json
    },
    ali_images () {
      return this.shop_info.ali_images
    },
    downDisabled() {
      return this.count <= 1
    },
    upDisabled() {
      return this.count >= this.shop_info.limit_num 
    }
  },
  created () {
    let id = this.$route.params.id;
    // 获取到父级下所有商品的信息
    getShopDetail({ id }).then((res) => {
      this.shopInfo = res.data.data;
      
    })
  }
}