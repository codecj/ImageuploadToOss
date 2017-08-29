<template>
  <div class="onedepot">
  	<div class="depot" v-for="(item,index) in stockList" >
  		<div @click="changeBg(item)"  :class="{'noselect':!item.seletedStatus,'selectBg':item.seletedStatus}"></div>
	    <div><img v-lazy="item.URL_ADDR" alt=""></div>
	    <div>
	    	<p>{{item.STK_NAME}}</p>
	    	<p><span>已添回库数</span><span>{{item.OLDQTY}}</span>	</p>
	    	<p><span>车上库存</span><span>{{item.STOCK}}</span></p>
	    	<p><span @click="backDepot(item)">修改</span></p>
	    </div>
  	</div>
  </div>
</template>

<script type="text/javascript">
 export default({
 	name:"onedepot",
 	data(){
 		return{
 			showDev:false,
 		}
 	},
 	props:{
 		stockList:Array,
 		selectStatus:Boolean
 	},
 	methods:{
 		changeBg(item){		
 			item.seletedStatus = !item.seletedStatus;
 			this.$emit("allSelect");
 		},
 		backDepot(item){
 			this.$emit("back",item);
 		}
 		
 	}
 })
</script>

<style scoped>
.depot{
	height:208px;
	padding:44px 20px 44px 0;
    border-top:2px solid #F1F2F7;
    background: #fff;
}
.depot div{
	display:inline-block;
	float:left;
}
.depot .noselect{
	width:15%;
	height:208px;
	background: url(../../assets/icon59.png) no-repeat center center;
	background-size:54px 54px;
}
.depot .selectBg{
	width:15%;
	height:208px;
	background: url(../../assets/icon59-1.png) no-repeat center center;
	background-size:54px 54px;
}
.depot div:nth-child(2){
	height:208px;
}
.depot div:nth-child(2) img{
	width:209px;
	height:208px;
}
.depot div:nth-child(3){
	width:50%;
	margin-left:2%;
	position: relative;
}
.depot div:nth-child(3) p:nth-child(1){
	 overflow: hidden;
    text-overflow: ellipsis;
    word-break: normal;
    display: -webkit-box;
    display: box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
	font-size: 30px;
	color: #3B456C;
	letter-spacing: 0;
	line-height: 40px;
	width:100%;
	height:80px;
}

.depot div:nth-child(3) p:nth-child(2){
	color: #3B456C;
	letter-spacing: 0;
	width:100%;
	height:30px;
	margin-bottom:10px;
}
.depot div:nth-child(3) p:nth-child(2) span:nth-child(1),
.depot div:nth-child(3) p:nth-child(3) span:nth-child(1)
{
	color:#9DA2B5;
	font-size:28px;
	display:inline-block;
	margin-right:20px;
}
.depot div:nth-child(3) p:nth-child(2) span:nth-child(2),
.depot div:nth-child(3) p:nth-child(3) span:nth-child(1){
	font-size:28px;
}
.depot div:nth-child(3) p:nth-child(4){
	height:70px;
	line-height: 70px;
	position: absolute;
	bottom:-50px;
	right:0;
}
.depot div:nth-child(3) p:nth-child(4) span{
	width:120px;
	height:70px;
	text-align: right;
	display: inline-block;
	background:url(../../assets/icon60.png) no-repeat left center;
	background-size:54px 54px;
	font-size: 26px;
	color: #4D5679;
	letter-spacing: 0;
}

</style>