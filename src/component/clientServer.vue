<template>
    <div id="clientServer">
        <div class="shadowLine"></div>
        <div class="topHead">
            <div class="activeTap" @click="fliterToggle()" :class="{ 'left change' : userFliter, 'left': !userFliter}"></div>
            <div class="mid">
                <form>
                    <input placeholder="请输入要搜索的客户" type="search">
                </form>
            </div>
            <div class="right activeTap"></div>
        </div>
        <div v-show="userFliter" class="fliter">
            <div class="fliterBar activeTap">
                <p class="fl">{{address}}</p>
                <p class="fr"></p>
            </div>
            <div class="fliterType">
                <p>客户类型</p>
                <ul>
                    <li data-type="item.type" v-for="(item,$index) in items" @click="selectStyle(item, $index,item.select)" :class="{'active':item.userType||item.isShow,'unactive':!item.userType||item.isShow}">{{item.select}}</li>
                </ul>
            </div>
            <div @click="fliterSure()" class="sureBtn">
                确定
            </div>
        </div>
        <div v-show="!userFliter" class="listBox" v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10">
            <customerlIst :listDate='listDate'></customerlIst>
        </div>
    </div>
</template>
<script type="text/javascript">
import { Lazyload } from 'mint-ui'
import Request from "../util/API"
import Vue from 'vue'
import { Toast, Indicator } from 'mint-ui'
import customerlIst from './customermanagement.vue'

Vue.use(Lazyload,{
    preLoad: 1.3,
    lazyComponent: true,
    error: require('../assets/holde.png'),
    loading: require('../assets/holde.png'),
    listenEvents: ['scroll']
})

export default {
    name: 'clientServer',
    data() {
        return {
            latitude:'30.32765',
            longitude:'120.17237',
            address: '全部区域',
            select: '',
            index: '0',
            userFliter: false,
            userType: false,
            type: '全部',
            items: [{
                type:0,
                select: '全部',
                isShow: true
            }, 　　　　　 {
                type:1,
                select: '我的客户',
                isShow: false
            }, 　　　　　 {
                type:2,
                select: '企业客户',
                isShow: false
            }],
            listDate: [],
            page:{pageno:"0",pagesize:"20"},
            typeD:0
        }
    },
    components: {
        customerlIst
    },
    mounted: function() {
        this.$nextTick(()=> {
          this.items.forEach(items=>{
              this.$set(items, 'isShow', false);
          })
        })
        this.items[0].isShow = true;
    },
    methods: {
        ajax() {
          // let _this = this
          Indicator.open();
          const pargrmList = {
            pagination: JSON.stringify(this.page),
            oper: 'getShopList',
            type: 'wqCustomer',
            para: '{"latitude":"'+this.latitude+'","longitude":"'+this.longitude+'","keywords":"","picno":"355328","type":"'+this.typeD+'"}'
          }
          //ajax调用
          Request.post(pargrmList).then(res=>{
              const getData = JSON.parse(res.data.result)
              if(getData.code!=="200") Toast({ message: getData.msg, duration: 2000 });
              getData.data.shopslist.forEach(value=> {
                this.listDate.push(value)
              })
              Indicator.close();
              console.log(this.listDate)
          }).catch(error=>{
              Indicator.close();
              if (error.response) {
                  // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                  console.log(error.response.status);
                  Toast({
                      message: error.response.status,
                      duration: 2000
                  });
              }
          })
        },
        fliterToggle() {
            this.userFliter = !this.userFliter;
            this.items[this.index].isShow = true;
        },
        selectStyle(item, index, select) {　　　　
          this.$nextTick(()=>{　　　　　　　　
            this.items.forEach(item=>{
                this.$set(item, 'isShow', false);
                this.$set(item, 'userType', false);　　　　　　　　
            });
            this.$set(item, 'userType', true);
            this.typeD = item.type;
            this.index = index;　　　　　　
          });　　　　
        },
        fliterSure() {
            this.userType = false;
            this.userFliter = false;
            this.$nextTick(()=>{
                this.items.forEach(items=>{
                    this.$set(items, 'isShow', false);
                })
            })
            this.listDate=[]
            // console.log(this.typeD)
            this.ajax()
        },
        loadMore() {
          this.loading = true;
          this.page.pageno=parseInt(this.page.pageno)+1;
          console.log(this.page)
          this.ajax()
        }　　
    }
}
</script>
<style>
[v-cloak] {
    display: none;
}

