<template>
    <div id="carSellerManagerHome" :style='{height:elmHeight}'>
        <!-- 标题区 -->
        <div class="content">
            <div class="header">
                <img class="left-btn" src="../../assets/icon10.png" @click="backToNative"></img>
                <form @submit.prevent="submit">
                    <input class="header-search" id="search" placeholder="请输入关键字搜索商品" type="search" :value="keyword" v-model="keyword">
                </form>
                <!-- <input type="search" class='header-search' placeholder='请输入关键字搜索商品'> -->
                <img class='header-glass' src="../../assets/icon20.png" height="20" width="20"></img>
                <img class="right-btn" src="../../assets/add.png" height="30" width="30" @click="showToolBox"></img>
            </div>
            <div class="tab-bar">
                <div class="tab-bar-left" @click="switchToMyStorage"><span :class="{tabActive :myStorageActive}">我的库存</span></div>
                <div class="tab-bar-right" @click="switchToWaitCar"><span :class="{tabActive :waitCarActive}">待装车</span></div>
            </div>
            <div class="content">
                <div class="my-storage-content" v-show="myStorageActive">
                    <div class="static-cell">
                        <div>商品回库</div>
                        <div>未售完商品退回至仓库</div>
                    </div>
                    <ul class="list-ul">
                        <li class="borderBottom" v-for="n in 10">
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
                </div>
                <div class="wait-car-content" v-show="waitCarActive">
                    <div class="static-cell">
                        <div>打印明细</div>
                        <div>打印待装车商品明细</div>
                    </div>
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
                </div>
            </div>
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
import Request from "../../util/API";
export default {
  name: 'page-navbar',
  data() {
    return {
      myStorageActive:true,
      waitCarActive:false,
      elmHeight:'100px',
      boxShowStatus:false,
      keyword:''
    };
  },
  methods:{
      switchToMyStorage(){
        this.myStorageActive = true;
        this.waitCarActive = false;
      },
      switchToWaitCar(){
        this.myStorageActive = false;
        this.waitCarActive = true;
      },
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
      backToNative(){
        // alert("打印订单")
        // Request.jsBbridge(bridge=>{
        //   bridge.callHandler(
        //     'backToNative'
        //   )
        // })
        this.$router.goBack();
      },
      printGoodsDetail(){ // alert("打印订单")
          Request.jsBbridge(bridge => {
                window.WebViewJavascriptBridge.callHandler(
                    'printGoodsDetail', {
                        'Data': 'json数据传给Android端'
                    } //该类型是任意类型
                    ,(responseData) => {
                        // var res = responseData
                        //     // JSON.parse(JSON.stringify(responseData))
                        // if ((typeof res) == 'string') {
                        //     res = JSON.parse(responseData);
                        // }
                        // this.areaid = res.areaid;
                        // res.areaid == '' ? this.address = '全部区域' : this.address = res.address;
                    }
                );
            })
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
              var obj = getObj(event);
              if(obj.className == "list-li"){
                  initX = event.targetTouches[0].pageX;
                  objX =(obj.style.WebkitTransform.replace(/translateX\(/g,"").replace(/px\)/g,""))*1;
              }
              if( objX == 0){
                  window.addEventListener('touchmove',function(event) {
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
            console.log(111);
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

    #carSellerManagerHome {position:relative;top:0;left:0;bottom:0;background-color: rgb(237,238,245);}

    .header {height: 120px;background-color: white;position: fixed;left: 0;top: 0;width: 100%; z-index: 10;}
    .header .left-btn {margin: 50px 0 0 15px;width: 62px;height: 62px;}
    .header .header-glass {position: absolute; left: 105px; top: 60px;}
    .header .right-btn{width: 62px;height: 62px;position: absolute;top: 50px;right: 3%;}
    .header form {position: absolute; top: 50px; left: 13%; height: 62px; right: 13%;}
    .header .header-search {width: 100%;height: 62px;border: none; background-color: #EBECF0; padding-left: 80px;color: #9DA2B5;font-size: 26px; position: absolute; top: 0;}
    
    
    .tab-bar {position: fixed;left: 0;top:120px;background-color:white;width:100%;height: 99px;color: #9DA2B5;z-index: 10;}
    .tab-bar > div{height: 96px; width: 50%;float: left;text-align: center;line-height: 96px;font-size: 30px;}
    .tab-bar > div > span {line-height: 96px;height: 96px;display: block;width: 40%; margin:0 auto;}
    .tabActive {color: #3B456C;border-bottom: 3px solid #FF783C;}

    
    .content {position: absolute;top: 120px;width: 100%;left: 0;}
    .content .my-storage-content {width: 100%; height: 1000px;}
    .content .static-cell{width: 100%;height: 96px;background-color: white; box-sizing: border-box;padding-right: 20px;}
    .content .static-cell div:nth-child(1){float: left;line-height: 96px;padding-left: 32px;font-size: 30px;color: #3B456C;}
    .content .static-cell div:nth-child(2){float: right;line-height: 96px;padding-right: 52px;color: #9DA2B5;font-size: 26px;   background: url(../../assets/arrow-right@2x.png) center right no-repeat; background-size: 30px 30px;}
    .content ul {margin-top: 24px;}
    

    .cell-content {height: 298px;width: 100%;position: relative;background-color: white;}
    .cell-content .goodsImg {position: absolute;top: 48px;left: 32px;width: 200px;height: 200px;border: 1px solid #fff;}
    .cell-content .goodsName {position: absolute;width: 60%;top: 48px;left: 260px;height: 80px;font-size: 30px;color: #3B456C;letter-spacing: 0;line-height: 40px;display: -webkit-box;overflow: hidden;-webkit-box-orient: vertical;text-overflow: ellipsis;-webkit-line-clamp: 2;}
    .cell-content .goodsSpec {position: absolute;left: 260px;top: 182px;font-size: 26px;color: #3B456C; width: 200px;}
    .cell-header {position: relative; width: 100%;height: 64px;background-color: white;}
    .cell-header span:nth-child(1){float: left;font-size: 26px;color: #FF783C;line-height: 64px;padding-left: 32px;}
    .cell-header span:nth-child(2){float: right;font-size: 26px;color: #3B456C;line-height: 64px;padding-right: 32px;}

    /*list-li*/
    .list-ul{overflow-x:hidden;overflow-y: auto;}
    .list-ul li {border-bottom: 24px solid rgb(237,238,245);}
    .list-li{border-bottom: 1px solid #fcfcfc; position:relative; color: #666;background: #f2f2f2;-webkit-transform: translateX(0px); transform: translateX(0px);}
    .btn{ position: absolute; top: 0; right: -20%; text-align: center; background: #ffcb20; width: 20%;height: 298px;line-height: 298px;background-image: linear-gradient(17deg, #FF4848 2%, #FF8739 100%);font-size: 30px;color: #FFFFFF;}
    
    /*工具条*/
    .tool-box {width: 100%;background-color: rgba(0,0,0,0.1);position: absolute;top: 0;left: 0;height: 2000px;z-index: 20;}
    .tool-box ul {position: absolute;top:128px;right: 32px;opacity: 0.9;background: #333333;border-radius: 4px;width: 184px;height: 208px; text-align: center;}
    .tool-box ul li {height: 68px;line-height: 68px;font-size: 30px;color: #FFFFFF;border-bottom: 2px solid #fff;}
</style>


