<template>
  <div>
    <header>
      <div><img src="1.jpg" alt=""/></div>
      <input type="text" placeholder="请输入关键字搜索商品">
      <div><img src="1.jpg" alt=""/></div>
    </header>
    <div class="border"></div>
    <div class="selectList">
      <ul>
        <li><span>综合</span></li>
        <li><span>销量</span></li>
        <li><span>价格</span><img src="1.jpg" alt=""></li>
        <li><span>筛选</span><img src="1.jpg" alt=""></li>
      </ul>
    </div>
   <div class="content">
        <div class="searchItem">
          <div class="onephoto">
            <img src="1.jpg" alt="" class="photo">
            <p>
              <span>优惠套餐</span>
              <span>混搭满赠</span>
              <span>打折</span>
            </p>
          </div>
          
          <p>墨西哥辣鸡点心啊啊啊啊啊啊啊啊啊啊啊</p>
          <p>规格：4444*777</p>
          <p>
            <span>￥20.00</span>
            <img src="a.jpg" alt="" class="gocart">
          </p>
        </div>
         <div class="searchItem">
          <div class="onephoto">
            <img src="1.jpg" alt="" class="photo">
            <p>
              <span>优惠套餐</span>
              <span>混搭满赠</span>
              <span>打折</span>
            </p>
          </div>
          
          <p>墨西哥辣鸡点心啊啊啊啊啊啊啊啊啊啊啊</p>
          <p>规格：4444*777</p>
          <p>
            <span>￥20.00</span>
            <img src="a.jpg" alt="" class="gocart">
          </p>
        </div>
         <div class="searchItem">
          <div class="onephoto">
            <img src="1.jpg" alt="" class="photo">
            <p>
              <span>优惠套餐</span>
              <span>混搭满赠</span>
              <span>打折</span>
            </p>
          </div>
          
          <p>墨西哥辣鸡点心啊啊啊啊啊啊啊啊啊啊啊</p>
          <p>规格：4444*777</p>
          <p>
            <span>￥20.00</span>
            <img src="a.jpg" alt="" class="gocart">
          </p>
        </div>
         <div class="searchItem">
          <div class="onephoto">
            <img src="1.jpg" alt="" class="photo">
            <p>
              <span>优惠套餐</span>
              <span>混搭满赠</span>
              <span>打折</span>
            </p>
          </div>
          
          <p>1墨西哥辣鸡点心啊啊啊啊啊啊啊啊啊啊啊</p>
          <p>规格：4444*777</p>
          <p>
            <span>￥20.00</span>
            <img src="a.jpg" alt="" class="gocart">
          </p>
        </div>
     
   </div>
    <div class="over">
        <img src="1.jpg" alt="">
        <span>已经到底啦</span>
        <img src="1.jpg" alt="">
     </div>
  </div>
</template>

<script type="text/javascript">

</script>

<style>
header{
  height:88px;
  line-height:88px;
}
header input{
  width:448px;
  height:62px;
  background: #EBECF0;
  border-radius: 2px;
  border:none;
  float:left;
  margin-top:13px;
  font-family: PingFangSC-Regular;
  font-size: 26px;
  color: #9DA2B5;
  letter-spacing: 0;
  padding-left:76px;
  /*background:url() no-repeat center;*/
}
header div:nth-child(1),header div:nth-child(3){
  float:left;
  width:113px;
  line-height:88px;
  text-align: center;

}

header div:nth-child(1) img{
  width:17.6px;
  height:33.6px;
  vertical-align: middle;

}
header div:nth-child(3) img{
  width:42px;
  height:42px;
  vertical-align: middle;
}
/*header img:nth-child(1){
  width:17.6px;
  height:33.6px;
  margin:0 48px;
  vertical-align: middle;
}*/
.border{
  height:24px;
  background:#EBECF0;
}
.selectList ul{
  width:630px;
  height:37px;
  background:#fff;
  padding:30px 48px 29px 72px;
}
.selectList ul li{
  float:left;
  font-family: Helvetica;
  font-size: 26px;
  color: #343657;
  letter-spacing: 0;
  margin-right:116px;
}
.selectList ul li span{
  display:inline-block;
  width:52px;
  height:37px;
  vertical-align: middle;

}
.selectList ul li:nth-child(4){
  margin-right:0;

}
.selectList ul li:nth-child(3) img{
  width:11px;
  height:26px;
  margin-left:17px;
  vertical-align: middle;
}
.selectList ul li:nth-child(4) img{
  width:22px;
  height:26px;
  margin-left:17px;
  vertical-align: middle;
  /*display:inline-block;*/

}
.content{
  width:100%;
  background:#ebecf0;
  overflow: hidden;
}
.content .searchItem:nth-child(even){
  float:right;
  width:367px;
  height:594px;
  margin-top:14px;
  background: #fff;
}
.content .searchItem:nth-child(odd){
  float:left;
  width:367px;
  height:594px;
  margin-top:14px;
  background: #fff;
}
.content .searchItem .onephoto{
  width:367px;
  height:367px;
  position: relative;
  /*background: #fff;*/
}
.content .searchItem .onephoto .photo{
  width:367px;
  height:367px;
}
.content .searchItem .onephoto p{
  width:367px;
  height:48px;
  padding-top:10px;
  /*line-height:48px;*/
  opacity: 0.9;
  background: #FFFFFF;
  position: absolute;
  bottom:0;
  left:0;

}
.content .searchItem .onephoto p span{
  font-family: PingFangSC-Regular;
  font-size: 18px;
  color: #FF783C;
  letter-spacing: 0;
  border: 1px solid #FF783C;
  border-radius: 2px;
  display:inline-block;
  padding:1px 10px 1px 10px;
  margin-left:8px;
}
.content .searchItem>p:nth-child(2){
  width:330px;
  height:80px;
  font-family: PingFangSC-Medium;
  font-size: 30px;
  color: #3B456C;
  letter-spacing: 0;
  line-height: 40px;
  margin:19px 14px 0 23px;
}
.content .searchItem>p:nth-child(3){
  font-family: PingFangSC-Regular;
  font-size: 22px;
  color: #9DA2B5;
  letter-spacing: 0;
  /*width:138px;*/
  height:30px;
  margin:16px 0 10px 23px;
}
.content .searchItem>p:nth-child(4){
  margin-top:20px;
}
.content .searchItem>p:nth-child(4) span{
  font-family: PingFangSC-Regular;
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
.over{
  height:50px;
  width:100%;
  padding:30px 0;
  background:#ebecf0;
  text-align: center;

}
.over span{
  margin :0 20px;
}
.over img {
  vertical-align:middle;
}
</style>