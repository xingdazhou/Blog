<template>
  <div class="goTop" :style="{background:'url(' + guagua + ')'}"  @click="toTop" v-show="isShow" ref="ref1" ></div>
</template>

<script>
// import guagua from '../../assets/img/guagua.png'
export default {
  data() {
    return {
      isShow: false,
      guagua:require('../../assets/img/huojian.png')
    };
  },
  methods: {
    getScroll() {
        // console.log(window.pageYOffset);
        if (window.pageYOffset > 400) {
            // console.log(this.$refs.ref1)
          this.isShow = true;
        } else{
            this.isShow = false
        }
      },
    toTop() {
      // console.log(document.documentElement.scrollTop);
      this.fly();
    },
    fly() {
      // 先压缩
      this.$refs.ref1.style.transition = "0.5s"
      this.$refs.ref1.style.transform = "scale(1.5,0.5)";
      setTimeout(()=>{
        // 在起飞
        let duration = 1000,
          target = 0,
          tick = 16;
        let dis = target - document.documentElement.scrollTop; //获取到顶部距离
        let times = Math.ceil(duration / tick); //1s / 16ms 为多少个16ms
        let curTimes = 0;
        let everyDis = dis / times; //每个16ms走过的距离
        let timerId = setInterval(function() {
          // 移动一段距离
          document.documentElement.scrollTop += everyDis;
          curTimes++;
          if (times === curTimes) {
            // 移动完成
            clearInterval(timerId);
          }
        }, 16);
        this.$refs.ref1.style.transition = "1000ms"
        this.$refs.ref1.style.transform = "scale(1)"
        this.$refs.ref1.style.bottom = window.innerHeight+100+'px'  //bottom一下到顶部，用transition过度
        setTimeout(()=>{
            this.isShow = false;
            this.$refs.ref1.style.bottom = "2rem";
            this.$refs.ref1.style.right = "2rem";
        },1000)
      },500);

      this.isShow = true;
      this.$refs.ref1.style.bottom = "2rem";
      this.$refs.ref1.style.right = "2rem";
    },
  },
  mounted() {
    document.addEventListener(
      "scroll",
     this.getScroll,
      true
    );
  },
  destroyed(){
      document.removeEventListener('scroll',this.getScroll,true)
  }
};
</script>

<style scoped>
.goTop {
  cursor:pointer;
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  width: 5rem;
  height: 7rem;
  background-repeat: no-repeat !important;
  border-radius: 50%;
  background-size:contain !important;
  background-position: 50% !important;
  z-index:100;
}
</style>
