<template>
    <div id="carSellerManagerHome" :style='{height:elmHeight}'>
        <!-- 内容 -->
        <div class="content">
            <div class="header">
                <img class="left-btn" src="../../assets/icon10.png" @click="backToNative"></img>
                <form @submit.prevent="submit">
                    <input class="header-search" id="search" placeholder="请输入关键字搜索商品" type="search" :value="keyword" v-model="keyword">
                </form>
                <img class='header-glass' src="../../assets/icon20.png" height="20" width="20"></img>
                <img class="right-btn" src="../../assets/add.png" height="30" width="30" @click="showToolBox"></img>
            </div>
            <div class="tab-bar">
                <div class="tab-bar-left" @click="switchToMyStorage"><span :class="{tabActive :myStorageActive}">我的库存</span></div>
                <div class="tab-bar-right" @click="switchToWaitCar"><span :class="{tabActive :waitCarActive}">待装车</span></div>
            </div>
            <div class="content">
                <my-storage-content v-show="myStorageActive" :myStorageData="myStorageData"></my-storage-content>
                <wait-car-content v-show="waitCarActive" :waitCarData="waitCarData"></wait-car-content>
            </div>
        </div>
        <div class="tool-box" v-show="boxShowStatus" @click="showToolBox">
            <ul>
                <!-- @click="addGoods" -->
                <router-link to="selectTrunckGoods"><li>添加商品</li></router-link>
                <li @click="carSaleStatistics">车销统计</li>
                <li @click="returnCar">退货回车</li>
            </ul>
        </div>
    </div>
</template>

<script>

import Request from "../../util/API";
import MyStorageContent from "../../components/carSale/MyStorageContent.vue"
import WaitCarContent from "../../components/carSale/WaitCarContent.vue"

export default {
  name: 'page-navbar',
  components:{
    MyStorageContent,
    WaitCarContent
  },
  data() {
    return {
      myStorageActive:true,
      waitCarActive:false,
      elmHeight:'100px',
      boxShowStatus:false,
      keyword:'',
      waitCarData:'',
      myStorageData:''
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
        this.$router.push({
        path: 'goodgocar',
        query: {
          username:"zhujyps01",
          userno:"728415"
        }
      });
      },
      backToNative(){
        alert(1);
        Request.jsBbridge(bridge=>{
          bridge.callHandler(
            'navBack'
          )
        })
      },
      submit() {
        alert(this.$data.keyword);
        document.getElementById("search").blur()
      }
  },
  created(){
      this.getElementH();
      
  }
};
</script>

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

    /*工具条*/
    .tool-box {width: 100%;background-color: rgba(0,0,0,0);position: fixed;top: 0;bottom:0;left: 0;height: 2000px;z-index: 20;}
    .tool-box ul {position: absolute;top:128px;right: 32px;opacity: 0.9;background: #333333;border-radius: 4px;width: 240px;height: 300px; text-align: center;}
    .tool-box ul li {height: 100px;line-height: 100px;font-size: 30px;color: #FFFFFF;border-bottom: 2px solid #fff;}
    /*.hiddenDom{overflow:hidden;}*/
</style>


