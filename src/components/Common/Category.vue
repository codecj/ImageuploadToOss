<template>
  <div  class="category">
  	<ul>
  		<li v-for="item in categoryList" class="borderB" :class="{selected:item.isSelected}" @click=selectCategory(item)>{{item.categoryName}}</li >
  	</ul>
  </div>
</template>
<script>
	export default {
		data () {
			return {
				
			}
		},
		props: {
			categoryList: Array
		},
		methods: {
			selectCategory(item){
				for (let i = 0; i < this.categoryList.length; i++) {
					let temp = this.categoryList[i];
					temp.isSelected = false;
				}
				item.isSelected = true;
				this.$emit('categorySelected',item);
			}
		}
	}

</script>
<style scoped>
	.category{
		width: 25%;
		height: 100%;
		background-color:white;
		float: left;
	}
	.category ul{
		width: 100%;
		height:100%;
		background-color:white;
		margin-top: 2px;
		margin-right: 1px;
		position: relative;
	}
	.category ul li{
		/*-webkit-box-sizing: border-box;
		box-sizing: border-box;*/
		padding-top: 35px;
		padding-bottom: 35px;
		padding-left: 10px;
		font-size: 28px;
		margin: 0px auto;
		width: 100%;
		/*height: 98px;*/
		/*line-height: 40px;*/
		text-align: left;
		display: -webkit-box;
   		overflow: hidden;
    	-webkit-box-orient: vertical;
    	text-overflow: ellipsis;
    	-webkit-line-clamp: 2;
	}
	.category .selected{
		background-color: #f1f2f7;
	}

</style>