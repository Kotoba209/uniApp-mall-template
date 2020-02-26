<template>
  <view class="container">
    <view class="carousel">
      <swiper
        indicator-dots
        circular=true
        duration="400"
      >
        <swiper-item
          class="swiper-item"
          v-for="(item,index) in imgList"
          :key="index"
        >
          <view class="image-wrapper">
            <image
              :src="item.src"
              class="loaded"
              mode="aspectFill"
            ></image>
          </view>
        </swiper-item>
      </swiper>
    </view>

    <view class="introduce-section">
      <text class="title">{{product.name}}</text>
      <view class="price-box">
        <text class="price-tip">¥</text>
        <text class="price">{{product.price}}</text>
      </view>
      <view class="bot-row">
        <text>销量: 108</text>
        <!-- <text>库存: 4690</text> -->
        <!-- <text>浏览量: 768</text> -->
      </view>
    </view>

    <view class="c-list">
      <view
        class="c-row b-b"
        @click="toggleSpec"
      >
        <text class="tit">规格</text>
        <view class="con">
          <text
            class="selected-text"
            v-for="(sItem, sIndex) in specSelected"
            :key="sIndex"
          >
            {{sItem.name}}
          </text>
        </view>
        <text class="yticon icon-you"></text>
      </view>
    </view>

    <view class="detail-desc">
      <view class="d-header">
        <text>图文详情</text>
      </view>
      <rich-text :nodes="desc"></rich-text>
    </view>

    <!-- 底部操作菜单 -->
    <view class="page-bottom">
      <navigator
        url="/pages/index/index"
        open-type="switchTab"
        class="p-b-btn"
      >
        <text class="yticon icon-xiatubiao--copy"></text>
        <text>首页</text>
      </navigator>
      <navigator
        url="/pages/cart/cart"
        open-type="switchTab"
        class="p-b-btn"
      >
        <text class="yticon icon-gouwuche"></text>
        <text>购物车</text>
      </navigator>
      <view class="p-b-btn">
        <!-- :class="{active: favorite}"
        @click="toFavorite" -->
        <text class="iconfont icon-icon_phone"></text>
        <text>客服</text>
      </view>

      <view class="action-btn-group">
        <button
          type="primary"
          class=" action-btn no-border buy-now-btn"
          @click="buy"
        >立即购买</button>
        <button
          type="primary"
          class=" action-btn no-border add-cart-btn"
          @click="addToCart"
        >加入购物车</button>
      </view>
    </view>

    <!-- 规格-模态层弹窗 -->
    <view
      class="popup spec"
      :class="specClass"
      @touchmove.stop.prevent="stopPrevent"
      @click="toggleSpec"
    >
      <!-- 遮罩层 -->
      <view class="mask"></view>
      <view
        class="layer attr-content fixclear"
        @click.stop="stopPrevent"
      >
        <view class="a-t">
          <image :src="product.imgUrl"></image>
          <view class="right">
            <text class="price">¥328.00</text>
            <!-- <text class="stock">库存：188件</text> -->
            <view class="selected">
              已选：
              <text
                class="selected-text"
                v-for="(sItem, sIndex) in specSelected"
                :key="sIndex"
              >
                {{sItem.name}}
              </text>
            </view>
          </view>
        </view>
        <view
          v-for="(item,index) in specList"
          :key="index"
          class="attr-list"
        >
          <text>{{item.name}}</text>
          <view class="item-list">
            <template v-for="(childItem, childIndex) in specChildList">
              <text
                v-if="childItem.pid === item.id"
                :key="childIndex"
                class="tit"
                :class="{selected: childItem.selected}"
                @click="selectSpec(childIndex, childItem.pid)"
              >
                <template>{{childItem.name}}</template>
              </text>
            </template>
          </view>
        </view>
        <stepper
          :label='2'
          :max="99999"
          :val="1"
          :step="1"
          :min="1"
          @change="handleStepper"
          class="stepper"
        ></stepper>
        <button
          class="btn"
          @click="toggleSpec"
        >完成</button>
      </view>
    </view>
    <!-- 分享 -->
    <share
      ref="share"
      :contentHeight="580"
      :shareList="shareList"
    ></share>
  </view>
</template>

