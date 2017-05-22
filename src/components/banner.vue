
<template>
    <div class="swiper-container">
           <!--  <div class="swiper-slide" v-for="str in listImg" :style="{ backgroundImage: 'url(' + str.url + ')' }"></div> -->      
        <div class="swiper-wrapper">
            <div class="swiper-slide"><img src="../assets/banner1.png" alt=""></div>
            <div class="swiper-slide"><img src="../assets/banner4.png" alt=""></div>
            <div class="swiper-slide"><img src="../assets/banner2.png" alt=""></div>
            <div class="swiper-slide"><img src="../assets/banner3.png" alt=""></div>
            <div class="swiper-slide"><img src="../assets/banner5.png" alt=""></div>
            <div class="swiper-slide"><img src="../assets/banner6.png" alt=""></div>

        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
    </div>
</template>

<script>
    import Swiper from "../static/js/idangerous.swiper.min.js"
    import  "../static/css/idangerous.swiper.css"
    export default {
        // props: ['listImg'],
        mounted() {
            var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                paginationClickable: true,
                paginationHide :false,
                loop: true,
                // speed: 3000,
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
        height:200px;
    }
/*    .big-swiper-container img{
        height:500px;
    }*/
    .swiper-pagination{
        position: absolute;
        width:100%;
        bottom:12px;
        text-align:center;
    } 
    .swiper-slide img{
        width:100%;
        height:200px;
    }
</style>