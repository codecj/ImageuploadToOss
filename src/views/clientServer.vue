<template>
    <div :class="{'adv':adv,'':!adv}" id="clientServer">
        <div class="shadowLine"></div>
        <div v-show="adv" class="advPlace">
            
        </div>
        <div class="topHead">
            <div class="activeTap" @click="fliterToggle()" :class="{ 'left change' : userFliter, 'left': !userFliter}"></div>
            <div @click="toSearch()" class="mid">
                <form>
                    <input disabled placeholder="请输入要搜索的客户" type="search">
                </form>
            </div>
            <div @click="createClient()" class="right activeTap"></div>
        </div>
        <div v-show="userFliter" class="fliter">
            <div @click="getGps()" class="fliterBar activeTap">
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
        <div v-show="!userFliter" :class="{'listBox overhide':listH,'listBox':!listH}" v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="40">
            <customerlIst @listSay="overHide" :listDate='listDate' :menuList='menuList'></customerlIst>
            <getbottom v-show="isEnd"></getbottom> 
        </div>
    </div>
</template>
<script type="text/javascript">
import Request from "../util/API"
import Vue from 'vue'
import { Toast, Indicator ,Lazyload} from 'mint-ui'
import customerlIst from '../components/customerManagement.vue'
import getbottom from '../components/getbottom.vue'
import utils from '../util/utils'
console.log(utils.md5('1234'));
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
            listH:'',
            gps:{
              latitude:this.$route.query.latitude,
              longitude:this.$route.query.longitude
            },
            //请求资源菜单的参数
            paragrams:{
                userName:this.$route.query.userName,
                menuId:this.$route.query.menuId
            },
            picno:this.$route.query.picno,
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
            menuList:[],//资源菜单
            page:{pageno:"0",pagesize:"20"},
            typeD:0,
            areaid:'',
            isEnd:false,
            adv:false
        }
    },
    components: {
        customerlIst,
        getbottom
    },
    mounted: function() {
        this.$nextTick(()=> {
          this.items.forEach(items=>{
              this.$set(items, 'isShow', false);
          })
        })
        this.items[0].isShow = true;
        this.requestMenus();
        Request.jsBbridge(bridge=> {
           bridge.init(function(message, responseCallback) {
                var data = {};
                responseCallback(data);
            });
        })
    },
    methods: {
        overHide(isHide){
          this.listH=isHide
        },
        toSearch(){
          Request.jsBbridge(bridge=> {
              bridge.callHandler(
                  'pushSearchWebClick'
              )
          })
        },
        createClient(){
            Request.jsBbridge(bridge=> {
              bridge.callHandler(
                  'pushCreateCustomerClick'
              )
          })
        },
        getGps() {
          Request.jsBbridge(bridge=> {
            window.WebViewJavascriptBridge.callHandler(
                'showAddressPicker'
                , {'Data': 'json数据传给Android端'}  //该类型是任意类型
                , (responseData) =>{
                    var res = responseData
                    // JSON.parse(JSON.stringify(responseData))
                    if((typeof res)=='string'){
                      res = JSON.parse(responseData);
                    }
                    this.areaid=res.areaid;
                    res.areaid=='' ? this.address='全部区域' : this.address=res.address;
                }
            );
          })
        },
        ajax() {
          Indicator.open();
          const pargrmList = {
            pagination: JSON.stringify(this.page),
            oper: 'getShopList',
            type: 'wqCustomer',
            para: '{"latitude":"'+this.gps.latitude+'","longitude":"'+this.gps.longitude+'","keywords":"","picno":"'+this.picno+'","type":'+this.typeD+',"areaid":"'+this.areaid+'"}'
          }
          //ajax调用
          Request.post(pargrmList).then(res=>{
              const getData = JSON.parse(res.data.result)
              console.log(getData)
              getData.data.shopslist.forEach(value=> {
                this.listDate.push(value)
              })
              if(this.listDate.length==getData.pagination.totalcount) {
                this.isEnd=true;
                Indicator.close();
                return
              }
              if(getData.code!=="200") Toast({ message: getData.msg, duration: 2000 });
              Indicator.close();
          }).catch(error=>{
              Indicator.close();
              if (error.response) {
                  // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                  Toast({
                      message: error.response.status,
                      duration: 2000
                  });
              }
          })
        },
        requestMenus(){
            const pargrmList = {
                oper: 'findResources',
                type: 'user',
                para: JSON.stringify(this.paragrams)
            };
            //ajax调用
            Request.post(pargrmList).then(res=>{
                  const getData = JSON.parse(res.data.result);
                  if (parseInt(getData.code) !=200){
                    console.log(getData.msg);
                    Toast({message: getData.msg,duration: 2000});
                  }else{
                    this.menuList = getData.data.slice(0,2);
                    this.menuList.push({imgSrc:require('../assets/icon51.png'),name:'联系',url:'lianxi',urlType:'N'});
                    this.menuList.push({imgSrc:require('../assets/icon53.png'),name:'更多',url:'gengduo',urlType:'N'});
                    var temp = this.menuList[0];
                    if (temp.url == 'xiadan') {
                        temp.imgSrc = require('../assets/icon49.png');
                    }else if(temp.url == 'chexiao'){
                        temp.imgSrc = require('../assets/icon50.png');
                    }else if(temp.url == 'baifang'){
                        temp.imgSrc = require('../assets/icon50.png');
                    }
                    var temp1 = this.menuList[1];
                    if (temp1.url == 'xiadan') {
                        temp1.imgSrc = require('../assets/icon49.png');
                    }else if(temp1.url == 'chexiao'){
                        temp1.imgSrc = require('../assets/icon50.png');
                    }else if(temp.url == 'baifang'){
                        temp.imgSrc = require('../assets/icon50.png');
                    }
                    console.log(this.menuList);
                  }   
            }).catch(error=>{
             
              if (error.response) {
                  // 请求已发出，但服务器响应的状态码不在 2xx 范围内
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
            this.isEnd=false;
            this.page.pageno='1';
            this.userType = false;
            this.userFliter = false;
            this.$nextTick(()=>{
                this.items.forEach(items=>{
                    this.$set(items, 'isShow', false);
                })
            })
            this.listDate=[]
            this.ajax()
        },
        loadMore() {
            if(!this.isEnd){
                this.loading = true;
                this.page.pageno=parseInt(this.page.pageno)+1
                this.ajax()  
            }
        }　　
    }
}
</script>
<style>
[v-cloak] {
    display: none;
}
.advPlace{ width: 100%; height: 125px }
.overhide{ overflow-y: hidden !important; }
#clientServer{padding-top: 25px;}
#clientServer .shadowLine {
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    background: #f1f2f7;
    box-shadow: 0 6px 12px 0 rgba(193, 193, 193, 0.50);
}

#clientServer .topHead {
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
    width: 100%;
    position: absolute;
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
    top: 121px;
    bottom: 0;
    width: 100%;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}
#clientServer.adv .listBox{ top: 244px }
</style>
