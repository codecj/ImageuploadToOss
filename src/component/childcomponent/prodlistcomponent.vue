<template>
  <div id="prodsList">
     <!-- content横着布局和changeItem竖着布局-->
     <div class="proList">
        <div :class="{'changeItem':listStatus,'content':!listStatus}">
      <!-- 每个产品 -->
         
      <!--    <div class="searchItem">
          <div class="onephoto">
            <img src="../../assets/icon12.png" alt="" class="photo">
          </div>
          
          <p>墨西哥辣鸡点心啊啊啊啊啊啊啊啊啊啊啊</p>
          <p>规格：4444*777</p>
          <p>
              <span>优惠套餐</span>
              <span>混搭满赠</span>
              <span>打折</span>
            </p>
          <p>
            <span>￥20.00</span>
            <span>奖</span>
            <span>￥8.00</span>
            <img src="../../assets/icon43.png" alt="" class="gocart">
          </p>
        </div>   -->   
         
         <div class="searchItem" v-for="item in prodDetail">
          <div class="onephoto">
            <img alt="" class="photo" v-lazy="item.prodImg" width="157" height="157">
          </div>
          
          <p>{{item.prodName}}</p>
          <p>规格：{{item.prodSize}}</p>
          <p>
              <span>优惠套餐</span>
              <span>混搭满赠</span>
              <span>打折</span>
            </p>
          <p>
            <span>{{item.prodPrice}}</span>
            <span>奖</span>
            <span>￥8.00</span>
            <img src="../../assets/icon43.png" alt="" class="gocart">
          </p>
        </div>
        <!-- //////////////////////////////////////////// -->
   </div>
   <div class="over">
         <!-- <p>已经到底啦</p>  -->
        <p>
           <img src="../../assets/icon43.png" alt=""> 
           <span>1</span>
        </p>
        <p>
          <img src="../../assets/icon54.png" alt="" id="scrolltop" @click="scrollTop">
        </p>
       
    </div> 
    </div>
   
  </div>
</template>

<script type="text/javascript">
import Vue from 'vue'
import { Lazyload } from 'mint-ui';
  Vue.use(Lazyload, {
    preLoad: 1.3,
    error: require('../../assets/icon2.png'),
    loading: require('../../assets/icon6.png'),
    attempt: 1
  });
  export default({
    name:"prodsList",
    data() {
        return{
          prodDetail:[
            {
              prodImg:require("../../assets/icon12.png"),
              prodName:"墨西哥辣鸡点心啊啊啊啊啊啊啊啊啊啊啊",
              prodSize:"4444*777",
              prodPrice:"￥20.00"
           }, {
              prodImg:require("../../assets/icon4.png"),
              prodName:"墨西哥辣鸡点心啊啊啊啊啊啊啊啊啊啊啊",
              prodSize:"4444*777",
              prodPrice:"￥20.00"
           }, {
              prodImg:require("../../assets/icon2.png"),
              prodName:"墨西哥辣鸡点心啊啊啊啊啊啊啊啊啊啊啊",
              prodSize:"4444*777",
              prodPrice:"￥20.00"
           },
            {
              prodImg:require("../../assets/icon12.png"),
              prodName:"墨西哥辣鸡点心啊啊啊啊啊啊啊啊啊啊啊",
              prodSize:"4444*777",
              prodPrice:"￥20.00"
           }, {
              prodImg:require("../../assets/icon2.png"),
              prodName:"墨西哥辣鸡点心啊啊啊啊啊啊啊啊啊啊啊",
              prodSize:"4444*777",
              prodPrice:"￥20.00"
           }, {
              prodImg:require("../../assets/icon4.png"),
              prodName:"墨西哥辣鸡点心啊啊啊啊啊哥辣鸡点心啊啊啊啊啊你好吃吗哈哈哈啊啊啊啊啊啊",
              prodSize:"4444*777",
              prodPrice:"￥20.00"
           },
          ]
        }
    },
    props:["listStatus"],
    methods:{
      onScroll:function() {
        this.scrolled=document.getElementById("prodsList").scrollTop;
        let scrolltop = document.getElementById('scrolltop');
          if(this.scrolled>10){
            scrolltop.style.display = 'block';
          }else{
            scrolltop.style.display = 'none';
          }
      },
      scrollTop:function() {
        var oTop = document.getElementById("prodsList");
        oTop.scrollTop = 0;      
      }
    }, 
    mounted () {
        var scroll=document.getElementById("prodsList");
        scroll.addEventListener('scroll', this.onScroll);
    }
  })
</script>

<style>

#prodsList{
  position: absolute;
  top:208px;
  bottom:0;
  overflow-y:scroll;
  -webkit-overflow-scrolling: touch;
  padding-bottom:200px;
  background:#ebecf0;
}
.proList{
  width: 100%;
  overflow: hidden; 
}
/*content横着布局方式*/
.content ,.changeItem{
    overflow: hidden;
    width:750px;
}
.content .searchItem:nth-child(even){
  float:right;
  width:367px;
  height:594px;
  margin-top:14px;
  background: #fff;
  position: relative;
}
.content .searchItem:nth-child(odd){
  float:left;
  width:367px;
  height:594px;
  margin-top:14px;
  background: #fff;
  position: relative;
}
.content .searchItem .onephoto{
  width:367px;
  height:367px;
  position: relative;
}
.content .searchItem .onephoto .photo{
  width:367px;
  height:367px;
}

