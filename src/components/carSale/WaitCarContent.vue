<!-- 待装车 -->
<template>
    <div class="wait-car-content">
        <div class="static-cell" @click="printGoodsDetail">
            <div>打印明细</div>
            <div>打印待装车商品明细</div>
        </div>
        <ul class="list-ul">
            <li class="borderBottom" v-for="(item,index) in waitCarData">
                <div class="cell-header borderBottom">
                    <span>待仓管确认装车</span>
                    <span @click="editGoods(item)">编辑</span>
                </div>
                <div class="list-li">
                    <div class="con">
                        <div class="cell-content">
                            <img v-view="item.URL_ADDR" class="goodsImg">
                            <h4 class="goodsName">{{item.STK_NAME}}</h4>
                            <h5 class="goodsSpec">{{item.STOCK}}</h5>
                        </div>
                    </div>
                    <div class="btn" @click='deleteItem(index)'>删除</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script type="text/javascript">
import Request from "../../util/API";
import tools from "../../util/tools.js"
export default {
    data(){
            return {

            }
        },
        props: ['waitCarData'],
        methods: {
            editGoods(item){
                this.$emit('clickEdit',item);
            },
            deleteItem(index) { // 删除按钮点击事件
                this.$emit('deleteRemoteItem',index);
            },
            printGoodsDetail() { // alert("打印订单")
                Request.jsBbridge(bridge => {
                    window.WebViewJavascriptBridge.callHandler(
                        'printGoodsDetail', {
                            'Data': this.waitCarData
                        },(responseData) => {
                            
                        }
                    );
                })
            }
        },
        created() {
            window.cellSwipe();
        }
}
</script>



<style type="text/css" scoped>
    .content .my-storage-content {width: 100%; height: 1000px;}
    .content .static-cell{width: 100%;height: 96px;background-color: white; box-sizing: border-box;padding-right: 20px;}
    .content .static-cell div:nth-child(1){float: left;line-height: 96px;padding-left: 32px;font-size: 30px;color: #3B456C;}
    .content .static-cell div:nth-child(2){float: right;line-height: 96px;padding-right: 52px;color: #9DA2B5;font-size: 26px;   background: url(../../assets/arrow-right@2x.png) center right no-repeat; background-size: 30px 30px;}
    .content ul {margin-top: 24px;}
    

    .cell-content {height: 298px;width: 100%;position: relative;background-color: white;}
    .cell-content .goodsImg {position: absolute;top: 48px;left: 32px;width: 200px;height: 200px;border: 1px solid #fff;}
    .cell-content .goodsName {position: absolute;width: 60%;top: 48px;left: 260px;height: 80px;font-size: 30px;color: #3B456C;letter-spacing: 0;line-height: 40px;display: -webkit-box;overflow: hidden;-webkit-box-orient: vertical;text-overflow: ellipsis;-webkit-line-clamp: 2;}
    .cell-content .goodsSpec {position: absolute;left: 260px;top: 182px;font-size: 26px;color: #3B456C; width: 200px;}
    .cell-header {position: relative; width: 100%;height: 64px;background-color: white;}
    .cell-header span:nth-child(1){float: left;font-size: 26px;color: #FF783C;line-height: 64px;padding-left: 32px;}
    .cell-header span:nth-child(2){float: right;font-size: 26px;color: #3B456C;line-height: 64px;padding-right: 32px;}

    /*list-li*/
    .list-ul{overflow-x:hidden;overflow-y: auto;}
    .list-ul li {border-bottom: 24px solid rgb(237,238,245);}
    .list-li{border-bottom: 1px solid #fcfcfc; position:relative; color: #666;background: #f2f2f2;-webkit-transform: translateX(0px); transform: translateX(0px);}
    .btn{ position: absolute; top: 0; right: -20%; text-align: center; background: #ffcb20; width: 20%;height: 298px;line-height: 298px;background-image: linear-gradient(17deg, #FF4848 2%, #FF8739 100%);font-size: 30px;color: #FFFFFF;}
</style>
