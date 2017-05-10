<template>
  <div id="prodsList" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"infinite-scroll-distance="10">
     <!-- content横着布局和changeItem竖着布局-->
     <div class="proList">
        <div class="changeItem">
        <oneprod :prodList="prodList"></oneprod>
        <getbottom v-show="show"></getbottom>
        <!-- //////////////////////////////////////////// -->
   </div>

   <div class="over">
         <shopcart></shopcart>
       
        <p>
          <img src="../assets/icon54.png" alt="" id="scrolltop" @click="scrollTop">
        </p>
       
    </div> 
    </div>
  </div>
</template>

<script type="text/javascript">
  import Vue from 'vue'
  import getbottom from "./getbottom.vue"
  import shopcart from "./shopcart.vue"
  import oneprod from "./oneProd.vue"
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
          oper: 'findCommissionStkCNew',
          type: 'wqProduct',
          para: '{"userno":"351335","spusername":"SCLBPYWY","areaid":"2282"}'
        }
        //ajax调用
        Request.post(pargrmList).then(res=>{
            const getData = JSON.parse(res.data.result)
            // console.log(getData)
            getData.data.CommissionStkCs.forEach(value=> {
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
  /*padding-bottom:200px;*/
  background:#ebecf0;
}
.proList{
  width: 100%;
  overflow: hidden; 
}
/*content横着布局方式*/
.changeItem{
    overflow: hidden;
    width:750px;
    padding:0;
}
/*changeItem竖着布局方式*/
.changeItem .searchItem{
  height:198px;
  width:100%;
  border-top:2px solid #F1F2F7;
  background:#fff;
  padding:50px 40px 50px 32px;

}
.changeItem .searchItem .onephoto{
}
.changeItem .searchItem .onephoto .photo{
  width:200px;
  height:200px;
  float:left;
}
/**/
.changeItem .searchItem>p:nth-child(2){
  width:450px;
  height:80px;
  float:left;
  font-size: 30px;
  color: #3B456C;
  letter-spacing: 0;
  line-height: 40px;
  margin-left:28px;
  overflow:hidden;
  /*white-space: nowrap;*/
  text-overflow: ellipsis;
  word-break: normal;
  display: -webkit-box; 
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; 

}
.changeItem .searchItem>p:nth-child(3){
  font-size: 22px;
  color: #9DA2B5;
  letter-spacing: 0;
  float:left;
  width:450px;
  margin-left:28px;
}
.changeItem .searchItem>p:nth-child(4){
  width:450px;
  height:40px;
  float:left;
  margin-top:8px;
  margin-left:28px;
}
.changeItem .searchItem>p:nth-child(4) span{
  float:left;
  font-size: 18px;
  color: #FF783C;
  letter-spacing: 0;
  border: 1px solid #FF783C;
  border-radius: 2px;
  display:inline-block;
  padding:1px 10px 1px 10px;
  margin-right:10px;
}
.changeItem .searchItem>p:nth-child(5){
  margin-top:4px;
  height:44px;
  line-height:44px;
  width:450px;
  float:left;
  margin-left:28px;
}
.changeItem .searchItem>p:nth-child(5) span:nth-child(1){
  font-size: 30px;
  color: #FF783C;
  letter-spacing: 0;
}
.changeItem .searchItem>p:nth-child(5) span:nth-child(2){
  font-size: 18px;
  color: #FFFFFF;
  letter-spacing: 0;
  background: #FF7A3F;
  border-radius: 4px;
  margin:0 10px 0 40px;
  line-height: 30px;
  text-align: center;
  display: inline-block;

}
.changeItem .searchItem>p:nth-child(5) span:nth-child(3){
  font-size: 22px;
  color: #FF783C;
  letter-spacing: 0;

}
.changeItem .searchItem .gocart{
  width:48px;
  height:48px;
  float:right;
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