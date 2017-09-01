<!-- 我的库存 -->
<template>
    <div>
        <div class="my-storage-content">
            <ul class="list-ul">
                <li class="borderBottom" v-for='(item,index) in myStorageData'>
                    <div class="storage-list-li">
                        <div class="con">
                            <div class="cell-content">
                                <img v-lazy="item.URL_ADDR" class="goodsImg">
                                <h4 class="goodsName">{{item.STK_NAME}}</h4>
                                <h5 class="goodsSpec">{{item.STOCK}}</h5>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="bottom-tool-bar">
                <div @click="print">打印库存单</div>
                <div @click="jumpToDepot">回库</div>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
import tools from "../../util/tools.js"
import Request from "../../util/API";
    export default {
        methods:{
            jumpToDepot(){
                this.$emit('toDepot')
            },
            print(){
                Request.jsBbridge(bridge => {
                    window.WebViewJavascriptBridge.callHandler(
                        'printMyStorageData', {
                            'Data':this.myStorageData
                        },(responseData) => {
                            
                        }
                    );
                })
            }
        },
        props:['myStorageData']
    }
</script>


<style type="text/css" scoped>
    .my-storage-content {width: 100%; height: 1000px;}
    .static-cell{width: 100%;height: 96px;background-color: white; box-sizing: border-box;padding-right: 20px;}
    .static-cell div:nth-child(1){float: left;line-height: 96px;padding-left: 32px;font-size: 30px;color: #3B456C;}
    .static-cell div:nth-child(2){float: right;line-height: 96px;padding-right: 52px;color: #9DA2B5;font-size: 26px;   background: url(../../assets/arrow-right@2x.png) center right no-repeat; background-size: 30px 30px;}
    ul {padding: 12px 0 96px 0;}
    
    .cell-content {height: 298px;width: 100%;position: relative;background-color: white;}
    .cell-content .goodsImg {position: absolute;top: 48px;left: 32px;width: 200px;height: 200px;border: 1px solid #fff;}
    .cell-content .goodsName {position: absolute;width: 60%;top: 48px;left: 260px;height: 80px;font-size: 30px;color: #3B456C;letter-spacing: 0;line-height: 40px;display: -webkit-box;overflow: hidden;-webkit-box-orient: vertical;text-overflow: ellipsis;-webkit-line-clamp: 2;}
    .cell-content .goodsSpec {position: absolute;left: 260px;top: 182px;font-size: 26px;color: #3B456C; width: 60%;}

    /*list-li*/
    .list-ul{overflow: hidden;}
    .list-ul li {border-bottom: 24px solid rgb(237,238,245);}
    .storage-list-li{border-bottom: 1px solid #fcfcfc; position:relative; color: #666;background: #f2f2f2;}

    .bottom-tool-bar{position: fixed;bottom: 0;left: 0;width: 100%;background-color: white;height: 96px;}
    .bottom-tool-bar > div {width: 50%;border-left: 1px solid #e5e5e5;float: left;text-align: center;line-height: 96px;font-size: 30px;color: #3B456C;box-sizing: border-box;}
</style>


