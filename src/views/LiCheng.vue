<template>
  <div class="block animated bounceInLeft">
    <el-timeline>
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :icon="activity.icon"
        :type="activity.type"
        :color="activity.color"
        :size="activity.size"
        :timestamp="activity.timestamp"
        placement="top"
      >
        <el-card>
          <h2>{{ activity.title }}</h2>
          <p>{{ activity.content }}</p>
          <p>{{ activity.footerTime }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activities: [],
    };
  },
  mounted(){
    this.$axios.get("/api/getLiCheng").then((res) => {
      // console.log(res.data)
      let arr = res.data
      arr.reverse()
      // console.log(arr)

      this.activities = arr

    });
  }
};
</script>

<style scoped>
.block {
  margin-top: 4rem;
  min-height: 100vh;
}
</style>
