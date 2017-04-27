<template>
  <div id="">
    <h1>I am a title.</h1>
    <a href=""> written by {{ author }} </a>
  </div>
</template>

<script type="text/javascript">
import page from  "../util/page";
import {Toast} from 'mint-ui';

export default {
  data () {
    return {
      author: "微信公众号 jinkey-love"
    }
  },
   mounted: function() {
    console.log('pageNO: ' + page.pageNo);
  }
}
</script>

<style>
</style>