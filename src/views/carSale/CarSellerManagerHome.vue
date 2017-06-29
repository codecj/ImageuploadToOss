<template>
    <div id="carSellerManagerHome" :style='{height:elmHeight}'>
        <!-- 内容 -->
        <div class="content">
            <div class="header">
                <img class="left-btn" src="../../assets/icon10.png" @click="backToNative"></img>
                <form @submit.prevent="submit">
                    <input class="header-search" id="search" placeholder="请输入关键字搜索商品" type="search" :value="keyword" v-model="keyword">
                </form>
                <img class='header-glass' src="../../assets/icon20.png" height="20" width="20"></img>
                <img class="right-btn" src="../../assets/add.png" height="30" width="30" @click="showToolBox"></img>
            </div>
            <div class="tab-bar">
                <div class="tab-bar-left" @click="switchToMyStorage"><span :class="{tabActive :myStorageActive}">我的库存</span></div>
                <div class="tab-bar-right" @click="switchToWaitCar"><span :class="{tabActive :waitCarActive}">待装车</span></div>
            </div>
            <div class="content">
                <my-storage-content v-show="myStorageActive" :myStorageData="myStorageData" @toDepot="jumpToDepot"></my-storage-content>
                <wait-car-content v-show="waitCarActive" :waitCarData="waitCarData" v-on:deleteRemoteItem="deleteRemoteItem" v-on:clickEdit="edit"></wait-car-content>
            </div>
        </div>
        <div class="tool-box" v-show="boxShowStatus" @click="showToolBox">
            <ul>
                <!-- @click="addGoods" -->
                <li @click="addGoods">添加商品</li>
                <li @click="returnCar">退货回车</li>
            </ul>
        </div>
        <add-stkc-view v-show="addStkcShow" :baseStkc="stkcItemData" @cancelAddStkcView="reloadData" @submitStkc="submitStkc"></add-stkc-view>
    </div>
</template>

<script>
import Request from "../../util/API";
import MyStorageContent from "../../components/carSale/MyStorageContent.vue"
import WaitCarContent from "../../components/carSale/WaitCarContent.vue"
import AddStkcView from "../../components/carSale/AddStkcView.vue"
import {
    Toast,
    Indicator,
    Lazyload,
    Loadmore
} from 'mint-ui'
import storageJson from "./storage.json"

