<template>
  <div class="block animated bounceInLeft">
    <el-timeline>
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :timestamp="activity.timestamp"
        placement="top"
      >
        <el-timeline>
          <el-timeline-item
            v-for="(activityItem, index) in activity.items"
            :key="index"
            :timestamp="activityItem.timestamp"
          >
            <span style="color:#666"> {{ activityItem.content }}</span>
          </el-timeline-item>
        </el-timeline>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  name: "TimeLine",
  data() {
    return {
      activities: [
        {
          timestamp: "2021",
          items: [
            {
              content: "开始学习jquery",
              timestamp: "2019.5",
            },
            {
              content: "开始学习HTML,CSS,JavaScript",
              timestamp: "2019.5",
            },
            {
              content: "了解前端",
              timestamp: "2019.4",
            },
          ],
        },
        {
          timestamp: "2020",
          items: [
            {
              content: "开始学习jquery",
              timestamp: "2019.5",
            },
            {
              content: "开始学习HTML,CSS,JavaScript",
              timestamp: "2019.5",
            },
            {
              content: "了解前端",
              timestamp: "2019.4",
            },
          ],
        },
        {
          timestamp: "2019",
          items: [
            {
              content: "开始学习jquery",
              timestamp: "2019.5",
            },
            {
              content: "开始学习HTML,CSS,JavaScript",
              timestamp: "2019.5",
            },
            {
              content: "了解前端",
              timestamp: "2019.4",
            },
          ],
        },
      ],
    };
  },
  mounted() {
    this.$axios.get("/api/getTimeLine").then((res) => {
      let arr = res.data;
      let lastArr = [];
      for (let i of arr) {
        if (!lastArr.find((item) => item.timestamp === i.year)) {
          let obj = {};
          obj.timestamp = i.year;
          obj.items = [];
          obj.items.push({ content: i.title, timestamp: i.time });
          lastArr.push(obj);
        } else {
          for (let j = 0; j < lastArr.length; j++) {
            if (i.year === lastArr[j].timestamp) {
              lastArr[j].items.push({ content: i.title, timestamp: i.time });
            }
          }
        }
      }
      lastArr.sort((a, b) => {
        return b.timestamp - a.timestamp;
      });
      lastArr.forEach((item) => {
        item.items.reverse();
      });
      console.log(lastArr);
      this.activities = lastArr;
    });
  },
};
</script>

<style scoped>
.block {
  margin-top: 4rem;
  border-radius: 6px;
  padding: 2rem 1rem;
  min-height: 100vh;
}
</style>
