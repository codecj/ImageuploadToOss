<template>
	<div class="check">
		<div class="checkHeader">
			<div class="headerTitle">
				查看回库商品
			</div>
			<div class="headerBack" @click="naviBack">
			<img src="../../assets/icon10.png">
			</div>
		</div>
		<div class="checkBody">
			<ul>
				<li>
					<cell></cell>
				</li>
				<li>
					<cell></cell>
				</li>
				<li>
					<cell></cell>
				</li>
				<li>
					<cell></cell>
				</li>
				<li>
					<cell></cell>
				</li>
				<li>
					<cell></cell>
				</li>
				<li>
					<cell></cell>
				</li>
				<li>
					<cell></cell>
				</li>
			</ul>
		</div>
		<div class="checkBottom">
			<div class="bottomBtn">
				打印回库单
			</div>
		</div>		
	</div>
</template>

<script>
import Vue from 'vue';
import cell from './checkGoodCell.vue'
import Request from '../../util/API'
import {
    Toast,
    Indicator,
    Loadmore
} from 'mint-ui'

Vue.component(Loadmore.name, Loadmore)

export default {
		data(){
			return{
				title:'可口可乐2L',
				dataArray:[],
				page: {
                	pageno: "0",
                	pagesize: "20"
            	},
            	param:{
                	whc : this.$route.query.whc,
                	userName: this.$route.query.username
            	},
			}
		},
		components:{
			cell,
		},
		methods:{
			naviBack(){
				this.$router.push({
					path:'backdepot',
				})
			},
			ajax(){
				Indicator.open();
				this.page.pageno = this.pageno
				const pargrmList = {
					pagination: JSON.stringify(this.page),
					oper: 'truckIoMasBackDetail',
					type: 'truck',
					para: JSON.stringify(this.param) 
				}
				Request.post(pargrmList).then(res => {
					const getData = JSON.parse(res.data.result)
					console.log(getData)
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
					this.goodList = getData.data
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
		},
		mounted(){
			this.ajax()
		}
}	
</script>

<style>
	.checkHeader{
		height: 88px;
		width: 100%;
		color: #3B456C;
		font-size: 40px;
		text-align: center;
		line-height: 88px;
		position: fixed;
		background-color: #fff;
		left: 0;
		top: 0;
		z-index: 99;
	}
	.headerBack img{
		width: 60px;
		height: 60px;
		position: absolute;
		left: 37px;
		bottom: 14px;
	}
	.checkBody ul li:last-child{
		padding-bottom: 99px;
	}
	.checkBody ul li:first-child{
		padding-top: 88px;
	}
	.checkBottom{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 98px;
		background-color: #fff;
		border-top: 1px solid rgb(237, 238, 245);
		text-align: center;
		line-height: 98px;
	}
	.checkBottom .bottomBtn
	{
		width:200px;
		margin: 0 auto;
		font-size: 30px;
		color: #3B456C;
		padding-left: 15px;
		background: url(../../assets/function-iconprint-.png) no-repeat center left;
		background-size: 35px 35px;
	}
	
</style>