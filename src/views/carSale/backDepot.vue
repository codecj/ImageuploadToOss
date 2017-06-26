<template>
  <div>
      <header>
        <div align="center" @click="goback"><img src="../../assets/icon10.png" alt=""></div>
        <div>{{depotName}}</div>
        <div align="center" @click="selectDev"><img src="../../assets/icon10.png" alt=""></div>       
      </header>
        <depotlist v-show="showDev" :depotList="depotList" @depotSelected='depotSelected' @cancelDepotList='cancelDepotList'>
        </depotlist>
        <AddStkcView v-show="showDatail" @cancelAddStkcView="cancelAddStkcView"></AddStkcView>   
      <content>
        <div class="searchs">
          <searchDepot></searchDepot>
        </div>
     
          <onedepot :list="this.list" :selectStatus="selectStatus"  @back="back"></onedepot>        
      </content>
      <footer>
          <div><span :class="{'noselect':!selectStatus,'selectAll':selectStatus}" @click="selectAll()">全选</span></div>
          <div>确认回库</div>
      </footer>
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

    // 懒加载效果
  Vue.use(Lazyload, {
    preLoad: 1.3,
    error: require('../../assets/holde.png'),
    loading: require('../../assets/holde.png'),
    attempt: 1
  })
  export default({
      data(){
        return{
          selectStatus:true,
          showDev:false,
          showDatail:false,
          depotName:"",
          list:[
            {
              name:"墨西哥辣鸡墨西哥辣鸡墨西哥辣鸡墨西哥辣鸡墨西哥辣鸡墨西哥辣鸡墨西哥辣鸡墨西哥辣鸡墨西哥辣鸡墨西哥辣鸡墨西哥辣鸡墨",
              num:"12",
              URL_ADDR:"../../assets/icon1.png"

            },{
              name:"好吃好吃啊好吃好吃啊好吃好吃啊好吃好吃啊好吃好吃啊好吃好吃啊好吃好吃啊好吃好吃啊好吃好吃啊好吃好吃啊好吃好吃啊好",
              num:"13",
              URL_ADDR:"../../assets/icon1.png"
            }
            ,{
              name:"好吃好吃啊好吃好吃啊好吃好吃啊好吃好吃啊好吃好吃啊好吃好吃啊好吃好吃啊好吃好吃啊好吃好吃啊好吃好吃啊好吃好吃啊好",
              num:"13",
              URL_ADDR:"../../assets/icon1.png"
            },{
              name:"好吃好吃啊好吃好吃啊好吃好吃啊好吃好吃啊好吃好吃啊好吃好吃啊好吃好吃啊好吃好吃啊好吃好吃啊好吃好吃啊好吃好吃啊好",
              num:"13",
              URL_ADDR:"../../assets/icon1.png"
            },{
              name:"好吃好吃啊好吃好吃啊好吃好吃啊好吃好吃啊好吃好吃啊好吃好吃啊好吃好吃啊好吃好吃啊好吃好吃啊好吃好吃啊好吃好吃啊好",
              num:"13",
              URL_ADDR:"../../assets/icon1.png"
            },{
              name:"好吃好吃啊好吃好吃啊好吃好吃啊好吃好吃啊好吃好吃啊好吃好吃啊好吃好吃啊好吃好吃啊好吃好吃啊好吃好吃啊好吃好吃啊好",
              num:"13",
              URL_ADDR:"../../assets/icon1.png"
            }
          ],
          depotList:[{deptoName:"111"}],
          pagram:{
            vusername:"QJ",
            userno:"",
            username:""
          }
        }
      },
      components:{
        onedepot,depotlist,AddStkcView,searchDepot
      },
      methods:{
        selectAll(){
            this.selectStatus = !this.selectStatus;           
        },
        depotSelected(depot){
          this.showDev = false;
          this.depotName = depot.depotName;
        },
        cancelDepotList(){
          this.showDev = false;
        },
        selectDev(){//点击弹出可选列表
          this.showDev = !this.showDev;
          this.getList();
        },
        getList(){//获取列表数据
          const pargrmList = {
            oper: 'getVendorwhcFour',
            type: 'truck',
            para: JSON.stringify(this.pagram) 
          }
          Request.post(pargrmList).then(res=>{
            console.log(res.data.result)
          }).catch(error=>{
             
          })
        },
        back(){
          this.showDatail = !this.showDatail;
        },
        cancelAddStkcView(){
          this.showDatail = false;
        },
        selectdepotName(){
          // console.log(1)
          // this.list.forEach(value=>{
          //   console.log(value)
          // })
           this.depotName = this.depotList[0].depotName;
        },
        goback(){
          this.$router.goBack();
        }
  
      },
      mounted() {
        this.selectdepotName();
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
    /*padding-top:20px;*/

  }
  .searchs{
    background: #fff;
    width:100%;
    height:96px;
    position: fixed;top:108px;left:0;
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

