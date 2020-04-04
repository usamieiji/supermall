<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll"
            :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"></detail-goods-info>
      <detail-param-info ref='params' :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref='comment' :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref='recommend' :goods="recommends"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar></detail-bottom-bar>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar"
  import DetailSwiper from "./childComps/DetailSwiper"
  import DetailBaseInfo from "./childComps/DetailBaseInfo"
  import DetailShopInfo from "./childComps/DetailShopInfo"
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo"
  import DetailParamInfo from "./childComps/DetailParamInfo"
  import DetailCommentInfo from "./childComps/DetailCommentInfo"
  import DetailBottomBar from "./childComps/DetailBottomBar"


  import {getDetail, getRecommend, Goods, Shop, GoodsParam} from "network/detail"
  import {itemListenerMixin, backTopMixin, otherMixin} from "common/mixin"

  export default {
    name: "Detail",
    mixins: [itemListenerMixin, backTopMixin, otherMixin],
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        currentIndex: 0
      }
    },
    created() {
      this.iid = this.$route.query.iid

      getDetail(this.iid).then(res => {
        const data = res.result
        this.topImages = data.itemInfo.topImages

        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        this.shop = new Shop(data.shopInfo)

        this.detailInfo = data.detailInfo

        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      })

      getRecommend().then(res => {
        this.recommends = res.data.list
      })
    },
    destroyed() {
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    },

    mounted() {

    },

    methods: {
      imgLoad() {
        this.$refs.scroll.refresh()

        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)

      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300)
      },
      contentScroll(position) {
        const positionY = -position.y
        const length = this.themeTopYs.length - 1
        for (let i = 0; i < length; i++) {
          if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
            this.currentIndex = i
          }
        }
        // const newArray = this.themeTopYs.filter(n => {
        //   return n <= positionY
        // })
        // this.currentIndex = newArray.length - 1
        this.$refs.nav.currentIndex = this.currentIndex

        this.listenShowBackTop(position)
      },
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    position: relative;
    height: calc(100vh - 102px);
    overflow: hidden;
  }
</style>
