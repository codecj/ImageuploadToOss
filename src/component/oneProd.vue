<template>
  <div id="oneProd" >
   <!-- 每个产品 -->  
      <div class="searchItem" v-for="item in prodList" :data-id="item.STK_NAME_EXT">
        <div class="onephoto">
          <img alt="" class="photo" v-lazy="item.URL_ADDR" width="157" height="157">
        </div>
        
        <p>{{item.NAME}}</p>
        <p>规格：{{item.MODLE}}</p>
        <p>
            <span>优惠套餐</span>
            <span>混搭满赠</span>
            <span>打折</span>
          </p>
        <p>
          <span>￥{{item.LIST_PRICE}}</span>
          <span>{{item.commissionPrice ? "奖" : ''}}</span>
          <span>{{item.commissionPrice ? '￥'+item.commissionPrice : ''}}</span>
          <img src="../assets/icon43.png" alt="" class="gocart" @click="gocart(item.STK_C)">
        </p>
    </div>
  </div>    
</template>
  <script type="text/javascript">
  import Request from "../util/API"
  export default({
    name:"oneProd",
    data() {
        return{
          // prodList:[],
        }
    },
    components: {
    },
    props:{
      prodList:Array
    },
    methods:{
       gocart: function(value){
        Request.jsBbridge(function(bridge) {
          bridge.callHandler(
            'popShoppingCartClick',{
              'stkc':value
            })
        })
      }
    }
  })
</script>

<style scoped>

/*changeItem竖着布局方式*/
.searchItem{
  height:198px;
  width:100%;
  border-top:2px solid #F1F2F7;
  background:#fff;
  padding:50px 40px 50px 32px;

}
.searchItem .onephoto{
}
.searchItem .onephoto .photo{
  width:200px;
  height:200px;
  float:left;
}
.searchItem>p:nth-child(2){
  width:450px;
  height:80px;
  float:left;
  font-size: 30px;
  color: #3B456C;
  letter-spacing: 0;
  line-height: 40px;
  margin-left:28px;
  overflow:hidden;
  text-overflow: ellipsis;
  word-break: normal;
  display: -webkit-box; 
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; 

}
.searchItem>p:nth-child(3){
  font-size: 22px;
  color: #9DA2B5;
  letter-spacing: 0;
  float:left;
  width:450px;
  margin-left:28px;
}
.searchItem>p:nth-child(4){
  width:450px;
  height:40px;
  float:left;
  margin-top:8px;
  margin-left:28px;
}
.searchItem>p:nth-child(4) span{
  float:left;
  font-size: 18px;
  color: #FF783C;
  letter-spacing: 0;
  border: 1px solid #FF783C;
  border-radius: 2px;
  display:inline-block;
  padding:1px 10px 1px 10px;
  margin-right:10px;
}
.searchItem>p:nth-child(5){
  margin-top:4px;
  height:44px;
  line-height:44px;
  width:450px;
  float:left;
  margin-left:28px;
}
.searchItem>p:nth-child(5) span:nth-child(1){
  font-size: 30px;
  color: #FF783C;
  letter-spacing: 0;
}
.searchItem>p:nth-child(5) span:nth-child(2){
  font-size: 18px;
  color: #FFFFFF;
  letter-spacing: 0;
  background: #FF7A3F;
  border-radius: 4px;
  margin:0 10px 0 40px;
  line-height: 30px;
  text-align: center;
  display: inline-block;

}
.searchItem>p:nth-child(5) span:nth-child(3){
  font-size: 22px;
  color: #FF783C;
  letter-spacing: 0;

}
.searchItem .gocart{
  width:48px;
  height:48px;
  float:right;
}

</style>