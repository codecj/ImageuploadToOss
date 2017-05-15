<template>
    <div id="addCar">
        <transition name="begore">
            <div v-show="imgShow" class="inner_hide product_show">
                <div class="goodInfo">
                    <div class="goodsImg">
                        <img :src='chose.imgUrl' height="300" width="300" alt="">
                    </div>
                    <div class="goodsMsg">
                        <p>¥{{chose.listprice}}<span>.00</span></p>
                        <p>商品编号: {{chose.pluc}}</p>
                        <p>库存: {{chose.stdQty}}</p>
                    </div>
                    <img @click="closeSku()" class="close" src="../assets/icon18.png" alt="">
                </div>
                <div class="overscroll">
                    <p v-show="isHide" @click="goActive()" class="activity activeTap">
                        该商品正在参与活动,查看活动信息
                        <img src="../assets/icon17.png" alt="">
                    </p>
                    <ul v-for="item in defalutRule" :key="item.specId" class="goodsSku">
                        <p>{{item.specName}}</p>
                        <li :data-id="item.SPEC_ID" v-for="item in item.specValueList">{{item.SPECVALUE}}</li>
                    </ul>
                    <div class="goodsNum">
                        <p>购买数量</p>
                        <ul>
                            <li v-if="count>1" @click="reduceCartNum()"><img src="../assets/icon4.png" alt=""></li>
                            <li v-if="count<=1" @click="reduceCartNum()"><img src="../assets/icon3.png" alt=""></li>
                            <li>{{count}}</li>
                            <li @click="addCartNum()"><img src="../assets/icon9.png" alt=""></li>
                        </ul>
                    </div>
                </div>
                <div class="addBtn">加入购物车</div>
            </div>
        </transition>
        <transition name="fold">
            <div v-show="!imgShow" class="activeList">
                <ul>
                    <li class="tittle">
                        <p @click="goBack()"></p>
                        <p>促销活动</p>
                        <!-- <p></p> -->
                    </li>
                    <li class="activeTap">
                        <span>混搭买赠</span>
                        <span>买两件送赠品(不限参与次数)</span>
                    </li>
                    <li class="activeTap">
                        <span>单品买赠</span>
                        <span>买两件送赠品(不限参与次数)</span>
                    </li>
                    <li class="activeTap">
                        <span>促销打折</span>
                        <span>买两件送赠品(不限参与次数)</span>
                    </li>
                    <li class="activeTap">
                        <span>优惠套餐</span>
                        <span>买两件送赠品(不限参与次数)</span>
                    </li>
                </ul>
            </div>
        </transition>
    </div>
