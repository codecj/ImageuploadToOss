<template>
	<div class="SelectTrunkGoodsWithCategory">
		<div class="nav borderB">
			<img @click='navBack()' class="left" src='../../assets/icon10.png'></img>
  			<img @click="selectDev()" class="right" src="../../assets/arrow-down.png"></img>
	  		<label>仓库:{{dopName}}</label>
	  	</div>

	  	<DepotList v-show="showDepot" :depotList="depotList" @depotSelected='depotSelected' @cancelDepotList='cancelDepotList'>	
  		</DepotList>

		<AddStkcView v-if="baseStkc != null" v-show="showStkcView" :baseStkc="baseStkc" @submitStkc='submitStkc' @cancelAddStkcView='cancelAddStkcView'></AddStkcView>

	  	<div class="search" @click="jumpSearchView()">
	  		<img src="../../assets/scanne@2x.png"></img>
	  		<input class="borderRight" id="search" placeholder="请输入关键字搜索商品" type="search" disabled>
  		</div>
		<div class="content">
			<Category :categoryList="categoryList" @categorySelected='categorySelected'></Category>
			<mt-loadmore v-infinite-scroll="requestMore" :top-method="loadTop" ref="loadmore"  infinite-scroll-distance="40" 
  	class="table">
  				
				<div  class="cell borderB">
		        	<img class="gooodImg">
		        	<label class="goodName">卫龙辣条小面包880g豆丁文档吃的我的的我的我瞧得起我</label>
		        	<label class="vendorName">江苏南通sop1</label>
					<em  class="addGoods"></em>
				</div> 
				<div  class="cell borderB">
		        	<img class="gooodImg">
		        	<label class="goodName">卫龙辣条小面包880g</label>
		        	<label class="vendorName">江苏南通sop1</label>
					<em  class="addGoods"></em>
				</div>
				<div  class="cell borderB">
		        	<img class="gooodImg">
		        	<label class="goodName">卫龙辣条小面包880g</label>
		        	<label class="vendorName">江苏南通sop1</label>
					<em  class="addGoods"></em>
				</div> 
				<div  class="cell borderB">
		        	<img class="gooodImg">
		        	<label class="goodName">卫龙辣条小面包880g</label>
		        	<label class="vendorName">江苏南通sop1</label>
					<em  class="addGoods"></em>
				</div> 
				<div  class="cell borderB">
		        	<img class="gooodImg">
		        	<label class="goodName">卫龙辣条小面包880g</label>
		        	<label class="vendorName">江苏南通sop1</label>
					<em  class="addGoods"></em>
				</div>
				<div  class="cell borderB">
		        	<img class="gooodImg">
		        	<label class="goodName">卫龙辣条小面包880g</label>
		        	<label class="vendorName">江苏南通sop1</label>
					<em  class="addGoods"></em>
				</div>           
			</mt-loadmore>
		</div>	
	</div>
</template>

