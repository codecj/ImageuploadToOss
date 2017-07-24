<template>
	<div class="goodgocar">
		<div class="header">
			<span>退货回车</span>
			<div><img src="../../assets/icon10.png" class="back" @click="back"></div>
			<div class="scan"></div>
		</div>
		<div class="content">
			<ul>
				<li v-for="(item, index) in goodList">
					<Cell :good='item' :index='index' @fromCell="fromCell"></Cell>
				</li>
			</ul>
		</div>
		<div class="footer">
			<span class="select-title" :class="{noselect:!isAllSelect,isselect:isAllSelect}" @click="allselect">全选</span>
			<span class="btnCar" @click="goCarRequest">回车销售</span>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import Cell from './goodGoCarCell.vue';
	import Request from "../../util/API";
	import {navBack} from '../../util/JsBridge.js';
	import {
    	Toast,
    	Indicator,
    	Loadmore
	} from 'mint-ui'

	Vue.component(Loadmore.name, Loadmore)

	export default {
		data(){
			return{
				isAllSelect:true,
				isEnd: false,
				allLoaded:false,
				goodList:[],
				goodSelect:[],
				page: {
                	pageno: "0",
                	pagesize: "20"
            	},
            	param:{
                	username : this.$route.query.username,
                	userno: this.$route.query.userno
            	},
            	goCarParam:{
            		spUserName : this.$route.query.username,
            		spUserNo: this.$route.query.userno
            	}
			}
		},
		computed:{
			pkNos(){
				if (this.goodList.length == 0){
					return ''
				}
				var arrayX = []
				for (var item of this.goodList){
					if (item.isSelected){
						arrayX.push(item)
					}
				}
				var str = ""
				arrayX.forEach(function(element, index, array){
					str  = str + element.PK_NO
					if (index != arrayX.length - 1){
						str = str + ","
					}
				});
				return str
			}
		},
		components:{
			Cell
		},
		methods:{
			allselect(){
				 this.isAllSelect = !this.isAllSelect
				 for (var value of this.goodList){
				 	value.isSelected = this.isAllSelect
				 }
			},
			fromCell(index, status){
				this.goodList[index].isSelected = status
				var flag = true
				this.goodList.forEach(item =>{
					if (!item.isSelected){
						flag = false
					}
				})
				this.isAllSelect = flag
			},
			ajax(){
				Indicator.open();
				this.page.pageno = this.pageno
				const pargrmList = {
					pagination: JSON.stringify(this.page),
					oper: 'getReturnListForTruckFour',
					type: 'return',
					para: JSON.stringify(this.param) 
				}
				Request.post(pargrmList).then(res => {
					const getData = JSON.parse(res.data.result)

					Indicator.close();
					if (parseInt(getData.code) == 4) {
	                	Toast({
	                         message: '无商品',
	                         duration: 2000
	                     });
	                    return;
	                }
					if (getData.code !== "200") {
						Toast({
							message:getData.msg,
							duration: 2000
						});
						return;
					}
					getData.data.forEach(value => {
						this.$set(value,"isSelected", true)
						this.goodList.push(value);
					})

					if (this.goodList.length == getData.pagination.totalcount){
						this.isEnd = true;
						Indicator.close();
						return
					}
				}).catch(error => {
					Indicator.close();
					if (error.response){
						Toast({
							message: error.response.status,
							duration: 2000
						});
					}
				})
			},
			goCar(){
				if (this.pkNos.length == 0){
					Toast("请先选择商品");
					return;
				}
				Indicator.open();
				this.goCarParam.pkNos = this.pkNos
				const pargrmList = {
					pagination: JSON.stringify(this.page),
					oper: 'backToTruckFour',
					type: 'truck',
					para: JSON.stringify(this.goCarParam) 
				}
				Request.post(pargrmList).then(res => {
					const getData = JSON.parse(res.data.result)
					Indicator.close();
					if (getData.code !== "200") {
						Toast({
							message:getData.msg,
							duration: 2000
						});
						return;
					}	
						navBack()
					if (this.goodList.length == getData.pagination.totalcount){
						this.load = true;
						this.show = true;
						Indicator.close();
						return
					}
				}).catch(error => {
					Indicator.close();
					if (error.response){
						Toast({
							message: error.response.status,
							duration: 2000
						});
					}
				})
			},
			back(){
				navBack();
			},
			goCarRequest(){
				this.goCar();
			},
		},
		mounted(){
			this.ajax(); 
		 	Request.jsBbridge(bridge => {
		        bridge.init(function(message, responseCallback) {
		            var data = {};
		            responseCallback(data);
		        });
		    })
		}
	}
</script>

<style scoped>
	.header{
		height: 88px;
		width: 100%;
		color: #3B456C;
		font-size: 40px;
		text-align: center;
		line-height: 88px;
		position: fixed;
		background-color: white;
		top: 0;
		left: 0;
		z-index: 99;
	}
	.header .back{
		position: absolute;
		left: 37px;
		bottom: 14px;
		height: 60px;
		width: 60px;
	}
	.scan{
		height: 30px;
		background-color: rgb(237, 238, 245);
	}
	.content{
		margin-top:117px;
		background-color: rgb(237, 238, 245);
		width: 100%;
		position: absolute;
	}
	.content ul li:last-child{
		padding-bottom: 99px;
		background-color: white;
	}
	.footer{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: #fff;
		border-top: 1px solid rgb(237, 238, 245);
	}
	
	.footer .select-title{
		font-size: 26px;
		color: #4d5679;
		width:120px;
		height:98px;
		line-height: 98px;
		display:inline-block;
		text-align: right;
		margin-left: 24px;
	}
	.footer .noselect{
		background: url("../../assets/icon59.png") no-repeat center left;
		background-size: 48px 48px;
	}
	.footer .isselect{
		background: url("../../assets/icon59-1.png") no-repeat center left;
		background-size: 48px 48px;
	}
	.footer .btnCar{
		float: right;
		height: 98px;
		text-align: center;
		line-height: 98px;
		padding: 0px 52px;
		font-size: 30px;
		color: #fff;
		background: linear-gradient(-18deg, #FF4848 0%, #FF8739 100%);
	}

</style>