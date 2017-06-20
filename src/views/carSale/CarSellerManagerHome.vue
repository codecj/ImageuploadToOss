<!-- 车销管理首页 -->
<template>
    <div id="carSellerManagerHome" :style='{height:elmHeight}'>
        <div class="page-navbar">
            <!-- 标题区 -->
            <div class="page-title">
                <img class="left-btn" src="../../assets/icon10.png" height="30" width="30"></img>
                <form @submit.prevent="submit">
                    <input class="header-search" id="search" placeholder="请输入关键字搜索商品" type="search" :value="keyword" v-model="keyword">
                </form>
                <!-- <input type="search" class='header-search' placeholder='请输入关键字搜索商品'> -->
                <img class='header-glass' src="../../assets/icon20.png" height="20" width="20"></img>
                <img class="right-btn" src="../../assets/add.png" height="30" width="30" @click="showToolBox"></img>
            </div>
            <!-- tabBar -->
            <mt-navbar class="page-part tab-bar" v-model="selected">
                <mt-tab-item id="first" class="my-repertory first">
                    <span>我的库存</span>
                </mt-tab-item>
                <mt-tab-item id="second" class="wait-to-package">
                    <span>待装车</span>
                </mt-tab-item>
            </mt-navbar>
            <!-- 商品回库 -->
            <!-- <mt-cell class="page-part" title="当前选中">{{ selected }}</mt-cell> -->
            <mt-tab-container v-model="selected">
                <mt-tab-container-item id="first" class="my-repertory-item">
                    <mt-cell class="staticCell" title="商品回库" value="未售完商品退回至仓库" is-link></mt-cell>
                    <ul class="list-ul">
                        <li class="borderBottom">
                            <div class="list-li">
                                <div class="con">
                                    <div class="cell-content">
                                        <img src="../../assets/add.png" class="goodsImg">
                                        <h4 class="goodsName">我是很牛逼的商品</h4>
                                        <h5 class="goodsSpec">我是商品规格</h5>
                                    </div>
                                </div>
                                <div class="btn" @click='deleteItem'>删除</div>
                            </div>
                        </li>
                    </ul>
                </mt-tab-container-item>
                <mt-tab-container-item id="second" class="wait-to-package-item">
                    <mt-cell class="staticCell" title="打印明细" value="打印待装车商品明细" is-link @click="printGoodsDetail"></mt-cell>
                    <ul class="list-ul">
                        <li class="borderBottom" v-for="n in 10">
                            <div class="cell-header borderBottom">
                                <span>待仓管确认装车</span>
                                <span>编辑</span>
                            </div>
                            <div class="list-li">
                                <div class="con">
                                    <div class="cell-content">
                                        <img src="../../assets/add.png" class="goodsImg">
                                        <h4 class="goodsName">我是很牛逼的商品</h4>
                                        <h5 class="goodsSpec">我是商品规格</h5>
                                    </div>
                                </div>
                                <div class="btn" @click='deleteItem'>删除</div>
                            </div>
                        </li>
                    </ul>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
        <div class="tool-box" v-show="boxShowStatus" :class="{elmHeight}" @click.stop="showToolBox">
            <ul>
                <li @click="addGoods">添加商品</li>
                <li @click="carSaleStatistics">车销统计</li>
                <li @click="returnCar">退货回车</li>
            </ul>
        </div>
    </div>
</template>




<script>
export default {
  name: 'page-navbar',
  data() {
    return {
      selected: 'first',
      elmHeight:'100px',
      boxShowStatus:false,
      keyword:''
    };
  },
  methods:{
      deleteItem(){ // 删除按钮点击事件
        alert(2);
      },
      leftButtonHandler(evt) { 

      },
      getElementH(){ // 获取屏幕的高度
        var deviceH = document.documentElement.clientHeight;
        this.$data.elmHeight = deviceH + 'px';
      },
      showToolBox(){ // 展示右上角的工具条
        this.$data.boxShowStatus = !this.$data.boxShowStatus;
      },
      addGoods(){//alert("添加商品");

      },
      carSaleStatistics(){//alert("车销统计");

      },
      returnCar(){//alert("退货回车");
        
      },
      printGoodsDetail(){ // alert("打印订单")

      },
      submit() {
        // this.page.pageno = '1'
        // this.listDate = []
        // this.ajax();
        alert(this.$data.keyword);
        document.getElementById("search").blur()
      }
  },
  created(){
      this.getElementH();
      window.addEventListener('load',function(){
          var initX;        //触摸位置
          var moveX;        //滑动时的位置
          var X = 0;        //移动距离
          var objX = 0;    //目标对象位置
          var deviceW = document.documentElement.clientWidth;
          var btnW = deviceW / 5;
          window.addEventListener('touchstart',function(event){
              event.preventDefault();
              var obj = getObj(event);
              if(obj.className == "list-li"){
                  initX = event.targetTouches[0].pageX;
                  objX =(obj.style.WebkitTransform.replace(/translateX\(/g,"").replace(/px\)/g,""))*1;
              }
              if( objX == 0){
                  window.addEventListener('touchmove',function(event) {
                      event.preventDefault();
                      var obj = getObj(event);
                      if (obj.className == "list-li") {
                          moveX = event.targetTouches[0].pageX;
                          X = moveX - initX;
                          if (X >= 0) {
                              obj.style.WebkitTransform = "translateX(" + 0 + "px)";
                          }
                          else if (X < 0) {
                              var l = Math.abs(X);
                              obj.style.WebkitTransform = "translateX(" + -l + "px)";
                              if(l>btnW){
                                  l=btnW;
                                  obj.style.WebkitTransform = "translateX(" + -l + "px)";
                              }
                          }
                      }
                  });
              }
              else if(objX<0){
                  window.addEventListener('touchmove',function(event) {
                      event.preventDefault();
                      var obj = getObj(event);
                      if (obj.className == "list-li") {
                          moveX = event.targetTouches[0].pageX;
                          X = moveX - initX;
                          if (X >= 0) {
                              var r = -btnW + Math.abs(X);
                              obj.style.WebkitTransform = "translateX(" + r + "px)";
                              if(r>0){
                                  r=0;
                                  obj.style.WebkitTransform = "translateX(" + r + "px)";
                              }
                          }
                          else {     //向左滑动
                              obj.style.WebkitTransform = "translateX(" + -btnW + "px)";
                          }
                      }
                  });
              }
  
          })
          window.addEventListener('touchend',function(event){
              event.preventDefault();
              var obj = getObj(event);
              if(obj.className == "list-li"){
                  objX =(obj.style.WebkitTransform.replace(/translateX\(/g,"").replace(/px\)/g,""))*1;
                  if(objX>-btnW/2){
                      obj.style.WebkitTransform = "translateX(" + 0 + "px)";
                      objX = 0;
                  }else{
                      obj.style.WebkitTransform = "translateX(" + -btnW + "px)";
                      objX = -btnW;
                  }
              }
           })
          function getObj(event){
            var obj = event.target.parentNode.parentNode;
            if (obj.className == "list-li") {
              return obj;
            } else {
              return obj = event.target.parentNode.parentNode.parentNode;
            }
          }
     })
    }
};
</script>

