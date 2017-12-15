<template>
  <div class="index">
		<p @click="goPage()">点击回首页</p><br>
		<div>
			<input ref="putImage" id="file" type="file" accept="image/*" multiple="multiple" @change="putImages()"/>	
			<div v-show="show">
				<img :src="src" class="imgs">
				<p>
					<span>原图片大小：{{sourceSize}}</span>
					<span>压缩之后大小：{{resultSize}}</span>
					<span>缩小比例：{{scale}}</span>
				</p>
				<div @click="upLoad()" style="color:#f00">
					上传到阿里云
				</div>
			</div>
			
		</div>
		
  </div>
</template>

<script>
import lrz from "lrz";
import oss from "ali-oss";
// import fs from 'fs';
export default {
	data(){
		return{
			sourceSize:"",
			resultSize:"",
			scale:"",
			src:"",
			obj:{},
			show:false
		}
	},
	methods:{
		goPage(){
			// this.$router.push("shouye")
			location.href="#/shouye"
		},
		putImages(){

			localStorage.debug = 'ali-oss'
			let images = this.$refs.putImage;
			let that = this;
			lrz(images.files[0], {
		        width: 400
		    }).then(function (rst) {
		    	console.log(rst)
				   const client = new oss.Wrapper({
                        // region:"oss-cn-hangzhou",
                        endpoint:"http://oss-cn-hangzhou.aliyuncs.com",
                        accessKeyId: "lOUh79U42WprDwjz",
                        accessKeySecret: "pBkZa8VphCjA1uezkYlZcx2TmUxNfv",
                        bucket:"www-11wlw-net"
                    })
				   let file = rst.origin.name;
				    let files1 = new window.File( [rst.file], new Date().getTime()+ ".jpg", {type: rst.file.type})
				    console.log(files1)
				    client.multipartUpload(files1.name, files1).then((result)=>{
			            console.log(result);
		          	}).catch(function (err) {
		           		console.log(err);
		          	});
		      
		    	that.show = true;
		    	console.log(rst)
		    	that.sourceSize = (images.files[0].size / 1024).toFixed(2);
		    	that.resultSize = (rst.fileLen / 1024).toFixed(2);
		    	that.scale = parseInt(100 - (that.resultSize / that.sourceSize * 100))+"%";
		    	that.src = rst.base64;
		    })
		},
	},
	mounted(){
		
	}
}
</script>
<style scoped>
	.imgs{
		width:300px;
		height:300px;
		border: 2px solid #ccc;
	}
</style>