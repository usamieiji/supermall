import {debounce} from "./utils"
import {BACK_POSITION} from "./const"

import BackTop from "components/common/backTop/BackTop"
import GoodsList from "components/content/goods/GoodsList"
import Scroll from "components/common/scroll/Scroll"

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      isShowBackTop: false
    }
  },
  components: {
    BackTop,
    GoodsList,
    Scroll
  },
  mounted() {
    let refresh = debounce(this.$refs.scroll.refresh, 200)
    this.itemImgListener = () => {
      refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    }
  }
}

export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false
    }
  },
  components: {
    BackTop
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },
    listenShowBackTop(position) {
      this.isShowBackTop = -position.y > BACK_POSITION
    }
  }
}

export const otherMixin = {
  components: {
    GoodsList,
    Scroll
  }
}
