<template>
	<div id="addCar">
        <div class="inner_hide product_show">
            <div class="goodInfo">
                <div class="goodsImg">
                    <img src='../assets/holde.png' height="300" width="300" alt="">
                </div>
                <div>
                    <p>¥1200</p>
                    <p>商品编号:09090909</p>
                    <p>库存:09090</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isHide:true
        }
    },
    mounted: function() {
    },
    methods: {
    }
}
</script>
<style scoped>
html{ background: transparent !important; }
.product_show {
    position: absolute;
    padding-bottom: 0;
    -webkit-transform: translate3d(0,10.666667rem,0);
    transform: translate3d(0,10.666667rem,0);
    -webkit-transition: -webkit-transform .2s cubic-bezier(0,0,.25,1);
    transition: -webkit-transform .2s cubic-bezier(0,0,.25,1);
    transition: transform .2s cubic-bezier(0,0,.25,1);
    transition: transform .2s cubic-bezier(0,0,.25,1),-webkit-transform .2s cubic-bezier(0,0,.25,1);
    bottom: 0;
    width: 100%;
    background-color: #fff;
    height: 1000px;
}
#addCar div.inner_hide {
    z-index: 999;
    position: absolute;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
}
#addCar .goodInfo{
    width: 100%;
    border-bottom: 2px solid #F1F2F7;
    padding: 30px 0 51px 251px;
}
.goodsImg{    
    display: box;
    display: -webkit-box;
    -webkit-box-align: center;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    width: 200px;
    height: 200px;
    position: absolute;
    top: -32px;
    left: 32px;
}
.goodsImg img{ width: 100%; height: auto; }
</style>