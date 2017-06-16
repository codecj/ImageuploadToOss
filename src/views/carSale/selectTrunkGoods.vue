<template>
  <div class="selectCarGoods">
  	<div class="nav borderB" @click="selectDev()">
  			
  			<label>仓库:{{dopName}}</label>
  			<img src='../../assets/icon20.png'></img>
 
  	</div>
  	<DepotList v-show="showDev" :depotList="depotList" @depotSelected='depotSelected'>
  		
  	</DepotList>
  	<div class="search">
  		<button @click="scan()">扫一扫</button>
  		<form @submit.prevent="search">
  			<input id="search" placeholder="请输入关键字搜索商品" type="search" v-model="keyWord">
  		</form>

  	</div>
  	<mt-loadmore :bottom-method="requestMore" :top-method="loadTop" 
                     :bottom-all-loaded="allLoaded" :bottomPullText='bottomText'
                     ref="loadmore" class="table">
                 <div>sdsaas</div>
                <div>sdsaas</div>
    </mt-loadmore>
  	<!-- <selectcarspec></selectcarspec> -->
  </div>
</template>
<script>
import selectcarspec from '../../components/carSale/SelectCarSpec.vue'
import DepotList from '../../components/carSale/DepotList.vue'
	export default {
	    data () {
	        return {
	            showDev:false,
	            dopName:'请选择仓库的世界顶级',
	            depotList:[],
	            keyWord:'',
	            getScoreLog: [],
		        pageNo: 1,
		        allLoaded: false,
		        bottomText: '上拉加载更多...',
		        totalCount: ''
	        }
	    },
	    mounted(){
	    	let temp1 = {depotName:'沈半路仓库1'};
	    	let temp2 = {depotName:'沈半路仓库2'};
	    	let temp3 = {depotName:'沈半路仓库3'};
	    	let temp4 = {depotName:'沈半路仓库4'};
	    	let temp5 = {depotName:'沈半路仓库5'};
	    	this.depotList.push(temp1);
	    	this.depotList.push(temp2);
	    	this.depotList.push(temp3);
	    	this.depotList.push(temp4);
	    	this.depotList.push(temp5);
	    },
	    methods: {
	   		// depotSelected: (depot) => {
	   		// 	alert('回调:'+depot.depotName);
	   		// },
	   		depotSelected(depot){
	   			alert('回调:'+depot.depotName);
	   		},
	    	search(){
	    		alert('搜说');
	    		document.getElementById("search").blur();
	    	},

	    	scan(){
				alert('扫一扫');
	    	},
	    
	    	selectDev(){
	    		this.showDev = !this.showDev;
	    	},
	    	requestMore(){
	    		alert('requestMore');
	    	},
	    	loadTop(){
	    		alert('refresh');
	    	}
	    },
	    components: {
        	selectcarspec,
        	DepotList
   		 },
	}

</script>
<style scoped>
	.selectCarGoods{
		width: 100%;
		/*position: relative;*/
	}
	.selectCarGoods .nav{
		width: 100%;
		background-color: #f0f0f0;
		height: 88px;
		position: fixed;
	}
	.selectCarGoods .nav label{
		/*display: block;*/
		position: absolute;
		height: 64px;
		text-align: center;
		right: 300px;
		margin-top: 12px;
		max-width: 280px;
		line-height: 64px;
		font-size: 34px;
		 /*...显示*/
		display: -webkit-box;
   		overflow: hidden;
    	-webkit-box-orient: vertical;
    	text-overflow: ellipsis;
    	-webkit-line-clamp: 1;
	}

	.selectCarGoods .nav img{
		position: absolute;
		height: 44px;
		width: 44px;
		right:250px;
		margin-top: 22px;
	}

	.selectCarGoods .search{
		width: 100%;
		background-color: #f0f0f0;
		height: 88px;
		position: fixed;
		top:88px;
	}
	.dev {
		width: 100%;
		background: rgba(0, 0, 0, 0.3);
		position: fixed;
		z-index: 999;
		top:88px;
		bottom: 0px;
		overflow: auto;
	}
	.ull{
		width: 100%;
		padding-top: 176px;
		overflow-y: auto;
	}
	.devul{
		width: 100%;
		overflow:scroll;
		position: absolute;
		bottom: 0px;
		max-height: 600px;
	}
	.devul li{
		width: 100%;
		height: 88px;
		background-color: white;
	}
	.selectCarGoods .table{
		width: 100%;
		top:176px;
		overflow-y: auto;
		position: absolute;
		background-color: white;
		bottom: 0px;
	}
	.selectCarGoods .table div{
		height:88px;width:100%;background-color:red;
	}
	.selectCarGoods .search input {
		border:2px solid #d8d8d8;
		height: 64px;
		width: 580px;
		margin: 12px auto;
		text-align: left;
		padding-left: 50px;
		display: block;
		background: url('../../assets/icon20.png') left no-repeat;
    	background-size: 44px;
	}
	.selectCarGoods .search button {
		float: right;
		display: inline-block;
		line-height:64px;
		height: 64px;
		margin-right: 0px;
		margin-top: 12px;
		border:2px solid #d8d8d8;
		margin-right: 15px;
		border-radius: 10px;
	}

</style>