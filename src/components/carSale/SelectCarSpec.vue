<template>
  <div @click="backTap()" class="selectCarSpec">
  		
  </div>
</template>
<script>
	export default {
	    data () {
	        return {
	           msg: 'Welcome to Your Vue.js App'
	        }
	    }
	    ,
	    methods: {
	    	backTap(){
	    		alert('back');
	    	}
	    }
	}

</script>
<style scoped>

	.selectCarSpec{

		width: 100%;
		position: fixed;
		z-index:999;
		top:0px;
		bottom: 0px;
		background: rgba(0, 0, 0, 0.3);
		
	}
	.selectCarSpec .backView{
		width: 100%;
		position: absolute;
		bottom: 0px;
		/*top:0px;*/
		height: 800px;
		background-color: red;
		overflow: hidden;

	}

</style>