<template>
    <div class="oneProd">
        <!-- 每个产品 -->
        <div class="searchItem borderBottom" @click='goodsClick(item.STK_C)' :data-id="item.STK_NAME_EXT">
            <div class="onephoto">
                <img alt="" class="photo" v-lazy="item.URL_ADDR" width="157" height="157">
            </div>
            <div class="prodDetail">
                <p>{{item.NAME}}</p>
                <p><span>[{{item.STK_NAME_EXT}}]  </span> <span v-if="item.RESALABLE_FLG == 'Y'">[可退货]</span><span v-else="item.RESALABLE_FLG == 'N'">[不可退货]</span></p>
                <p>规格：{{item.MODLE}}</p>
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
                <p>
                    <span>￥{{item.NET_PRICE}}</span>
                    <span v-show="item.COMMISSION_PRICE">奖</span>
                    <span v-show="item.COMMISSION_PRICE" v-if="">￥{{ item.COMMISSION_PRICE | float2bits}}</span>
                    <img src="../assets/icon57.png" alt="" class="gocart" v-if="item.ATP_QTY==0">
                    <img src="../assets/icon2.png" alt="" class="gocart" @click.stop="gocart(item.STK_C)" v-else="item.ATP_QTY>0">
                </p>
            </div>
        </div>
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
<style scoped>

.oneProd:nth-child(odd) {
    float: left;
}

.oneProd:nth-child(even) {
    float: right;
}


/*changeItem竖着布局方式*/

.changeItem .searchItem {
    height: 228px;
    /*height: 198px;*/
    width: 100%;
    background: #fff;
    /*padding: 20px 40px 20px 32px;*/
    padding: 50px 40px 50px 32px;

}

.changeItem .searchItem .onephoto {
    float: left;
}

.changeItem .searchItem .onephoto .photo {
    width: 230px;
    height: 230px;
}

.prodDetail {
    width: 65%;
    float: left;
}

