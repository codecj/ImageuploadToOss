<template>
    <div class="oneProd">
        <li @click='goodsClick(item.STK_C)' :data-id="item.STK_NAME_EXT">
            <img alt="" v-lazy="item.URL_ADDR" class="menu_food_img">
            <div class="menu_food_description">
                <p class="goodName">{{item.NAME}}</p>
                <p class="vendorName">{{item.STK_NAME_EXT}}</p>
                <p class="specifications">规格：{{item.MODLE}}</p>
                <p>
                    <span v-for="act in item.PROM_MAS_CODES" v-if="act=='WEBPROMA'" class="border">
                  单品打折
                  </span>
                    <span v-for="act in item.PROM_MAS_CODES" v-if="act=='WEBPROMB'" class="border">
                  单品满赠
                  </span>
                    <span v-for="act in item.PROM_MAS_CODES" v-if="act=='WEBPROMC'" class="border">
                  套装
                  </span>
                    <span v-for="act in item.PROM_MAS_CODES" v-if="act=='WEBPROMD'" class="border">
                  抢购商品
                  </span>
                    <span v-for="act in item.PROM_MAS_CODES" v-if="act=='WEBPROME'" class="border">
                  混搭满赠
                  </span>
                </p>
                <p class="goodPrice">￥
                    <span>{{item.NET_PRICE}}</span>&nbsp;
                    <span v-show="item.COMMISSION_PRICE">奖</span>
                    <span v-show="item.COMMISSION_PRICE" v-if="">￥{{ item.COMMISSION_PRICE | float2bits}}</span>
                </p>
                <em class="notaddGoods" v-if="item.ATP_QTY==0"></em>
                <em class="addGoods" @click.stop="gocart(item.STK_C)" v-else="item.ATP_QTY>0"></em>
            </div>
        </li>
    </div>
</template>

<script type="text/javascript">
    import Request from "../util/API"
    export default ({
        name: "oneProd",
        data() {
            return {
                cartShow: true
            }
        },
        components: {},
        props: {
            item: Object,
        },
        methods: {
            gocart(value) {
                Request.jsBbridge(function(bridge) {
                    bridge.callHandler(
                        'popShoppingCartClick', {
                            'stkc': value
                        })
                })
            },
            goodsClick(value) {
                Request.jsBbridge(function(bridge) {
                    bridge.callHandler(
                        'goToGoodsDetail', {
                            'stkc': value
                        })
                })
            }
        }
    })
</script>
<style>
    .menu_food_img{width:2rem; height:2rem; margin-right:0.4rem; float:left;}
    .menu_food_description{margin-left:2.4rem;}
    .goodName{
        font-family: PingFangSC-Medium;
        font-size: 0.4rem;
        color: #3B456C;
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
    }
    .vendorName,.specifications{
        font-family: PingFangSC-Regular;
        font-size: 0.38rem;
        color: #3B456C;
        opacity: 0.5;
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
    }
    .goodPrice{color:#FF0000; font-size:0.38rem;}
    .goodPrice span{font-size:0.35rem;}
    .notaddGoods{
        position: absolute;
        right: 0.34rem;
        bottom: 0.46rem;
        width: 0.8rem;
        height: 0.8rem;
        background: url("../assets/icon57.png") no-repeat 100%/100%;
        display: inline-block;
    }
    .addGoods{
        position: absolute;
        right: 0.34rem;
        bottom: 0.46rem;
        width: 0.8rem;
        height: 0.8rem;
        background: url("../assets/icon2.png") no-repeat 100%/100%;
        display: inline-block;
    }
    .border{white-space:nowrap; margin-right: 0.03rem;}
</style>