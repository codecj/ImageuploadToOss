<template>
	<div id="addCar">
        <div class="inner_hide product_show">
            <div class="goodInfo">
                <div v-show="imgShow" class="goodsImg">
                    <img src='../assets/holde.png' height="300" width="300" alt="">
                </div>
                <div class="goodsMsg">
                    <p>¥12<span>.00</span></p>
                    <p>商品编号:09090909</p>
                    <p>库存:09090</p>
                </div>
                <img class="close" src="../assets/icon18.png" alt="">
            </div>
            <div class="overscroll"> 
                <p @click="goActive()" class="activity activeTap">
                    该商品正在参与活动,查看活动信息
                    <img src="../assets/icon17.png" alt="">
                </p>
                <ul class="goodsSku">
                    <p>规格</p>
                    <li class="active">包(1*1)袋</li>
                    <li>包(1*1)袋</li>
                    <li>包(1*1)袋</li>
                </ul>
                <div class="goodsNum">
                    <p>购买数量</p>
                    <ul>
                        <li><img src="../assets/icon3.png" alt=""></li>
                        <li>1</li>
                        <li><img src="../assets/icon5.png" alt=""></li> 
                    </ul>
                </div>    
            </div>
            <div class="addBtn">加入购物车</div>
        </div>
        <transition tag="div" :name="transitionName">
            <div class="activeList">
                <span @click="goBack()">返回</span>
            </div>
        </transition>
    </div>
</template>
<script>
export default {
    data() {
        return {
            imgShow:true,
            isHide:true,
            transitionName: ''
        }
    },
    mounted: function() {
    },
    methods: {
        goBack(){
            this.transitionName = 'slide-right'
            this.imgShow=true;
        },
        goActive(){
            this.transitionName = 'slide-left'
            this.imgShow=false;
        }
    }
}
</script>
.overscroll{}
<style scoped>
html{ background: transparent !important; }
.slide-left-enter,
.slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(375px, 0);
    transform: translate(375px, 0);
}

.slide-left-leave-active,
.slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-375px, 0);
    transform: translate(-375px, 0);
}
.overscroll{ position: absolute; width: 100%; top: 216px; bottom: 98px; }
.activeList{ position: absolute; bottom: 0;width: 100%;
    background-color: #fff;
    height: 1000px; z-index: 10;}
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
    z-index: 9;
    position: absolute;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
}
#addCar .goodInfo{
    width: 100%;
    border-bottom: 2px solid #F1F2F7;
    /*padding: 30px 0 51px 251px;*/
    height: 216px;
    position: relative;
}
#addCar .goodsImg{    
    display: box;
    display: -webkit-box;
    -webkit-box-align: center;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    width: 200px;
    height: 200px;
    position: absolute;
    bottom: 48px;
    left: 32px;
}
#addCar .goodsImg img{ width: 100%; height: auto; }
#addCar .goodsMsg {overflow: hidden;}
#addCar .goodsMsg p{ padding-left: 261px;line-height: 1.2;}
#addCar .goodsMsg p:nth-of-type(1){ margin-top: 24px; font-size: 48px; color: #FF783C; }
#addCar .goodsMsg p:nth-of-type(1) span{ font-size: 24px; }
#addCar .goodsMsg p:nth-of-type(2),.goodsMsg p:nth-of-type(3){ font-size: 22px; color: #9DA2B5; margin-top: 12px; }
.goodsMsg p:nth-of-type(3).none{ color: #9DA2B5; }
.goodsMsg p:nth-of-type(3){color: #3B456C;}
#addCar .close{ width: 40px; position: absolute; top: 30px; right: 30px; }
#addCar .goodsSku{ padding: 41px 36px 24px 36px; border-bottom: 2px solid #F1F2F7; overflow: hidden; }
#addCar .goodsSku p{margin-bottom: 42px; font-size: 30px; color: #3B456C;}
#addCar .goodsSku li{ padding: 5px 28px; font-size: 22px; background: #F1F2F7; color: #343657; float: left; margin: 0 24px 24px 0; }
#addCar .goodsSku li.active{ color: #fff; background:#FF783C;  }
#addCar .goodsNum{ padding: 36px 34px; overflow: hidden; border-bottom: 2px solid #F1F2F7; }
#addCar .goodsNum p{ font-size: 30px; float: left; line-height: 48px; color: #343657; }
#addCar .goodsNum ul{ float: right; }
#addCar .goodsNum li{ float: left;  }
#addCar .goodsNum li:nth-of-type(2){ color: #343657; font-size: 26px; width: 100px; text-align: center; line-height: 48px;}
#addCar .goodsNum li img{ width: 48px; display: block }
#addCar .addBtn{ position: absolute;bottom: 0; width: 100%; height: 98px; line-height: 98px; text-align: center;background-image: linear-gradient(3deg, #FF8739 0%, #FF4848 100%); background-image: -webkit-linear-gradient(3deg, #FF8739 0%, #FF4848 100%); font-size: 30px; color: #fff;}
.activity{ height: 110px; line-height: 110px; font-size: 26px; color: #FF783C; border-bottom: 2px solid #F1F2F7; padding-left: 38px;}
.activity img{ width: 30px; float: right; margin-right: 30px; margin-top: 40px;}
</style>