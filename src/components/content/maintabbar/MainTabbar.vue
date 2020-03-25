<template>
  <div>
    <tabbar>
      <tabbar-item path="/home">
        <img src="~assets/img/tabbar/home.svg" slot="item-icon" alt=""/>
        <img src="~assets/img/tabbar/home_active.svg" slot="item-icon-active" alt=""/>
        <div slot="item-text">首页</div>
      </tabbar-item>
      <tabbar-item  path="/category">
        <img src="~assets/img/tabbar/category.svg" slot="item-icon" alt=""/>
        <img src="~assets/img/tabbar/category_active.svg" slot="item-icon-active" alt=""/>
        <div slot="item-text">分类</div>
      </tabbar-item>
      <tabbar-item  path="/cart">
        <img src="~assets/img/tabbar/shopcart.svg" slot="item-icon" alt=""/>
        <img src="~assets/img/tabbar/shopcart_active.svg" slot="item-icon-active" alt=""/>
        <div slot="item-text">购物车</div>
      </tabbar-item>
      <tabbar-item  path="/profile">
        <img src="~assets/img/tabbar/profile.svg" slot="item-icon" alt=""/>
        <img src="~assets/img/tabbar/profile_active.svg" slot="item-icon-active" alt=""/>
        <div slot="item-text">我的</div>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
  import Tabbar from "components/common/tabbar/Tabbar"
  import TabbarItem from "components/common/tabbar/TabbarItem"

  export default {
    name: "MainTabbar",
    components: {
      TabbarItem,
      Tabbar
    }
  }
</script>

<style scoped>

</style>
