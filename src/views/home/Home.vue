<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class="content">
      <home-swiper :banner="banner" class="home-swiper"></home-swiper>
      <recommend-view :recommend="recommend"></recommend-view>
      <feature-view></feature-view>
      <tab-control :title="['流行', '新款', '精选']"
                   class="tab-control"
                   @tabClick="tabClick"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>


  </div>
</template>

<script>

  import HomeSwiper from "./childComps/HomeSwiper"
  import RecommendView from "./childComps/RecommendView"
  import FeatureView from "./childComps/FeatureView"

  import NavBar from "components/common/navbar/NavBar"
  import TabControl from "components/content/tabControl/TabControl"
  import GoodsList from "components/content/goods/GoodsList"
  import Scroll from "components/common/scroll/Scroll"

  import {getHomeMultidata, getHomeGoods} from "network/home"



  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll
    },
    data() {
      return {
        banner: [],
        recommend: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentIndex: 'pop'
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentIndex].list
      }
    },
    created() {
      this.getHomeMultidata()

      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    methods: {
      //Event listener related
      tabClick(index) {
        switch(index) {
          case 0:
            this.currentIndex = 'pop'
            break
          case 1:
            this.currentIndex = 'new'
            break
          case 2:
            this.currentIndex = 'sell'
            break
        }
      },

      //Network interactions related
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banner = res.data.banner.list
          this.recommend = res.data.recommend.list
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page
        getHomeGoods(type, page + 1).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page++
        })
      }
    }

  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    padding-bottom: 49px;
    height: 100vh;

  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;

    z-index: 9;
  }

  .tab-control {
    position: sticky;
    top: 44px ;

    z-index: 9;

    -webkit-transform: translateZ(0);
  }

  .content {
    height: 100%;
  }

</style>