export default {
    name: 'page-navbar',
    components: {
        MyStorageContent,
        WaitCarContent,
        AddStkcView
    },
    data() {
        return {
            myStorageActive: true,
            waitCarActive: false,
            boxShowStatus: false,
            addStkcShow: false,
            stkcItemData: {},
            elmHeight: '100px',
            keyword: '',
            waitCarData: '',
            myStorageData: '',
            username: this.$route.query.username, // 业务员name
            userno: this.$route.query.userno, // 业务员No
            vusername: this.$route.query.vusername, // 供应商名称
            name: this.$route.query.name, // 登录昵称
            vnickname: this.$route.query.vnickname, // 供应商昵称
            truckType: 'S',
            storageStatus: 'A', // 待装车
            whc:'',
            addStckParam:{
                username:this.$route.query.username,
                vname:this.$route.query.vusername,
                name:this.$route.query.name,
                userno:this.$route.query.userno,
                item:null,
                truckType:'S',
                whc:''
            },
            getStorageParam:{
                userno:this.$route.query.userno,
                vusername:this.$route.query.vusername,
                username:this.$route.query.username
            },
            deleteRemoteItemParam:{
                userno:this.$route.query.userno,
                stkcs:'',
                username:this.$route.query.username,
                truckType:'S'
            }
        };
    },
    created() {
        this.getElementH();
        this.getStorageList();
        this.getListData();
    },
    methods: {
        getStorageList(){ // 获取仓库列表
            var _this = this;
            Indicator.open();
            let pargrmList = {
                oper: 'getVendorwhcFour',
                type: 'truck',
                para: JSON.stringify(this.getStorageParam)
            };
            Request.post(pargrmList).then(function(response) {
                Indicator.close();
                var resData = JSON.parse(response.data.result).data;
                if (resData.length != 0) {
                    _this.whc = resData[0].WH_C; 
                    _this.addStckParam.whc = resData[0].WH_C;
                }
            }).catch(function(error) {
                Indicator.close();
                if (error.response) {
                    // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                    console.log(error.response.status);
                    Toast({
                        message: error.response.status,
                        duration: 2000
                    });
                } else {
                    console.log('Error', error.message);
                    Toast({
                        message: error.message,
                        duration: 2000
                    });
                }
            })
        },
        getListData() { // 获取我的仓库列表信息
            Indicator.open();
            if (this.myStorageActive == false) { // 待装车
                this.storageStatus = 'A'
            } else { // 我的仓库
                this.storageStatus = 'B'
            }
            var _this = this;

            let pargrmList = {
                oper: 'getTruckListFour',
                type: 'truck',
                para: '{"username":"' + _this.username + '","key":"' + _this.keyword + '","vusername":"' + _this.vusername + '","truckType":"' + this.truckType + '","storageStatus":"' + _this.storageStatus + '"}'
            };
            Request.post(pargrmList).then(function(response) {
                Indicator.close();
                var resData = JSON.parse(response.data.result);
                if (_this.myStorageActive) {
                    _this.myStorageData = resData.data;
                } else {
                    _this.waitCarData = resData.data;
                }
            }).catch(function(error) {
                Indicator.close();
                if (error.response) {
                    // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                    Toast({
                        message: error.response.status,
                        duration: 2000
                    });
                } else {
                    Toast({
                        message: error.message,
                        duration: 2000
                    });
                }
            })
        },
        deleteRemoteItem(index) { // 删除
            var storageItemData = this.myStorageData[index];
            Indicator.open();
            var _this = this;
            this.deleteRemoteItemParam.stkcs = storageItemData.BASE_STK_C;
            let pargrmList = {
                oper: 'delTruckIoItem',
                type: 'truck',
                para: JSON.stringify(this.deleteRemoteItemParam)
            };
            Request.post(pargrmList).then(function(response) {
                Indicator.close();
                alert('1');
                const getData = JSON.parse(response.data.result);
                if (parseInt(getData.code) != 200) {
                    Toast({
                        message: getData.msg,
                        duration: 2000
                    });
                } else {
                    Toast({
                        message: '删除成功',
                        duration: 2000
                    });
                    _this.getListData();
                }
            }).catch(function(error) {
                Indicator.close();
                if (error.response) {
                    // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                    Toast({
                        message: error.response.status,
                        duration: 2000
                    });
                } else {
                    Toast({
                        message: error.message,
                        duration: 2000
                    });
                }
            })
        },
        jumpToDepot() {
            this.$router.push({
                path: 'backdepot',
                query: {
                    username: this.username,
                    userno: this.userno,
                    vusername: this.vusername
                }
            })
        },
        switchToMyStorage() { // 切换至我的仓库
            this.myStorageActive = true;
            this.waitCarActive = false;
            this.getListData();
        },
        switchToWaitCar() { // 切换至待装车
            this.myStorageActive = false;
            this.waitCarActive = true;
            this.getListData();
        },
        getElementH() { // 获取屏幕的高度
            var deviceH = document.documentElement.clientHeight;
            this.$data.elmHeight = deviceH + 'px';
        },
        showToolBox() { // 展示右上角的工具条
            this.$data.boxShowStatus = !this.$data.boxShowStatus;
        },
        addGoods() { //alert("添加商品");
            this.$router.push({
                path: 'selectTrunckGoods',
                query: {
                    username: this.username,
                    userno: this.userno,
                    name: this.name,
                    vusername: this.vusername
                },
            });
        },
        edit(item) { // 编辑商品
            console.log(item);
            for (let i = 0; i < item.MODLE_LIST.length; i++) {
                let temp = item.MODLE_LIST[i];
                this.$set(temp, 'qty', temp.STK_QTY);
            }
            this.stkcItemData = item;
            this.addStkcShow = true;
        },
        returnCar() { //alert("退货回车");
            this.$router.push({
                path: 'goodgocar',
                query: {
                    username: this.username,
                    userno: this.userno
                },
            });
        },
        backToNative() {
            Request.jsBbridge(bridge => {
                bridge.callHandler(
                    'navBack'
                )
            })
        },
        submit() { // 搜索
            document.getElementById("search").blur()
            this.getListData();
        },
        reloadData() { //修改规格点击空白
            this.addStkcShow = false;
        },
        submitStkc(baseStkc) {
            this.addStkcShow = false;
            let itemList = [];
            for (let i = 0; i < baseStkc.MODLE_LIST.length; i++) {
                let temp = baseStkc.MODLE_LIST[i];
                if (temp.qty > 0) {
                    let model = {};
                    model.vendorname = baseStkc.VENDOR_USER_NAME;
                    model.stkc = temp.STK_C;
                    model.cpmode = temp.CP_MODE;
                    model.stkname = temp.NAME;
                    model.urladdr = temp.URL_ADDR;
                    model.pluc = temp.PLU_CODE;
                    model.stkmodel = temp.MODLE;
                    model.qty = temp.qty + '';
                    itemList.push(model);
                }
            }
            if (itemList.length == 0) {
                Toast({
                    message: '添加商品数量不能为空',
                    duration: 2000
                });
                return;
            }
            this.addStckParam.item = JSON.stringify(itemList);
            console.log(this.addStckParam);

            let pargrmList = {
                oper: 'upTruckIoItem',
                type: 'truck',
                para: JSON.stringify(this.addStckParam)
            };
            //ajax调用
            Request.post(pargrmList).then(res => {
                const getData = JSON.parse(res.data.result);

                if (parseInt(getData.code) != 200) {
                    // console.log(getData.msg);
                    Toast({
                        message: getData.msg,
                        duration: 2000
                    });
                } else {
                    Toast({
                        message: '添加商品到待装车成功',
                        duration: 2000
                    });
                    this.getListData();
                }

            }).catch(error => {
                if (error.response) {
                    // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                    Toast({
                        message: error.response.status,
                        duration: 2000
                    });
                }
            })
        }
    }
};
</script>

