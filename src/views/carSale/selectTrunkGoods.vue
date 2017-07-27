<!-- 选择仓库里商品到车销待装车 -->
<template>
  <div class="selectCarGoods">
  	<div class="nav borderB">
  			<img @click='navBack()'  class="left" src='../../assets/icon10.png'></img>
  			<img @click="selectDev()" class="right" src="../../assets/arrow-down.png"></img>
  			<label>仓库:{{dopName}}</label>
  	</div>
  	<DepotList v-show="showDepot" :depotList="depotList" @depotSelected='depotSelected' @cancelDepotList='cancelDepotList'>	
  	</DepotList>

	<AddStkcView v-if="baseStkc != null" v-show="showStkcView" :baseStkc="baseStkc" @submitStkc='submitStkc' @cancelAddStkcView='cancelAddStkcView'></AddStkcView>
  	<div class="search">
  		<img src="../../assets/scanne@2x.png" @click="scan()"></img>
  		<form @submit.prevent="search">
  			<input class="borderRight" id="search" placeholder="请输入关键字搜索商品" type="search" v-model="keyWord">
  		</form>

  	</div>
  	<mt-loadmore v-infinite-scroll="requestMore" :top-method="loadTop" ref="loadmore"  infinite-scroll-distance="40" 
  	class="table">

 		<div v-for="item in this.baseStkcList" class="cell">
        	<img class="gooodImg" v-lazy="item.URL_ADDR">
        	<label class="goodName">{{item.STK_NAME}}</label>
        	<label class="vendorName">{{item.VENDOR_NAME}}</label>
        	<img  @click="addGoodStkc(item)" class="addGoods" src="../../assets/icon9.png">
		</div>  

    </mt-loadmore>
  
  </div>
