<template>
  <div class="MyProject animated bounceInLeft">
    <el-row class="container">
      <el-col class="colItemm" v-for="item in arr" :key="item.absoluteUrl">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="item.url" class="image" />
          <div style="padding: 14px;">
            <span>{{ item.title }}</span>
            <div class="bottom clearfix">
              <time class="time">{{ item.time }}</time>
              <el-button type="text" class="button"
                ><a :href="item.github">查看项目</a></el-button
              >
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name:"MyProject",
  data() {
    return {
      arr: [],
    };
  },
  mounted() {
    this.$axios.get("/api/getMyProject").then((res) => {
      console.log(res.data);
      let arr = res.data;
      // arr.reverse()
      // console.log(arr)

      this.arr = arr;
    });
  },
};
</script>

<style scoped>
.MyProject {
  width: 100%;
  margin-top: 4rem;
  background: #fff;
  border-radius: 4px;
  min-height: 100vh;
  padding: 2rem;
  box-sizing: border-box;
  border: 1px solid #ebeef5;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.colItemm {
  height: 205px;
}
.el-col-24 {
  width: 36%;
  margin: 3% 7%;
  border-radius: 6px;
}
.el-col-24:hover {
  box-shadow: 0 0 4px 3px #ddd;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}



.image {
  width: 100%;
  display: block;
  height:131px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
