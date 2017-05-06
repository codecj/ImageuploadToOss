<template>
  <div id="prodsList">
     <!-- content横着布局和changeItem竖着布局-->
     <div class="proList"  @scroll="onScroll">
        <div :class="{'changeItem':listStatus,'content':!listStatus}">
      <!-- 每个产品 -->
         <div class="searchItem">
          <div class="onephoto">
            <img src="../assets/icon12.png" alt="" class="photo">
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
            <img src="../assets/icon43.png" alt="" class="gocart">
          </p>
        </div>
        <div class="searchItem">
          <div class="onephoto">
            <img src="../assets/icon12.png" alt="" class="photo">
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
            <img src="../assets/icon43.png" alt="" class="gocart">
          </p>
        </div>
         <div class="searchItem">
          <div class="onephoto">
            <img src="../assets/icon12.png" alt="" class="photo">
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
            <img src="../assets/icon43.png" alt="" class="gocart">
          </p>
        </div>
         <div class="searchItem">
          <div class="onephoto">
            <img src="../assets/icon12.png" alt="" class="photo">
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
            <img src="../assets/icon43.png" alt="" class="gocart">
          </p>
        </div>       
   </div>
   <div class="over">
         <!-- <p>已经到底啦</p>  -->
        <p>
           <img src="../assets/icon43.png" alt=""> 
           <span>1</span>
        </p>
        <img src="../assets/icon54.png" alt="">
       
    </div> 
    </div>
   
  </div>
</template>

<script type="text/javascript">
  export default({
    name:"prodsList",
    data() {
        return{

        }
    },
    props:["listStatus"],
    methods:{
      onScroll:function(){
        console.log(1)
      }
    }
  })
</script>

<style>
#prodsList{
  /*margin-top:208px;*/
  position: absolute;
  top:208px;
  bottom:0;
  z-index:-999;

}
.proList{
  padding-bottom:200px;
  background:#ebecf0;
}
/*content横着布局方式*/
.content ,.changeItem{
  width:100%;
  height: 100%;
  overflow-y:scroll;
  -webkit-overflow-scrolling: touch;
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
}
.content .searchItem>p:nth-child(3){
  font-size: 22px;
  color: #9DA2B5;
  letter-spacing: 0;
  height:30px;
  margin:16px 0 10px 23px;
}
.content .searchItem>p:nth-child(4){
  /*width:367px;*/
  height:48px;
  padding-top:10px;
  opacity: 0.9;
  background: #FFFFFF;
  position: absolute;
  margin-top:-210px;
  margin-left:10px;

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
  margin:16px 0 0 15px;
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
  text-align: center;

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
  bottom:10px;
  right:0;
}
.over p {
  position: relative;
  width:120px;
  height:120px;
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
top:20px;
right:20px;
}
.over img {
  display:inline-block;
  width:112px;
  height:112px;
  float:right;
  margin:0px 20px 15px 0;
}
</style>