.changeItem .searchItem .prodDetail>p:nth-child(1) {
    width: 90%;
    height: 80px;
    float: left;
    font-size: 30px;
    color: #3B456C;
    letter-spacing: 0;
    line-height: 40px;
    margin-left: 28px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: normal;
    display: -webkit-box;
    display: box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
.changeItem .searchItem .prodDetail>p:nth-child(2){
    font-size: 26px;
    width: 80%;
    color: #FF783C;
    letter-spacing: 0;
    float: left;
    width: 450px;
    margin-left: 28px;
    white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
}
.changeItem .searchItem .prodDetail>p:nth-child(3) {
    font-size: 26px;
    width: 80%;
    color: #9DA2B5;
    letter-spacing: 0;
    float: left;
    width: 450px;
    margin-left: 28px;
}

.changeItem .searchItem .prodDetail>p:nth-child(4) {
    width: 80%;
    height:40px;
    line-height: 40px;
    /*float:left;*/
    margin-top: 8px;
    margin-left: 32px;
    overflow: hidden;
}
.changeItem .searchItem .prodDetail>p:nth-child(4) span{
    margin-right:5px;

}
.changeItem .searchItem .prodDetail>p:nth-child(5) span {
    float: left;
    font-size: 18px;
    color: #FF783C;
    letter-spacing: 0;
    border-radius: 2px;
    display: inline-block;
    height: 32px;
    line-height: 34px;  
    /*  display:inline-block;
  padding:0 10px;*/
    /*width: 110px;*/
    text-align: center;
    margin: 3px 5px 3px 0;
}

.changeItem .searchItem .prodDetail>p:nth-child(5) {
    margin-top: 4px;
    height: 44px;
    line-height: 44px;
    /*width:60%;*/
    /*float:left;*/
    margin-left: 28px;
    position: relative;
}

.changeItem .searchItem .prodDetail>p:nth-child(5) span:nth-child(1) {
    font-size: 30px;
    color: #FF783C;
    letter-spacing: 0;
}

.changeItem .searchItem .prodDetail>p:nth-child(5) span:nth-child(2) {
    font-size: 18px;
    color: #FFFFFF;
    letter-spacing: 0;
    background: #FF7A3F;
    border-radius: 4px;
    margin: 0 10px 0 40px;
    line-height: 30px;
    text-align: center;
    display: inline-block;
    padding:5px 5px;

}

.changeItem .searchItem .prodDetail>p:nth-child(5) span:nth-child(3) {
    font-size: 22px;
    color: #FF783C;
    letter-spacing: 0;
}

.changeItem .searchItem .gocart {
    width: 60px;
    height: 60px;
    position: absolute;
    right: 30px;
    bottom: -8px;
}


/*content横着布局方式*/
.content .oneProd {
    margin-bottom: 10px;
    height: 650px;
}

.content .searchItem:nth-child(even) {
    float: right;
    width: 367px;
    height: 650px;
    margin-top: 14px;
    background: #fff;
    position: relative;
}

.content .searchItem:nth-child(odd) {
    float: left;
    width: 367px;
    height: 650px;
    margin-top: 14px;
    background: #fff;
    position: relative;
}

.content .searchItem .onephoto {
    width: 367px;
    height: 367px;
    position: relative;
}

.content .searchItem .onephoto .photo {
    width: 367px;
    height: 367px;
}

.content .searchItem .prodDetail>p:nth-child(1) {
    width: 330px;
    height: 80px;
    font-size: 30px;
    color: #3B456C;
    letter-spacing: 0;
    line-height: 40px;
    margin: 19px 14px 0 23px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: normal;
    display: -webkit-box;
    /** 对象作为伸缩盒子模型显示 **/
    -webkit-box-orient: vertical;
    /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: 2;
    /** 显示的行数 **/
}
.content .searchItem .prodDetail>p:nth-child(2){
    font-size: 26px;
    width: 330px;
    color: #FF783C;
    letter-spacing: 0;
    float: left;
    margin-left: 28px;
}
.content .searchItem .prodDetail>p:nth-child(3) {
    font-size: 22px;
    color: #9DA2B5;
    letter-spacing: 0;
    height: 40px;
    margin: 16px 0 10px 23px;
    width: 330px;
    float:left;


}

.content .searchItem .prodDetail>p:nth-child(5) span:nth-child(2) {
    font-size: 18px;
    color: #FFFFFF;
    letter-spacing: 0;
    background: #FF7A3F;
    border-radius: 4px;
    margin: 0 0 0 14px;
    /*   width:30px;
    height: 30px;
    line-height: 30px;*/
    text-align: center;
    display: inline-block;
    margin-right: 0;
}

.content .searchItem .prodDetail>p:nth-child(5) span:nth-child(3) {
    margin-left: 0;
}

.content .searchItem .prodDetail>p:nth-child(4) {
    height: 48px;
    padding-top: 10px;
    opacity: 0.9;
    background: #fff;
    position: absolute;
    margin-top: -210px;
    padding-left: 10px;
    width: 357px;
}

.content .searchItem .prodDetail>p:nth-child(4) span {
    font-size: 18px;
    color: #FF783C;
    letter-spacing: 0;
    border-radius: 2px;
    display: inline-block;
    padding: 1px 6px 1px 6px;
}

.content .searchItem .prodDetail>p:nth-child(5) {
    /*margin-top: 20px;*/
    position: relative;
    width:100%;
    height:40px;
    float:left;
    margin-left:10px;
}

.content .searchItem .prodDetail>p:nth-child(5) span {
    font-size: 22px;
    color: #FF783C;
    letter-spacing: 0;
    margin: 8px 0 0 10px;
}

.content .searchItem .gocart {
    width: 60px;
    height: 60px;
    float: right;
    margin-right: 24px;
    position: absolute;
    right: -120px;
    bottom: -8px;
}
</style>