</template>
<script>
import Request from "../util/API"
import { Lazyload } from 'mint-ui'
import Vue from 'vue'
import { Toast, Indicator } from 'mint-ui'
Vue.use(Lazyload,{
    preLoad: 1.3,
    lazyComponent: true,
    error: require('../assets/holde.png'),
    loading: require('../assets/holde.png'),
    listenEvents: ['scroll']
})
export default {
    data() {
            return {
                imgShow: true,
                isHide: false,
                areaId:this.$route.query.areaId,
                stkc:this.$route.query.stkc,
                userName:this.$route.query.userName,
                skuDate:[],
                chose:{},
                defalutRule:[],
                count:1
            }
        },
        mounted: function() {
            Indicator.open();
            const pargrmList = {
                oper: 'findWqSpec',
                type: 'wqProduct',
                para: '{ "stkc": "'+this.stkc+'", "areaId": "'+this.areaId+'", "userName": "'+this.userName+'" }'
            }
            const pargrmListActive = {
                oper: 'findAllProm',
                type: 'wqProduct',
                para: '{ "stkc": "'+this.stkc+'", "areaid": "'+this.areaId+'", "username": "'+this.userName+'" }'
            }
            //ajax调用
            Request.post(pargrmList).then(res => {
                const getData = JSON.parse(res.data.result)
                if (getData.code !== "200") Toast({ message: getData.msg, duration: 2000 });
                
                this.skuDate=getData.data
                this.defalutRule=getData.data.specList
                Indicator.close();
                this.choseData()
                console.log(this.skuDate)
            }).catch(error => {
                Indicator.close();
                if (error.response) {
                    Toast({  
                        message: error.response.status,
                        duration: 2000
                    });
                }
            })
            Request.post(pargrmListActive).then(res => {
                const activeData = JSON.parse(res.data.result)
                // if (activeData.code !== "200") Toast({ message: activeData.msg, duration: 2000 });
                if(activeData.msg!=="该商品未参与促销活动"){
                    this.isHide=true
                }
                console.log(activeData)
            }).catch(error => {
                Indicator.close();
                if (error.response) {
                    Toast({  
                        message: error.response.status,
                        duration: 2000
                    });
                }
            })
        },
        updated:function(){
            
        },
        methods: {
            goBack() {
                this.imgShow = true;
            },
            goActive() {
                this.imgShow = false;
            },
            closeSku() {
                Request.jsBbridge(bridge => {
                    bridge.callHandler('closeAddCarClick')
                })
            },
            choseData(){
                this.skuDate.stkSpecGroupList.forEach(item=>{
                    if(this.stkc=item.stkC){
                        this.chose=item
                    }　　　　　　　　
                });
            },
            reduceCartNum(){
                if (this.count==1) {
                  this.count=1
                } else {
                  this.count--;
                }
            },
            addCartNum(){
                this.count++
            }
        }
}
</script>
.overscroll{}
<style scoped>
html {
    background: transparent !important;
}

.begore-leave-active {
    animation-name: begore-out;
    animation-duration: .6s;
}

.begore-enter-active {
    animation-name: begore-in;
    animation-duration: .3s;
}

.fold-enter-active {
    animation-name: fold-in;
    animation-duration: .3s;
}

.fold-leave-active {
    animation-name: fold-out;
    animation-duration: .3s;
}

@keyframes fold-in {
    0% {
        transform: translate3d(100%, 0, 0);
    }
    100% {
        transform: translate3d(0, 0, 0);
    }
}

@keyframes fold-out {
    0% {
        transform: translate3d(0, 0, 0);
    }
    100% {
        transform: translate3d(100%, 0, 0);
    }
}

@keyframes begore-in {
    0% {
        transform: translate3d(-100%, 0, 0);
    }
    100% {
        transform: translate3d(0, 0, 0);
    }
}

@keyframes begore-out {
    0% {
        transform: translate3d(0, 0, 0);
    }
    100% {
        transform: translate3d(-100%, 0, 0);
    }
}

.overscroll {
    position: absolute;
    width: 100%;
    top: 216px;
    bottom: 98px;
}

.activeList {
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    height: 1000px;
    z-index: 10;
}

.activeList li {
    line-height: 111px;
    height: 111px;
    padding: 0 25px 0 35px;
    border-bottom: 2px solid #F1F2F7;
}

.activeList li.tittle p {
    position: absolute;
    top: 0;
    height: 111px;
}

.activeList li.tittle p:nth-of-type(1) {
    background: url(../assets/icon10.png) left no-repeat;
    background-size: 50px;
    left: 25px;
    width: 111px;
}

.activeList li.tittle p:nth-of-type(2) {
    left: 111px;
    right: 111px;
    line-height: 111px;
    text-align: center;
    font-size: 40px;
    color: #FF783C;
}

.activeList li.tittle p:nth-of-type(3) {
    background: url(../assets/icon18.png) right no-repeat;
    background-size: 50px;
    right: 25px;
    width: 111px;
}

.activeList li span:nth-of-type(1) {
    float: left;
    font-size: 30px;
    color: #3B456C;
}

.activeList li span:nth-of-type(2) {
    float: right;
    font-size: 26px;
    color: #9DA2B5;
    padding-right: 50px;
    background: url(../assets/icon17.png) right no-repeat;
    background-size: 40px;
}

