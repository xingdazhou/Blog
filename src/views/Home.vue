<template>
  <div class="container">
    <div class="home">
      <div class="block">
        <el-avatar :size="100" :src="circleUrl"></el-avatar>
      </div>
      <div class="tag" @click="goMain">
        <el-tag class="tag1">文章</el-tag>
        <el-tag class="tag2"
          ><a href="https://juejin.im/user/1591748569335694">掘金</a>
        </el-tag>
        <el-tag class="tag3"
          ><a href="https://github.com/xingdazhou">github</a></el-tag
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      circleUrl: require("../assets/img/TX.jpg"),
    };
  },
  components: {},
  methods: {
    goMain(e) {
      if (e.target.textContent == "文章") {
        this.$router.push("/Article");
      }
      //  else if (e.target.textContent == "掘金") {
      //   this.$router.push("/front");
      // } else if (e.target.textContent == "github") {
      //   this.$router.push("/front");
      // }
    },
  },
};
</script>
<style scoped>
/* .block{
  position:absolute;
  top:0;
  left:0;
  z-index: 1;
} */
.container{
  height:100Vh;
  overflow: hidden;
}
.home {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%);
}
.tag1,
.tag2,
.tag3 {
  display: inline-block;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  line-height: 80px;
  font-size: 20px;
  text-align: center;
  opacity: 0;
  position: absolute;
  top: 10px;
  left: 10px;
  transition: all 1s;
  cursor: pointer;
  z-index: -1;
}

.home:hover .tag1 {
  position: absolute;
  top: -45px;
  left: -102px;
  opacity: 1;
}
.home:hover .tag2 {
  position: absolute;
  top: -45px;
  left: 124px;
  opacity: 1;
}
.home:hover .tag3 {
  position: absolute;
  top: 130px;
  left: 16px;
  opacity: 1;
}
</style>
