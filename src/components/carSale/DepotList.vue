<template>
  <div @click="backTap()" class="depot">
  	<ul>
  		<li v-for="depot in depotList" @click.stop="selectDepot(depot)"><label>{{depot.depotName}}</label></li >
  	</ul>
	<div @click.stop="cancelView()"><label>取消</label></div>
  </div>
</template>
<script>
	export default {
		data () {
			return {
				msg: ''
			}
		},
		props: {
			depotList: Array
		},
		methods: {
			backTap:() => { alert('点击了背景') },
			cancelView:() => { alert('取消') },
			selectDepot(depot){
				this.$emit('depotSelected',depot);
			}
			// selectDepot:(depot) => {  this.$emit('depotSelected',depot); }
		}
	}

</script>
<style scoped>

	.depot{
		width: 100%;
		background: rgba(0, 0, 0, 0.3);
		position: fixed;
		z-index: 999;
		top:88px;
		bottom: 0px;
	}
		
	.depot ul{
		width: 100%;
		overflow:scroll;
		position: absolute;
		bottom: 100px;
		max-height: 600px;
	}

	.depot li{
		width: 100%;
		height: 88px;
		background-color: white;
		padding: 1px;
	}
	.depot li label{
		display: block;
		width: 100%;
		height: 86px;
		line-height: 86px;
		text-align: center;
		background-color: white;
	}
	

	.depot div{
		width: 100%;
		height: 88px;
		background-color: white;
		position: absolute;
		bottom: 0;
	}

	.depot div label{
		display: block;
		font-size: 34px;
		margin: 0px auto;
		width: 100%;
		height: 88px;
		line-height: 88px;
		text-align: center;
	}

</style>