<template>
  <div id="prods">
    <header>
      <div><img src="../assets/icon10.png" alt=""/></div>
      <input type="text" placeholder="请输入关键字搜索商品">
      <div @click="changeList" :class="{'statusactive':status,'statusleft':!status}"></div>
    </header>
    <div class="border"></div>
    <div class="selectList">
      <ul>
        <li @click="changeSort(item,index)" v-for="(item,index) in change" :class="{'lowprice':price,'topprice':!price,'show':!item.show}">
          {{item.title}}
        </li>
        <li>
            筛选
        </li>
      </ul>
    </div>
    <proLists :listStatus="listStatus"></proLists>
  </div>
</template>

<script type="text/javascript">
  import proLists from "./childcomponent/prodlistcomponent.vue"
  export default({
    name:"prods",
    components: {
      proLists
    },
    data() {
      return{
        status:false,
        listStatus:false,
        price:true,
        change:[
          {
            title:"综合",
            show:true
          },
          {
            title:"销量",
            show:false
          },
          {
            title:"价格",
            show:false
          }
        ] 
      }
    },
    methods:{
      changeList: function(){
        this.status=!this.status;
        this.listStatus=!this.listStatus
      },
      changeSort: function(item,index){
        this.price=!this.price;
          this.$nextTick(function () {
          let that=this;
          this.change.forEach(function(item){
             that.$set(item,"show",false);
          })
         that.$set(item,"show",true);
        })       
      },
    }
  })
</script>

<style>
#prods{
  position: absolute;
    height: 100%;
    width: 100%;}
header{
  height:88px;
  line-height:88px;
  position: fixed;
  top:0;
  background:#fff;
}
header .statusactive{
  width:88px;
  height:88px;
  margin-left:20px;
  vertical-align: middle;
  background:url(../assets/icon46.png) no-repeat center;
  background-size:70%;
  float:left;

}
header .statusleft{
  float:left;
  margin-left:20px;
  width:88px;
  height:88px;
  vertical-align: middle;
  background:url(../assets/icon47.png) no-repeat center;
  background-size:70%;
}
header input{
  width:448px;
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
  background-size:26px 26px;
}
header div:nth-child(1){
  float:left;
  width:113px;
  line-height:88px;
  text-align: center;

}

header div:nth-child(1) img{
  width:33.6px;
  height:33.6px;
  vertical-align: middle;

}
.border{
  height:24px;
  background:#EBECF0;
  position: fixed;
  top:88px;
  left:0;
  overflow: hidden;
  width:100%;
}
.selectList {
  position: fixed;
  top:110px;

}
.selectList ul{
  width:630px;
  height:37px;
  background:#fff;
  padding:30px 48px 29px 72px;  
  text-align: left;

}
.selectList ul li{
  float:left;
  font-size: 26px;
  color: #343657;
  letter-spacing: 0;
  margin-right:70px;
}
.selectList ul li:nth-last-child(){
  margin-right:0;

}
.selectList ul li span{
  display:inline-block;
  font-size: 26px;
  height:37px;
  vertical-align: middle;

}
.selectList ul li:nth-child(4){
  margin-right:0;
}
.selectList ul .topprice{
  width:100px;
  background: url(../assets/icon0.png) no-repeat right;
  background-size:30%;
}
.selectList ul .lowprice{
  width:100px;
  background: url(../assets/icon6.png) no-repeat right;
  background-size:30%;
}
/*.selectList ul .show{
  width:100px;
  background: url(../assets/icon6.png) no-repeat right;
  background-size:30%;
}*/
.selectList ul .show{
  background:none;
}
.selectList ul li:nth-child(4){
  width:100px;
  background: url(../assets/icon19.png) no-repeat right;
  background-size:30%;
}


</style>