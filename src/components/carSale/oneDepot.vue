<template>
  <div class="onedepot">
  	<div class="depot" v-for="(item,index) in list" >
  		<div @click="changeBg"  :class="{'noselect':!selectStatus,'selectBg':selectStatus}"></div>
	    <div><img src="../../assets/icon1.png" alt=""></div>
	    <div>
	    	<p>{{item.name}}</p>
	    	<p>{{item.num}}个</p>
	    	<p>
	    		<span>1箱</span>
	    		<span>26个</span>
	    		<span @click="backDepot">回库</span>
	    	</p>
	    </div>
	  	
	   
  	</div>
  	<!-- <AddStkcView v-show="showDev" ></AddStkcView> -->
  </div>
  
</template>

<script type="text/javascript">
 // import AddStkcView from './AddStkcView.vue'
 export default({
 	name:"onedepot",
 	data(){
 		return{
 			showDev:false
 		}
 	},
 	// components:{AddStkcView},
 	props:{
 		list:Array,
 		selectStatus:Boolean
 	},
 	methods:{
 		changeBg(){
 			if(event.target.className == "noselect"){
 				event.target.className = "selectBg"
 			}else{
 				event.target.className ="noselect"
 			}
 		},
 		backDepot(){
 			this.$emit("back");
 			// this.showDev = !this.showDev;
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
	width:54%;
	margin-left:2%;
}
.depot div:nth-child(3) p{
	line-height:70px;
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
}
.depot div:nth-child(3) p:nth-child(2){
	font-size: 30px;
	color: #3B456C;
	letter-spacing: 0;
}
.depot div:nth-child(3) p:nth-child(3){
	position: relative;
}
.depot div:nth-child(3) p:nth-child(3) span:nth-child(1){
	font-size: 26px;
	color: #3B456C;
	letter-spacing: 0;
	position: absolute;
	right:260px;
}
.depot div:nth-child(3) p:nth-child(3) span:nth-child(2){
	position: absolute;
	right:180px;
}
.depot div:nth-child(3) p:nth-child(3) span:nth-child(3){
	position: absolute;
	right:0;
	width:120px;
	height:70px;
	text-align: right;
	display: inline-block;
	background:url(../../assets/icon60.png) no-repeat left;
	background-size:54px 54px;
	font-size: 26px;
	color: #4D5679;
	letter-spacing: 0;
}
</style>