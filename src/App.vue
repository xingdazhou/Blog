<template>
  <div id="app">
    <!-- 导航条 -->
    <Header v-show="$store.state.homeShow" />
    <!-- 左边中间视图 -->
    <div :class="attr">
      <keep-alive include="MyProject,TimeLine">
        <router-view></router-view>
      </keep-alive>
    </div>
    <!-- 扩展小半圆按钮，难实现
    <div
      @click="change"
      class="toggle animated bounceInRight" 
      v-show="$store.state.toggle"
      :title="title"
    ></div>    -->

    <!-- 右边区域 -->
    <Slider v-show="$store.state.homeShow" />

    <BackColor :is_night="$store.state.is_night" />

    <!-- 当页面足够长之后就会出现返回顶部，不局限某个组件 -->
    <scrollToTop />
    <!-- 底部区域 -->
    <Footer v-show="$store.state.homeShow" />
  </div>
</template>

<script>
import Header from "./components/Header1.vue";
import Slider from "./components/Slider.vue";
import BackColor from "./components/plugin/BackColor";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    Header,
    Slider,
    BackColor,
    Footer,
  },
  data() {
    return {
      title: "展开",
      attr: "wrap",
    };
  },
  methods: {
    change() {
      if (this.title == "展开") {
        this.title = "收起";
        this.attr = "wrapAll";
      } else {
        this.title = "展开";
        this.attr = "wrap";
      }
    },
  },
};
</script>

<style>
.wrap {
  width: 65vw;
  padding: 1rem 3rem;
}
.wrapAll {
  width: 80vw;
  padding: 1rem 3rem;
}

.toggle {
  position: fixed;
  top: 49vh;
  left: calc(69vw - 7px);
  /* background:red; */
  /* z-index:-1; */
  width: 20px;
  height: 40px;
  background: #fff;
  padding: 3px;
  box-sizing: border-box;
  /* border-radius: 50%; */
  border-radius: 0 80px 80px 0;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: display 1s;
}
</style>
