<!-- 联动分类插件 -->
<template>
  <div
    class='vue-classify'
    :style="{ height:  innerHeight }"
  >
    <div
      ref="menu"
      class="classify-menu"
    >
      <div
        ref="menuInner"
        class="menu-inner"
      >
        <div
          class="classify-menu-item"
          :class="{'active': active === index}"
          :style="{height:  menuItemHeight + 'px', 'line-height': menuItemHeight + 'px'}"
          v-for="(item, index) in classifyList"
          :key="index"
          @click="menuClick(index)"
        >
          {{item[menuNameKey]}}
        </div>
      </div>

    </div>
    <div
      ref="wrap"
      class="classify-wrap"
      @scroll="handleWrapScroll"
    >
      <div
        ref="inner"
        class="classify-wrap-inner"
      >
        <div
          class="classify-wrap-list"
          v-for="(list, index) in classifyList"
          :key="index"
        >
          <slot
            :name="list[key]"
            :data="list"
            :index="index"
          >
            <p class="classify-wrap-list-hd">
              {{list[menuNameKey]}}
            </p>
            <div class="classify-wrap-list-main">
              <div
                class="classify-wrap-item"
                v-for="(item, i) in list[listKey]"
                :key="i"
              >
                <span class="index">{{i + 1}}</span>
                <span class="name"> {{item[listNameKey]}} </span>
              </div>
            </div>
          </slot>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "andyClassify",
  props: {
    classifyList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    height: String,
    keyOptions: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      active: 0, // 激活菜单
      rectTopList: [], // 高度区间
      innerHeight: "", // 容器高度
      timeOut: null,
      scrollMenuTime: null,
      scrollTime: null,
      menuItemHeight: 46, // 左侧单个菜单高度
      menuHeight: 0,
      menuInnerHeight: 0,
      wrapHeight: 0,
      wrapInnerHeight: 0
    };
  },
  computed: {
    // 唯一字段key
    key() {
      return this.keyOptions["key"] || "key";
    },
    // 菜单name的key
    menuNameKey() {
      return this.keyOptions["menuName"] || "name";
    },
    // 右侧内容key
    listKey() {
      return this.keyOptions["list"] || "list";
    },
    listNameKey() {
      return this.keyOptions["listName"] || "name";
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    // 初始化
    init() {
      this.innerHeight = this.height || window.innerHeight + "px";
      // 获取左侧菜单dom数组
      let els = document.getElementsByClassName("classify-wrap-list");
      let arr = [0];
      let top = 0;
      // Array.from()
      Array.prototype.slice.call(els).map((item, index) => {
        // 添加距离顶部高度数据
        top += item.getBoundingClientRect().height;
        arr.push(top);
      });
      this.rectTopList = [...arr];
      this.getDomRect();
    },
    // 获取所需元素高度
    getDomRect() {
      this.$nextTick(() => {
        // 主内容容器高度
        this.wrapHeight = this.$refs.wrap.getBoundingClientRect().height;
        // 主内容内部实际高度
        this.wrapInnerHeight = this.$refs.inner.getBoundingClientRect().height;
        // 左侧菜单容器高度
        this.menuHeight = this.$refs.menu.getBoundingClientRect().height;
        // 左侧菜单实际高度
        this.menuInnerHeight = this.$refs.menuInner.getBoundingClientRect().height;
      });
    },
    // 监听内容区域滚动事件
    handleWrapScroll(e) {
      if (this.scrollTime) {
        return false;
      }
      let scrollTop = e.target.scrollTop;
      this.timeout && clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        for (let i = 0; i < this.rectTopList.length; i++) {
          let h1 = this.rectTopList[i];
          let h2 = this.rectTopList[i + 1];
          if (!h2 || (scrollTop >= h1 && scrollTop < h2)) {
            this.active = i; // 当前激活菜单
            this.updateMenuScroll(i);
            return false;
          }
        }
        this.active = 0;
        this.timeOut = null;
      }, 10);
    },
    updateMenuScroll(index) {
      let offset = this.$refs.menu.scrollTop;
      let needScroll = this.menuItemHeight * index;
      let dis = needScroll - offset;
      if (dis < 0) {
        this.scrollAnimate(this.$refs.menu, needScroll, "scrollMenuTime");
      }
      if (dis >= this.menuHeight - this.menuItemHeight) {
        let target =
          this.menuInnerHeight - offset - this.menuItemHeight > 0
            ? offset + this.menuItemHeight
            : offset;
        this.scrollAnimate(this.$refs.menu, target, "scrollMenuTime");
      }
    },
    // 监听菜单点击事件
    menuClick(index) {
      this.scrollTime && clearInterval(this.scrollTime);
      this.active = index;
      let maxTop = this.wrapInnerHeight - this.wrapHeight;
      let target = Math.min(this.rectTopList[index], maxTop);
      this.scrollAnimate(this.$refs.wrap, target, "scrollTime");
    },
    // 滚动动画
    scrollAnimate(el, target, time) {
      clearInterval(this[time]);
      this[time] = null;
      this[time] = setInterval(() => {
        let top = el.scrollTop;
        if (Math.abs(target - top) <= 5) {
          el.scrollTop = target;
          clearInterval(this[time]);
          this[time] = null;
          return false;
        }
        let dis = target - top;
        let ispeed = Math.floor(dis / 5);
        el.scrollTop = top + ispeed;
      }, 15);
    }
  }
};
</script>
<style lang='scss' scoped>
.vue-classify {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  height: 100%;
  width: 100%;
  overflow: hidden;
  .classify-menu {
    height: 100%;
    width: 72px;
    overflow-y: auto;
    background: #fafafa;
    &-item {
      text-align: center;
      font-size: 13px;
      &.active {
        position: relative;
        background-color: #fff;
        &::before {
          content: "\a0";
          position: absolute;
          left: 0;
          top: 50%;
          height: 30px;
          width: 3px;
          background-color: #02b997;
          transform: translate(0, -50%);
          border-top-right-radius: 2px;
          border-bottom-right-radius: 2px;
        }
      }
    }
  }
  .classify-wrap {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    height: 100%;
    overflow-y: auto;
    &-list {
      &-hd {
        padding: 0 15px 0 20px;
        height: 46px;
        line-height: 46px;
        font-size: 15px;
        background-color: #fafafa;
        font-weight: 600;
      }
    }
    &-item {
      padding: 0 15px 0 20px;
      height: 46px;
      line-height: 46px;
      box-sizing: border-box;
      font-size: 15px;
      color: #111;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      .index + .name {
        margin-left: 12px;
      }
    }
  }
}
</style>