<style scoped>
#carSellerManagerHome {
    position: relative;
    top: 0;
    left: 0;
    bottom: 0;
    background-color: rgb(237, 238, 245);
}

.header {
    height: 120px;
    background-color: white;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 10;
}

.header .left-btn {
    margin: 50px 0 0 15px;
    width: 62px;
    height: 62px;
}

.header .header-glass {
    position: absolute;
    left: 105px;
    top: 60px;
}

.header .right-btn {
    width: 62px;
    height: 62px;
    position: absolute;
    top: 50px;
    right: 3%;
}

.header form {
    position: absolute;
    top: 50px;
    left: 13%;
    height: 62px;
    right: 13%;
}

.header .header-search {
    width: 100%;
    height: 62px;
    border: none;
    background-color: #EBECF0;
    padding-left: 80px;
    color: #9DA2B5;
    font-size: 26px;
    position: absolute;
    top: 0;
}

.tab-bar {
    position: fixed;
    left: 0;
    top: 120px;
    background-color: white;
    width: 100%;
    height: 99px;
    color: #9DA2B5;
    z-index: 10;
}

.tab-bar > div {
    height: 96px;
    width: 50%;
    float: left;
    text-align: center;
    line-height: 96px;
    font-size: 30px;
}

.tab-bar > div > span {
    line-height: 96px;
    height: 96px;
    display: block;
    width: 40%;
    margin: 0 auto;
}

.tabActive {
    color: #3B456C;
    border-bottom: 3px solid #FF783C;
}

.content {
    position: absolute;
    top: 120px;
    width: 100%;
    left: 0;
}

/*工具条*/
.tool-box {
    width: 100%;
    background-color: rgba(0, 0, 0, 0);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    height: 2000px;
    z-index: 20;
}

.tool-box ul {
    position: absolute;
    top: 128px;
    right: 32px;
    opacity: 0.9;
    background: #333333;
    border-radius: 4px;
    width: 240px;
    height: 200px;
    text-align: center;
}

.tool-box ul li {
    height: 100px;
    line-height: 100px;
    font-size: 30px;
    color: #FFFFFF;
    border-bottom: 2px solid #fff;
}

</style>