<style type="text/css">
    .mint-cell-value span{font-size: 26px;color: #9DA2B5;}
    .mint-cell-title span{font-size: 30px;color: #3B456C;}
    .mint-cell-wrapper {padding-left: 32px;}
</style>

<style scoped>
    #carSellerManagerHome {background-color: rgb(237,238,245); height: 100%;}

    /*navigationBar*/
    .page-title {height: 100px;background-color: white;position: fixed;left: 0;top: 0;width: 100%; z-index: 10;}
    .page-title .left-btn {margin: 30px 0 0 15px;}
    .page-title .header-glass {position: absolute; left: 105px; top: 40px;}
    .page-title .right-btn{width: 40px;height: 40px;position: absolute;top: 37px;right: 30px;}
    .page-title form {position: absolute; top: 27.5px; left: 96px; height: 62px; right: 106px;}
    .page-title .header-search {width: 100%;height: 62px;border: none; background-color: #EBECF0; padding-left: 80px;color: #9DA2B5;font-size: 26px; position: absolute; top: 0;}
    
    /*tabBar*/
    .mint-navbar{position: fixed;left: 0;width: 100%;top: 100px; z-index: 10;height: 100px;border-bottom:2px solid rgb(237,238,245)}
    .mint-navbar .mt-tab-item{position: absolute;}
    .mint-navbar .mint-tab-item span{font-size: 30px;color: #9DA2B5;}
    .mint-navbar .mint-tab-item.is-selected{border: none;}
    .mint-navbar .mint-tab-item.is-selected span{font-size: 30px;border-bottom: 7px solid #FF783C; padding-bottom: 20px; border-radius:3px;color: #3B456C;}

    /*content*/
    .staticCell {margin: 24px 0; height: 96px;}
    .mint-tab-container {top:200px;}
    .mint-tab-container-item {background-color: rgb(237,238,245);}
    .cell-content {height: 298px;width: 100%;position: relative;background-color: white;}
    .cell-content .goodsImg {position: absolute;top: 48px;left: 32px;width: 200px;height: 200px;border: 1px solid #fff;}
    .cell-content .goodsName {position: absolute;width: 60%;top: 48px;left: 260px;height: 80px;font-size: 30px;color: #3B456C;letter-spacing: 0;line-height: 40px;display: -webkit-box;overflow: hidden;-webkit-box-orient: vertical;text-overflow: ellipsis;-webkit-line-clamp: 2;}
    .cell-content .goodsSpec {position: absolute;left: 260px;top: 182px;font-size: 26px;color: #3B456C; width: 200px;}
    .cell-header {position: relative; width: 100%;height: 64px;background-color: white;}
    .cell-header span:nth-child(1){float: left;font-size: 26px;color: #FF783C;line-height: 64px;padding-left: 32px;}
    .cell-header span:nth-child(2){float: right;font-size: 26px;color: #3B456C;line-height: 64px;padding-right: 32px;}

    /*list-li*/
    .list-ul{overflow: hidden}
    .list-ul li {border-bottom: 24px solid rgb(237,238,245);}
    .list-li{border-bottom: 1px solid #fcfcfc; position:relative; color: #666;background: #f2f2f2;-webkit-transform: translateX(0px);}
    .btn{ position: absolute; top: 0; right: -20%; text-align: center; background: #ffcb20; width: 20%;height: 298px;line-height: 298px;background-image: linear-gradient(17deg, #FF4848 2%, #FF8739 100%);font-size: 30px;
color: #FFFFFF;}
    
    /*工具条*/
    .tool-box {width: 100%;background-color: rgba(0,0,0,0.1);position: absolute;top: 0;left: 0;height: 2000px;z-index: 20;}
    .tool-box ul {position: absolute;top:128px;right: 32px;opacity: 0.9;background: #333333;border-radius: 4px;width: 184px;height: 208px; text-align: center;}
    .tool-box ul li {height: 68px;line-height: 68px;font-size: 30px;color: #FFFFFF;border-bottom: 2px solid #fff;}
</style>


