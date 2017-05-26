<template>
    <div class="contact">
        <div class="showHide" v-show="phoneItem.telBox"></div>
        <div class="content-popup" v-show="phoneItem.telBox">
            <ul>
                <li class="popup-names"><span>{{phoneItem.SHOP_NAME}}</span><span><img @click="telClose(phoneItem)" src="../assets/icon18.png"></span></li>
                <li @click="mobile(phoneItem.MOBILE)" v-if="phoneItem.MOBILE" class="popup-tel"><a href="javascript:;">{{phoneItem.MOBILE}}<img src="../assets/icon1.png"></a></li>
                <li @click="tel(phoneItem.TEL)" v-if="phoneItem.TEL" class="popup-tel"><a href="javascript:;">{{phoneItem.TEL}}<img src="../assets/icon1.png"></a></li>
            </ul>
        </div>
    </div>
</template>
<script type="text/javascript">
import Request from "../util/API"
export default ({
    name: "contact",
    data() {
        return {
            // cartShow: true
            listH:true
        }
    },
    components: {},
    props: {
        phoneItem: Object,
    },
    methods: {
        telClose(item) {
            this.listH=false
            this.$emit('listSay', this.listH);
        },
        mobile(item) {
            // console.log(item, 1);
            Request.jsBbridge(bridge => {
                bridge.callHandler(
                    'callPhoneClick', {
                        item: item
                    }
                )
            })
        },
        tel(item) {
            // console.log(item, 2);
            Request.jsBbridge(bridge => {
                bridge.callHandler(
                    'callPhoneClick', {
                        item: item
                    }
                )
            })
        }
    }
})
</script>
<style scoped>
.showHide {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 100;
}
.content-popup {
    width: 526px;
    height: auto;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
    top: 50%;
    z-index: 999;
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

.popup-tel:nth-child(2) {
    border-top: 2px solid #F1F2F7
}

.popup-tel:nth-child(3) {
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
