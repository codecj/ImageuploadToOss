<!-- 我的佣金模块 -->
<template>
	<div id="MyCommission">
		<div class="header">
			<h4>4月待结算佣金</h4>
			<div class="price">
				<span>￥</span>
				<span>{{PLACE_PRICE_BIG}}</span>
				<span>{{PLACE_PRICE_SIGLE}}</span>
			</div>
		</div>
		<div class="content" @click='jumpToNativeCommission'>
			<span>上月已结算佣金</span>
			<span>￥{{ALREADY_PRICE}}</span>
			<img src="../assets/icon17.png" class="right">
		</div>
		<div class="footer" @click='jumpToNativeMyAmount'>
			<img src="../assets/icon21.png" class="left">
			<span>提现</span>
			<img src="../assets/icon17.png" class="right">
		</div>
	</div>
</template>

<script type="text/javascript">
	import Request from "../util/API";
	import Vue from 'vue'
	import {
    	Toast,
    	Indicator
	} from 'mint-ui';
	export default {
		data(){
			return {
				ALREADY_PRICE:'', // 已结算
				PLACE_PRICE:'', // 预结算
				PLACE_PRICE_BIG:'',
				PLACE_PRICE_SIGLE:''

			}
		},
		mounted(){
			this.ajax();
		},
		methods: {
			ajax:function(){
				var _this = this;
				console.log(_this.$route.query.aaa);
				Indicator.open();
				let pargrmList = {
		            oper: 'findCommissionTotalPrice',
		            type: 'wqOrder',
		            para: '{"userid":"354858"}'
          		};
          		Request.post(pargrmList).then(function(response){
          			Indicator.close();

          			var str1 = '123456';
          			console.log(JSON.parse(response.data.result).data.ALREADY_PRICE);
          			_this.ALREADY_PRICE = getCalPriceArr(str1)[0] + getCalPriceArr(str1)[1];
          			
          			var str = '123456.11';
          			console.log(JSON.parse(response.data.result).data.PLACE_PRICE.toString());
          			_this.PLACE_PRICE_BIG = getCalPriceArr(str)[0];
          			_this.PLACE_PRICE_SIGLE = getCalPriceArr(str)[1];

          			function getCalPriceArr(str){
          				var arr = [];
          				var str1 = '',str2 = '';
          				var index = str.indexOf('.');
          				if (index === -1) {
          					arr.push(str);
          					arr.push('.00');
          				} else {
          					arr.push(str.substr(0,index));
          					arr.push(str.slice(index,index+3));
          				}
          				return arr;
          			}
          			
          		}).catch(function(error){
          			Indicator.close();
          		    if (error.response) {
                  	// 请求已发出，但服务器响应的状态码不在 2xx 范围内
                   		console.log(error.response.status);
                  		Toast({
                      		message: error.response.status,
                      		duration: 2000
                  		});
             	 	} else {
                  		console.log('Error', error.message);
                  		Toast({
                      		message: error.message,
                      		duration: 2000
                  		});
              		}
          		})
			},
			jumpToNativeCommission(){ // 跳转到结算佣金的详情
				Request.jsBbridge(bridge=>{
					bridge.callHandler(
						'jumpToCommissionDetail'
					)
				})
			},
			jumpToNativeMyAmount(){
				Request.jsBbridge(bridge=>{
					bridge.callHandler(
						"jumpToMyWallet"
					)
				})
			}

			// jsBbridge(function(bridge) {
			//     bridge.callHandler(
			//         '方法名', {
			//             '参数': '1'
			//         },
			//          回调函数
			//         function(responseData) {}
			//     )
			// })
		}
	}
</script>

<style scoped>
	#MyCommission {
		position: relative;
		background-color: rgb(239,240,246);
	}
	.header {
		background-color: #fff;
		height: 236px;
		border-bottom: 2px solid #F1F2F7;
		position: relative;
		top:24px;
	}
	.header h4 {
		font-size: 26px;
		color: #9DA2B5;
		letter-spacing: 0;
		position: absolute;
		left: 32px;
		top: 40px;
	}
	.header .price{
		color: #FF783C;
		padding-top: 100px;
	}
	.header .price span:nth-child(1) {
		font-size: 30px;
		padding-left: 32px;
	}
	.header .price span:nth-child(2) {
		font-size: 88px;
		margin-left: -10px;
	}
	.header .price span:nth-child(3) {
		font-size: 48px;
	}
	.content {
		position: relative;
		background-color: #fff;
		height: 110px;
		top: 24px;
	}
	.content span:nth-child(1) {
		position: absolute;
		font-size: 30px;
		color: #3B456C;
		left: 32px;
		top: 37px;
	}
	.content span:nth-child(2) {
		font-size: 30px;
		color: #3B456C;
		position: absolute;
		right: 70px;
		top: 38px;
	}
	.content img {
		position: absolute;
		left: 705px;
		top: 43px;
		width: 32px;
		height: 32px;
	}
	.footer {
		position: relative;
		top: 54px;
		height: 112px;
		width: 750px;
		background-color: #fff;
	}
	.footer img.left {
		position: absolute;
		left: 35px;
		top: 36px;
		width: auto;
		height: 40px;
	}
	.footer span {
		position: absolute;
		top: 35px;
		left: 104px;
		font-size: 30px;
		color: #3B456C;
	}
	.footer img.right {
		position: absolute;
		left: 705px;
		top: 45px;
		width: 32px;
		height: 32px;
	}
</style>