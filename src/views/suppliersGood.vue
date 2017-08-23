<template>
    <div>
        <div class="menu_container">
            <div class="food_container">
                <div class="menu_left">
                    <ul>
                        <li v-for="(navs,index) in nav" @click="selectmenu(index)" :class="{'activity_menu':ind === index}">{{navs}}</li>
                    </ul>
                </div>
                <div class="menu_right">
                    <ul>
                        <li>
                            <img src="../assets/placehold.png" class="menu_food_img">
                            <div class="menu_food_description">
                                <p class="goodName">阿尔卑斯水果糖阿尔卑斯水果糖阿尔卑斯水果糖阿尔卑斯水果糖阿尔卑斯水果糖阿尔卑斯水果糖阿尔卑斯水果糖</p>
                                <p class="vendorName">促销包装促销包装促销包装促销包装促销包装促销包装促销包装</p>
                                <p class="specifications">规格：150g/包</p>
                                <p class="goodPrice">￥<span>12.00</span></p>
                                <em class="addGoods"></em>
                            </div>
                        </li>
                        <li>
                            <img src="../assets/placehold.png" class="menu_food_img">
                            <div class="menu_food_description">
                                <p class="goodName">阿尔卑斯水果糖</p>
                                <p class="vendorName">促销包装</p>
                                <p class="specifications">规格：150g/包</p>
                                <p class="goodPrice">￥<span>12.00</span></p>
                                <em class="addGoods"></em>
                            </div>
                        </li>
                        <li>
                            <img src="../assets/placehold.png" class="menu_food_img">
                            <div class="menu_food_description">
                                <p class="goodName">阿尔卑斯水果糖</p>
                                <p class="vendorName">促销包装</p>
                                <p class="specifications">规格：150g/包</p>
                                <p class="goodPrice">￥<span>12.00</span></p>
                                <em class="addGoods"></em>
                            </div>
                        </li>
                        <li>
                            <img src="../assets/placehold.png" class="menu_food_img">
                            <div class="menu_food_description">
                                <p class="goodName">阿尔卑斯水果糖</p>
                                <p class="vendorName">促销包装</p>
                                <p class="specifications">规格：150g/包</p>
                                <p class="goodPrice">￥<span>12.00</span></p>
                                <em class="addGoods"></em>
                            </div>
                        </li>
                        <li>
                            <img src="../assets/placehold.png" class="menu_food_img">
                            <div class="menu_food_description">
                                <p class="goodName">阿尔卑斯水果糖</p>
                                <p class="vendorName">促销包装</p>
                                <p class="specifications">规格：150g/包</p>
                                <p class="goodPrice">￥<span>12.00</span></p>
                                <em class="addGoods"></em>
                            </div>
                        </li>
                        <li>
                            <img src="../assets/placehold.png" class="menu_food_img">
                            <div class="menu_food_description">
                                <p class="goodName">阿尔卑斯水果糖</p>
                                <p class="vendorName">促销包装</p>
                                <p class="specifications">规格：150g/包</p>
                                <p class="goodPrice">￥<span>12.00</span></p>
                                <em class="addGoods"></em>
                            </div>
                        </li>
                        <li>
                            <img src="../assets/placehold.png" class="menu_food_img">
                            <div class="menu_food_description">
                                <p class="goodName">阿尔卑斯水果糖</p>
                                <p class="vendorName">促销包装</p>
                                <p class="specifications">规格：150g/包</p>
                                <p class="goodPrice">￥<span>12.00</span></p>
                                <em class="addGoods"></em>
                            </div>
                        </li>
                        <li>
                            <img src="../assets/placehold.png" class="menu_food_img">
                            <div class="menu_food_description">
                                <p class="goodName">阿尔卑斯水果糖</p>
                                <p class="vendorName">促销包装</p>
                                <p class="specifications">规格：150g/包</p>
                                <p class="goodPrice">￥<span>12.00</span></p>
                                <em class="addGoods"></em>
                            </div>
                        </li>
                        <li>
                            <img src="../assets/placehold.png" class="menu_food_img">
                            <div class="menu_food_description">
                                <p class="goodName">阿尔卑斯水果糖</p>
                                <p class="vendorName">促销包装</p>
                                <p class="specifications">规格：150g/包</p>
                                <p class="goodPrice">￥<span>12.00</span></p>
                                <em class="addGoods"></em>
                            </div>
                        </li>
                    </ul>
                    <div class="buy_cart_container">
                        <span>
                            <em class="cart_icon"></em><a>购物车</a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
export default {
    data () {
        return {
            nav:['常订商品','粮油','乳制品','预定高级水产品','畅销乳酸菌饮料','膨化食品','坚果类','保养品','酒水','儿童小零食'],
            ind:''
        }
    },
    methods:{
        selectmenu(index){
            this.ind = index;
        }
    }
}
</script>
<style>
    .menu_container{
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        position: absolute;
        right: 0;
        left: 0;
        height: 100%;
        padding-top: 0.15rem;
        background:#EBEDF1;
    }
    .food_container{
        width:100%;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
        overflow-y: hidden;
        position: relative;
    }
    .menu_left{
        width: 28%;
        font-size:0.533333rem;
        background:#fff;
        overflow-y:auto;
    }
    .menu_left li{
        box-sizing:border-box;
        padding:0.38rem 0.5rem 0.38rem 0.4rem;
        border-bottom:0.025rem solid #ededed;
        font-size:0.45rem;
    }
    .activity_menu{
        background-color:#EBEDF1;
    }
    .menu_right{
        flex: 4;
        overflow-y: auto;
        margin-left:1.6%;
        background:#fff;
        position: relative;
    }
    .buy_cart_container{position: fixed; bottom: 0; width: 70.4%; left: 29.6%; height: 1.4rem; border-top: 1px solid #D2D7DF; background: #EBEDF1; text-align: right;}
    .cart_icon{width: 0.6rem; height: 0.6rem; background: url("../assets/cart.png") no-repeat 100%/100%; display: inline-block;}
    .buy_cart_container span{margin-right: 0.3rem; margin-top: 0.18rem; display: inline-block; text-align: center;}
    .buy_cart_container a{display: block; font-size: 0.25rem; text-align: center; color: #888DA4;}
    .menu_right ul{
        padding-bottom: 1.5rem;
    }
    .menu_right li{
        border-bottom:1px solid #f8f8f8;
        padding:.4rem .3rem;
        position:relative;
        overflow:hidden;
    }
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
    .addGoods{
        position: absolute;
        right: 0.34rem;
        bottom: 0.46rem;
        width: 0.6rem;
        height: 0.6rem;
        background: url("../assets/icon9.png") no-repeat 100%/100%;
        display: inline-block;
    }
</style>