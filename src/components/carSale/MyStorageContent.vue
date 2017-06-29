<!-- 我的库存 -->
<template>
    <div>
        <div class="my-storage-content">
            <div class="static-cell" @click="jumpToDepot">
                <div>商品回库</div>
                <div>未售完商品退回至仓库</div>
            </div>
            <ul class="list-ul">
                <li class="borderBottom" v-for='(item,index) in myStorageData'>
                    <div class="storage-list-li">
                        <div class="con">
                            <div class="cell-content">
                                <img :src="item.URL_ADDR" class="goodsImg">
                                <h4 class="goodsName">{{item.STK_NAME}}</h4>
                                <h5 class="goodsSpec">{{item.STOCK}}</h5>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script type="text/javascript">
import tools from "../../util/tools.js"
	export default {
		data(){
			return{

			}
		},
        methods:{
            jumpToDepot(){
                this.$emit('toDepot')
            }
        },
		props:['myStorageData'],
		created(){
			// window.cellSwipe();
		}
	}
</script>


<style type="text/css" scoped>
    .content {position: absolute;top: 120px;width: 100%;left: 0;}
    .content .my-storage-content {width: 100%; height: 1000px;}
    .content .static-cell{width: 100%;height: 96px;background-color: white; box-sizing: border-box;padding-right: 20px;}
    .content .static-cell div:nth-child(1){float: left;line-height: 96px;padding-left: 32px;font-size: 30px;color: #3B456C;}
    .content .static-cell div:nth-child(2){float: right;line-height: 96px;padding-right: 52px;color: #9DA2B5;font-size: 26px;   background: url(../../assets/arrow-right@2x.png) center right no-repeat; background-size: 30px 30px;}
    .content ul {margin-top: 24px;}
    
    
    .cell-content {height: 298px;width: 100%;position: relative;background-color: white;}
    .cell-content .goodsImg {position: absolute;top: 48px;left: 32px;width: 200px;height: 200px;border: 1px solid #fff;}
    .cell-content .goodsName {position: absolute;width: 60%;top: 48px;left: 260px;height: 80px;font-size: 30px;color: #3B456C;letter-spacing: 0;line-height: 40px;display: -webkit-box;overflow: hidden;-webkit-box-orient: vertical;text-overflow: ellipsis;-webkit-line-clamp: 2;}
    .cell-content .goodsSpec {position: absolute;left: 260px;top: 182px;font-size: 26px;color: #3B456C; width: 200px;}

    /*list-li*/
    .list-ul{overflow: hidden;}
    .list-ul li {border-bottom: 24px solid rgb(237,238,245);}
    .storage-list-li{border-bottom: 1px solid #fcfcfc; position:relative; color: #666;background: #f2f2f2;}
</style>


