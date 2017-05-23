<template>
  <div id="prods">
    <header>
      <div id="backClick" @click="backClick"><img src="../assets/icon10.png" alt=""/></div>
      <form action="" @submit.prevent="ajax">
         <input type="search" placeholder="请输入关键字搜索商品" :value="pagram.keyword" v-model="pagram.keyword">
      </form>
      <div @click="changeList" :class="{'statusactive':status,'statusleft':!status}"></div>
    </header>
    <div class="selectList">
      <ul>
        <li @click="zongHe">
            综合
        </li>
        <li @click="changeSort(item,index)" v-for="(item,index) in change" :class="{'lowprice':price,'topprice':!price,'show':!item.show}">
          {{item.title}}
        </li>
    <!--     <li>
            筛选
        </li> -->
      </ul>
    </div>
    <div :class="{'changeItem':!listStatus,'content':listStatus}" style="" id="oneprods">
      <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <oneprod v-for="item in this.prodList" :item="item" :key="item.STK_NAME_EXT"></oneprod> 
      </div>
      <getbottom v-show="show"></getbottom>     
    </div> 
    <div class="over">
        <shopcart></shopcart>
        <p>
          <img src="../assets/icon54.png" alt="" id="scrolltop" @click="scrollTop">
        </p>
      </div>       
  </div>
</template>

<script type="text/javascript">
  import Vue from 'vue'
  import oneprod from "../components/oneProd.vue"
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

  export default({
    name:"prods",
    data() {
      return{
        status:false,
        listStatus:false,
        show: false,
        price:true,
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
          keyword:""
        },
        change:[
          {
            title:"销量",
            show:false
          },
          {
            title:"价格",
            show:false
          }
        ] ,
        prodList:[],
        page:{
          pageno:"0",
          pagesize:"20",
          orderby: "ZH",
          asc: true
        }
      }
    },
    components: {
      // proLists,
      shopcart,
      getbottom,
      oneprod
    },
    methods:{ 
      ajax() {
        Indicator.open();
        this.prodList=[];
        const pargrmList = {
          pagination: JSON.stringify(this.page),
          oper: 'getWqSearchApp',
          type: 'wqProduct',
          para: JSON.stringify(this.pagram) 
        }
        // ajax调用
            // console.log(this.pagram.keyword)
        Request.post(pargrmList).then(res=>{
            const getData = JSON.parse(res.data.result)
            // console.log(getData)
            getData.data.product.forEach(value=> {
              this.prodList.push(value)
            })
            if(this.prodList.length==getData.pagination.totalcount) {
              this.load=true;
              this.show = true;
              Indicator.close();
              return
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
        if(!this.load){
           this.loading = true;
           this.page.pageno=parseInt(this.page.pageno)+1;
           this.ajax();
        }
      },　
      changeList (){
        this.status=!this.status;
        this.listStatus=!this.listStatus
      },
      changeSort(item,index) {

        this.price=!this.price;
        this.$nextTick(function () {
          let that=this;
          this.change.forEach(function(item){
            that.$set(item,"show",false);
          })
          that.$set(item,"show",true);
        })
        this.prodList=[];
        if (index == 0) {
          if (item.show == true) {
            this.page.orderby = "AS";
          }else{
            this.page.orderby = "AA";
          }
        }else{
          if (item.show == true) {
            this.page.orderby = "BS";
          }else{
            this.page.orderby = "BA";
          }
        }
        this.ajax()
       
      },
      zongHe() {
        this.prodList=[];
        this.page.orderby = "ZH";
        this.ajax()
      },
      backClick(){
        Request.jsBbridge(function(bridge) {
          bridge.callHandler(
            'pushSearchWebClick'
          )
        })
      } ,
      onScroll() {
      this.scrolled=document.getElementById("oneprods").scrollTop;
      let scrolltop = document.getElementById('scrolltop');
        if(this.scrolled>10){
          scrolltop.style.display = 'block';
        }else{
          scrolltop.style.display = 'none';
        }
      },
      scrollTop() {
        var oTop = document.getElementById("oneprods");
        oTop.scrollTop = 0;      
      }
    },
    mounted() {
      var scroll = document.getElementById("oneprods");
      scroll.addEventListener('scroll', this.onScroll);
    }
  })
</script>

<style scoped>
#prods{
  position: absolute;
  height: 100%;
  width: 100%;
  background:#ebecf0;
  }
/*  #oneprods{
  position: absolute;
  top:0;
  bottom:0;
  overflow-y:scroll;
  -webkit-overflow-scrolling: touch;
  background:#ebecf0;
  }*/
header{
  height:88px;
  line-height:88px;
  position: fixed;
  top:0;
  background:#fff;
  width:100%;
}
header .statusactive{
  width:88px;
  height:88px;
  margin-left:20px;
  vertical-align: middle;
  background:url(../assets/icon46.png) no-repeat center;
  background-size:70%;
  float:left;

}
header .statusleft{
  float:left;
  margin-left:20px;
  width:88px;
  height:88px;
  vertical-align: middle;
  background:url(../assets/icon47.png) no-repeat center;
  background-size:70%;
}
header input{
  width:508px;
  height:62px;
  border-radius: 2px;
  border:none;
  float:left;
  margin-top:13px;
  font-size: 26px;
  color: #9DA2B5;
  letter-spacing: 0;
  padding-left:76px;
  background: #EBECF0 url(../assets/icon20.png) no-repeat 22px center;
  background-size:26px 26px;
}
header div:nth-child(1){
  float:left;
  width:113px;
  line-height:88px;
  text-align: center;

}

header div:nth-child(1) img{
  width:33.6px;
  height:33.6px;
  vertical-align: middle;

}
.selectList {
  position: fixed;
  top:110px;
  width:100%;
}
.selectList ul{
  height:96px;
  line-height:100px;
  background:#fff;
  display:flex;
}
.selectList ul li{
font-size: 26px;
  float:left;
  flex:1;
  text-align: center;
}
.selectList ul li:nth-last-child(){
  margin-right:0;
}
.selectList ul li span{
  display:inline-block;
  font-size: 26px;
  height:37px;
  vertical-align: middle;
}
.selectList ul li:nth-child(4){
  margin-right:0;
}
.selectList ul .topprice{
  width:100px;
  background: url(../assets/icon0.png) no-repeat 160px 36px;
  background-size:13%;
}
.selectList ul .lowprice{
  width:100px;
  background: url(../assets/icon6.png) no-repeat 160px 36px;
  background-size:13%;
}

.selectList ul .show{
  background:none;
}
.selectList ul li:nth-child(4){
  width:100px;
  background: url(../assets/icon19.png) no-repeat 130px 36px;

  background-size:17%;
}

.prodsList{
  position: absolute;
  top:208px;
  bottom:0;
  overflow-y:scroll;
  -webkit-overflow-scrolling: touch;
  background:#ebecf0;
}
/*content横着布局方式*/
.content ,.changeItem{
  overflow: hidden;
  width:750px;
  padding:0;
  position: absolute;
  top:208px;
  bottom:0;
  overflow-y:scroll;
  -webkit-overflow-scrolling: touch;
  background:#ebecf0;
}
.over {
    position: fixed;
    bottom: 0;
    right: 0;
}

.over p {
    position: relative;
    width: 112px;
    height: 112px;
    display: inline-block;
    float: right;
    margin-right: 100px;
    text-align: center;
}

.over img {
    display: inline-block;
    width: 112px;
    height: 112px;
    float: right;
    margin: 0px 20px 15px 0;
}
#scrolltop {
    display: none;
}
</style>
