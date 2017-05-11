<template>
  <div id="prodsList" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"infinite-scroll-distance="10">
     <!-- content横着布局和changeItem竖着布局-->
    <div class="proList">
      <div class="changeItem">
        <oneprod :prodList="prodList"></oneprod>
        <getbottom v-show="show"></getbottom>
        <div class="over">
          <shopcart></shopcart>
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
  import getbottom from "../components/getbottom.vue"
  import shopcart from "../components/shopcart.vue"
  import oneprod from "../components/oneProd.vue"
  import Request from "../util/API"
  import { Lazyload } from 'mint-ui'
  import { Toast,Indicator } from 'mint-ui'
  // 懒加载效果
  Vue.use(Lazyload, {
    preLoad: 1.3,
    lazyComponent: true,
    error: require('../assets/holde.png'),
    loading: require('../assets/holde.png'),
    listenEvents: ['scroll']
  })
  export default({
    name:"prodsList",
    data() {
        return{
          status:false,
          listStatus:false,
          price:true,
          show:false,
          prodList:[],
          page:{
            pageno:"0",
            pagesize:"20"
          }
        }
    },
    components: {
      getbottom,shopcart,oneprod
    },
    // props:["listStatus"],
    methods:{
        ajax() {
        Indicator.open();
        const pargrmList = {
          pagination: JSON.stringify(this.page),
          oper: 'findStkNewsAppNew',
          type: 'wqProduct',
          para: '{"userno":"351335","spusername":"SCLBPYWY","areaid":"2282"}'
        }
        //ajax调用
        Request.post(pargrmList).then(res=>{
            const getData = JSON.parse(res.data.result)
            // console.log(getData)
            getData.data.newRec.forEach(value=> {
              this.prodList.push(value)
            })
            if(this.prodList.length==getData.pagination.totalcount) {
              this.show=true;
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
        this.loading = true;
        this.page.pageno=parseInt(this.page.pageno)+1;
        this.ajax();
      },　
      onScroll:function() {
        this.scrolled=document.getElementById("prodsList").scrollTop;
        let scrolltop = document.getElementById('scrolltop');
          if(this.scrolled>10){
            scrolltop.style.display = 'block';
          }else{
            scrolltop.style.display = 'none';
          }
      },
      scrollTop:function() {
        var oTop = document.getElementById("prodsList");
        oTop.scrollTop = 0;      
      }
    }, 
    mounted () {
        var scroll=document.getElementById("prodsList");
        scroll.addEventListener('scroll', this.onScroll);
    }
  })
</script>

<style scoped>

#prodsList{
  position: absolute;
  top:0;
  bottom:0;
  overflow-y:scroll;
  -webkit-overflow-scrolling: touch;
  background:#ebecf0;
}
.proList{
  width: 100%;
  overflow: hidden; 
}

.over{
  position: fixed;
  bottom:0;
  right:0;
}
.over p {
  position: relative;
  width:112px;
  height:112px;
  display: inline-block;
  float:right;
  margin-right:100px;
  text-align: center;
}
.over img {
  display:inline-block;
  width:112px;
  height:112px;
  float:right;
  margin:0px 20px 15px 0;
}
#scrolltop{
  display:none;
}
</style>