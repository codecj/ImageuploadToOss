<template>
	<div id="index">
		<header>
			<div>
				<router-link :to="'xinpin'">				
					<span>登录</span>
				</router-link>
			</div>
			<router-link :to="'xinpin'">				
				<input type="search" placeholder="搜索商品" name="keyword" readOnly="true" >
			</router-link>				

		</header>
		<div class="content" id="oneprods">
			<getBanner></getBanner>
			<div class="prodClassify">
				<router-link :to="'xinpin'"  class="oneClassify">
					<span class="classifyName">
						<img src="../assets/icon002.png" alt="">
						<span>零食</span>
					</span>
				</router-link>
				<router-link :to="'xinpin'"  class="oneClassify">
					<span class="classifyName">
						<img src="../assets/drink.png" alt="">
						<span>饮料</span>
					</span>
				</router-link>
				<router-link :to="'xinpin'"  class="oneClassify">
					<span class="classifyName">
						<img src="../assets/icon001.png" alt="">
						<span>水果</span>
					</span>
				</router-link>
				<router-link :to="'xinpin'"  class="oneClassify">
					<span class="classifyName">
						<img src="../assets/jiu.png" alt="">
						<span>酒</span>
					</span>
				</router-link>		
				<router-link :to="'xinpin'"  class="oneClassify">
					<span class="classifyName">
						<img src="../assets/liangshi.png" alt="">
						<span>粮食</span>
					</span>
				</router-link>
				<router-link :to="'xinpin'"  class="oneClassify">
					<span class="classifyName">
						<img src="../assets/shucai.png" alt="">
						<span>蔬菜</span>
					</span>
				</router-link>
				<router-link :to="'xinpin'"  class="oneClassify">
					<span class="classifyName">
						<img src="../assets/haixian.png" alt="">
						<span>海鲜</span>
					</span>
				</router-link>
				<router-link :to="'xinpin'"  class="oneClassify">
					<span class="classifyName">
						<img src="../assets/other.png" alt="">
						<span>其他</span>
					</span>
				</router-link>				
			</div>
			<div class="hotProd">
				<img src="../assets/rexiao.png" alt="">
				<div class="allHotProd">
					<oneProd></oneProd>		
				</div>	
				<router-link :to="'xinpin'" class="moreProd">
					<div class="more">更多热销产品</div>	
				</router-link>	
			</div>
			<div class="newProd">
				<img src="../assets/newProd.png" alt="">
				<div class="allNewProd">
					<oneProd></oneProd>		
				</div>	
				<router-link :to="'xinpin'"  class="moreProd">
					<div class="more">更多最新产品</div>	
				</router-link>		
			</div>
			<div class="tejiaProd">
				<img src="../assets/tejiaProd.png" alt="">
				<div class="alltejiaProd">
					<oneProd></oneProd>		
				</div>	
				<router-link :to="'banner'" class="moreProd">
					<div class="more">更多特价产品</div>	
				</router-link>	
			</div>
			<div class="over">
		        <!-- <shopcart></shopcart> -->
		        <p>
		          <img src="../assets/icon54.png" alt="" id="scrolltop" @click="scrollTop">
		        </p>
		    </div>  
		</div>
		<footer>
				<router-link :to="'xinpin'" class="links">
					<img src="../assets/home.png" alt="">
					<p>首页</p>
				</router-link>
				<router-link :to="'xinpin'" class="links">
					<img src="../assets/search.png" alt="">
					<p>发现</p>
				</router-link>
				<router-link :to="'xinpin'" class="links">
					<img src="../assets/shopcart.png" alt="">
					<p>购物车</p>
				</router-link>
				<router-link :to="'xinpin'"class="links">
					<img src="../assets/me.png" alt="">
					<p>我的</p>
				</router-link>
		</footer>
	</div>
</template>
<script type="text/javascript">
 import getBanner from "../components/banner.vue"
 import oneProd from "../components/oneProdList.vue"


export default({
	name: "index",
	data() {
		return {

		}
	},
	components: {
		getBanner,
		oneProd
	},
	methods:{
		onScroll() {
      		this.scrolled=document.getElementById("oneprods").scrollTop;
      		let scrolltop = document.getElementById('scrolltop');
	        if(this.scrolled>10){
	          scrolltop.style.display = 'block';
	        }else{
	          scrolltop.style.display = 'none';
	        }
      	},
	    scrollTop() {
	        var oTop = document.getElementById("oneprods");
	        oTop.scrollTop = 0;      
	    }
	},
	mounted() {
 		var scroll = document.getElementById("oneprods");
        scroll.addEventListener('scroll', this.onScroll);
	}
	

})	
</script>
<style scoped>
	header{
		height:88px;
		line-height:88px;
		width:100%;
		position: fixed;
		top:0;
		left:0;
		background:#eeb174;
	}
	header div{
		width:100px;
		height:88px;
		text-align:center;
		float:left;
	}
	header div span{
		display:inline-block;
		color:#fff;
		font-size:16px;
	}
	header input{
		width:620px;
		height:70px;
		margin-top:9px;
		border:none;
		border-radius:6px;
		float:left;
		text-align:center;
	}
	.content{
		position: absolute;
		top:88px;
		bottom:100px;
		left:0;
		width:100%;
		background:#f3f3f3;
		overflow: auto;
		padding-bottom: 100px;
	}
	.content .prodClassify{
		overflow:hidden;
		padding:10px;
	}
	.content .prodClassify .oneClassify{
		width:25%;
		padding:10px;
		display:inline-block;
		text-align: center;
		box-sizing: border-box;
		float:left;
	}
	.classifyName{
		display: inline-block;
	}
	.content .prodClassify .oneClassify img{
		width:100px;
		height:100px;
	}
	.content .prodClassify .oneClassify span{
		display: block;
		color: #000;
	}
	.hotProd,.newProd,.tejiaProd{
		width:100%;
		background: #fff;
		overflow: hidden;
		margin-bottom: 20px;
	}
	.hotProd>img,.newProd>img,.tejiaProd>img{
		width:100%;
		height:200px;
		display: block;
	}
	.allHotProd,.allNewProd,.alltejiaProd{
		padding:20px 0;
	}
	.moreProd{
		float:right;
		margin:10px 10px 20px 0;
		font-size:26px;
		display:block;
		height:40px;
	}
	.more {
		color:#000;
	}
	.over {
    position: fixed;
    bottom: 100px;
    right: -10px;
	}

	/*.over p {
	    position: relative;
	    width: 112px;
	    height: 112px;
	    display: inline-block;
	    float: right;
	    margin-right: 100px;
	    text-align: center;
	}*/

	.over img {
	    display: inline-block;
	    width: 112px;
	    height: 112px;
	    float: right;
	    margin: 0px 20px 15px 0;
	}
	#scrolltop {
	    display: none;
	}
	footer{
		position: fixed;
		/*height:88px;*/
		width:100%;
		bottom:0;
		left:0;
		background:#fff;
		display:flex;
		padding:20px 0;
	}
	footer .links{
		flex:1;
		text-align: center;
	}
	footer p{
		color:#999;
	}
	footer img{
		width:50px;
		height:50px;
		/*display:inline-block;*/
	}

</style>