<script>
import share from '@/components/share';
import stepper from '@/components/sunui-stepper/sunui-stepper';
export default {
  components: {
    share,
    stepper
  },
  data() {
    return {
      specClass: 'none',
      specSelected: [],
      num: null,
      favorite: true,
      shareList: [],
      product: {
        title: '恒源祥2019春季长袖白色t恤 新款春装',
        price: 341.6,
        image: 'https://gd3.alicdn.com/imgextra/i3/0/O1CN01IiyFQI1UGShoFKt1O_!!0-item_pic.jpg_400x400.jpg',
        id: Math.random(),
      },
      imgList: [
        {
          src: 'https://gd3.alicdn.com/imgextra/i3/0/O1CN01IiyFQI1UGShoFKt1O_!!0-item_pic.jpg_400x400.jpg'
        },
        {
          src: 'https://gd3.alicdn.com/imgextra/i3/TB1RPFPPFXXXXcNXpXXXXXXXXXX_!!0-item_pic.jpg_400x400.jpg'
        },
        {
          src: 'https://gd2.alicdn.com/imgextra/i2/38832490/O1CN01IYq7gu1UGShvbEFnd_!!38832490.jpg_400x400.jpg'
        }
      ],
      desc: `
					<div style="width:100%">
						<img style="width:100%;display:block;" src="https://gd3.alicdn.com/imgextra/i4/479184430/O1CN01nCpuLc1iaz4bcSN17_!!479184430.jpg_400x400.jpg" />
						<img style="width:100%;display:block;" src="https://gd2.alicdn.com/imgextra/i2/479184430/O1CN01gwbN931iaz4TzqzmG_!!479184430.jpg_400x400.jpg" />
						<img style="width:100%;display:block;" src="https://gd3.alicdn.com/imgextra/i3/479184430/O1CN018wVjQh1iaz4aupv1A_!!479184430.jpg_400x400.jpg" />
						<img style="width:100%;display:block;" src="https://gd4.alicdn.com/imgextra/i4/479184430/O1CN01tWg4Us1iaz4auqelt_!!479184430.jpg_400x400.jpg" />
						<img style="width:100%;display:block;" src="https://gd1.alicdn.com/imgextra/i1/479184430/O1CN01Tnm1rU1iaz4aVKcwP_!!479184430.jpg_400x400.jpg" />
					</div>
				`,
      specList: [
        {
          id: 1,
          name: '尺寸',
        },
        {
          id: 2,
          name: '颜色',
        },
      ],
      specChildList: [
        {
          id: 1,
          pid: 1,
          name: 'XS',
        },
        {
          id: 2,
          pid: 1,
          name: 'S',
        },
        {
          id: 3,
          pid: 1,
          name: 'M',
        },
        {
          id: 4,
          pid: 1,
          name: 'L',
        },
        {
          id: 5,
          pid: 1,
          name: 'XL',
        },
        {
          id: 6,
          pid: 1,
          name: 'XXL',
        },
        {
          id: 7,
          pid: 2,
          name: '白色',
        },
        {
          id: 8,
          pid: 2,
          name: '珊瑚粉',
        },
        {
          id: 9,
          pid: 2,
          name: '草木绿',
        },
      ]
    };
  },
  async onLoad(options) {

    //接收传值,id里面放的是标题，因为测试数据并没写id 
    let id = options.id;
    // if(id){
    // 	this.$api.msg(`点击了${id}`);
    // }


    //规格 默认选中第一条
    this.specList.forEach(item => {
      for (let cItem of this.specChildList) {
        if (cItem.pid === item.id) {
          this.$set(cItem, 'selected', true);
          this.specSelected.push(cItem);
          break; //forEach不能使用break
        }
      }
    })
    this.shareList = await this.$api.json('shareList');
  },
  methods: {
    //规格弹窗开关
    toggleSpec() {
      if (this.specClass === 'show') {
        this.specClass = 'hide';
        setTimeout(() => {
          this.specClass = 'none';
        }, 250);
      } else if (this.specClass === 'none') {
        this.specClass = 'show';
      }
    },
    //选择规格
    selectSpec(index, pid) {
      let list = this.specChildList;
      list.forEach(item => {
        if (item.pid === pid) {
          this.$set(item, 'selected', false);
        }
      })

      this.$set(list[index], 'selected', true);
      //存储已选择
      /**
       * 修复选择规格存储错误
       * 将这几行代码替换即可
       * 选择的规格存放在specSelected中
       */
      this.specSelected = [];
      list.forEach(item => {
        if (item.selected === true) {
          this.specSelected.push(item);
        }
      })

    },

    //计数

    handleStepper(e) {
      console.log(e);
      this.num = e.val;
    },
    //分享
    share() {
      this.$refs.share.toggleMask();
    },
    buy() {
      uni.navigateTo({
        url: `/pages/order/createOrder`
      })
    },
    addToCart() {
      // 1 获取缓存中的购物车 数组
      let cart =  uni.getStorageSync('cart') || [];
      // 2 判断 商品对象是否存在于购物车数组中
      let index = cart.findIndex(v => v.id === this.product.id);
      if (index === -1) {
        //3  不存在 第一次添加
        this.product.number = 1;
        this.product.checked = true;
        cart.push(this.product);
      } else {
        // 4 已经存在购物车数据 执行 num++
        cart[index].number++;
      }
      // 5 把购物车重新添加回缓存中
      uni.setStorageSync('cart', cart);
    },
    stopPrevent() { }
  },

}
</script>

<style lang="scss" src="./icon.scss"></style>
<style lang='scss' src="./product.scss"></style>
