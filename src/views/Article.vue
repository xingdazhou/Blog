<template>
  <div class="container animated bounceInLeft">
    <el-card v-if="!arr.length" class="box-card animated bounceInLeft">
      还没有写相关笔记。。。
    </el-card>
    <!-- 一条文章 -->
    <div
      v-else
      class="article"
      @click="goShowDetail(item.title, item.eye)"
      v-for="item in arr"
      :key="item.desc"
    >
      <div class="left">
        <!-- 标题 -->
        <div class="title">
          <div class="title-top">
            {{ item.title.split(".")[0] }}
          </div>
          <div class="title-bottom">
            {{ item.desc }}
          </div>
        </div>
        <!-- 下边时间 -->
        <div class="time">
          <div>
            <i class="iconfont bottomI">&#xe671;</i>查看<span>{{
              item.eye
            }}</span>
          </div>
          <div><i class="iconfont bottomI">&#xe63e;</i>{{ item.time }}</div>
          <div><i class="iconfont bottomI">&#xe62d;</i>{{ item.tag }}</div>
        </div>
      </div>

      <!-- 右边图片 -->
      <div class="right">
        <img :src="item.img" alt="" />
      </div>
    </div>

    <div class="bottomMore" v-if="showBottom && arr.length >= 10">
      上拉加载更多！！！
    </div>
    <div class="bottomMore" v-else>
      没有数据了！！！
    </div>
  </div>
</template>
<script>
export default {
  name: "Article",
  data() {
    return {
      arr: [],
      flag: true,
      filename: "",
      showBottom: true,
    };
  },
  // mounted() {
  //   this.$axios.get("/api/getArticleDir").then((res) => {
  //     console.log(res.data);
  //     this.arr = res.data.reverse();
  //   });
  // },
  mounted() {
    window.addEventListener("scroll", this.getJuLi, true);
  },

  //这里监听路由变化，从slider组件传值过来由于本组件已加载，所以只能监听路由变化来获取
  watch: {
    // $route(to) {
    //   console.log(to.query.filename);
    //   let filename = to.query.filename;
    //   this.$axios
    //     .get(`/api/getSubArticleDir?filename=${filename}`)
    //     .then((res) => {
    //       console.log(res.data);
    //       this.arr = res.data
    //     });
    // },
    $route: {
      immediate: true,
      handler: function(to) {
        // console.log(to)
        console.log("tag :" + to.query.filename);
        let filename = to.query.filename;
        this.filename = filename;
        this.$axios
          .get(`/api/getSubArticleDir?filename=${filename}`)
          .then((res) => {
            console.log("第一次请求arr长度：" + res.data.length);
            // this.arr = res.data.reverse();
            this.arr = res.data;
          });
      },
    },
  },
  activated() {
    console.log("activated");
  },
  methods: {
    //下拉加载

    // throttle(handler, wait) {
    //   var lastTime = 0;
    //   return function() {
    //     var nowTime = new Date().getTime();
    //     if (nowTime - lastTime > wait) {
    //       handler.apply(this, arguments);
    //       lastTime = nowTime;
    //     }
    //   };
    // },

    getJuLi() {
      this.showBottom = true; //每次下拉就设置为true，再根据返回结果为0决定设置为false
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      let windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      let scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      // console.log(scrollTop + windowHeight, scrollHeight - 30);
      if (scrollTop + windowHeight >= scrollHeight - 20 && this.flag) {
        this.flag = false;
        console.log("触底");
        console.log("触底获取数组长度" + this.arr.length);
        this.$axios
          .get(
            `/api/getSubArticleDir?filename=${this.filename}&skip=${this.arr.length}`
          )
          .then((res) => {
            console.log("返回arr长度：" + res.data.length);
            if (res.data.length == 0) {
              this.showBottom = false;
              this.flag = true;
            } else {
              this.arr = this.arr.concat(res.data);
              this.flag = true;
            }
          });
      }
    },
    //去指定文章页
    goShowDetail(filename, eye) {
      this.$router.push({
        name: "ShowDetail", //params传参只能是name路由不能是path
        params: {
          filename,
          eye,
        },
      });
    },
  },
};
</script>
<style scoped>
/* div {
  border: 1px solid #ccc;
} */
.bottomMore {
  width: 100%;
  text-align: center;
  height: 30px;
  line-height: 30px;
}

.container {
  margin-top: 4rem;
  min-height: 78vh;
}
.article {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 8rem;
  color: #333;
  margin-bottom: 1rem;
  /* border-bottom: 1px solid #ccc; */
  cursor: pointer;
  background: #fff;
  border-radius: 6px;
}
.article:hover {
  box-shadow: 0 0 3px 3px #ddd;
  transition: all 0.5s;
}

.article .left {
  width: 83%;
}
.article .right {
  width: 18%;
  background: #77ffcc;
  border-radius: 6px;
}
.article .left {
  display: flex;
  flex-direction: column;
}
.article .left .title {
  height: 80%;
}
.article .left .time {
  height: 20%;
  padding: 0 0.5rem;
  color: #555;
  font-size: 12px;
  box-sizing: border-box;
}
.left .time div {
  display: inline-block;
  margin-right: 1rem;
}
.title {
  display: flex;
  flex-direction: column;
}
.title-top {
  height: 30%;
  font-size: 22px;
  font-weight: bold;
  padding: 0.5rem;
  white-space: nowrap;
  /* box-sizing: border-box; */
  overflow: hidden;
  text-overflow: ellipsis;
}
.title-top:hover {
  color: #000;
}
.title-bottom {
  height: 40%;
  padding: 0 0.5rem;
  box-sizing: border-box;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: #555;
  font-size: 15px;
}
.bottomI {
  color: #555;
  font-size: 13px;
  margin: 0 10px;
}
.right img {
  width: 100%;
  height: 100%;
  /* vertical-align: middle; */
  border-radius: 0 6px 6px 0;
}
.animated {
  z-index: -1;
}
</style>
