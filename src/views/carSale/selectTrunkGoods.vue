<!-- 选择仓库里商品到车销待装车 -->
<template>
  <div class="selectCarGoods">
  	<div class="nav borderB">
  			<label>仓库:仓库1</label>
  			<img @click='navBack()'  class="left" src='../../assets/icon10.png'></img>
  			<img @click="selectDev()" class="right" src="../../assets/arrow-down.png"></img>
  	</div>
  	<DepotList v-show="showDepot" :depotList="depotList" @depotSelected='depotSelected' @cancelDepotList='cancelDepotList'>	
  	</DepotList>

	<AddStkcView v-show="showStkcView" :baseStkc={} @cancelAddStkcView='cancelAddStkcView'></AddStkcView>
  	<div class="search">
  		<img src="../../assets/scanne@2x.png" @click="scan()"></img>
  		<form @submit.prevent="search">
  			<input class="borderR" id="search" placeholder="请输入关键字搜索商品" type="search" v-model="keyWord">
  		</form>

  	</div>
  	<mt-loadmore :bottom-method="requestMore" :top-method="loadTop" 
                     :bottom-all-loaded="allLoaded" :bottomPullText='bottomText'
                     ref="loadmore" class="table">
                <div class="cell">
                	<img class="gooodImg">
                	<label class="goodName">墨西哥辣点击对我的期望的我带我去打网球的期待的强大</label>
                	<label class="vendorName">绍兴无语有限公司</label>
                	<img @click="addGoodStkc()" class="addGoods" src="../../assets/icon9.png">
                </div>
                 <div class="cell">
                	<img class="gooodImg">
                	<label class="goodName">墨西哥辣点击对我的期望的我带我去打网球的期待的强大</label>
                	<label class="vendorName">绍兴无语有限公司</label>
                	<img @click="addGoodStkc()" class="addGoods" src="../../assets/icon9.png">
                </div>
             
    </mt-loadmore>
  
  </div>
</template>
<script>
import selectcarspec from '../../components/carSale/SelectCarSpec.vue'
import DepotList from '../../components/carSale/DepotList.vue'
import AddStkcView from '../../components/carSale/AddStkcView.vue'
	export default {
	    data () {
	        return {
	            showDepot:false,
	            showStkcView:false,
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
	   		//仓库列表取消回调
	   		cancelDepotList(){
	   			this.showDepot = false;
	   		},
	   		//选择商品stkc回调
	   		cancelAddStkcView(){
	   			this.showStkcView = false;
	   		},
	    	search(){
	    		document.getElementById("search").blur();
	    	},

	    	scan(){
				alert('扫一扫');
	    	},

	    	navBack(){
	    		//调用router回退页面
        		 this.$router.goBack();
        		
	    	},
	    	
	    	selectDev(){
	    		// 选择仓库
	    		this.showDepot = true;
	    	},

	    	addGoodStkc(){
	    		this.showStkcView = true;
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
        	DepotList,
        	AddStkcView
   		 },
	}

</script>
<style scoped>
	.selectCarGoods{
		width: 100%;
		height: 100%;
		background-color:#f1f2f7;
		position: absolute;
		top: 0px;
		bottom: 0px;
	}
	.selectCarGoods .nav{
		width: 100%;
		background-color: #ffffff;
		height: 88px;
		line-height: 88px;
		text-align: center;
		font-family: PingFangSC-Medium;
		font-size: 40px;
		color: #3B456C;
		position: fixed;
	}

	.selectCarGoods .nav .left{
		float: left;
		height: 44px;
		width: 44px;
		margin-left: 37px;
		margin-top: 22px;
	}
	
	.selectCarGoods .nav .right{
		float: right;
		height: 20px;
		width: 44px;
		margin-right: 37px;
		margin-top: 34px;
	}

	.selectCarGoods .search{
		width: 100%;
		background-color: #ffffff;
		position: absolute;
		height: 88px;
		top:108px;
	}
	.selectCarGoods .table{
		width: 100%;
		top:197px;
		overflow-y: auto;
		position: absolute;
		background-color: #f1f2f7;
		bottom: 0px;
	}


	.selectCarGoods .table .cell{
		height:296px;width:100%;
		background-color: #ffffff;
		position: relative;
		margin-top: 10px;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}
	.selectCarGoods .table .gooodImg{
		position: absolute;
		width: 200px;
		height: 200px;
		background-color: red;
		left: 32px;
		top:51px;
		border: none;
	}

	.selectCarGoods .table .goodName{
		position: absolute;
		width: 450px;
		font-family: PingFangSC-Medium;
		font-size: 30px;
		color: #3B456C;
		right: 40px;
		top:55px;
		display: -webkit-box;
   		overflow: hidden;
    	-webkit-box-orient: vertical;
    	text-overflow: ellipsis;
    	-webkit-line-clamp: 2;
	}
	
	.selectCarGoods .table .vendorName{
		position: absolute;
		width: 450px;
		font-family: PingFangSC-Regular;
		font-size: 26px;
		color: #3B456C;
		opacity: 0.5;
		right: 40px;
		bottom:86px;
		display: -webkit-box;
   		overflow: hidden;
    	-webkit-box-orient: vertical;
    	text-overflow: ellipsis;
    	-webkit-line-clamp: 2;
	}

	.selectCarGoods .table .addGoods{
		position: absolute;
		right: 34px;
		bottom:45px;
		width: 48px;
		height: 48px;
	}


	.selectCarGoods .search input {
		position: absolute;
		border:none;
		right: 94px;
		height: 100%;
		width: 656px;
		border-right: 1px solid #d9d9d9;
		text-align: left;
		padding-left: 90px;
		background: url('../../assets/icon20.png') left no-repeat;
    	background-size: 44px;
    	background-position: 34px 21px;
	}
	.selectCarGoods .search img {
		float: right;
		width: 40px;
		height: 40px;
		margin-top: 22px;
		margin-right: 34px;
	}

</style>