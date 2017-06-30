<template>
  	<div>
      	<header>
	        <div align="center" @click="goback"><img src="../../assets/icon10.png" alt=""></div>
	        <div>{{depotName}}</div>
	        <div align="center" @click="selectDev"><img src="../../assets/icon10.png" alt=""></div>       
     	</header>  
       	<div class="searchs">
          	<searchDepot :depotPagarm="depotPagarm" @search="search" @scanAfter="scanData"></searchDepot>
        </div>   
      	<content>         
          	<onedepot :stockList="stockList" :selectStatus="selectStatus"  @back="back" @allSelect="allSelect"></onedepot>  
      	</content>
      	<footer>
           <div><span :class="{'noselect':!selectStatus,'selectAll':selectStatus}" @click="selectAll()">全选</span></div>
           <div @click="sureBackDepot">确认回库</div>
        </footer>
       <depotlist v-show="showDev" :depotList="depotList" @depotSelected='depotSelected' @cancelDepotList='cancelDepotList'>
       </depotlist>
       <AddStkcView v-if="baseStkc != null" v-show="showDatail" :baseStkc="baseStkc" @cancelAddStkcView='cancelAddStkcView' 
      @submitStkc="submitStkc"></AddStkcView> 
  	</div> 
</template>

<script type="text/javascript">
  import onedepot from "../../components/carSale/oneDepot.vue"
  import depotlist from "../../components/carSale/DepotList.vue"
  import AddStkcView from '../../components/carSale/AddStkcView.vue'
  import searchDepot from '../../components/carSale/searchDepot.vue'
  import Request from "../../util/API"
  import Vue from 'vue'
  import { Lazyload } from 'mint-ui'
  import { Toast,Indicator } from 'mint-ui'

  export default({
      data(){
        return{
          selectStatus:true,
          showDev:false,
          showDatail:false,
          depotName:"",
          baseStkc:null,
          stockList:[],//库存列表
          depotList:[],//仓库名称列表
          pagram:{//可选仓库参数
            vusername:this.$route.query.vusername,
            userno:this.$route.query.userno,
            username:this.$route.query.username
          },
          depotPagarm:{//待装车和我的库存搜索参数
            key:"",
            username:this.$route.query.username,
            vusername:this.$route.query.vusername,
            whc:"",
            truckType:"S",
            storageStatus:"B"
          },
          backPagarm:{
            userno:this.$route.query.userno,
            username:this.$route.query.username,
            whc:"QJ", 
            name:this.$route.query.name,
            item:[]
          }
        }
      },
      components:{
        onedepot,depotlist,AddStkcView,searchDepot
      },
      methods:{
        depotSelected(depot){//仓库title赋值
          this.showDev = false;
          this.depotName = depot.NAME;
          this.depotPagarm.whc = depot.WH_C;
          this.getSearch();
        },
        cancelDepotList(){
          this.showDev = false;
        },
        selectDev(){//点击弹出可选列表
          this.showDev = !this.showDev;
        },
        getList(){//可选仓库列表接口
          this.depotList = [];
          const pargrmList = {
            oper: 'getVendorwhc',
            type: 'truck',
            para: JSON.stringify(this.pagram) 
          }
          Request.post(pargrmList).then(res=>{
            let dataList = JSON.parse(res.data.result);
            dataList.data.forEach(value=> {
              this.depotList.push(value)
            })           
            this.depotName = dataList.data[0].NAME;
            if(dataList.code!=="200") Toast({ message: dataList.msg, duration: 2000 });
            return
          }).catch(error=>{
             if (error.response) {
                // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                Toast({
                    message: error.response.status,
                    duration: 2000
                });
            }
          })
        },
        getSearch(){//待装车和我的库存搜索接口
          this.stockList=[];
          Indicator.open();
           const pargrmList = {
            oper: 'getTruckListFour',
            type: 'truck',
            para: JSON.stringify(this.depotPagarm) 
          }
          Request.post(pargrmList).then(res=>{
            let dataList = JSON.parse(res.data.result);
            dataList.data.forEach(value=> {
              value.seletedStatus = true;
              this.selectStatus = true;
              this.stockList.push(value)
              value.MODLE_LIST.forEach(temp=>{
                this.$set(temp,"qty",temp.STK_QTY);
              })   
            })  
            if(dataList.code!=="200") Toast({ message: dataList.msg, duration: 2000 });
             Indicator.close();
             return
          }).catch(error=>{
             if (error.response) {
                // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                Toast({
                    message: error.response.status,
                    duration: 2000
                });
            }
          })
        },
        sureBackDepot(){//点击"确认回库""
            let noSelectArr = [];//未选择的保存到一个数组
            this.stockList.forEach(item=>{
                if(item.seletedStatus == false){
                    noSelectArr.push(item)
                }               
            })
            if(this.stockList.length == noSelectArr.length){
                Toast({message:"回库前请先进行选择", duration: 2000 });
                return
            }
            let arr = [];
            this.stockList.forEach(value=>{
              	let param = {}
              	if(value.seletedStatus){
               		value.MODLE_LIST.forEach(item=>{
		                 param.cpmode = item.CP_MODE
		                 param.pluc = item.PLU_CODE
		                 param.urladdr = item.URL_ADDR
		                 param.stkname = item.NAME
		                 param.basestkc = item.BASE_STK_C
		                 param.stkc = item.STK_C
		                 param.stdqty = item.STD_QTY
		                 param.stkmodel = item.MODLE
		                 param.qty = item.qty 

                	})
              	}
              	if(param.qty > 0){
               		 arr.push(param);
               	}
            })
            this.backPagarm.item = JSON.stringify(arr);
            const pargrmList = {
            	oper: 'saveTruck_OFour',
            	type: 'truck',
            	para: JSON.stringify(this.backPagarm) 
            }
          	Request.post(pargrmList).then(res=>{
                const getData = JSON.parse(res.data.result);
            if(getData.code !== "200"){
                Toast({message:getData.msg, duration: 2000 });
            }else{
                Toast({message:"回库成功", duration: 2000 });
            }
            	return

        	}).catch(error=>{
             if (error.response) {
                // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                Toast({
                    message: error.response.status,
                    duration: 2000
                });
                }
          })
        },
        back(item){//点击回库
          this.showDatail = !this.showDatail;
          this.baseStkc = item;      
        },
        cancelAddStkcView(){
          this.showDatail = false;
        },
        goback(){//返回按钮
          this.$router.goBack();
        },
        search(key){//搜索
          this.stockList = [];
          this.getSearch();

        },
        selectAll(){//点击全选
          this.selectStatus = !this.selectStatus;
            this.stockList.forEach(value=>{
                if (this.selectStatus) {
                  value.seletedStatus = true;
                } else {
                  value.seletedStatus = false;
                }
            })                  
        },
        allSelect(){//点击列表选择按钮，判断是否全选
          var flag = true;
          this.stockList.forEach(item=>{
            if (!item.seletedStatus) {
              flag = false;
            }
          })
          if (!flag) {
            this.selectStatus = false;
          } else {
            this.selectStatus = true;
          }
        },
        submitStkc(basestkc){//更改回库列表的qty
          this.showDatail = false;
         
        },
        scanData(data){//扫描结果
            this.depotPagarm.key = data;
            this.getSearch();
        }
  
      },
      mounted(){
        this.getSearch();
        this.getList();
      }

  })
 
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
  }
  header div{
    display:inline-block;
    float:left;
  }
  header div:nth-child(1),header div:nth-child(3){
    width:12%;
    height:88px;
  }
  header div:nth-child(1) img{
    width:60px;
    height:60px;
    vertical-align: middle;
  }
  header div:nth-child(2){
    text-align: center;
    width:76%;
    height:88px;
    overflow: hidden;
    font-size: 40px;
    color: #3B456C;
    letter-spacing: 0;
  }
  header div:nth-child(3) img{
    width:60px;
    height:60px;
    transform:rotate(270deg);
    vertical-align: middle;
  }
  content{
    position: absolute;
    top:204px;
    bottom:88px;
    left:0;
    z-index:-1;
    background:#f1f2f7;
    height:auto;
    width:100%;
    overflow: auto;

  }
  .searchs{
    background: #f1f2f7;
    width:100%;
    height:96px;
    padding-top:20px;
    position: fixed;
    top:88px;
    left:0;

  }
  footer{
    height:88px;
    width:100%;
    position: fixed;
    bottom:0;
    left:0;
  }
  footer div{
    display: inline-block;
    float:left;
  }
  footer div:nth-child(1){
    background: #fff;
    width:75%;
    height:88px;
    /*padding-left:%;*/
  }
  footer div:nth-child(1) .noselect{
    width:120px;
    height:88px;
    line-height: 88px;
    text-align: right;
    display:inline-block;
    background:url(../../assets/icon59.png) no-repeat center left;
    background-size: 54px 54px;
    font-size: 26px;
    color: #4D5679;
    letter-spacing: 0;
    margin-left:30px;
  }
  footer div:nth-child(1) .selectAll{
    width:120px;
    height:88px;
    line-height: 88px;
    text-align: right;
    display:inline-block;
    background:url(../../assets/icon59-1.png) no-repeat center left;
    background-size: 54px 54px;
    font-size: 26px;
    color: #4D5679;
    letter-spacing: 0;
    margin-left:30px;
  }
  footer div:nth-child(2){
    width:25%;
    height:88px;
    line-height: 88px;
    font-size: 30px;
    color: #FFFFFF;
    letter-spacing: 0;
    text-align: center;
    background: linear-gradient(-18deg, #FF4848 0%, #FF8739 100%);
  }
</style>

