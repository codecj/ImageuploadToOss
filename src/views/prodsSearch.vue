<!-- 车销添加商品搜索页面，需要分页 -->
<template>
  <div>
		<header>
	        <div align="center" @click="goback" ><img src="../assets/icon10.png" alt=""></div>
	        <form action="" @submit.prevent="submit">
	           <input type="search" placeholder="请输入关键字搜索商品" :value="baseStkcByDepotParam.key" v-model="baseStkcByDepotParam.key" id="search">
	        </form>
	        <div align="center" @click="selectScan"><img src="../assets/scan@2x.png" alt=""></div>       
	 	</header>  
	 	<div class="prodsList">
		 	<mt-loadmore v-infinite-scroll="requestMore" :top-method="loadTop" ref="loadmore"  infinite-scroll-distance="40" 
	  	class="table">

	 		<div v-for="item in this.baseStkcList" class="cell">
	        	<img class="gooodImg" v-lazy="item.URL_ADDR">
	        	<label class="goodName">{{item.STK_NAME}}</label>
	        	<label class="vendorName">{{item.VENDOR_NAME}}</label>
				<em @click="addGoodStkc(item)" class="addGoods"></em>
			</div>  

	   	 </mt-loadmore>
	 	</div>
	 	<AddStkcView v-if="baseStkc != null" v-show="showDatail" :baseStkc="baseStkc" @cancelAddStkcView='cancelAddStkcView' 
      @submitStkc="submitStkc"></AddStkcView> 
  </div>
</template>
<script>
import  Request from '../util/API.js'
import { navBack,scan } from '../util/JsBridge.js'
import AddStkcView from '../components/carSale/AddStkcView.vue'
import {
    Toast,
    Indicator,
    Loadmore
} from 'mint-ui'
export default {
	data(){
		return{
			baseStkcList:[],
			keyWord:'',
			isEnd:false,
			baseStkc:null,
			showDatail:false,
			currentDepot:null,
			page: {
            	pageno: "0",
            	pagesize: "10"
        	},	
        	baseStkcByDepotParam:{//获取数据列表的参数
	        	// //业务员userno
	        	// userno:this.$route.query.userno,
	        	// //业务员username
	        	// username:this.$route.query.username,
	        	// vname:this.$route.query.vusername,
	        	// whc:this.$route.query.whc,
	        	// key:'',
	        	// truckType:'S'
	        	//业务员userno
	        	userno:"385734",
	        	//业务员username
	        	username:"JSNTSOP1Y1",
	        	vname:"JSNTSOP1",
	        	whc:'JSNTRD100',
	        	key:'',
	        	truckType:'S'
		   	},
	        addStckParam:{//添加商品到待装车的参数
	        	// whc:this.$route.query.whc,
	        	// username:this.$route.query.username,
	        	// vname:this.$route.query.vusername,
	        	// name:this.$route.query.name,
	        	// userno:this.$route.query.userno,
	        	whc:"JSNTRD100",
	        	username:"JSNTSOP1Y1",
	        	vname:"JSNTSOP1",
	        	name:"JSNTSOP1Y1姓名",
	        	userno:"385734",
	        	item:null,
	        	truckType:'S'
	        }
		}
	},
	components:{
		AddStkcView
	},
	methods:{
		goback(){//返回按钮
			navBack();
		},
		selectScan(){//扫描
			scan((response) =>{
				this.isEnd = false;
	   			this.page.pageno = "1";
	   			this.baseStkcList = [];
	   			this.baseStkcByDepotParam.key = response;
	   			this.getDatas();
			});
		},
		submit(){//点击搜索
			this.baseStkcList = [];
			this.getDatas();

		},
		requestMore(){//上拉请求更多
    		if (!this.isEnd) {
                this.page.pageno = parseInt(this.page.pageno) + 1;
                if(this.baseStkcByDepotParam.key != ""){
                	this.getDatas();
                }

       		}
    	},
    	loadTop(){//下拉请求第一页
    		this.$refs.loadmore.onTopLoaded();
    		this.isEnd = false;
   			this.page.pageno = "1";
   			this.baseStkcList = [];
   			// this.baseStkcByDepotParam.key = "";
   			this.getDatas();
    	},
		getDatas(){//获取列表数据
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
	                if (parseInt(getData.code) == 4) {
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
		addGoodStkc(item){//添加购物车
			this.showDatail = !this.showDatail;
         	this.baseStkc = item; 
         	for (let i = 0; i < this.baseStkc.MODLE_LIST.length; i++) {
    			let temp = this.baseStkc.MODLE_LIST[i];
    			this.$set(temp,'qty',0);
    		}

		},
		cancelAddStkcView(){//取消按钮
          this.showDatail = false;
        },
        submitStkc(basestkc){//更改回库列表的qty
          this.showDatail = false;
          let itemList = [];
	        	for (let i = 0; i < this.baseStkc.MODLE_LIST.length; i++) {
	        		let temp = this.baseStkc.MODLE_LIST[i];
	        		if (temp.qty > 0) {
	        			let model = {};
	        			model.vendorname = this.baseStkc.VENDOR_USER_NAME;
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
	        	// this.addStckParam.whc =  this.baseStkcByDepotParam.whc;
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
	mounted(){
	}
}
</script>
<style scoped>

header{
  height:88px;
  line-height:88px;
  position: fixed;
  top:0;
  left:0;
  background:#fff;
  width:100%;
  z-index:999;
}
header form{
	width:72%;
	float:left;
}
header input{
  width:100%;
  height:62px;
  border-radius: 2px;
  border:none;
  float:left;
  margin-top:13px;
  font-size: 26px;
  color: #9DA2B5;
  letter-spacing: 0;
  padding-left:76px;
  background: #EBECF0 url(../assets/icon20.png) no-repeat 22px center;
  background-size:35px 35px;
}
header div:nth-child(1){
  float:left;
  width:14%;
  line-height:88px;
  text-align: center;

}

header div:nth-child(1) img{
  width:60px;
  height:60px;
  vertical-align: middle;

}
header div:nth-child(3){
	 float:left;
	  width:14%;
	  line-height:88px;
	  text-align: center;
}
header div:nth-child(3) img{
 	width:55px;
	height:55px;
	vertical-align: middle;
}
	.prodsList {
		position: absolute;
		top:88px;
		bottom:0;
		left:0;
		right:0;
		/*width: 100%;
		top:197px;
		overflow-y: scroll;
		position: absolute;
		background-color: #f1f2f7;
		bottom: 0px;
		-webkit-overflow-scrolling: touch;*/
	}
	.prodsList .cell{
		height:296px;width:100%;
		background-color: white;
		position: relative;
		margin-top: 10px;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}
	.prodsList .gooodImg{
		position: absolute;
		width: 200px;
		height: 200px;
		background-color: white;
		left: 32px;
		top:51px;
		border: none;
	}
	.prodsList .goodName{
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
	.prodsList .vendorName{
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

	.prodsList .addGoods{
		position: absolute;
		right: 34px;
		bottom:45px;
		width: 48px;
		height: 48px;
		background: url("../assets/icon9.png") no-repeat 100%/100%;
		display: inline-block;
	}

</style>