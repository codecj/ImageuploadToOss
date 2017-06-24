<template>
  <div @click="backTap()" class="depot">
  	<ul>
  		<li v-for="depot in depotList" @click.stop="selectDepot(depot)" class="borderB"><label>{{depot.NAME}}</label></li >
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
			backTap(){
				this.$emit('cancelDepotList');
			},
			cancelView(){
				this.$emit('cancelDepotList');
			},
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
		top:0px;
		bottom: 0px;
	}
		
	.depot ul{
		width: 100%;
		overflow:scroll;
		position: absolute;
		bottom: 120px;
		max-height: 640px;
	}

	.depot li{
		width: 100%;
		height: 98px;
		background-color: white;
		padding: 1px;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}
	.depot li label{
		display: block;
		width: 100%;
		height: 95px;
		line-height: 95px;
		text-align: center;
		background-color: white;
	}
	

	.depot div{
		width: 100%;
		height: 98px;
		background-color: white;
		position: absolute;
		bottom: 0;
	}

	.depot div label{
		display: block;
		font-size: 34px;
		margin: 0px auto;
		width: 100%;
		height: 98px;
		line-height: 98px;
		text-align: center;
	}

</style>

