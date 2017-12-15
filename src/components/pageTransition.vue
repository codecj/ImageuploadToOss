<template>
  <div>
  <transition :name='transitionName'>
    <keep-alive>
      <router-view class="child-view" ></router-view>
    </keep-alive>
  </transition>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        transitionName: 'slide-left'
      }
    },
    beforeRouteUpdate (to, from, next) {

      let isBack = this.$router.isBack
      if (isBack) {
         // 点击返回页面
        this.transitionName = 'slide-right'
        this.$router.ifBack = true;


      } else {
        // 点击进入下一个页面
        this.transitionName = 'slide-left'
        this.$router.ifBack = false;

      }
      this.$router.isBack = false
      next()
    }
  }
</script>

<style scoped>
  .child-view {
    width:100%;
    transition: all .2s ease;
  }
  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100%, 0);
  }
</style>