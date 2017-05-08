<template lang="html">
  <div class="order">
    <div class="top">

    </div>
    <div class="content">
      <img class="pic" src="../assets/placehold.png" alt="#">
      <img class="dismiss" src="../assets/icon18.png" alt="#" @click="pop">
      <div class="price">
        ¥200.00
      </div>
      <div class="number">
        商品编号: 435323423424323424
      </div>
      <div class="kucun">
        库存: 0
      </div>
    </div>
    <div class="activity">
          <p class="msg">该商品正在参与活动,查看活动信息
          <img class="arrow" src="../assets/arrow-right@2x.png" alt="">
          </p>
    </div>
    <div class="guige">
      规格
      <ul>
        <li>包(1*1)袋</li>
        <li>包(1*1)袋</li>
        <li>包(1*1)袋</li>
        <li>包(1*1)袋</li>
        <li>包(1*1)袋</li>
        <li>包(1*1)袋</li>
      </ul>
    </div>
    <div class="number-buy">
      <p class="number-msg">购买数量</p>
      <img class="minus" src="../assets/icon3.png" alt="">
      <span class="sum">0</span>
      <img class="add" src="../assets/icon5.png" alt="">
    </div>
    <div class="add-car">
      加入购物车
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  methods:{
    pop:function(){
      console.log('弹出视图');
    }
  }
}
</script>

<style lang="css" scoped>
  .top{
    background-color: #000;
    opacity: 0.3;
    height: 334px;
  }
  .content{
    position: relative;
    border-bottom: 2px solid #F1F2F7;
    padding: 20px 0 50px 170px;
  }
  .content .pic{
    position: absolute;;
    left: 16px;
    top: -20px;
    width: 130px;
    height: 130px;
    float: left;
  }
  .content .dismiss{
    position: absolute;
    right: 15px;
    top: 15px;
    width: 30px;
    height: 30px;
  }
  .content .price{
    font-size: 24px;
    line-height: 33.5px;
    color: #FF783C;
  }
  .content .number{
    font-size: 11px;
    color: #9DA2B5;
  }
  .content .kucun{
    font-size: 11px;
    color: #9DA2B5;
  }
  .activity{
    padding-left: 38px;
    padding-top: 38px;
    padding-bottom: 38px;
    border-bottom: 2px solid #F1F2F7;
  }
  .activity .msg{
    color: #FF783C;
    font-size: 13px;
    position: relative;
  }
  .activity .arrow{
    width: 30px;
    height: 30px;
    position: absolute;
    right: 28px;
    top: 0;
  }
  .guige{
    padding: 48px 48px;
    font-size: 30px;
    color: #3B456C;
    overflow: hidden;
    border-bottom: 2px solid #F1F2F7;
  }
  .guige ul{
    padding-top: 30px;
  }
  .guige ul li{
    float: left;
    margin-right: 46px;
    font-size: 22px;
  }
  .number-buy{
    padding: 34px 34px;
    border-bottom: 1px solid #F1F2F7;
    overflow: hidden;
  }
  .number-buy .number-msg{
    font-size: 30px;
    color: #3B456C;
    float: left;
  }
  .number-buy .add{
    width: 48px;
    height: 48px;
    float: right;
  }

  .number-buy .sum{
    float: right;
    padding: 10px 20px;
  }

  .number-buy .minus{
    float: right;
    width: 48px;
    height: 48px;
  }
  .add-car{
    position: absolute;
    line-height: 98px;
    text-align: center;
    bottom: 0;
    font-size: 30px;
    background-color: orange;
    width: 100%;
    height: 98px;
    color: #FFF;
    font-size: 30px;
  }
</style>
