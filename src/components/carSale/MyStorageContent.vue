<!-- 我的库存 -->
<template>
    <div>
        <div class="my-storage-content">
            <div class="static-cell">
                <div>商品回库</div>
                <div>未售完商品退回至仓库</div>
            </div>
            <ul class="list-ul">
                <li class="borderBottom" v-for="n in 10">
                    <div class="list-li">
                        <div class="con">
                            <div class="cell-content">
                                <img src="../../assets/add.png" class="goodsImg">
                                <h4 class="goodsName">我是很牛逼的商品</h4>
                                <h5 class="goodsSpec">我是商品规格</h5>
                            </div>
                        </div>
                        <div class="btn" @click='deleteItem'>删除</div>
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
		props:['myStorageData'],
		methods:{
      		deleteItem(){ // 删除按钮点击事件
        		alert(2);
      		}
		},
		created(){
			window.cellSwipe();
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
    .list-ul{overflow-x:hidden;overflow-y: auto;}
    .list-ul li {border-bottom: 24px solid rgb(237,238,245);}
    .list-li{border-bottom: 1px solid #fcfcfc; position:relative; color: #666;background: #f2f2f2;-webkit-transform: translateX(0px); transform: translateX(0px);}
    .btn{ position: absolute; top: 0; right: -20%; text-align: center; background: #ffcb20; width: 20%;height: 298px;line-height: 298px;background-image: linear-gradient(17deg, #FF4848 2%, #FF8739 100%);font-size: 30px;color: #FFFFFF;}
</style>


