<template>
    <div class="wrap ">
        <div v-for="(item, index) in listDate" class="listWrap" :key="index">
            <div class="list activeTap borderBottom" @click="tabChose(item)">
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
                <a @click="menuTouchUpInside(menu,item)" class="menu-1 borderRight" v-for="(menu,index) in menuList" :style="{backgroundImage:'url('+ menu.imgSrc+')'}">{{menu.name}}</a>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import Request from "../util/API"
import {
    Toast
} from 'mint-ui'
export default {
    data() {
            return {
                // activeColor: 'red'
            }
        },
        props: {
            listDate: Array,
            menuList: Array
        },
        mounted: function() {},
        methods: {
            tabChose(item) {
                item.whichTab ? this.$set(item, 'whichTab', false) : this.$set(item, 'whichTab', true);
                this.listDate.forEach(items => {
                    if (items.SHOP_CODE != item.SHOP_CODE) this.$set(items, 'whichTab', false)
                })
            },
            menuTouchUpInside(menu, item) {
                if (menu.url == 'lianxi') {
                    this.telbox(item);
                } else {
                    Request.jsBbridge(bridge => {
                        bridge.callHandler(
                            'menuClicked', {
                                menu: menu,
                                shopItem: item
                            }
                        )
                    })
                }
            },
            telbox(item) {
                this.$emit('contactMsg',item);
                if (item.MOBILE != null || item.TEL != null) {
                    this.$set(item, 'telBox', true);
                } else {
                    Toast({
                        message: '暂无联系方式',
                        duration: 2000
                    });
                }
            }
        }
}
</script>
<style scoped>
.shown {
    display: none;
}

.showb {
    display: block;
}

.wrap {
    /*position: static;*/
    width: 100%;
    background-color: #fff
}

.wrap .list {
    display: -webkit-flex;
    width: 100%;
    position: relative;
}

.wrap .list .list-left {
    display: inline-block;
    float: left;
    padding: 41px 21px 43px 32px;
    width: 140px;
    height: 140px;
    overflow: hidden;
}

.wrap .list .list-left img {
    width: 100%;
    height: 100%;
}

.wrap .list .list-mid {
    display: inline-block;
    float: left;
    width: 52%;
    overflow: hidden;
    margin: 4px 0 6px 0;
}

.wrap .list .list-mid img {
    width: 36.8px
}

.wrap .list .list-mid .list-names {
    width: 100%;
    font-size: 30px;
    color: #3B456C;
    letter-spacing: 0;
    line-height: 30px;
    padding: 42px 0px 20px 0px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.wrap .list .list-mid .list-map {
    width: 100%;
    line-height: 50px;
    font-size: 26px;
    color: #9DA2B5;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 182px;
}

.wrap .list .list-mid .list-time {
    font-size: 26px;
    color: #9DA2B5;
    width: 100%;
}

.wrap .list .list-mid .list-map img {
    vertical-align: sub;
    padding-right: 8.2px;
    width: 36.8px
}

.wrap .list .list-right {
    /*position: relative;*/
    /*-webkit-box-flex: 1;*/
    /*padding: 29px 29px;*/
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
    display: flex;
    line-height: 96px;
    display: -webkit-flex;
    /*transition: height 0.5s;
    -webkit-transition: height 0.5s;*/
    overflow: hidden;
}

.wrap .list-menu.show {
    height: 96px;
}

.wrap .list-menu a {
    display: inline-block;
    color: #fff;
    text-align: center;
    width: 25%;
    font-size: 24px;
    height: 64px;
    line-height: 76px;
    margin-top: 15px;
    padding-left: 44px;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
}

.list-menu .menu-1 {
    /*background: url(../assets/icon49.png) no-repeat;*/
    background-size: 30px;
    background-position: 49px 21px;
    background-repeat: no-repeat;
}

.wrap .list-menu a:nth-child(4) {
    border: none;
}


/*.wrap-popup {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
    position: absolute;
    top: 0;
    z-index: 999;
}*/

</style>
