<template>
  <div>
      <div class='search'>
        <div align="center" @click="scan"><img src="../../assets/icon58.png" alt=""></div>
        <div align="right">
          <form action="" @submit.prevent="search">
            <input type="search" placeholder="请输入要搜索的产品" id="search">
          </form>
        </div>
        <div @click="search">搜索</div>
      </div>
  </div>
  
</template>

<script type="text/javascript">
import Request from "../../util/API"
  export default({
      data(){
        return{
         }
      },
      components:{

      },
      methods:{
        scan(){
          Request.jsBbridge(function(bridge) {
            bridge.callHandler(
              // 'pushSearchWebClick'
            )
          })
        },
        search(){
          //搜索请求
          // console.log(1)
        }
      
      }
  })
 
</script>

<style scoped>

.search{
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
    height:95px;
    line-height: 95px;
    background:url(../../assets/icon20.png) no-repeat 20px center;
    background-size: 10%;
  }
  .search div:nth-child(2) input{
    font-size: 26px;
    color: #9DA2B5;
    letter-spacing: 0;
    width:80%;
    height:90px;
    border: none;

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

</style>