.product_show {
    position: absolute;
    padding-bottom: 0;
    -webkit-transform: translate3d(0, 10.666667rem, 0);
    transform: translate3d(0, 10.666667rem, 0);
    -webkit-transition: -webkit-transform .2s cubic-bezier(0, 0, .25, 1);
    transition: -webkit-transform .2s cubic-bezier(0, 0, .25, 1);
    transition: transform .2s cubic-bezier(0, 0, .25, 1);
    transition: transform .2s cubic-bezier(0, 0, .25, 1), -webkit-transform .2s cubic-bezier(0, 0, .25, 1);
    bottom: 0;
    width: 100%;
    background-color: #fff;
    height: 1000px;
}

#addCar div.inner_hide {
    z-index: 9;
    position: absolute;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
}

#addCar .goodInfo {
    width: 100%;
    border-bottom: 2px solid #F1F2F7;
    /*padding: 30px 0 51px 251px;*/
    height: 216px;
    position: relative;
}

#addCar .goodsImg {
    display: box;
    display: -webkit-box;
    -webkit-box-align: center;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    width: 200px;
    height: 200px;
    position: absolute;
    bottom: 48px;
    left: 32px;
    background-color: #f2f2f2
}

#addCar .goodsImg img {
    width: 100%;
    height: auto;
}

#addCar .goodsMsg {
    overflow: hidden;
}

#addCar .goodsMsg p {
    padding-left: 261px;
    line-height: 1.2;
}

#addCar .goodsMsg p:nth-of-type(1) {
    margin-top: 24px;
    font-size: 48px;
    color: #FF783C;
}

#addCar .goodsMsg p:nth-of-type(1) span {
    font-size: 24px;
}

#addCar .goodsMsg p:nth-of-type(2),
.goodsMsg p:nth-of-type(3) {
    font-size: 22px;
    color: #9DA2B5;
    margin-top: 12px;
}

.goodsMsg p:nth-of-type(3).none {
    color: #9DA2B5;
}

.goodsMsg p:nth-of-type(3) {
    color: #3B456C;
}

#addCar .close {
    width: 40px;
    position: absolute;
    top: 30px;
    right: 30px;
}

#addCar .goodsSku {
    padding: 41px 36px 24px 36px;
    border-bottom: 2px solid #F1F2F7;
    overflow: hidden;
}

#addCar .goodsSku p {
    margin-bottom: 42px;
    font-size: 30px;
    color: #3B456C;
}

#addCar .goodsSku li {
    padding: 5px 28px;
    font-size: 22px;
    background: #F1F2F7;
    color: #343657;
    float: left;
    margin: 0 24px 24px 0;
}

#addCar .goodsSku li.active {
    color: #fff;
    background: #FF783C;
}

#addCar .goodsNum {
    padding: 36px 34px;
    overflow: hidden;
    border-bottom: 2px solid #F1F2F7;
}

#addCar .goodsNum p {
    font-size: 30px;
    float: left;
    line-height: 48px;
    color: #343657;
}

#addCar .goodsNum ul {
    float: right;
}

#addCar .goodsNum li {
    float: left;
}

#addCar .goodsNum li:nth-of-type(2) {
    color: #343657;
    font-size: 26px;
    width: 100px;
    text-align: center;
    line-height: 48px;
}

#addCar .goodsNum li img {
    width: 48px;
    height: 48px;
    display: block
}

#addCar .addBtn {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 98px;
    line-height: 98px;
    text-align: center;
    background-image: linear-gradient(3deg, #FF8739 0%, #FF4848 100%);
    background-image: -webkit-linear-gradient(3deg, #FF8739 0%, #FF4848 100%);
    font-size: 30px;
    color: #fff;
}

.activity {
    height: 110px;
    line-height: 110px;
    font-size: 26px;
    color: #FF783C;
    border-bottom: 2px solid #F1F2F7;
    padding-left: 38px;
}

.activity img {
    width: 30px;
    float: right;
    margin-right: 30px;
    margin-top: 40px;
}
</style>
