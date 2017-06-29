<template>
	<div class="selectTrunkGoods">
		<div class="nav">
			<img @click='backNav()' src="../../assets/icon10.png">
			<label>添加商品</label>
		</div>

		<div class="search">
	  		<img src="../../assets/scanne@2x.png" @click="scan()"></img>
	  		<form @submit.prevent="search">
	  			<input class="borderR" id="search" placeholder="请输入关键字搜索商品" type="search" v-model="keyWord">
	  		</form>
  		</div>

  		<mt-loadmore v-infinite-scroll="requestMore" :top-method="loadTop" ref="loadmore"  infinite-scroll-distance="40" 
  	class="table">
                <div v-for="item in this.baseStkcList" class="cell">
                	<img class="gooodImg" v-lazy="item.URL_ADDR">
                	<label class="goodName">{{item.STK_NAME}}</label>
                	<label class="vendorName">{{item.VENDOR_NAME}}</label>
                	<img @click="addGoodStkc(item)" class="addGoods" src="../../assets/icon9.png">
                </div>  
    	</mt-loadmore>
	</div>	
</template>
<script>
	import { navBack,scan } from '../../util/JsBridge.js'
	import  Request from '../../util/API.js'
	import {Toast,Indicator,Loadmore} from 'mint-ui'
	export default {
		data () {
			return {
				showRightArrow:false,
				keyWord:'',
				baseStkcList:[],
				baseStkcByDepotParam:{
		        	//业务员userno
		        	userno:'359320',
		        	//业务员username
		        	username:'k1111',
		        	vname:'HZSOP',
		        	key:'',
		        	truckType:'M'
		        },
		         //添加商品到待装车
		        addStckParam:{
		        	username:'k1111',
		        	vname:'HZSOP',
		        	name:'kiki',
		        	userno:'359320',
		        	item:null,
		        	truckType:'M'
		        },
		        page: {
                	pageno: "0",
                	pagesize: "20"
            	},
            	isEnd:false
			}
		},
		mounted(){
			 Request.jsBbridge(bridge => {
		        bridge.init(function(message, responseCallback) {
		            var data = {};
		            responseCallback(data);
		        });
		    });
		},
		methods:{
			scan(){
				scan((response) =>{
					this.isEnd = false;
		   			this.page.pageno = "1";
		   			this.baseStkcList = [];
		   			this.baseStkcByDepotParam.key = response;
		   			this.requestBaseStkc();
				});
			},
			search(){
				document.getElementById("search").blur();
	    		this.isEnd = false;
	   			this.page.pageno = "1";
	   			this.baseStkcList = [];
	   			this.baseStkcByDepotParam.key = this.keyWord;
	   			this.requestBaseStkc();
			},
			backNav(){
				navBack();
			},
			addGoodStkc(item){
				let itemList = [];
	        	for (let i = 0; i < item.MODLE_LIST.length; i++) {
	        		let temp = item.MODLE_LIST[i];
	        		if (temp.STK_QTY > 0) {
	        			let model = {};
	        			model.vendorname = item.VENDOR_USER_NAME;
	        			model.stkc = temp.STK_C;
	        			model.cpmode = temp.CP_MODE;
	        			model.stkname = temp.NAME;
	        			model.urladdr = temp.URL_ADDR;
	        			model.pluc = temp.PLU_C;
	        			model.stkmodel = temp.MODLE;
	        			model.qty = temp.STK_QTY+'';
	        			model.basestkc = item.BASE_STK_C;
	        			itemList.push(model);
	        		}
	        	}
	        	if (itemList.length == 0) {
	        		 Toast({
	                        message: '添加商品数量不能为空',
	                        duration: 2000
	                    });
	        		 return;
	        	}
	        	this.addStckParam.item = JSON.stringify(itemList);
	        	let pargrmList = {
               	 	oper: 'saveTruckIoItem',
                	type: 'truck',
               	 	para: JSON.stringify(this.addStckParam)
            	};
            	//ajax调用
	            Request.post(pargrmList).then(res => {
	                const getData = JSON.parse(res.data.result);
	               
	                if (parseInt(getData.code) != 200) {
	                    // console.log(getData.msg);
	                    Toast({
	                        message: getData.msg,
	                        duration: 2000
	                    });
	                } else {
	                   Toast({
	                        message: '添加商品成功',
	                        duration: 2000
	                    });
	                }

	            }).catch(error => {
	                if (error.response) {
	                    // 请求已发出，但服务器响应的状态码不在 2xx 范围内
	                    Toast({
	                        message: error.response.status,
	                        duration: 2000
	                    });
	                }
	            })
			},
			requestMore(){
	    		if (!this.isEnd) {
	                this.page.pageno = parseInt(this.page.pageno) + 1;
	              	this.requestBaseStkc();
           		}
	    	},
	    	loadTop(){
	    		this.$refs.loadmore.onTopLoaded();
	    		this.isEnd = false;
	   			this.page.pageno = "1";
	   			this.baseStkcList = [];
	   			this.baseStkcByDepotParam.key = this.keyWord;
	   			this.requestBaseStkc();
	    	},
	    	requestBaseStkc(){
	    		let pargrmList = {
	        		pagination: JSON.stringify(this.page),
               	 	oper: 'getVendorStkFour',
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
	                  
	                  	//this.item = this.baseStkcList[0];
	                   if (this.baseStkcList.length == getData.pagination.totalcount) {
                   			this.isEnd = true;
                   		}
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
		}
	}
</script>
<style scoped>
	.selectTrunkGoods{
		width: 100%;
		height: 100%;
		background-color:#f1f2f7;
		position: absolute;
		top: 0px;
		bottom: 0px;
	}
	.selectTrunkGoods .nav{
		position:fixed;
		background-color: #ffffff;
		width: 100%;
		height: 88px;
		line-height: 88px;
		text-align: center;
	}

	.selectTrunkGoods .nav img{
		position:absolute;
		height: 54px;
		width: 54px;
		left: 37px;
		top: 17px;
	}
	.selectTrunkGoods .nav label{
		font-family: PingFangSC-Medium;
		font-size: 40px;
		color: #3B456C;
	}
	.selectTrunkGoods .search{
		width: 100%;
		background-color: #ffffff;
		position: absolute;
		height: 88px;
		top:108px;
	}


	.selectTrunkGoods .search input {
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
	.selectTrunkGoods .search img {
		float: right;
		width: 40px;
		height: 40px;
		margin-top: 22px;
		margin-right: 34px;
	}

	.selectTrunkGoods .table{
		width: 100%;
		top:197px;
		overflow-y: auto;
		position: absolute;
		background-color: #f1f2f7;
		bottom: 0px;
	}


	.selectTrunkGoods .table .cell{
		height:296px;width:100%;
		background-color: #ffffff;
		position: relative;
		margin-top: 10px;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}
	.selectTrunkGoods .table .gooodImg{
		position: absolute;
		width: 200px;
		height: 200px;
		background-color: white;
		left: 32px;
		top:51px;
		border: none;
	}

	.selectTrunkGoods .table .goodName{
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
	
	.selectTrunkGoods .table .vendorName{
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

	.selectTrunkGoods .table .addGoods{
		position: absolute;
		right: 34px;
		bottom:45px;
		width: 48px;
		height: 48px;
	}

</style>