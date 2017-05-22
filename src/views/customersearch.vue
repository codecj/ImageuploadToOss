<template>
    <div>
        <div class="heards">
            <span><img @click="back()" src="../assets/icon10.png"></span>
            <form @submit.prevent="submit">
                <div class="input-wrap">
                    <div>
                        <!--  <input type="text" v-focus="focused" @focus="focused = true" @blur="focused = false"> -->
                        <input type="search" :value="keyword" v-model="keyword" class="" v-focus="abc"></input>
                    </div>
                </div>
            </form>
        </div>
        <div class="content-1" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" v-show="codpng2">
            <customerlIst :listDate='listDate' :menuList='menuList'></customerlIst>
        </div>
        <div class="content-2" v-show="codpng">
            <nosearch></nosearch>
        </div>
    </div>
</template>
<script type="text/javascript">
import {
    Toast,
    Indicator
} from 'mint-ui'
import Vue from 'vue';
import {
    Lazyload
} from 'mint-ui';
import Request from "../util/API";
import customerlIst from '../components/customerManagement.vue';
import nosearch from '../components/nosearch.vue'
Vue.use(Lazyload, {
    preLoad: 1.3,
    lazyComponent: true,
    error: require('../assets/holde.png'),
    loading: require('../assets/holde.png'),
    listenEvents: ['scroll']
})
import {
    focus
} from 'vue-focus';
export default {
    data() {
            return {
                page: {
                    pageno: "0",
                    pagesize: "20"
                },
                abc: true,
                keyword: '',
                codpng: false,
                codpng2: true,
                listDate: [],
                typeD: 0,
                menuList: [],
                gps: {
                    latitude: this.$route.query.latitude,
                    longitude: this.$route.query.longitude
                },
                paragrams: {
                    userName: this.$route.query.userName,
                    menuId: this.$route.query.menuId
                },
                picno: this.$route.query.picno,
                isLoad: false
            }
        },
        components: {
            customerlIst,
            nosearch
        },
        // directives: {
        //     focus: focus
        // },
        mounted: function() {
            // this.autofocus && this.$refs.input.focus();
        },
        methods: {
            submit() {
                this.listDate = []
                this.ajax();
            },
            ajax() {
                Indicator.open();
                const pargrm = {
                        pagination: JSON.stringify(this.page),
                        "oper": "getShopList",
                        "type": "wqCustomer",
                        para: '{"latitude": "' + this.gps.latitude + '","longitude": "' + this.gps.longitude + '", "keywords":"' + this.keyword + '", "picno": "' + this.picno + '","type": 0}'
                    }
                    //ajax调用
                Request.post(pargrm).then((res) => {
                    Indicator.close();
                    const getData = JSON.parse(res.data.result)
                    if (getData.code !== "200" && this.listDate.length==0) {
                        this.codpng = true
                        this.codpng2 = false
                    } else {
                        this.codpng = false
                        this.codpng2 = true
                    }
                    this.isLoad = true
                    console.log(getData.data.shopslist)
                    getData.data.shopslist.forEach(value => {
                        this.listDate.push(value)
                    })
                    this.requestMenus();
                    if (this.listDate.length == getData.pagination.totalcount) {
                        Toast({
                            message: '已经是最后一页啦',
                            duration: 2000
                        })
                        Indicator.close();
                        return
                    }

                    Indicator.close();
                }).catch(function(error) {
                    Indicator.close();
                    if (error.response) {
                        // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                        Toast({
                            //                      message: error.response.status,
                            message: "没有消息",

                            duration: 2000
                        });
                    }
                    //              else {
                    //                  Toast({
                    ////                      message: error.message,
                    //                      message: "没有消息",
                    //                      duration: 2000
                    //                  });
                    //              }
                })
            },
            requestMenus() {
                const pargrmList = {
                    oper: 'findResources',
                    type: 'user',
                    para: JSON.stringify(this.paragrams)
                };
                //ajax调用
                Request.post(pargrmList).then(res => {
                const getData = JSON.parse(res.data.result);
                    if (parseInt(getData.code) != 200) {
                        console.log(getData.msg);
                        Toast({
                            message: getData.msg,
                            duration: 2000
                        });
                    } else {
                        let array = this.sortMenus(getData.data);
                        this.menuList = array.slice(0, 2);
                        this.menuList.push({
                            imgSrc: require('../assets/icon51.png'),
                            name: '联系',
                            url: 'lianxi',
                            urlType: 'N'
                        });
                        this.menuList.push({
                            imgSrc: require('../assets/icon53.png'),
                            name: '更多',
                            url: 'gengduo',
                            urlType: 'N'
                        });
                        var temp = this.menuList[0];
                        if (temp.url == 'xiadan') {
                            temp.imgSrc = require('../assets/icon49.png');
                        } else if (temp.url == 'chexiao') {
                            temp.imgSrc = require('../assets/icon50.png');
                        } else if (temp.url == 'baifang') {
                            temp.imgSrc = require('../assets/icon50.png');
                        }
                        var temp1 = this.menuList[1];
                        if (temp1.url == 'xiadan') {
                            temp1.imgSrc = require('../assets/icon49.png');
                        } else if (temp1.url == 'chexiao') {
                            temp1.imgSrc = require('../assets/icon50.png');
                        } else if (temp1.url == 'baifang') {
                            temp1.imgSrc = require('../assets/icon50.png');
                        }
                        console.log(this.menuList);
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
            },

            loadMore() {
                this.loading = true;
                this.page.pageno = parseInt(this.page.pageno) + 1
                if (this.isLoad) this.ajax()
            },
            back() {
                Request.jsBbridge(bridge => {
                    bridge.callHandler(
                        'popSuperiorClick'
                    )
                })　　
            },
        }
}
</script>
<style scoped>
.heards {
    width: 100%;
    height: 84px;
    background-color: #fff;
    position: absolute;
    top: 0;
}

.heards span img {
    height: 33.6px;
    width: 33.6px;
    float: left;
    padding: 28px 0 27.4px 37px;
}

.heards .input-wrap {
    border: 0;
    float: left;
}

.heards .input-wrap div {}

.heards .input-wrap input {
    border: none;
    background-color: #EBECF0;
    width: 490px;
    height: 62px;
    margin-left: 24px;
    font-size: 30px;
    color: #3B456C;
    line-height: 62px
}

.heards .input-wrap div {
    float: left;
    width: 548px;
    height: 62px;
    background-color: #EBECF0;
    margin-top: 11px;
    margin-left: 41.4px
}

.heards .input-wrap img {
    width: 20.4px;
    line-height: 62px
}

.content-1 {
    width: 100%;
    position: absolute;
    top: 84px;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    bottom: 0;
    /*display: none;*/
}
</style>