#clientServer .shadowLine {
    background: #FFFFFF;
    box-shadow: 0 6px 12px 0 rgba(193, 193, 193, 0.50);
}

#clientServer .topHead {
    margin-top: 25px;
    width: 100%;
    height: 94px;
    background-color: #fff;
    position: relative;
    border-bottom: 2px solid #F1F2F7;
}

#clientServer .topHead .left,
#clientServer .topHead .mid,
#clientServer .topHead .right {
    position: absolute;
}

#clientServer .topHead .left,
#clientServer .topHead .right {
    width: 95px;
    height: 95px;
}

#clientServer .topHead .left {
    left: 0;
    border-right: 2px solid #F1F2F7;
    line-height: 95px;
    text-align: center;
    background: url('../assets/icon15.png') center no-repeat;
    background-size: 40px;
}

#clientServer .topHead .left.change {
    left: 0;
    border-right: 2px solid #F1F2F7;
    line-height: 95px;
    text-align: center;
    background: url('../assets/icon14.png') center no-repeat;
    background-size: 40px;
}

#clientServer .topHead .right {
    right: 0;
    border-left: 2px solid #F1F2F7;
    background: url('../assets/icon44.png') center no-repeat;
    background-size: 42px;
}

#clientServer .topHead .mid {
    left: 95px;
    right: 95px;
    top: 0;
    bottom: 0;
    padding: 30px 20px 30px 31px;
    font-size: 26px
}

#clientServer input {
    width: 100%;
    height: 37px;
    border: none;
    padding-left: 53px;
    background: url('../assets/icon20.png') left no-repeat;
    background-size: 44px;
}

#clientServer .fliter {
    z-index: 999;
}

#clientServer .fliterBar {
    padding: 29px 33px;
    border-bottom: 2px solid #F1F2F7;
    background-color: #fff;
    overflow: hidden;
}

#clientServer .fliterBar .fl {
    float: left;
    background: url(../assets/icon7.png) left no-repeat;
    padding-left: 46px;
    min-width: 30px;
    min-height: 30px;
    background-size: 30px;
    color: #3B456C;
    line-height: 35px;
    font-size: 26px;
}

#clientServer .fliterBar .fr {
    float: right;
    margin-right: -0.15rem;
    min-width: 35px;
    min-height: 35px;
    background: url('../assets/icon17.png') right no-repeat;
    background-size: 35px;
}

#clientServer .fliterType {
    width: 100%;
    padding: 49px 30px 64px 30px;
    background-color: #fff;
}

#clientServer .fliterType p {
    font-size: 30px;
}

#clientServer .fliterType ul {
    margin-top: 48px;
}

#clientServer .fliterType li {
    margin-right: 32px;
    display: inline-block;
    font-size: 26px;
    padding: 9px 22px;
    background: #F1F2F7;
    border-radius: 2px;
    color: #9DA2B5;
}

#clientServer .fliterType li.active {
    color: #fff;
    background: #FF783C;
}

#clientServer .sureBtn {
    width: 588px;
    font-size: 30px;
    padding: 19px 0;
    color: #fff;
    background-image: linear-gradient(3deg, #FF8739 0%, #FF4848 100%);
    background-image: -webkit-linear-gradient(3deg, #FF8739 0%, #FF4848 100%);
    box-shadow: 0 8px 16px 0 rgba(255, 77, 0, 0.40);
    border-radius: 2.25px;
    text-align: center;
    margin: 64px auto;
}

#clientServer .listBox {
    position: absolute;
    top: 120px;
    bottom: 0;
    width: 100%;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}
</style>
