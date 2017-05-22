
<template>
    <div id="prodDetail">
        <header>
            <router-link :to="'/'" class="back">
                <img src="../assets/icon10.png" alt="">
            </router-link>
            <div class="detailTitle">
                <span class="active">商品</span>
                <span>详情</span>
                <span>评价</span>
            </div>
          

        </header>
        <div class="contents">
             <div class="swiper-container">     
                 <div class="swiper-wrapper">
                    <div class="swiper-slide"><img src="../assets/item02.jpg" alt=""></div>
                    <div class="swiper-slide"><img src="../assets/item03.jpg" alt=""></div>
                 </div>
                <div class="swiper-pagination"></div>
             </div>
             <div class="prodInfo">
                <div class="prodName">熊孩子 蔬果干235g综合蔬菜干水果干小 水果干小果蔬干 水果干小吃</div>
                <div>价格<span class="price">￥20.00</span></div>
                <div>快递<span>￥6.00</span><span>月销售200件</span></div>
             </div>
             <div>
                 <p>可能喜欢</p>
                 <div class="mayLike">
                     <oneprod></oneprod>
                 </div>
             </div>            
        </div>
        <footer>
            <span>收藏</span>
            <span>购物车</span>
            <span>加入购物车</span>
            <span>立即购买</span>
        </footer>

        <!-- <bigImg></bigImg> -->
    </div>
   
</template>

<script>
    import Swiper from "../static/js/idangerous.swiper.min.js"
    import  "../static/css/idangerous.swiper.css"
    import oneprod from "../components/oneProdList.vue"
 

    export default {
        name:'prodDetail',
        components:{
            oneprod
            // bigImg
        },
        mounted() {
            var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                paginationClickable: true,
                // paginationHide :false,
                loop: true,
                autoplay: 3000,
                paginationType : 'fraction',
                onTouchEnd: function() {
                    swiper.startAutoplay()
                }
            });
        }
    }
</script>

<style scoped>
    .swiper-container {
        width:100%;
        height:700px;
        background:#f3f3f3;
    }

    .swiper-pagination{
        position: absolute;
        width:100%;
        bottom:12px;
        text-align:center;
    } 
     .swiper-container .swiper-slide img{
        width:100%;
        height:650px;
    }


    header{
        width:100%;
        height:88px;
        line-height:88px;
        border-bottom:1px solid #f3f3f3;
        position: fixed;
        top:0;
        left:0;
        z-index:10;
        background:#fff;
    }
    header .back{
        width:104px;
        height:88px;
        float:left;
        text-align: center;
    }
    header img{
        width:60px;
        height:60px;
        margin-top:14px;
    }
    .contents{
        position: relative;
        top:89px;
        bottom:88px;
        left:0;
        overflow: auto;
        padding-bottom:100px;
        /*background:#f3f3f3;*/
    }
    .detailTitle{
        float:left;
    }
    .detailTitle span{
        font-size:26px;
        display: inline-block;
        width:210px;
        text-align: center;
    }
    .prodInfo{
        /*width:100%;*/
        height:200px;
        padding:20px;
        border-bottom:10px solid #f3f3f3;
    }
    .prodName{
        font-size:30px;
        height:80px;
        overflow:hidden;
    }
    .prodInfo div:nth-child(2){
        height:80px;
        line-height: 80px;
    }
    .prodInfo div:nth-child(3) span{
        margin-right:60px;
     }
    .price{
        font-size:40px;
        color:#f00;
    }
    .mayLike{
        height:340px;
        overflow:hidden;
    }
    .active{
        color:#f00;
    }
    footer{
        height:88px;
        position: fixed;
        bottom:0;
        left:0;
        width:100%;
        display:flex;
        background:#fff;
        line-height:88px;
        border-top:10px solid #f3f3f3;
    }
    footer span{
        flex:1;
        text-align: center;
        /*padding-top:10px;*/
    }
    footer span:nth-child(4){
        background:#f00;
        color:#fff;
    }
    footer span:nth-child(3){
        background:#eeb174;
        color:#fff;
    }
</style>