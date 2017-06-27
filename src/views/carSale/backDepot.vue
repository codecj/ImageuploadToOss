<template>
  <div>
      <header>
        <div align="center" @click="goback"><img src="../../assets/icon10.png" alt=""></div>
        <div>{{depotName}}</div>
        <div align="center" @click="selectDev"><img src="../../assets/icon10.png" alt=""></div>       
      </header>  
       <div class="searchs">
          <searchDepot :depotPagarm="depotPagarm" @search="search"></searchDepot>
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
      <AddStkcView v-if="baseStkc != null" v-show="showDatail" :baseStkc="baseStkc" @cancelAddStkcView='cancelAddStkcView'></AddStkcView> 
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
            vusername:"QJ",
            userno:"359320",
            username:"k1111"
          },
          depotPagarm:{//待装车和我的库存搜索参数
            key:"",
            username:"k1111",
            vusername:"HZSOP",
            whc:"",
            truckType:"S",
            storageStatus:"B"
          },
          backPagarm:{
            userno:"359320",
            username:"k1111",
            whc:"QJ", 
            name:"kiki",
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
            oper: 'getVendorwhcFour',
            type: 'truck',
            para: JSON.stringify(this.pagram) 
          }
          Request.post(pargrmList).then(res=>{
            let dataList = JSON.parse(res.data.result);
            dataList.data.forEach(value=> {
              this.depotList.push(value)
            })           
            this.depotName = dataList.data[0].NAME;
            if(dataList.code!=="200") Toast({ message: getData.msg, duration: 2000 });
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
            if(dataList.code!=="200") Toast({ message: getData.msg, duration: 2000 });
             Indicator.close();
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
        sureBackDepot(){//点击确认回库
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
                  param.qty = item.STK_QTY 
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
            
            Toast({message:"回库成功", duration: 2000 });
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
          // item.MODLE_LIST.forEach(temp=>{
          //   this.$set(temp,"qty",temp.STK_QTY);
          // })         
        },
        cancelAddStkcView(){
          this.showDatail = false;
        },
        goback(){//返回按钮
          this.$router.goBack();
        },
        search(key){//搜索
          console.log(key)
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
          console.log(this.stockList);
          var flag = true;
          this.stockList.forEach(item=>{
            if (!item.seletedStatus) {
              flag = false;
            }
            // console.log(flag)
          })
          if (!flag) {
            this.selectStatus = false;
          } else {
            this.selectStatus = true;
          }
        }
  
      },
      mounted() {
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

