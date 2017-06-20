<template>
  <div>
      <header>
        <div align="center"><img src="../../assets/icon10.png" alt=""></div>
        <div>选择商品回库的仓库</div>
        <div align="center"><img src="../../assets/icon10.png" alt=""></div>
      </header>
      <content>
          <div class='search'>
            <div align="center"><img src="../../assets/icon58.png" alt=""></div>
            <div align="right"><input type="search" placeholder="请输入要搜索的产品" id="search"></div>
            <div>搜索</div>
          </div>
          <onedepot :list="this.list" :selectStatus="selectStatus"></onedepot>
          <!-- <onedepot></onedepot> -->
      </content>
      <footer>
          <div><span :class="{'noselect':!selectStatus,'selectAll':selectStatus}" @click="selectAll()">全选</span></div>
          <div>确认回库</div>
      </footer>
  </div>
  
</template>

<script type="text/javascript">
  import onedepot from "../../components/carSale/oneDepot.vue"
  export default({
      data(){
        return{
          selectStatus:true,
          list:[
            {
              name:"墨西哥辣鸡墨西哥辣鸡墨西哥辣鸡墨西哥辣鸡墨西哥辣鸡墨西哥辣鸡墨西哥辣鸡墨西哥辣鸡墨西哥辣鸡墨西哥辣鸡墨西哥辣鸡墨",
              num:"12"

            },{
              name:"好吃好吃啊好吃好吃啊好吃好吃啊好吃好吃啊好吃好吃啊好吃好吃啊好吃好吃啊好吃好吃啊好吃好吃啊好吃好吃啊好吃好吃啊好",
              num:"13"
            }
          ]
        }
      },
      components:{
        onedepot
      },
      methods:{
        selectAll(){
            this.selectStatus = !this.selectStatus;           
        }
      },
      mounted() {

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
    top:88px;
    bottom:88px;
    left:0;
    z-index:-1;
    background:#f1f2f7;
    height:auto;
    width:100%;
    overflow: auto;
    padding-top:20px;
  }
  content .search{
    height:96px;
    line-height: 96px;
    width:100%;
    background: #fff;
  }
  .search div{
    display:inline-block;
    float:left;
  }
  .search div:nth-child(1){
    width:15%;
    height:96px;
    border-right:2px solid #F1F2F7;
  }
  .search div:nth-child(1) img{
    width:60px;
    height:60px;
    vertical-align: middle;
  }
  .search div:nth-child(2){

    width:65%;
    height:96px;
    background:url(../../assets/icon20.png) no-repeat 20px center;
    background-size: 10%;
  }
  .search div:nth-child(2) input{
    font-size: 26px;
    color: #9DA2B5;
    letter-spacing: 0;
    width:80%;
    height:96px;
    border:none;

  }
  .search div:nth-child(3){
    width:19%;
    height:96px;
    text-align: center;
    font-size: 30px;
    color: #3B456C;
    letter-spacing: 0;
    border-left:2px solid #F1F2F7;
  }
  footer{
    height:88px;
    width:100%;
    /*background:#f00;*/
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