</template>
<script>
import selectcarspec from '../../components/carSale/SelectCarSpec.vue'
import DepotList from '../../components/carSale/DepotList.vue'
import AddStkcView from '../../components/carSale/AddStkcView.vue'
import { navBack,scan } from '../../util/JsBridge.js'
import  Request from '../../util/API.js'
import {
    Toast,
    Indicator,
    Loadmore
} from 'mint-ui'

	export default {
	    data () {
	        return {
	            showDepot:false,
	            showStkcView:false,
	            dopName:'',
	            currentDepot:null,
	            depotList:[],
	            baseStkcList:[],
	            baseStkc:null,
	            keyWord:'',
	            getScoreLog: [],
		        pageNo: 1,
		        allLoaded: false,
		        bottomText: '上拉加载更多...',
		        totalCount: '',
		        testurl:'http://192.168.200.235:8080/oo.png',
		        depotParam:{
		        	//业务员userno
		        	userno:this.$route.query.userno,
		        	//业务员对应的供应商username
		        	vusername:this.$route.query.vusername,
		        	//业务员username
		        	username:this.$route.query.username
		        },
		        baseStkcByDepotParam:{
		        	//业务员userno
		        	userno:this.$route.query.userno,
		        	//业务员username
		        	username:this.$route.query.username,
		        	vname:this.$route.query.vusername,
		        	whc:'',
		        	key:'',
		        	truckType:'S'
		        },
		        //添加商品到待装车
		        addStckParam:{
		        	whc:null,
		        	username:this.$route.query.username,
		        	vname:this.$route.query.vusername,
		        	name:this.$route.query.name,
		        	userno:this.$route.query.userno,
		        	item:null,
		        	truckType:'S'
		        },
		        page: {
                	pageno: "1",
                	pagesize: "20"
            	},
            	isEnd:false,
		        item:{STK_NAME:'',VENDOR_NAME:''}
		       
	        }
	    },
	    mounted(){
		    Request.jsBbridge(bridge => {
		        bridge.init(function(message, responseCallback) {
		            var data = {};
		            responseCallback(data);
		        });
		    });
		   // this.requestDepot();
	    },
	    methods: {
	   		// depotSelected: (depot) => {
	   		// 	alert('回调:'+depot.depotName);
	   		// },
	   		depotSelected(depot){
	   			this.showDepot = false;
	   			this.currentDepot = depot;
	   			this.dopName = depot.NAME;
	   			this.isEnd = false;
	   			this.page.pageno = "1";
	   			this.baseStkcList = [];
	   			this.requestBaseStkcByDepot();
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
	    		this.isEnd = false;
	   			this.page.pageno = "1";
	   			this.baseStkcList = [];
	   			this.baseStkcByDepotParam.key = this.keyWord;
	   			this.requestBaseStkcByDepot();
	    	},

	    	scan(){
				scan((response) =>{
					this.isEnd = false;
		   			this.page.pageno = "1";
		   			this.baseStkcList = [];
		   			this.baseStkcByDepotParam.key = response;
		   			this.requestBaseStkcByDepot();
				});
	    	},

	    	navBack(){
	    		//调用router回退页面
        		 navBack();
        		 // alert(1);
        		 // this.$router.goBack();
	    	},
	    	
	    	selectDev(){
	    		// 选择仓库
	    		Indicator.open();
	    		let pargrmList = {
               	 	oper: 'getVendorwhcFour',
                	type: 'truck',
               	 	para: JSON.stringify(this.depotParam)
            	};
	            //ajax调用
	            Request.post(pargrmList).then(res => {
	            	Indicator.close();
	                const getData = JSON.parse(res.data.result);
	                // console.log(getData)
	                if (parseInt(getData.code) == 4) {
	                    return;
	                }
	                if (parseInt(getData.code) != 200) {
	                    // console.log(getData.msg);
	                    Toast({
	                        message: getData.msg,
	                        duration: 2000
	                    });
	                } else {
	                   this.depotList = getData.data;
	                   if (this.depotList.length == 0) {
	                   		return;
	                   }
	                   this.showDepot = true;
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
	    		
	    	},

	    	addGoodStkc(item){
	    		this.showStkcView = true;
	    		this.baseStkc = item;
	    		for (let i = 0; i < this.baseStkc.MODLE_LIST.length; i++) {
	    			let temp = this.baseStkc.MODLE_LIST[i];
	    			this.$set(temp,'qty',0);
	    		}
	    	},

	    	requestMore(){
	    		if (this.currentDepot == null) {
	    			this.requestDepot();
	    			return;
	    		}
	    		if (!this.isEnd) {
	                this.page.pageno = parseInt(this.page.pageno) + 1
	              	this.requestBaseStkcByDepot();
           		}
	    		
	    		
	    	},
	    	loadTop(){
	    		this.$refs.loadmore.onTopLoaded();
	    		this.isEnd = false;
	   			this.page.pageno = "1";
	   			this.baseStkcList = [];
	   			this.baseStkcByDepotParam.key = this.keyWord;
	   			this.requestBaseStkcByDepot();
	    	},
	    	requestDepot(){
	    		Indicator.open();
	    		let pargrmList = {
               	 	oper: 'getVendorwhcFour',
                	type: 'truck',
               	 	para: JSON.stringify(this.depotParam)
            	};
	            //ajax调用
	            Request.post(pargrmList).then(res => {
	            	Indicator.close();
	                const getData = JSON.parse(res.data.result);
	                // console.log(getData)
	                if (parseInt(getData.code) == 4) {
	                    return;
	                }
	                if (parseInt(getData.code) != 200) {
	                    // console.log(getData.msg);
	                    Toast({
	                        message: getData.msg,
	                        duration: 2000
	                    });
	                } else {
	                   this.depotList = getData.data;
	                   if (this.depotList.length == 0) {
	                   		return;
	                   }
	                   let depotModel = this.depotList[0];
	                   this.currentDepot = depotModel;
	                   this.dopName = depotModel.NAME;
	                   this.requestBaseStkcByDepot();
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
	        },

	        requestBaseStkcByDepot(){
	        	this.baseStkcByDepotParam.whc =  this.currentDepot.WH_C;
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
	                	 // Toast({
	                  //       message: getData.msg,
	                  //       duration: 2000
	                  //   });
	                  if (this.baseStkcList.length == 0) {
	                  	Toast({
	                         message: '无商品',
	                         duration: 2000
	                     });
	                  }
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
	        },
	        submitStkc(baseStkc){
	        	this.showStkcView = false;
	        	let itemList = [];
	        	for (let i = 0; i < baseStkc.MODLE_LIST.length; i++) {
	        		let temp = baseStkc.MODLE_LIST[i];
	        		if (temp.qty > 0) {
	        			let model = {};
	        			model.vendorname = baseStkc.VENDOR_USER_NAME;
	        			model.stkc = temp.STK_C;
	        			model.cpmode = temp.CP_MODE;
	        			model.stkname = temp.NAME;
	        			model.urladdr = temp.URL_ADDR;
	        			model.pluc = temp.PLU_C;
	        			model.stkmodel = temp.MODLE;
	        			model.qty = temp.qty+'';
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
	        	this.addStckParam.whc =  this.currentDepot.WH_C;
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
	                        message: '添加商品到待装车成功',
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
	        }
	    },
	    components: {
        	selectcarspec,
        	DepotList,
        	AddStkcView
   		 }
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
		height: 62px;
		width: 62px;
		margin-left: 37px;
		margin-top: 14px;
	}
	
	.selectCarGoods .nav .right{
		float: right;
		height: 30px;
		width: 50px;
		margin-right: 37px;
		margin-top: 30px;
	}
	.selectCarGoods .nav label{
		display: -webkit-box;
		overflow: hidden;
    	-webkit-box-orient: vertical;
    	text-overflow: ellipsis;
    	-webkit-line-clamp: 1;
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
		overflow-y: scroll;
		position: absolute;
		background-color: #f1f2f7;
		bottom: 0px;
		-webkit-overflow-scrolling: touch;
	}


	.selectCarGoods .table .cell{
		height:296px;width:100%;
		background-color: white;
		position: relative;
		margin-top: 10px;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}
	.selectCarGoods .table .gooodImg{
		position: absolute;
		width: 200px;
		height: 200px;
		background-color: white;
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
		left: 240px;
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
		left: 240px;
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
		display: inline-block;
		border:none;
		left: 0px;
		height: 100%;
		width: 85%;
		/*right:100px;*/
		/*border-right: 1px solid #d9d9d9;*/
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