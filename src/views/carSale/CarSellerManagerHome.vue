<!-- 车销管理首页 -->
<template>
    <div id="carSellerManagerHome">
        <div class="page-navbar">
            <!-- 标题区 -->
            <div class="page-title">
                <img class="left-btn" src="../../assets/icon10.png" height="25" width="25"></img>
                <input type="search" class='header-search' placeholder='请输入关键字搜索商品'>
                <img class='header-glass' src="../../assets/icon20.png" height="20" width="20"></img>
                <img class="right-btn" src="../../assets/add.png" height="20" width="20"></img>
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
                <mt-tab-container-item id="first">
                    <mt-cell class="staticCell" title="商品回库" value="未售完商品退回至仓库" is-link></mt-cell>
                    <ul class="list-ul">
                        <li class="borderBottom list-li">
                            <div class="con">
                                <div class="cell-content">
                                    <img src="../../assets/add.png" class="goodsImg">
                                    <h4 class="goodsName">我是很牛逼的商品</h4>
                                    <h5 class="goodsSpec">我是商品规格</h5>
                                </div>
                            </div>
                            <div class="btn" @click='deleteItem'>删除</div>
                        </li>
                    </ul>
                </mt-tab-container-item>
                <mt-tab-container-item id="second">
                    <mt-cell class="staticCell" title="标题文字" value="带链接" is-link></mt-cell>
                    <ul class="list-ul">
                        <li class="borderBottom list-li">
                            <div class="con">
                                <div class="cell-header borderBottom">
                                    <span>待仓管确认装车</span>
                                    <span>编辑</span>
                                </div>
                                <div class="cell-content">
                                    <img src="../../assets/add.png" class="goodsImg">
                                    <h4 class="goodsName">我是很牛逼的商品</h4>
                                    <h5 class="goodsSpec">我是商品规格</h5>
                                </div>
                            </div>
                            <div class="btn" @click='deleteItem'>删除</div>
                        </li>
                    </ul>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
    </div>
</template>


<script>
export default {
  name: 'page-navbar',
  data() {
    return {
      selected: 'first',
      arr:[1,2,3,4,5]
    };
  },
  methods:{
      deleteItem(){
        alert(2);
      },
      leftButtonHandler(evt) {
        console.log(123);
      }
  },
  created(){
      window.addEventListener('load',function(){
          var initX;        //触摸位置
          var moveX;        //滑动时的位置
          var X = 0;        //移动距离
          var objX = 0;    //目标对象位置
          var deviceW = document.documentElement.clientWidth; 
          console.log(deviceW);
          var aaa = deviceW / 5;
          window.addEventListener('touchstart',function(event){
              event.preventDefault();
              var obj = event.target.parentNode.parentNode;
              console.log(obj);
              if(obj.className == "borderBottom list-li"){
                  initX = event.targetTouches[0].pageX;
                  objX =(obj.style.WebkitTransform.replace(/translateX\(/g,"").replace(/px\)/g,""))*1;
              }
              if( objX == 0){
                  window.addEventListener('touchmove',function(event) {
                      event.preventDefault();
                      var obj = event.target.parentNode.parentNode;
                      if (obj.className == "borderBottom list-li") {
                          moveX = event.targetTouches[0].pageX;
                          X = moveX - initX;
                          if (X >= 0) {
                              obj.style.WebkitTransform = "translateX(" + 0 + "px)";
                          }
                          else if (X < 0) {
                              var l = Math.abs(X);
                              obj.style.WebkitTransform = "translateX(" + -l + "px)";
                              if(l>aaa){
                                  l=aaa;
                                  obj.style.WebkitTransform = "translateX(" + -l + "px)";
                              }
                          }
                      }
                  });
              }
              else if(objX<0){
                  window.addEventListener('touchmove',function(event) {
                      event.preventDefault();
                      var obj = event.target.parentNode.parentNode;
                      if (obj.className == "borderBottom list-li") {
                          moveX = event.targetTouches[0].pageX;
                          X = moveX - initX;
                          if (X >= 0) {
                              var r = -aaa + Math.abs(X);
                              obj.style.WebkitTransform = "translateX(" + r + "px)";
                              if(r>0){
                                  r=0;
                                  obj.style.WebkitTransform = "translateX(" + r + "px)";
                              }
                          }
                          else {     //向左滑动
                              obj.style.WebkitTransform = "translateX(" + -aaa + "px)";
                          }
                      }
                  });
              }
  
          })
          window.addEventListener('touchend',function(event){
              event.preventDefault();
              var obj = event.target.parentNode.parentNode;
              if(obj.className == "borderBottom list-li"){
                  objX =(obj.style.WebkitTransform.replace(/translateX\(/g,"").replace(/px\)/g,""))*1;
                  if(objX>-aaa/2){
                      obj.style.WebkitTransform = "translateX(" + 0 + "px)";
                      objX = 0;
                  }else{
                      obj.style.WebkitTransform = "translateX(" + -aaa + "px)";
                      objX = -aaa;
                  }
              }
           })
     })
    }
};
</script>

<style type="text/css" >
    .mint-cell-value span{font-size: 26px;color: #3B456C;}
    .mint-cell-title span{font-size: 30px;color: #9DA2B5;}
</style>

<style scoped>
    #carSellerManagerHome {background-color: rgb(237,238,245); height: 100%;}
    /*navigationBar*/
    .page-title {height: 100px;background-color: white;position: fixed;left: 0;top: 0;width: 100%; z-index: 10;}
    .page-title .left-btn {margin: 40px 0 0 20px;}
    .page-title .header-glass {position: absolute; left: 70px; top: 41px;}
    .page-title .header-search {width: 80%;margin-top: 27.5px;height: 62px;border: none; background-color: #EBECF0; padding-left: 50px;color: #9DA2B5;font-size: 26px; position: absolute; top: 0;}
    .page-title .right-btn {width: 40px;height: 40px;position: absolute;top: 37px;right: 30px;}

    /*tabBar*/
    .mint-navbar{position: fixed;left: 0;width: 100%;top: 100px; z-index: 10;height: 100px;}
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

    .list-ul{ overflow: hidden}
    .list-li{ border-bottom: 1px solid #fcfcfc; position:relative; color: #666;background: #f2f2f2;-webkit-transform: translateX(0px);}
    .btn{ position: absolute; top: 0; right: -20%; text-align: center; background: #ffcb20; width: 20%;height: 298px;line-height: 298px;background-image: linear-gradient(17deg, #FF4848 2%, #FF8739 100%);font-size: 30px;
color: #FFFFFF;}
</style>