.content .searchItem>p:nth-child(2){
  width:330px;
  height:80px;
  font-size: 30px;
  color: #3B456C;
  letter-spacing: 0;
  line-height: 40px;
  margin:19px 14px 0 23px;
  overflow:hidden;
  /*white-space: nowrap;*/
  text-overflow: ellipsis;
  word-break: normal;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 2; /** 显示的行数 **/
}
.content .searchItem>p:nth-child(3){
  font-size: 22px;
  color: #9DA2B5;
  letter-spacing: 0;
  height:30px;
  margin:16px 0 10px 23px;
}
.content .searchItem>p:nth-child(5) span:nth-child(2){
    font-size: 18px;
    color: #FFFFFF;
    letter-spacing: 0;
    background: #FF7A3F;
    border-radius: 4px;
    margin: 0 0 0 14px;
    width:30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    display:inline-block;
    margin-right:0;
}
.content .searchItem>p:nth-child(5) span:nth-child(3){
    margin-left:0;
}
.content .searchItem>p:nth-child(4){
  height:48px;
  padding-top:10px;
  opacity: 0.9;
  background: #FFFFFF;
  position: absolute;
  margin-top:-210px;
  padding-left:10px;
  width:357px;

}
.content .searchItem>p:nth-child(4) span{
  font-size: 18px;
  color: #FF783C;
  letter-spacing: 0;
  border: 1px solid #FF783C;
  border-radius: 2px;
  display:inline-block;
  padding:1px 6px 1px 6px;
}
.content .searchItem>p:nth-child(5){
  margin-top:20px;
}
.content .searchItem>p:nth-child(5) span{
  font-size: 30px;
  color: #FF783C;
  letter-spacing: 0;
  margin:8px 0 0 10px;
}
.content .searchItem .gocart{
  width:48px;
  height:48px;
  float:right;
  margin-right:24px;
}

/*changeItem竖着布局方式*/
.changeItem .searchItem{
  height:198px;
  width:100%;
  border-top:2px solid #F1F2F7;
  background:#fff;
  padding:50px 40px 50px 32px;

}
.changeItem .searchItem .onephoto{
}
.changeItem .searchItem .onephoto .photo{
  width:200px;
  height:200px;
  float:left;

}
/**/
.changeItem .searchItem>p:nth-child(2){
  width:450px;
  height:80px;
  float:left;
  font-size: 30px;
  color: #3B456C;
  letter-spacing: 0;
  line-height: 40px;
  margin-left:28px;
  overflow:hidden;
  /*white-space: nowrap;*/
  text-overflow: ellipsis;
  word-break: normal;
  display: -webkit-box; 
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; 

}
.changeItem .searchItem>p:nth-child(3){
  font-size: 22px;
  color: #9DA2B5;
  letter-spacing: 0;
  float:left;
  width:450px;
  margin-left:28px;
}
.changeItem .searchItem>p:nth-child(4){
  width:450px;
  height:40px;
  float:left;
  margin-top:8px;
  margin-left:28px;
}
.changeItem .searchItem>p:nth-child(4) span{
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
.changeItem .searchItem>p:nth-child(5){
  margin-top:4px;
  height:44px;
  line-height:44px;
  width:450px;
  float:left;
  margin-left:28px;
}
.changeItem .searchItem>p:nth-child(5) span:nth-child(1){
  font-size: 30px;
  color: #FF783C;
  letter-spacing: 0;
}
.changeItem .searchItem>p:nth-child(5) span:nth-child(2){
  font-size: 18px;
  color: #FFFFFF;
  letter-spacing: 0;
  background: #FF7A3F;
  border-radius: 4px;
  margin:0 10px 0 40px;
  width:30px;
  height:30px;
  line-height: 30px;
  text-align: center;
  display: inline-block;

}
.changeItem .searchItem>p:nth-child(5) span:nth-child(3){
  font-size: 22px;
  color: #FF783C;
  letter-spacing: 0;

}
.changeItem .searchItem .gocart{
  width:48px;
  height:48px;
  float:right;
}
.over{
  position: fixed;
  bottom:0;
  right:0;
}
.over p {
  position: relative;
  width:112px;
  height:112px;
  display: inline-block;
  float:right;
  text-align: center;

}
.over p span{
font-size: 18px;
color: #FF783C;
letter-spacing: 0;
width:32px;
height:32px;
border-radius:50%;
line-height:32px;
text-align: center;
display:inline-block;
background: #FFFFFF;
position: absolute;
top:0px;
right:25px;
}
.over img {
  display:inline-block;
  width:112px;
  height:112px;
  float:right;
  margin:0px 20px 15px 0;
}
#scrolltop{
  display:none;
}
</style>