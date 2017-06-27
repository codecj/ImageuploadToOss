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

  			<li class="cell" v-for="item in this.baseStkcList">
  				<LeftSlider :index = n @deleteItem='deleteItem'>
  					<img class="gooodImg" v-lazy="item.URL_ADDR">
                	<label class="goodName">{{item.STK_NAME}}</label>
                	<label class="vendorName">库存:{{item.STOCK}}</label>
       			</LeftSlider>
  			</li>
  		</ul>
	</div>
</template>
<script>
	import { navBack } from '../../util/JsBridge.js'
	import LeftSlider from '../../components/carSale/LeftSlider.vue'
	import  Request from '../../util/API.js'
	import {Toast,Indicator,Loadmore} from 'mint-ui'
	export default {
		data () {
			return {
				showRightArrow:false,
				keyWord:'',
				baseStkcByDepotParam:{
		        	//业务员username
		        	username:'k1111',
		        	vusername:'HZSOP',
		        	key:'',
		        	truckType:'M',
		        	storageStatus:'B'
		        },
		        baseStkcList:[]
			}
		},
		mounted(){
			this.requestBaseStkc();
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
	    	},
	    	deleteItem( index ){
	    		alert(index);
	    	},
	    	requestBaseStkc(){
	    		let pargrmList = {
               	 	oper: 'getTruckListFour',
                	type: 'truck',
               	 	para: JSON.stringify(this.baseStkcByDepotParam)
            	};
            	Indicator.open();
	            //ajax调用
	            Request.post(pargrmList).then(res => {
	            	Indicator.close();
	                const getData = JSON.parse(res.data.result);
	                // console.log(getData)
	                if (parseInt(getData.code) == 4) {
	                	 Toast({
	                        message: getData.msg,
	                        duration: 2000
	                    });
	                    return;
	                }
	                if (parseInt(getData.code) != 200) {
	                    // console.log(getData.msg);
	                    Toast({
	                        message: getData.msg,
	                        duration: 2000
	                    });
	                } else {
	                	  getData.data.forEach(value => {
                   			 this.baseStkcList.push(value)
               			 })
                	}
	            }).catch(error => {
	            	Indicator.close();
	                if (error.response) {
	                    // 请求已发出，但服务器响应的状态码不在 2xx 范围内
	                    Toast({
	                        message: error.response.status,
	                        duration: 2000
	                    });
	                }
	            })
	    	}
		},
		components: {
        	LeftSlider
   		 },
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
		height: 80px;
		opacity: 0.7;
		background: #000000;
		border-radius: 4px;
		color: white;
		font-size: 30px;
		line-height: 80px;
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