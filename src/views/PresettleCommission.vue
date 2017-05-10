<!-- 未结算佣金  findAlreadyCommission已结算-->
<template>
	<div>
		<commissionList :commissionData='dataType'></commissionList>
	</div>
</template>

<script type="text/javascript">
	import CommissionList from './CommissionList.vue'
	export default {
		data(){
			return {
				dataType:'{"type":"already","userId":"'+this.$route.query.userId+'"}'
			}
		},
		components:{
			commissionList:CommissionList
		}
	}
</script>