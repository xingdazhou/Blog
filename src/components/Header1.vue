<template>
  <div class="header">
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#fff"
      text-color="#000"
      active-text-color=" #fcb85f"
    >
      <el-menu-item class="logo">
        <router-link to="/">
          <img src="../assets/img/Z.jpg" alt="首页" /> </router-link
      ></el-menu-item>
      <el-menu-item><router-link to="/">首页</router-link></el-menu-item>
      <el-menu-item index="1">
          <router-link tag="div" to="/Article">文章</router-link></el-menu-item
        >
      <!-- <el-submenu index="1">
        <template slot="title">
          分类文章
        </template>
        <el-menu-item index="2-1">
          <router-link tag="div" to="/Article">前端</router-link></el-menu-item
        >
        <el-menu-item index="2-2">后端</el-menu-item>
        <el-menu-item index="2-3">算法</el-menu-item>
        <el-menu-item index="2-4">小程序</el-menu-item>
        <el-menu-item index="2-5">网络</el-menu-item>
        <el-menu-item index="2-7">设计模式</el-menu-item>
      </el-submenu> -->
      <el-menu-item index="2">
        <router-link to="/TimeLine">时间线</router-link></el-menu-item
      >
      <el-menu-item index="3">
        <router-link to="/MyProject">
          项目
        </router-link>
      </el-menu-item>
      <el-menu-item index="4">
        <router-link to="/LiCheng">历程</router-link></el-menu-item
      >
      <el-menu-item index="5"
        ><a href="https://github.com/xingdazhou" target="_blank"
          >github</a
        ></el-menu-item
      >
      <el-menu-item index="6"
        ><router-link to="/About">关于</router-link></el-menu-item
      >
      <div class="dengpao" @click="changeYellow">
        <i class="iconfont" :class="isYellow">&#xe625;</i>
      </div>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1", 
      activeIndex2: "1",
      isYellow: "",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    changeYellow() {
      if (this.isYellow == "") {
        this.isYellow = "addyellow";
        //这里设置会背景黑
        this.$store.dispatch("changeToNight");
        document.body.style.background = "black";
        document.querySelector('#app').style.opacity = '0.9'
      } else {
        this.isYellow = "";
        //这里设置会背景白
        this.$store.dispatch("changeToNight");
        document.body.style.background = "white";
        document.querySelector('#app').style.opacity = '1'

      }
    },
  },
};
</script>

<style scoped>
.dengpao {
  display: inline-block;
  padding: 0 20px;
  height: 60px;
  line-height: 60px;
  outline: none;
}
.dengpao i {
  font-size: 26px;
  cursor: pointer;
}
.addyellow {
  color: yellow;
}
.el-button.is-circle {
  margin-top: 10px;
  border: none;
  /* color:yellow; */
  font-size: 20px;
}
.el-menu-demo {
  /* padding:0 5rem; */
}
.el-menu--horizontal > .el-menu-item.logo {
  margin-left: 2rem;
  margin-right: 2rem;
}
.logo:hover {
  background: #fff !important;
}
.logo img {
  width: 3rem;
  height: 3rem;
}
.header {
  position: fixed;
  width: 100%;
  z-index: 999;
}
</style>
