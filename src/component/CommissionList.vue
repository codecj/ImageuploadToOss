<template> 
    <div id="settledCommission"> 
        <ul> 
            <li v-for="item in dataArray" :key="item.STK_C">
                 <div class="header"> 
                    <h3>{{item.CUST_NAME}}</h3> 
                 </div> 
                 <div class="content">
                    <img :src="item.PRODUCT_THUMBNAIL" alt="" class="goodsImg">
                    <h4 class="goodsName">{{item.STK_NAME}}</h4>
                    <span class="specification">规格：{{item.UOM}}</span>
                    <span class="price">￥{{item.price}}</span>
                    <span class="praise">奖</span>
                    <span class="praisePrice">￥{{item.praisePrice}}</span>
                    <span class="goodsCount">x{{item.UOM_QTY}}</span>
                 </div>
                <div class="footer">
                    <span :class="{commissionStatusGrey:grey,commissionStatusOrange:orange}">{{item.STATUS}}</span>
                    <span class="commissionPrice">￥{{item.allCommissionPrice}}</span>
                    <span class="praise">奖</span>
                </div>
             </li>
        </ul>
    </div> 
</template>
<script type="text/javascript">
import Request from "../util/API";
import Vue from 'vue';
import {
    Toast,
    Indicator
}
from 'mint-ui';
import testJson from './test.json'
export default {
    data() {
        return {
            dataArray: [], // 数据源数组
            marketName: '', // 超市名
            stkName: '', // 商品名
            uom: '', // 规格
            net_price: '', // 商品价格
            commission_price: '', // 单个商品的佣金
            uom_qty: '', // 总数量
            real_commission_price: '', // 总佣金
            grey:'',
            orange:''
        }
    },
    props:['commissionData'],
    mounted() {
        var typeStr=JSON.parse(this.commissionData).type;
        console.log(typeStr);
        if (typeStr=='already') {
            this.ajax('findAlreadyCommission');
            this.grey = true;
            this.orange = false;
        }
        else if (typeStr=='wait') {
            this.ajax('findPlaceCommission');
            this.grey = false;
            this.orange = true;
        }
    },
    methods: {
        ajax(oper) {
            Indicator.open();
            let pargrmList= {
                oper: oper,
                type: 'wqOrder',
                para: '{"userid":"'+JSON.parse(this.commissionData).userId+'"}'
            };
            Request.post(pargrmList).then((response) =>{
                console.log(response);
                Indicator.close();
                this.dataArray=testJson.data;
                for (var i = 0; i < testJson.data.length; i++) {
                    var obj = testJson.data[i];
                    obj.price = this.getCalPriceArr(obj.NET_PRICE.toString());
                    obj.praisePrice = this.getCalPriceArr(obj.REAL_COMMISSION_PRICE.toString());
                    obj.allCommissionPrice = this.getCalPriceArr(obj.COMMISSION_PRICE.toString());
                    console.log(obj.STATUS);
                    if (obj.STATUS === '' || obj.STATUS === undefined) {
                        obj.STATUS = '已结算';
                    }
                }
                console.log(this.dataArray);
            }
            ).catch(function(error) {
                Indicator.close();
            }
            )
        },
        getCalPriceArr:function (value){
             var value = Math.round(parseFloat(value)*100)/100;
             var xsd = value.toString().split(".");
             if(xsd.length == 1){
                value = value.toString()+".00";
                return value;
             }
             if(xsd.length > 1){
                if(xsd[1].length<2){
                   value=value.toString()+"0";
                }
                return value;
             }
        }
    }
}

</script> 
<style scoped> #settledCommission ul {
    background-color: rgb(239, 240, 246);
}

#settledCommission li {
    background-color: #fff;
    width: 750px;
    height: 528px;
    border-top: 24px solid rgb(239, 240, 246);
}

#settledCommission .header {
    width: 750px;
    height: 114px;
    position: relative;
    border-bottom: 1px solid #F1F2F7;
}

#settledCommission .header h3 {
    font-size: 30px;
    color: #3B456C;
    letter-spacing: 0;
    line-height: 40px;
    position: absolute;
    top: 36px;
    left: 32px;
    width: 100%;
    height: 40px;
    font-weight: 800;
}

#settledCommission .content {
    height: 298px;
    width: 750px;
    position: relative;
    border-bottom: 2px solid #F1F2F7;
}

#settledCommission .content .goodsImg {
    position: absolute;
    top: 48px;
    left: 32px;
    width: 200px;
    height: 200px;
    border: 1px solid #fff;
}

#settledCommission .content .goodsName {
    position: absolute;
    width: 450px;
    top: 48px;
    left: 260px;
    height: 80px;
    font-size: 30px;
    color: #3B456C;
    letter-spacing: 0;
    line-height: 40px;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
}

#settledCommission .content .specification {
    position: absolute;
    left: 260px;
    top: 133px;
    font-size: 22px;
    color: #9DA2B5;
}

#settledCommission .content .price {
    position: absolute;
    top: 211px;
    left: 256px;
    font-size: 30px;
    color: #FF783C;
}

#settledCommission .content .praise {
    position: absolute;
    left: 414px;
    top: 217px;
    border: 1px solid #fff;
    height: 28px;
    line-height: 29px;
    border-radius: 5px;
    font-size: 18px;
    color: #FFFFFF;
    background-color: #FF783C;
}

#settledCommission .content .praisePrice {
    position: absolute;
    left: 445px;
    top: 217px;
    font-size: 22px;
    color: #FF783C;
}

#settledCommission .content .goodsCount {
    position: absolute;
    right: 40px;
    top: 218px;
    font-size: 22px;
    color: #3B456C;
}

/*footer*/
#settledCommission .footer {
    position: relative;
    height: 112px;
    width: 750px;
}

#settledCommission .footer .commissionStatusGrey {
    display: block;
    float: left;
    padding-top: 38px;
    padding-left: 32px;
    height: 37px;
    font-size: 26px;
    color: #9DA2B5;
}

#settledCommission .footer .commissionStatusOrange {
    display: block;
    float: left;
    padding-top: 38px;
    padding-left: 32px;
    height: 37px;
    font-size: 26px;
    font-size: 26px;
    color: #FF783C;
}

#settledCommission .footer .praise {
    /*position: absolute;*/
    float: right;
    display: block;
    margin-top: 44px;
    margin-right: 10px;
    border: 1px solid #fff;
    height: 28px;
    line-height: 28px;
    border-radius: 5px;
    font-size: 18px;
    color: #FFFFFF;
    background-color: #FF783C;
}

#settledCommission .footer .commissionPrice {
    float: right;
    display: block;
    padding-right: 32px;
    padding-top: 22px;
    right: 32px;
    top: 22px;
    font-size: 48px;
    color: #FF783C;
    height: 67px;
}

</style>
