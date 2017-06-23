<template>
	<div class="trunkList">
		<router-link to="selectTrunckGoodsWithNoStock" ><div class="addStkc">添加商品</div></router-link>
		<div class="nav borderB">
  			<img @click='navBack()'  class="left" src='../../assets/icon10.png'>
  			<img @click="selectDev()" class="right" src='../../assets/add.png'>
  			<form @submit.prevent="search">
  				<input class="search" id="search" placeholder="请输入关键字搜索商品" type="search" v-model="keyWord">
  			</form>
  		</div>
  		<ul class="table list-ul">
  			<li class="cell" v-for="n in 10">
			
  					<img class="gooodImg">
                	<label class="goodName">墨西哥辣点击对我的期望的我带我去打网球的期待的强大</label>
                	<label class="vendorName">库存:20箱10件8个</label>  
  			
                <div class="btn" @click='deleteItem'>删除</div>
  			</li>
  		</ul>
	</div>
</template>
<script>
	import { navBack } from '../../util/JsBridge.js'
	export default {
		data () {
			return {
				showRightArrow:false,
				keyWord:''
			}
		},
		mounted(){
			
		},
	
		methods:{
			search(){
	    		document.getElementById("search").blur();
	    	},
	    	deleteItem(){

	    	},
	    	addStkc(){
	    		 this.$router.push('/selectTrunckGoodsWithNoStock');
	    	},
	    	navBack(){
	    		navBack();
	    	}
		}
	}
</script>
<style scoped>
	.trunkList{
		width: 100%;
		height: 100%;
		background-color:#f1f2f7;
		position: absolute;
		top: 0px;
		bottom: 0px;
	
	}
	.trunkList .addStkc{
		position:fixed;
		z-index: 999;
		top:88px;
		right: 32px;
		width: 184px;
		height: 70px;
		opacity: 0.7;
		background: #000000;
		border-radius: 4px;
		color: white;
		font-size: 30px;
		line-height: 70px;
		text-align: center;
	}
	.trunkList .nav{
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

	.trunkList .nav .left{
		/*float: left;*/
		display: block;
		position: absolute;
		height: 54px;
		width: 54px;
		left: 37px;
		top: 17px;
		
	}
	
	.trunkList .nav .right{
		/*float: right;*/
		display: block;
		position: absolute;
		height: 44px;
		width: 44px;
		right: 37px;
		top: 22px;
		
	}

	.trunkList .nav .search{
		position: absolute;
		font-family: PingFangSC-Regular;
		font-size: 26px;
		color: #9DA2B5;
		border:none;
		left: 96px;
		bottom: 11px;
		height: 66px;
		width: 548px;
		text-align: left;
		padding-left: 90px;
		background: url('../../assets/icon20.png') left no-repeat;
    	background-size: 44px;
    	background-position: 34px 12px;
    	background-color: #f1f2f7;;
	}
	
	.trunkList .table{
		position: absolute;
		width: 100%;
		bottom: 0px;
		top:108px;
		background-color: #f1f2f7;
		overflow-y: scroll;
		overflow-x:hidden;
	}

	.trunkList .table .cell{
		height:296px;width:100%;
		background-color: #ffffff;
		position: relative;
		margin-top: 10px;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}
	.trunkList .table .gooodImg{
		position: absolute;
		width: 200px;
		height: 200px;
		background-color: red;
		left: 32px;
		top:51px;
		border: none;
	}

	.trunkList .table .goodName{
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
	
	.trunkList .table .vendorName{
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
	.list-ul{overflow-x:hidden;}
	.list-li{border-bottom: 1px solid #fcfcfc; position:relative; color: #666;background: #f2f2f2;-webkit-transform: translateX(0px);}
    .btn{ position: absolute; top: 0; right: -20%; text-align: center; background: #ffcb20; width: 20%;height: 298px;line-height: 298px;background-image: linear-gradient(17deg, #FF4848 2%, #FF8739 100%);font-size: 30px;color: #FFFFFF;}
</style>