<script>
import Category from "../../components/Common/Category.vue"	
import  Request from '../../util/API.js'
import DepotList from '../../components/carSale/DepotList.vue'
import AddStkcView from '../../components/carSale/AddStkcView.vue'
import { navBack,scan } from '../../util/JsBridge.js'
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
	            categoryList:[],//分类数组
	            baseStkcList:[],
	            baseStkc:null,
	            keyWord:'',
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
            	isEnd:false
			}
		},
		created(){
			let tempCategory1 = {isSelected:true,categoryName:'常订商品'};
			let tempCategory2 = {isSelected:false,categoryName:'牛奶饮品'};
			let tempCategory3 = {isSelected:false,categoryName:'畜牧类'};
			let tempCategory4 = {isSelected:false,categoryName:'酒水饮料'};
			let tempCategory5 = {isSelected:false,categoryName:'粮油副食'};
			this.categoryList.push(tempCategory1);
			this.categoryList.push(tempCategory2);
			this.categoryList.push(tempCategory3);
			this.categoryList.push(tempCategory4);
			this.categoryList.push(tempCategory5);
		},
		mounted(){
		    Request.jsBbridge(bridge => {
		        bridge.init(function(message, responseCallback) {
		            var data = {};
		            responseCallback(data);
		        });
		    });
	    },
	    methods: {

	    	requestMore(){
	    		if (this.currentDepot == null) {
	    			this.requestDepot();
	    			return;
	    		}
	    	},
	    	
	    	loadTop(){

	    	},
	    	jumpSearchView(){
	    		this.$router.push({
	                path: 'prodsSearch',
	                query: {
	                    username: this.$route.query.username,
	                    userno: this.$route.query.userno,
	                    vusername: this.$route.query.vusername,
	                    whc:this.currentDepot.WH_C,
	                    name:this.$route.query.name,
	                }
            	})
	    	},

	    	navBack(){
	    		//调用router回退页面
        		 navBack();
	    	},
	    	//选择某个分类回调
	    	categorySelected(category){
	    		alert(category.categoryName);
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

	    	//获取分类
	    	queryCategory(){

	    	},
	    	//选择某个仓库回调
	    	depotSelected(depot){
	   			this.showDepot = false;
	   			this.currentDepot = depot;
	   			this.dopName = depot.NAME;
	   			this.isEnd = false;
	   			this.page.pageno = "1";
	   			this.baseStkcList = [];	
	   		},
	   		//仓库列表取消回调
	   		cancelDepotList(){
	   			this.showDepot = false;
	   		},
	   		//选择商品stkc回调
	   		cancelAddStkcView(){
	   			this.showStkcView = false;
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
        	Category,
        	DepotList,
        	AddStkcView
   		}
}
</script>

<style scoped>
	.SelectTrunkGoodsWithCategory{
		width: 100%;
		height: 100%;
		background-color:#f1f2f7;
		position: absolute;
		top:0;
		bottom:0;
	}

	.SelectTrunkGoodsWithCategory .nav{
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

	.SelectTrunkGoodsWithCategory .nav .left{
		float: left;
		height: 62px;
		width: 62px;
		margin-left: 37px;
		margin-top: 14px;
	}
	
	.SelectTrunkGoodsWithCategory .nav .right{
		float: right;
		height: 30px;
		width: 50px;
		margin-right: 37px;
		margin-top: 30px;
	}
	.SelectTrunkGoodsWithCategory .content{
		position: absolute;
		top:200px;
		bottom: 0px;
		width: 100%;
	}

	.SelectTrunkGoodsWithCategory .content .table{
		background-color: #f1f2f7;
		display: block;
		width:74%;
		height: 100%;
		overflow-y: scroll;
		position: absolute;
		right:0;
		bottom:0;
	}


	.SelectTrunkGoodsWithCategory .content .table .cell{
		height:296px;width:100%;
		background-color: white;
		position: relative;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}
	.SelectTrunkGoodsWithCategory .content .table .cell .gooodImg{
		position: absolute;
		width: 200px;
		height: 200px;
		background-color: white;
		left: 32px;
		top:51px;
		border: none;
	}

	.SelectTrunkGoodsWithCategory .content .table .cell .goodName{
		position: absolute;
		right: 10px;
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
	
	.SelectTrunkGoodsWithCategory .content .table .cell .vendorName{
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

	.SelectTrunkGoodsWithCategory .content .table .cell .addGoods{
		position: absolute;
		right: 34px;
		bottom:45px;
		width: 48px;
		height: 48px;
		background: url("../../assets/icon9.png") no-repeat 100%/100%;
		display: inline-block;
	}
	.SelectTrunkGoodsWithCategory .search{
		width: 100%;
		background-color: #ffffff;
		position: absolute;
		height: 88px;
		top:103px;
	}
	.SelectTrunkGoodsWithCategory .search input {
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
	.SelectTrunkGoodsWithCategory .search img {
		float: right;
		width: 40px;
		height: 40px;
		margin-top: 22px;
		margin-right: 34px;
	}
</style>