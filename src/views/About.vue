<template>
  <div>
    <el-card class="box-card animated bounceInLeft"><div v-html="html" v-highlight class="showDetail"></div> </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      html: "",
    };
  },
  mounted(){
    this.$axios.get("/api/getAbout").then((res) => {
      console.log(res.data.toString());
      // console.log(res.data)

      this.html = this.$marked(res.data.toString());
      // console.log(res.data)
    });
  }
};
</script>

<style scoped>
.text {
  font-size: 14px;
}

.box-card {
  min-height: 100vh;
  margin-top: 4rem;
}
</style>
