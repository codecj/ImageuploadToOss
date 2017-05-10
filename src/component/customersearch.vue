<template>
    <div>
        <div class="heards">
            <span><img @click="back()" src="../assets/icon10.png"></span>
            <form @submit.prevent="submit">
                <div class="input-wrap">
                    <div>
                        <input v-focus type="search" :value="keyword" v-model="keyword">
                    </div>
                </div>
            </form>
        </div>
        <div class="content-1" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
            <customerlIst :listDate='listDate' :menuList='menuList'></customerlIst>
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
import customerlIst from './customermanagement.vue';
Vue.use(Lazyload, {
        preLoad: 1.3,
        lazyComponent: true,
        error: require('../assets/holde.png'),
        loading: require('../assets/holde.png'),
        listenEvents: ['scroll']
    })
    // 注册一个全局自定义指令 v-focus
Vue.directive('focus', {
    // 当绑定元素插入到 DOM 中。
    inserted: function(el) {
        // 聚焦元素
        el.focus()
    }
})
export default {
    data() {
            return {
                page: {
                    pageno: "1",
                    pagesize: "20"
                },
                keyword: '',
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
            }
        },
        components: {
            customerlIst
        },
        mounted: function() {

        },
        methods: {
            submit() {
                Indicator.open();
                //          	 this.listDate=[]
                console.log(this.gps.latitude)
                const pargrm = {
                        pagination: JSON.stringify(this.page),
                        "oper": "getShopList",
                        "type": "wqCustomer",
                        para: '{"latitude": "' + this.gps.latitude + '","longitude": "' + this.gps.longitude + '", "keywords":"' + this.keyword + '", "picno": "' + this.picno + '","type": 0}'
                    }
                    //ajax调用
                Request.post(pargrm).then((res) => {
                    console.log(res)
                    Indicator.close();
                    const getData = JSON.parse(res.data.result)
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
                    if (getData.code !== "200") Toast({
                        message: getData.msg,
                        duration: 2000
                    });
                    Indicator.close();
                    console.log(this.listDate.length)
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
                        this.menuList = getData.data.slice(0, 2);
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
                // console.log(this.pageLength+this.listDate)
                this.loading = true;
                this.page.pageno = parseInt(this.page.pageno) + 1
                console.log(this.page)
                    //				            this.submit()　
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
}
</style>
