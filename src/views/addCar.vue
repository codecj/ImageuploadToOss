<template>
    <div id="addCar">
        <transition name="begore">
            <div v-show="imgShow" class="inner_hide product_show">
                <div class="goodInfo">
                    <div class="goodsImg">
                        <img :src='chose.imgUrl' height="300" width="300" alt="">
                    </div>
                    <div class="goodsMsg">
                        <p>¥{{chose.netprice}}<span><!-- .00 --></span></p>
                        <p>商品编号: {{chose.pluc}}</p>
                        <p>库存: {{chose.stdQty}}</p>
                    </div>
                    <div @click="closeSku()" class="close">
                    </div>
                </div>
                <div class="overscroll">
                    <p v-show="isHide" @click="goActive()" class="activity activeTap">
                        该商品正在参与活动,查看活动信息
                        <img src="../assets/icon17.png" alt="">
                    </p>
                    <ul v-for="item in defalutRule" :key="item.specId" class="goodsSku">
                        <p>{{item.specName}}</p>
                        <li @click="changGet(item)" :class="[{'notAllow':item.not_allow,'normal':!item.not_allow},{'active':item.isAct,'normal':!item.isAct}]" :data-id="item.SPEC_VALUE_ID" v-for="item in item.specValueList">{{item.SPECVALUE}}</li>
                    </ul>
                    <div class="goodsNum">
                        <p>购买数量</p>
                        <ul>
                            <li v-show="count>1" @click="reduceCartNum()"><img src="../assets/icon4.png" alt=""></li>
                            <li v-show="count<=1" @click="reduceCartNum()"><img src="../assets/icon3.png" alt=""></li>
                            <li class="changeNum">{{count}}</li>
                            <li @click="addCartNum()"><img src="../assets/icon9.png" alt=""></li>
                        </ul>
                    </div>
                </div>
                <div @click="addToCar()" class="addBtn">加入购物车</div>
            </div>
        </transition>
        <transition name="fold">
            <div v-show="!imgShow" class="activeList">
                <ul>
                    <li class="tittle">
                        <p @click="goBack()"></p>
                        <p>促销活动</p>
                    </li>
                    <div v-for="(value, key, index) in activeData">
                        <li v-for="item in value" v-if='key=="ALIST"' @click="gotTo(value,key)" class="activeTap">
                            <span class="left">单品打折</span>
                            <span class="right" v-if='key=="ALIST"'>{{item.REF_NO}}</span>
                        </li>
                        <li v-if='key=="BLIST"' @click="gotTo(value,key)" v-for="item in value" class="activeTap">
                            <span class="left">单品满赠</span>
                            <!-- <span class="right" v-if='key=="BLIST"&&item.limitFlg=="N"'>买{{item.BASE_QTY}}件送赠品(不限购)</span> -->
                            <span class="right" v-if='key=="BLIST"'>买{{item.BASE_QTY}}件送赠品(每人限购{{item.SINGLE_CUST_QTY}}件)</span>
                        </li>
                        <li v-for="item in value" v-if='key=="ELIST"' @click="gotTo(value,key)" class="activeTap">
                            <span class="left">混搭满赠</span>
                            <span class="right" v-if='key=="ELIST"&&item.limitFlg=="N"'>买{{item.BASE_QTY}}件送赠品(不限购)</span>
                            <span class="right" v-if='key=="ELIST"&&item.limitFlg=="Y"'>买{{item.BASE_QTY}}件送赠品(每人限购{{item.SINGLE_CUST_QTY}}件)</span>
                        </li>
                        <li v-if='key=="CLIST"&&arrLength(value)' @click="gotTo(value,key)" class="activeTap">
                            <span class="left">优惠套餐</span>
                            <span class="right" v-if='key=="CLIST"'>共有{{arrLength(value)}}种套餐</span>
                        </li>
                    </div>
                </ul>
            </div>
        </transition>
    </div>
