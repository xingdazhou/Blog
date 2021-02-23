
<template>
  <div class="header  " >
    <div class="header-container">
      <div class="container">
        <!-- logo -->
        <div class="logo">
          <router-link to="/">
            <img src="../assets/Z.jpg" alt="首页" />
          </router-link>
        </div>
        <!-- 右边列表 -->
        <ul class="nav">
          <li>
            <router-link to="/">首页</router-link>
          </li> 
          <li>
            <el-dropdown @command="handleCommand"  trigger="click">  
              <router-link tag="div" to='/front'>
                分类文章
                <!-- <el-tag>标签一</el-tag> -->
              </router-link>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">前端</el-dropdown-item>
                <el-dropdown-item command="b">后端</el-dropdown-item>
                <el-dropdown-item command="c">算法</el-dropdown-item>
                <el-dropdown-item command="d">小程序</el-dropdown-item>
                <el-dropdown-item command="e">网络</el-dropdown-item>
                <el-dropdown-item command="e">安全</el-dropdown-item>

              </el-dropdown-menu>
            </el-dropdown>
            <!-- <router-link to="/front">前端</router-link> -->
          </li>
          <li>
            <router-link to="/back">后端</router-link>
          </li>
          <li>
            <router-link to="/algorithm">算法</router-link>
          </li>
          <li>
            <router-link to="/applets">小程序</router-link>
          </li>
          <li>
            <router-link to="/network">网络</router-link>
          </li>
          <li>
            <router-link to="/project">项目</router-link>
          </li>
          <li>
            <a href="https://xingdazhou.github.io">github</a>
          </li>
        </ul>
        <!-- 中间搜索框 -->
        <input class="inp" v-model="input" placeholder="请输入内容" />
        <!-- 右边按钮 -->
        <div class="right">
          <el-button class="right_btn" @click="handleClick" icon="el-icon-menu">
          </el-button>
          <el-dialog
            :visible.sync="centerDialogVisible"
            width="100%"
            center
            :modal="false"
            top="3rem"
            :show-close="false"
          >
            <ul class="right_nav" @click="closeModal">
              <li>
                <router-link to="/">首页</router-link>
              </li>
              <li>
                <router-link to="/front">前端</router-link>
              </li>
              <li>
                <router-link to="/back">后端</router-link>
              </li>
              <li>
                <router-link to="/algorithm">算法</router-link>
              </li>
              <li>
                <router-link to="/applets">小程序</router-link>
              </li>
              <li>
                <router-link to="/network">网络</router-link>
              </li>
              <li>
                <router-link to="/project">项目</router-link>
              </li>
              <li>
                <a href="https://xingdazhou.github.io">github</a>
              </li>
            </ul>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template> */

<script>
export default {
  data() {
    return {
      input: "",
      centerDialogVisible: false,
    };
  },
  methods: {
    handleClick() {
      this.centerDialogVisible = !this.centerDialogVisible;
    },

    handleCommand(command){
        console.log(command)
        alert(command)
    },

    closeModal() {
      this.centerDialogVisible = !this.centerDialogVisible;
    },
  },
};
</script>

<style scoped>
.inp {
  position: absolute;
  top: 0.3rem;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 50%;
  border-radius: 15px;
  outline: none;
  height: 2rem;
  border: 1px solid;
}
.right,
.inp {
  display: none;
}
.header {
  height: 4rem;
}
.header-container {
  height: 4rem;
  background: #fff;
  color: #333;
  line-height: 4rem;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  display: flex;
  z-index:9999;
}
.container {
  display: flex;
  width: 90%;
  margin: 0 auto;
}
.logo a {
  display: flex;
  align-items: center;
  height: 100%;
}
.logo img {
  width: 3rem;
  height: 3rem;
}
.nav {
  margin: 0 60px;
  display: flex;
  flex-grow: 1;
  word-break: keep-all;
}
ul {
  padding: 0;
  margin: 0;
}
li {
  list-style: none;
}
.nav a {
  display: block;
  padding: 0 25px;
}
/* 这个router-link-exact-active类样式是router-link匹配到了之后加上的类样式 */
.nav .router-link-exact-active {
  color: #fcb85f;
  cursor:pointer
}
.nav div.router-link-exact-active:focus{
  outline:none;
}
.el-dropdown{
  outline:none
}
.user {
  font-size: 14px;
}
.user * {
  margin-left: 10px;
}
.header a {
  color: #333;
}



/* 手机端 */
@media screen and (max-width: 400px) {
  .nav {
    display: none;
  }
  .right,
  .inp {
    display: block;
  }
  .right_btn {
    position: absolute;
    right: 0.3rem;
    top: 0.3rem;
  }
  .right ul li {
    text-align: center;
    border-bottom: 1px solid #ccc;
  }
}

 .el-dropdown{
     font-size: inherit;
 }
 .nav a:-webkit-any-link:focus{
     outline-offset: none;
 }
</style>
