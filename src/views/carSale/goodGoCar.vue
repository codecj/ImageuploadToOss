<template>
	<div class="goodgocar">
		<div class="header">
			<span>选择商品回车仓库</span>
			<div><img src="../../assets/icon10.png" class="back"></div>
			<div><img src="../../assets/icon10.png" class="arrow-down"></div>
			<div class="scan">
				<ScanSearch></ScanSearch>
			</div>
		</div>
		<div class="content">
			<ul>
				<li v-for="item in goodList">
					<Cell :good='item'></Cell>
				</li>
			</ul>
		</div>
		<div class="footer">
			<span class="select-title" :class="{noselect:!isAllSelect,isselect:isAllSelect}" @click="allselect">全选</span>
			<span class="btnCar">回车销售</span>
		</div>
	</div>
</template>

<script>
	import Cell from './goodGoCarCell.vue'
	import ScanSearch from '../../components/carSale/searchDepot.vue'
	import Request from "../../util/API"
	import {
    	Lazyload
	} from 'mint-ui'
	import {
    	Toast,
    	Indicator
	} from 'mint-ui'

	export default {
		data(){
			return{
				isAllSelect:false,
				load:false,
				show:false,
				goodList:[],
				page: {
                	pageno: "0",
                	pagesize: "20"
            	},
            	param:{
                	username:"zhujyps01",
                	userno:"728415"
            	}
			}
		},
		methods:{
			allselect(){
				 this.isAllSelect = !this.isAllSelect
				 this.ajax();
			},
			ajax(){
				Indicator.open();
				const pargrmList = {
					pagination: JSON.stringify(this.page),
					oper: 'getReturnListForTruckFour',
					type: 'return',
					para: JSON.stringify(this.param) 
				}
				Request.post(pargrmList).then(res => {
					const getData = JSON.parse(res.data.result)

					getData.data.forEach(value => {
						this.goodList.push(value);
					})
					console.log(this.goodList)
					if (this.goodList.length == getData.pagination.totalcount){
						this.load = true;
						this.show = true;
						Indicator.close();
						return
					}

					if (getData.code !== "200") Toast({
						message:getData.msg,
						duration: 2000
					});
					Indicator.close();
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
			loadMore(){
				if (!this.load){
					this.loading = true;
					this.page.pageno = parseInt(this.page.pageno) + 1;
					this.ajax();
				}
			},
			mounted(){
				this.ajax();
			}
		},
		components:{
			Cell,
			ScanSearch
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
	.header .arrow-down{
		position: absolute;
		right: 37px;
		bottom: 14px;
		width: 60px;
		height: 60px;
		transform:rotate(270deg);
	}
	.scan{
		padding-top:28px;
		height: 98px;
		width: 100%;
		background-color: rgb(237, 238, 245);
	}
	.content{
		margin-top:210px;
		background-color: rgb(237, 238, 245);
		width: 100%;
		height: 100%;
		position: absolute;
	}
	.content ul li:last-child{
		margin-bottom: 99px;
		border-bottom: 1px solid rgb(237, 238, 245);
	}
	.footer{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: #fff;
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