</template>
<script>
import Request from "../util/API"
import {
    Lazyload
} from 'mint-ui'
import Vue from 'vue'
import {
    Toast,
    Indicator
} from 'mint-ui'
Vue.use(Lazyload, {
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
                areaId: this.$route.query.areaId,
                stkc: this.$route.query.stkc,
                userName: this.$route.query.userName,
                userid: this.$route.query.userid,
                skuDate: [],
                chose: {},
                defalutRule: [],
                count: 1,
                sku_list: [],
                activeData: [],
                thisId:''
            }
        },
        mounted: function() {
            // this.stkc=this.$route.query.stkc
            this.detailMsg()
            // this.activeMsg()
            Indicator.open()
        },
        methods: {
            gotTo(item,type) {
                if (type!=='CLIST') {
                    Request.jsBbridge(bridge => {
                        bridge.callHandler(
                            'commonActivities', {
                                'stkc': this.stkc,
                                'itempkno': item[0].ITEM_PK_NO,
                                'maspkno': item[0].MAS_PK_NO
                            }
                        )
                    })
                } else {
                    Request.jsBbridge(bridge => {
                        bridge.callHandler(
                            'packageActivities', {
                                'CLIST': item
                            }
                        )
                    })
                }
            },
            arrLength(value) {
                return value.length
            },
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
            choseData() {
                this.skuDate.stkSpecGroupList.forEach(item => {
                    if (this.stkc = item.stkC) {
                        this.chose = item
                    }　　　　　　　　
                });
            },
            reduceCartNum() {
                if (this.count == 1) {
                    this.count = 1
                } else {
                    this.count--;
                }
            },
            addCartNum() {
                this.count++
            },
            addToCar() {
                Indicator.open();
                let select_ids = this._getSelAttrId();
                if (this.defalutRule.length !== select_ids.length) return
                let pargrmList = {
                    oper: 'save',
                    type: 'cart',
                    para: '{ "buynum": "' + this.count + '","stkc": "' + this.stkc + '", "areaId": "' + this.areaId + '", "userName": "' + this.userName + '","userid":"' + this.userid + '"}'
                }
                Request.post(pargrmList).then(res => {
                    let getData = JSON.parse(res.data.result)
                    if (getData.code !== "200") Toast({
                        message: getData.msg,
                        duration: 2000
                    });
                    Toast({
                        message: getData.msg,
                        duration: 2000
                    });
                    Indicator.close();
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
            detailMsg() {
                let _thisStkc=this.stkc
                Indicator.open();
                let pargrmList = {
                    oper: 'findWqSpec',
                    type: 'wqProduct',
                    para: '{ "stkc": "' + this.stkc + '", "areaId": "' + this.areaId + '", "userName": "' + this.userName + '" }'
                }
                Request.post(pargrmList).then(res => {
                    let getData = JSON.parse(res.data.result)

                    if (getData.code !== "200") Toast({
                        message: getData.msg,
                        duration: 2000
                    });

                    this.skuDate = getData.data
                    this.defalutRule = this.skuDate.specList
                    Indicator.close();
                    this.choseData()
                    for (let i = 0; i < this.skuDate.stkSpecGroupList.length; i++) {
                        this.sku_list.push({
                            'goodsId': this.skuDate.stkSpecGroupList[i].specValueIdList.join('|')
                        });
                    }
                    this._getDefalut(_thisStkc)

                    Indicator.close();
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
            activeMsg() {
                let pargrmListActive = {
                    oper: 'findAllProm',
                    type: 'wqProduct',
                    para: '{ "stkc": "' + this.stkc + '", "areaid": "' + this.areaId + '", "username": "' + this.userName + '" }'
                }
                Request.post(pargrmListActive).then(res => {
                    let activeData = JSON.parse(res.data.result)
                    if (activeData.msg !== "该商品未参与促销活动") {
                        this.$set(this, 'isHide', true)
                    } else {
                        this.$set(this, 'isHide', false)
                    }
                    this.activeData = activeData.data
                    // console.log(activeData.data)
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
            _getDefalut(stkc) {
                let defalutChose = []
                this.skuDate.stkSpecGroupList.forEach((items) => {
                    if (stkc == items.stkC) {
                        defalutChose = items.specValueIdList
                    }
                });
                this.defalutRule.forEach((items) => {
                    items.specValueList.forEach((index) => {
                        if (this.in_array(index.SPEC_VALUE_ID, defalutChose)) {
                            this.changGet(index)
                        }
                    })
                });
            },
            // 规格点击的一系列操作
            changGet(item) {
                // console.log(item)
                console.log(this.defalutRule)
                if(item.not_allow) return
                this.thisId=item.SPEC_VALUE_ID
                item.isAct ? this.$set(item, 'isAct', false) : this.$set(item, 'isAct', true);
                
                this.defalutRule.forEach((index) => {
                    if(item.SPEC_NAME==index.specName){
                        index.specValueList.forEach(items => {
                            if(items.SPEC_VALUE_ID!=item.SPEC_VALUE_ID ) this.$set(items, 'isAct', false)
                        })
                    }
                })
                let select_ids = this._getSelAttrId();
                let all_ids = this.filterAttrs(select_ids);
                let has =[]
                let notYet =[]
                if (this.defalutRule.length == select_ids.length) {
                    this.skuDate.stkSpecGroupList.forEach((items) => {
                        if (select_ids.sort().join('-') == items.specValueIdList.sort().join('-')) {
                            this.stkc = items.stkC
                            this.chose = items
                        }
                    });
                    this.activeMsg()
                }
                for(var i=0;i<this.defalutRule.length;i++){
                    if (this.defalutRule[i].isChose) {
                        has.push(this.defalutRule[i])
                    }else{
                        notYet.push(this.defalutRule[i])
                    }
                }
                this.set_block(notYet, all_ids);
                this.update_2(has)
            },
            //已选择的节点数组
            _getSelAttrId() {
                let list = [];
                this.defalutRule.forEach((items) => {
                    // items.isChose = false
                    this.$set(items, 'isChose', false)
                    items.specValueList.forEach((index) => {
                        if (index.isAct) {
                            list.push(index.SPEC_VALUE_ID)
                            this.$set(items, 'isChose', true)
                        }
                    })
                });
                return list
            },
            //获取所有包含指定节点的路线
            filterProduct(ids) {
                let result = [],
                    _attr, _all_ids_in;
                this.sku_list.map((v, k) => {
                    _attr = '|' + v['goodsId'] + '|';
                    _all_ids_in = true;
                    for (k in ids) {
                        if (_attr.indexOf('|' + ids[k] + '|') == -1) {
                            _all_ids_in = false;
                            break;
                        }
                    }
                    if (_all_ids_in) {
                        result.push(v);
                    }
                });
                return result;
            },
            //去除 数组 arr中的 val ，返回一个新数组
            del_array_val(arr, val) {
                let delArr = [];
                for (var k in arr) {
                    if (arr[k] != val) {
                        delArr.push(arr[k]);
                    }
                }
                return delArr;
            },
            //获取 经过已选节点 所有线路上的全部节点
            //根据已经选择得属性值，得到余下还能选择的属性值
            filterAttrs(ids) {
                var products = this.filterProduct(ids);
                var result = [];
                products.map(function(v, k) {
                    result = result.concat(v['goodsId'].split('|'));
                });
                return result;
            },
            //数组内元素查找元素
            in_array(search, array) {
                for (var i in array) {
                    if (array[i] == search) {
                        return true;
                    }
                }
                return false;
            },
            // 若该属性值是未选中状态的话，设置同级的其他属性是否可选
            update_2($goods_attr) {
                let select_ids = this._getSelAttrId();
                let select_ids2 = this.del_array_val(select_ids, this.thisId);
                let all_ids = this.filterAttrs(select_ids2);
                this.set_block($goods_attr, all_ids);
            },
            //根据 $goods_attr下的所有数据是否在可选数据中（all_ids） 来设置可选状态
            set_block($goods_attr, all_ids) {
                $goods_attr.forEach((items) => {
                    items.specValueList.forEach((index) => {
                        if (this.in_array(index.SPEC_VALUE_ID, all_ids)) {
                            this.$set(index, 'not_allow', false)
                        } else {
                            if(!items.isChose){
                                this.$set(index, 'not_allow', true)
                            }
                        }
                    })
                });
            }
        }
}
</script>
<style scoped>
#addCar {
/*    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;*/
}

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
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
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

.activeList li span.left {
    float: left;
    font-size: 30px;
    color: #3B456C;
}

.activeList li span.right {
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
    background-color: #fff;
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
    background-color: #f2f2f2;
    overflow: hidden;
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
    font-size: 26px;
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
    width: 80px;
    height: 80px;
    position: absolute;
    top: 20px;
    right: 20px;
    background: url('../assets/icon18.png') center no-repeat;
    -webkit-background-size: 40px;
    background-size: 40px;
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
    font-size: 26px;
    background: #F1F2F7;
    color: #343657;
    float: left;
    margin: 0 24px 24px 0;
}

#addCar .goodsSku li.notAllow {
    color: #ddd;
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
    line-height: 60px;
    color: #343657;
}

#addCar .goodsNum ul {
    float: right;
}

#addCar .goodsNum li {
    float: left;
}

#addCar .goodsNum li.changeNum {
    color: #343657;
    font-size: 28px;
    width: 100px;
    text-align: center;
    line-height: 60px;
}

#addCar .goodsNum li img {
    width: 60px;
    height: 60px;
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
