<template>
  <div @click="backTap()" class="addStkc">
  	<div class="content">
  		<div class="goodsInfo borderB">
  			<img class="goodsImg"></img>
  			<label class="goodsName">墨西的我的企鹅未必瞧得起我好的起我的期望的武器</label>
  			<img @click.stop="backTap()" class="cancel" src="../../assets/icon18.png"></img>
			<label class="stock">库存:20箱10件8个</label>
  		</div>
		<ul>
			<li class="borderB">
				<label class="spec">包 (1*2个)</label>
				<label class="price">¥200.00</label>
				<img @click.stop="addStkc()" class="add" src="../../assets/icon9.png"></img>
				<input type="number"  class="amount" v-model="stock">
				<img @click.stop="reduceStkc()" class="reduce" src="../../assets/icon3.png"></img>
				<label class="stkcStock">库存 1242</label>
			</li>
			<li class="borderB">
				<label class="spec">包 (1*2个)</label>
				<label class="price">¥200.00</label>
				<img class="add" src="../../assets/icon9.png"></img>
				<input type="number"  class="amount" v-model="stock">
				<img class="reduce" src="../../assets/icon3.png"></img>
				<label class="stkcStock">库存 1242</label>
			</li>
		</ul>
  		<div class="addBtn" @click.stop='submitStkc()'>添加</div>
  	</div>
  </div>
</template>
<script>
	export default {
		data () {
			return {
				msg: '',
				stock:10
			}
		},
		computed:{
			inpNum:{
				get:function(){
					return this.stock;
				},
				set:function(newValue){
					this.stock=newValue.replace(/[^\d]/g,'');
				}
			}
		},
		props: {
			depotList: Array
		},
		methods: {
			backTap(){
				// alert('backTap');
				this.$emit('cancelAddStkcView');
			},
			addStkc(){
				this.stock++;
				// alert(this.stock);
			},
			reduceStkc(){
				if (this.stock == 0) {
					this.stock = 0;
				}else{
					this.stock--;
				}
				// alert(this.stock);
			},
			submitStkc(){
				alert(this.stock);
			}
			// selectDepot:(depot) => {  this.$emit('depotSelected',depot); }
		}
	}

</script>
<style scoped>

	.addStkc{
		width: 100%;
		background: rgba(0, 0, 0, 0.3);
		position: fixed;
		z-index: 999;
		top:0px;
		bottom: 0px;
	}
		
	.addStkc .content{
		position: absolute;
		width: 100%;
		bottom: 0px;
		background-color: white;
		height: 800px;
	}
	.addStkc .content .goodsInfo{
		position: relative;
		width: 100%;
		height: 210px;
	}
	.addStkc .content .goodsInfo .goodsImg{
		position: absolute;
		left: 32px;
		top:-25px;
		width: 200px;
		height: 200px;
		background-color: red;
	}
	.addStkc .content .goodsInfo .goodsName{
		position: absolute;
		left: 264px;
		top:14px;
		right: 130px;
		font-family: PingFangSC-Medium;
		font-size: 30px;
		color: #3B456C;
		display: -webkit-box;
   		overflow: hidden;
    	-webkit-box-orient: vertical;
    	text-overflow: ellipsis;
    	-webkit-line-clamp: 2;
	}

	.addStkc .content .goodsInfo .cancel{
		position: absolute;
		right: 34px;
		width: 50px;
		height: 50px;
		top:14px;
	}
	.addStkc .content .goodsInfo .stock{
		position: absolute;
		left: 264px;
		bottom:44px;
		right: 130px;
		color: #3b456c;
		font-size: 26px;
	}

	.addStkc .content ul{
		width: 100%;
	}

	.addStkc .content ul li{
		width: 100%;
		height: 150px;
		padding: 34px;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		position: relative;
	}
	.addStkc .content ul li .spec{
		color: #3b456c;
		font-size: 26px;
	}
	

	.addStkc .content ul li .price{
		position: absolute;
		bottom: 25px;
		left:34px;
		font-size: 26px;
		color: #C4C7D2;
	}


	.addStkc .content ul li .add{
		position: absolute;
		right: 34px;
		top: 34px;
		width: 48px;
		height: 48px;
	}

	.addStkc .content ul li .amount{
		position: absolute;
		text-align: center;
		right: 85px;
		top: 34px;
		width: 95px;
		height: 48px;
		border:none;
	}

	.addStkc .content ul li .reduce{
		position: absolute;
		right: 175px;
		top: 34px;
		width: 48px;
		height: 48px;
	}
	.addStkc .content ul li .stkcStock{
		position: absolute;
		right: 34px;
		bottom: 25px;
		font-size: 24px;
		color: #3B456C;
	}

	.addStkc .content .addBtn{
		position: absolute;
		width: 100%;
		background-color: #ff8739;
		bottom: 0;
		text-align: center;
		color: white;
		font-size: 30px;
		line-height: 98px;
		height: 98px;
	}

	

</style>