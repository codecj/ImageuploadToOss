<template>
  <div id="secondcomponent">
    <ul>
      <li class="clearfix"  v-for="item in sections.items" @click="index(item)">
       <!--  <router-link :to="'/'"> -->
          <a class="flag-img"><img :src="item.imgSrc"></a>
          <div>
            <div class="flag-title">{{item.poductName}}</div>
            <div class="flag-price"><span>双11价</span><strong>¥{{item.price}}</strong><small>({{item.preferential}})</small></div>
            <div class="flag-type">{{item.activityType}}</div>
            <input type='button' class="flag-btn" @click.native="buy(item)">{{item.activeName}}</btn>
          </div>
      <!--   </router-link> -->
      </li>
    </ul>
  </div>
</template>

<script>
 import {Toast,CellSwipe,Indicator} from 'mint-ui';

import Request from  "../util/API";

export default {
  data() {
    return {
      author: "微信公众号 jinkey-love",
      sections:{brannerImag:"http://xxx.cdn.com/B1PNLZKXXXXXaTXXXXXXXXXXXX-750-481.jpg",items:[{itemLink: "##",
            imgSrc: "https://placeimg.com/350/350/people/grayscale",
            poductName:"Carter's1年式灰色长袖连体衣包脚爬服全棉鲸鱼男婴儿童装115G093",
            price: 299.06,
            preferential: "满400减100",
            activityType: "1小时内热卖5885件",
            shopLink:"##",
            activeName: "马上抢！"},{itemLink: "##",
            imgSrc: "https://placeimg.com/350/350/people/grayscale",
            poductName:"Carter's1年式灰色长袖连体衣包脚爬服全棉鲸鱼男婴儿童装115G093",
            price: 299.06,
            preferential: "满400减100",
            activityType: "1小时内热卖5885件",
            shopLink:"##",
            activeName: "马上抢！"}]},
      articles: [],
      page:{pageno:"1",pagesize:"20"}
    }
  },

  created: function() {
    var id = this.$route.query.dataId;
    console.log('dataId: ' + this.$route.query.dataId);
  },
  mounted: function() {
    Indicator.open({
          text: '加载中...',
          spinnerType: 'triple-bounce'
        });

        let pargrm = {
          pagination:JSON.stringify(this.page),
          source:'H',
          oper:'detail',
          type:'shopvisit',
          version:'10',
          para:'{"userno":"390110","shipid":"385727"}'
        }
        //ajax调用
        Request.post(pargrm).then(function (res) {
          console.log(res)
          Indicator.close();
        }).catch(function (error) {
          Indicator.close();
          if (error.response) {
            // 请求已发出，但服务器响应的状态码不在 2xx 范围内
            console.log(error.response.status);
            Toast({
              message: error.response.status,
              duration: 2000
            });
          } else {
            console.log('Error', error.message);
            Toast({
              message: error.message,
              duration: 2000
            });
          }
        })
  },
  methods:{
    buy(data){
      Toast(data.price+'');
      console.log(data);
    },
    index(data){
      Toast(data.preferential);
    }

  }
}
</script>
<style>

/*.router-link-active {
    text-decoration: none;
}*/
.flag-img{
  float: left;
  margin-right: 16px;
}
.flag-img img{
  width: 176px;
  height:176px;
}
.flag-title{
  margin-top:5px;
}
</style>