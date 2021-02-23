<template>
  <div class="backcolor" v-show="is_night">
    <div v-for="item in 100" :key="item" class="star" ref="star">*</div>
  </div>
</template>

<script>
export default {
  props:['is_night'],
  mounted() {
    console.log(this.$refs.star[0]);
    let i;
    let len = 100;
    let length = document.documentElement.clientWidth;
    // we use for loop to assign unique random values for the x position and animation speed
    for (i = 0; i < len; i++) {
      let x = Math.floor(Math.random() * length); //0 - 100
      let y = Math.floor(Math.random() * 10); //0-10
      // 随机获得每个每个星星相对自身往右移动的距离x
      this.$refs.star[i].style.transform = "translateX(" + x + "px)";
      // 每个星星的动画时间都不同
      this.$refs.star[i].style.animationDuration = y + "s";
    }
  },
};
</script>

<style scoped>
.backcolor {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
}
.star {
  /* 每个star都要animation */
  color: yellow;
  animation-name: blink;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  /* background:green */
}
@keyframes blink {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
