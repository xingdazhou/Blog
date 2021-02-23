<template>
  <div class="box-card animated bounceInRight" ref="card">
    <el-card class="card">
      <div class="block">
        <el-avatar :size="80" :src="circleUrl"></el-avatar>
        <div class="name">阿达同学的博客</div>
        <div class="top_bottom">
          <div>Article : {{ArticleAll}}</div>
          <div>Tag : {{TagAll}}</div>
        </div>
      </div>
      <div class="tips">
        <el-tag
          effect="dark"
          v-for="(item, index) in tagNum"
          :type="['', 'success', 'info', 'danger', 'warning'][index % 5]"
          :key="item.tag"
        >
          <router-link
            tag="div"
            :to="{ name: 'Article', query: { filename: item.tag } }"
          >
            {{ item.tag }}
            <div class="tagnum">{{ item.num }}</div>
          </router-link>
        </el-tag>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      circleUrl: require("../assets/img/TX.jpg"),
      tagNum: [],
      ArticleAll:0,
      TagAll:0,
    };
  },
  mounted() {
    document.addEventListener(
      "scroll",
      () => {
        // console.log(window.pageYOffset);
        if (window.pageYOffset > 200) {
          // console.log(this.$refs.card);
          this.$refs.card.style.position = "fixed";
        } else {
          this.$refs.card.style.position = "absolute";
        }
      },
      true
    );
    this.$axios.get("/api/getTagNum").then((res) => {
      // console.log(res.data);
      // console.log("tag :" + res.data.length);
      let TagNum = res.data.reduce((pre, cur) => {
        return {num:pre.num + cur.num};
      });
      // console.log("Article :" + num.num);
      this.ArticleAll = TagNum.num
      this.TagAll = res.data.length
      this.tagNum = res.data;
    });
  },
};
</script>

<style scoped>
.tagnum {
  position: absolute;
  top: -15px;
  right: -11px;
  width: 20px;
  height: 20px;
  background:#bdbdbd;
  color: #fff;
  border-radius: 50%;
  line-height: 20px;
  text-align: center;
  font-size: 13px;
}
.box-card {
  width: 25vw;
  height: 80%;
  position: absolute;
  right: 2rem;
  top: 5rem;
  border: none;
  transition: all 1s;
}
.card {
  min-height: 80vh;
}
.block {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* margin-top: 1rem; */
}
.block .name {
  font-size: 25px;
  font-weight: 700;
  padding: 1rem;
  /* margin: 1rem; */
  /* border-bottom: 1px solid #ccc; */
}
.top_bottom {
  width: 100%;
  text-align: center;
  margin-bottom: 1rem;
  border-bottom: 1px solid #ccc;
}
.top_bottom div {
  width: 49%;
  display: inline-block;
  padding: 1rem;
  box-sizing: border-box;
}
.top_bottom div:first-child {
  border-right: 1px solid #ccc;
}

.tips {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.tips span {
  position: relative;
  display: inline-block;
  margin: 10px 5px;
  font-size: 16px;
  cursor: pointer;
}
</style>
