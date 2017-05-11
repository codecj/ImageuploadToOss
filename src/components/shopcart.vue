<template>
     <div id="over">
        <p>
           <img src="../assets/icon43.png" alt=""> 
           <span>{{shopCart}}</span>
        </p>
    </div> 
</template>

<script type="text/javascript">
  import Request from "../util/API"

  export default({
    name:"over",
    data() {
        return{
         shopCart:''
        }
    },
    methods:{
      ajax() {
        const pargrmList = {
          oper: 'findTotalQtyByUserNo',
          type: 'wqProduct',
          para: '{"userNo":"351335"}'
        }
        //ajax调用
        Request.post(pargrmList).then(res=>{
            const getData = JSON.parse(res.data.result)
            this.shopCart=getData.data.TOTALQTY;
        }).catch(error=>{
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
        this.ajax();
      }
    }
  })
</script>

<style>
#over{
  position: fixed;
  bottom:0;
  right:0;
}
#over p {
  position: relative;
  width:112px;
  height:112px;
  display: inline-block;
  float:right;
  text-align: center;
}
#over p span{
font-size: 18px;
color: #FF783C;
padding:2px 10px;
letter-spacing: 0;
border-radius:50%;
line-height:32px;
text-align: center;
display:inline-block;
background: #FFFFFF;
position: absolute;
top:0px;
right:40px;
}
#over img {
  display:inline-block;
  width:112px;
  height:112px;
  float:right;
  margin:0px 20px 15px 0;
}
</style>