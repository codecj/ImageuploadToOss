<template>
    <div id="prods">
        <div class="menu_container">
            <div class="food_container">
                <div class="menu_left">
                    <ul>
                        <li @click="selectmenu('-1',0)" :class="{'activity_menu':ind === 0}">常订商品</li>
                        <li v-for="(navs,index) in nav" @click="selectmenu(navs.CAT_C,index+1)" :class="{'activity_menu':ind === index+1}">{{navs.NAME|subStringMax8}}</li>
                    </ul>
                </div>
                <div class="menu_right" id="oneprodsparent">
                    <ul id="oneprods" class="changeItem" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="40">
                        <oneprod v-for="item in this.prodList" :item="item" :key="item.STK_NAME_EXT"></oneprod>
                        <!--<li>-->
                            <!--<img src="../assets/placehold.png" class="menu_food_img">-->
                            <!--<div class="menu_food_description">-->
                                <!--<p class="goodName">阿尔卑斯水果糖阿尔卑斯水果糖阿尔卑斯水果糖阿尔卑斯水果糖阿尔卑斯水果糖阿尔卑斯水果糖阿尔卑斯水果糖</p>-->
                                <!--<p class="vendorName">促销包装促销包装促销包装促销包装促销包装促销包装促销包装</p>-->
                                <!--<p class="specifications">规格：150g/包</p>-->
                                <!--<p class="goodPrice">￥<span>12.00</span></p>-->
                                <!--<em class="addGoods"></em>-->
                            <!--</div>-->
                        <!--</li>-->
                        <getbottom v-show="show"></getbottom>
                    </ul>
                </div>
                <div class="buy_cart_container">
                    <shopcart style="position: relative;"></shopcart>
                    <p>
                        <img src="../assets/icon54.png" alt="" id="scrolltop" @click="scrollTop">
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
import Vue from 'vue'
import oneprod from "../components/leftOneProd.vue"
import shopcart from "../components/shopcart.vue"
import getbottom from "../components/getbottom.vue"
import Request from "../util/API"
import { Lazyload } from 'mint-ui'
import { Toast,Indicator } from 'mint-ui'
// 懒加载效果
Vue.use(Lazyload, {
    preLoad: 1.3,
    error: require('../assets/holde.png'),
    loading: require('../assets/holde.png'),
    attempt: 1
})
export default {
    name:"prods",
    data () {
        return {
            nav:[],
            ind:0,
            show: false,
            load :false,
            pagram:{
                username:this.$route.query.username,
                spuserno:this.$route.query.spuserno,
                spusername:this.$route.query.spusername,
                areaid:this.$route.query.areaid,
                vendorusername:this.$route.query.vendorusername,
                vendorcode:this.$route.query.vendorcode,
                userno:this.$route.query.userno,
                catidl3list:this.$route.query.catidl3list,
                catidl2 :this.$route.query.catidl2,
                // atp :this.$route.query.atp,
                brandclist :this.$route.query.brandclist,
                // catidl2:this.$route.query.catidl2list,
                keyword:this.$route.query.keyword,
                oldcode:this.$route.query.oldcode,
                vendorCatId:''//默认打开请求常订商品
            },
            prodList:[],
            page:{
                pageno:"1",
                pagesize:"20",
                orderby: "ZH",
                asc: true
            },
            pageSize:'',
            timer:null
        }
    },
    components: {
        // proLists,
        shopcart,
        getbottom,
        oneprod
    },
    methods:{
        selectmenu(CAT_C,index){
            if(this.ind!=index){
                console.log(CAT_C);
                this.page.pageno=1;
                this.prodList = [];
                this.show = false;
                this.ind = index;
                this.pagram.vendorCatId=CAT_C;
                this.ajax();
            }
        },
        ajax(num) {
            Indicator.open();
            const pargrmList = {
                pagination: JSON.stringify(this.page),
                oper: 'getWqSearchApp',
                type: 'wqProduct',
                para: JSON.stringify(this.pagram)
            }

            Request.post(pargrmList).then(res=>{
                let getData = JSON.parse(res.data.result);
                if(num==-1){
                    getData.data.vendorCats.forEach(value=> {
                        this.nav.push(value)
                    });
                }else{
                    this.pageSize = getData.pagination.totalcount;
                    getData.data.product.forEach(value=> {
                        this.prodList.push(value)
                    });
                    if(this.prodList.length==getData.pagination.totalcount) {
                        this.load=true;
                        this.show = true;
                        Indicator.close();
                        return
                    }
                }
                if(getData.code!=="200") Toast({ message: getData.msg, duration: 2000 });
                Indicator.close();
            }).catch(error=>{
                Indicator.close();
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
            if(this.prodList.length==this.pageSize) return
            if(this.prodList!=''){
                this.loading = true;
                this.page.pageno=parseInt(this.page.pageno)+1;
                this.ajax();
            }
        },
        onScroll() {
            this.scrolled=document.getElementById("oneprodsparent").scrollTop;
            let scrolltop = document.getElementById('scrolltop');
            if(this.scrolled>10){
                scrolltop.style.display = 'block';
            }else{
                scrolltop.style.display = 'none';
            }
            if(this.scrolled==0){
                clearInterval(this.timer);
            }

        },
        scrollTop() {
            let scrolltop = document.getElementById('oneprodsparent');
            this.timer = setInterval(function(){
                var osTop = scrolltop.scrollTop;
                var speed = Math.floor(-osTop / 3);
                scrolltop.scrollTop = osTop + speed;
                if(osTop == 0){
                    clearInterval(this.timer);
                }
            },50);
        }
    },
    mounted() {
        this.ajax(-1);//请求分类
        this.pagram.vendorCatId='-1';
        this.ajax();//请求常订商品
        var scroll = document.getElementById("oneprodsparent");
        scroll.addEventListener('scroll', this.onScroll);
    }
}
</script>
<style>
    .menu_container{
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        position: absolute;
        right: 0;
        left: 0;
        height: 100%;
        padding-top: 0.15rem;
        background:#EBEDF1;
    }
    .food_container{
        width:100%;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
        overflow-y: hidden;
        position: relative;
    }
    .menu_left{
        width: 28%;
        font-size:0.533333rem;
        background:#fff;
        overflow-y:auto;
    }
    .menu_left li{
        box-sizing:border-box;
        padding:0.38rem 0.5rem 0.38rem 0.4rem;
        border-bottom:0.025rem solid #ededed;
        font-size:0.45rem;
    }
    .activity_menu{
        background-color:#EBEDF1;
    }
    .menu_right{
        flex: 4;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        margin-left:1.6%;
        background:#fff;
        -webkit-overflow-scrolling: touch;
        position: relative;
    }
    .buy_cart_container{position: fixed; bottom: 0; width: 70.4%; left: 29.6%; height: 1.4rem; text-align: right;}
    .buy_cart_container p {
        position: relative;
        width: 112px;
        height: 112px;
        display: inline-block;
        float: right;
        text-align: center;
    }

    .buy_cart_container img {
        display: inline-block;
        width: 112px;
        height: 112px;
        float: right;
        margin: 0px 20px 15px 0;
    }
    #scrolltop {
        display: none;
    }
    .menu_right ul{
        padding-bottom: 0.5rem;
    }
    .menu_right li{
        border-bottom:1px solid #f8f8f8;
        padding:.4rem .3rem;
        position:relative;
        overflow:hidden;
        list-style: none;
    }
</style>