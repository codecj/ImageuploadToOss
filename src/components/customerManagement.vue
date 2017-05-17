<template>
    <div class="wrap ">
        <div v-for="(item, index) in listDate" class="listWrap" :key="index">
            <div class="list activeTap" @click="tabChose(item)">
                <div class="list-left"><img v-lazy="item.SHOP_IMAGE"></div>
                <div class="list-mid">
                    <div class="list-names">{{item.SHOP_NAME}}</div>
                    <div class="list-map"><img src="../assets/icon12.png">{{item.ADDRESS}}</div>
                    <div class="list-time">{{item.ORDERINFOR}}</div>
                </div>
                <div class="list-right">
                    <span>{{item.DISTANCE}}km</span>
                </div>
            </div>
            <div :class="{'list-menu show':item.whichTab,'list-menu':!item.whichTab}">
                <a @click="menuTouchUpInside(menu,item)" class="menu-1" v-for="(menu,index) in menuList" :style="{backgroundImage:'url('+ menu.imgSrc+')'}">{{menu.name}}</a>
               <!--  <a class="menu-1">下单</a>
                <a class="menu-2">车销</a>
                <a class="menu-3" @click="telbox(item)">联系</a>
                <a class="menu-4">更多</a> -->
            </div>
            <div class="wrap-popup" v-show="item.telBox">
                <div class="content-popup">
                    <ul>
                        <li class="popup-names"><span>{{item.SHOP_NAME}}</span><span><img @click="telClose(item)" src="../assets/icon18.png"></span></li>
                        <li @click="mobile(item.MOBILE)" v-if="item.MOBILE" class="popup-tel"><a href="javascript:;">{{item.MOBILE}}<img src="../assets/icon1.png"></a></li>
                        <li @click="tel(item.TEL)" v-if="item.TEL" class="popup-tel"><a href="javascript:;">{{item.TEL}}<img src="../assets/icon1.png"></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import Request from "../util/API"
export default {
    data() {
            return {
                isHide:true,
                activeColor: 'red'
            }
        },
        props: {
            listDate:Array,
            menuList:Array
        },
        mounted: function() {
        },
        methods: {
            telClose(item){
                this.isHide=false
                this.$emit('listSay',this.isHide);
                item.telBox=!item.telBox
            },
            tabChose(item) {
                item.whichTab ? this.$set(item, 'whichTab', false):this.$set(item, 'whichTab', true);
            	this.listDate.forEach(items => {
                    if(items.SHOP_CODE!=item.SHOP_CODE ) this.$set(items, 'whichTab', false)
                })
            },
            menuTouchUpInside(menu,item){
                if (menu.url=='lianxi'){
                    this.telbox(item);
                }else{
                    Request.jsBbridge(bridge=> {
                        bridge.callHandler(
                            'menuClicked',
                            {menu:menu,shopItem:item}
                        )
                    })
                }
            },
            telbox(item) {
                this.isHide=true
                this.$emit('listSay',this.isHide);
                this.listDate.forEach((item) => {
                    this.$set(item, 'telBox', false);
                })
                this.$set(item, 'telBox', true);
            },
               mobile(item){
                console.log(item,1);
                Request.jsBbridge(bridge=> {
                    bridge.callHandler(
                        'callPhoneClick',
                        {item:item}
                    )
                })
            },
            tel(item){
                console.log(item,2);
                Request.jsBbridge(bridge=> {
                    bridge.callHandler(
                        'callPhoneClick',
                        {item:item}
                    )
                })
            }

        }
}
</script>
<style scoped>
.shown{ display: none; }
.showb{ display: block; }
.wrap {
    width: 100%;
    background-color: #fff
}

.wrap .list {
    display: flex;
    width: 100%;
    border-bottom: 0.026667rem solid #F1F2F7;
}

.wrap .list .list-left {
    display: inline-block;
    padding: 41px 21px 43px 32px;
    width: 140px;
    height: 140px
}

.wrap .list .list-left img {
    width: 140px;
    height: 140px
}

.wrap .list .list-mid {
    flex-grow: 1;
    overflow: hidden;
}

.wrap .list .list-mid img {
    width: 36.8px
}

.wrap .list .list-mid .list-names {
    font-size: 30px;
    color: #3B456C;
    letter-spacing: 0;
    line-height: 30px;
    padding: 42px 182px 20px 0px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.wrap .list .list-mid .list-map {
    line-height: 50px;
    font-size: 26px;
    color: #9DA2B5;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 2.8rem;
}

.wrap .list .list-mid .list-time {
    font-size: 26px;
    color: #9DA2B5;
}

.wrap .list .list-mid .list-map img {
    vertical-align: sub;
    padding-right: 8.2px;
    width: 36.8px
}

.wrap .list .list-right {
	position: relative;
    -webkit-box-flex: 1;
    padding: 29px 29px;
}

.wrap .list .list-right span {
    font-size: 22px;
    color: #9DA2B5;
    position: absolute;
    top: 29px;
    right: 29px;
}

.wrap .list-menu {
    clear: both;
    background-color: #4D5679;
    height: 0;
    line-height: 96px;
    display: flex;
    transition: height 0.5s;
    -webkit-transition: height 0.5s;
    overflow: hidden;
}
.wrap .list-menu.show {
    height: 96px;
}
.wrap .list-menu a {
    color: #fff;
    text-align: center;
    width: 25%;
    font-size: 24px;
    height: 64px;
    line-height: 76px;
    margin-top: 15px;
    padding-left: 44px
}

.wrap .list-menu a:nth-child(2) {
    border-right: 2px solid rgba(255, 255, 255, 0.5);
    border-left: 2px solid rgba(255, 255, 255, 0.5);
}

.list-menu .menu-1 {
    /*background: url(../assets/icon49.png) no-repeat;*/
    background-size: 30px;
    background-position: 49px 21px;
    background-repeat: no-repeat;
}

.wrap .list-menu a:nth-child(3) {
    border-right: 2px solid rgba(255, 255, 255, 0.5)
}

.wrap-popup {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    position: fixed;
    z-index: 99;
    top: 0
}

.wrap-popup .content-popup {
    width: 526px;
    height: auto;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
    top: 50%;
}

.popup-names {
    line-height: 94px;
    text-align: center;
    color: #3B456C;
    font-size: 36px
}

.popup-names img {
    width: 30px;
    float: right;
    margin: 31px 31px;
    position: absolute;
    right: 0;
}

.popup-tel img {
    width: 40px;
    float: right;
    margin: 32px 32px;
}

.popup-tel {
    line-height: 111px;
}
.popup-tel:nth-child(2){
    border-top: 2px solid #F1F2F7
}
.popup-tel:nth-child(3){
    border-top: 2px solid #F1F2F7
}
.popup-tel a {
    display: block;
    overflow: hidden;
    padding-left: 32px;
    font-size: 30px;
    color: #3B456C;
}
</style>
