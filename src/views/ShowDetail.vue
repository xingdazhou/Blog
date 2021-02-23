<!--
 * @Author: zhouxingda
 * @Date: 2020-11-13 17:39:50
 * @LastEditTime: 2021-01-05 09:33:17
 * @FilePath: \vue-blog\src\views\ShowDetail.vue
-->
<template>
  <div class="detail animated bounceInLeft">
    <div v-html="html" v-highlight class="showDetail"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      html: "",
    };
  },
  mounted() {
    console.log(this.$route.params);
    this.$axios
      .get(
        "/api/getArticle?filename=" +
          this.$route.params.filename +
          "&eye=" +
          this.$route.params.eye
      )
      .then((res) => {
        let data = res.data;
        let reg = /(\.\.\/assets\/image)/g;
        data = data.replace(reg, "http://120.26.178.226:7000/markedPic/image");
        this.html = this.$marked(data.toString());
        let reg1 = /(<img)/g;
        this.html = this.html.replace(reg1, '<img style="max-width:100%"');
        // console.log(this.html);
      });
  },
};
</script>

<style scoped>
.showDetail {
  background: #fff;
  padding: 1rem 2rem;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  min-height: 100vh;
  word-break: break-all;
}
p {
  word-break: break-all;
}
.detail {
  margin-top: 4rem;
  position: relative;
  z-index: 99;
}
</style>
