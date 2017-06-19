<template>
  <section class="list">
     <ul class="list-ul">
         <li id="li" class="list-li">
             <div class="con">
                 你的快递到了，请到楼下签收
             </div>
             <div class="btn">删除</div>
         </li>
         <li class="list-li">
             <div class="con">
                 <div>我是文字</div>
             </div>
             <div class="btn" @click='deleteItem'>删除</div>
         </li>
     </ul>
 </section>
</template>

<script type="text/javascript">
  export default {
    methods:{
      deleteItem(){
        alert(2);
      }
    },
    created(){
      window.addEventListener('load',function(){
          alert(1);
          var initX;        //触摸位置
          var moveX;        //滑动时的位置
          var X = 0;        //移动距离
          var objX = 0;    //目标对象位置
          var deviceW = document.documentElement.clientWidth; 
          var aaa = deviceW / 5;
          window.addEventListener('touchstart',function(event){
              event.preventDefault();
              var obj = event.target.parentNode;
              console.log(obj);
              if(obj.className == "list-li"){
                  initX = event.targetTouches[0].pageX;
                  objX =(obj.style.WebkitTransform.replace(/translateX\(/g,"").replace(/px\)/g,""))*1;
              }
              if( objX == 0){
                  window.addEventListener('touchmove',function(event) {
                      event.preventDefault();
                      var obj = event.target.parentNode;
                      if (obj.className == "list-li") {
                          moveX = event.targetTouches[0].pageX;
                          X = moveX - initX;
                          if (X >= 0) {
                              obj.style.WebkitTransform = "translateX(" + 0 + "px)";
                          }
                          else if (X < 0) {
                              var l = Math.abs(X);
                              obj.style.WebkitTransform = "translateX(" + -l + "px)";
                              if(l>aaa){
                                  l=aaa;
                                  obj.style.WebkitTransform = "translateX(" + -l + "px)";
                              }
                          }
                      }
                  });
              }
              else if(objX<0){
                  window.addEventListener('touchmove',function(event) {
                      event.preventDefault();
                      var obj = event.target.parentNode;
                      if (obj.className == "list-li") {
                          moveX = event.targetTouches[0].pageX;
                          X = moveX - initX;
                          if (X >= 0) {
                              var r = -aaa + Math.abs(X);
                              obj.style.WebkitTransform = "translateX(" + r + "px)";
                              if(r>0){
                                  r=0;
                                  obj.style.WebkitTransform = "translateX(" + r + "px)";
                              }
                          }
                          else {     //向左滑动
                              obj.style.WebkitTransform = "translateX(" + -aaa + "px)";
                          }
                      }
                  });
              }
  
          })
          window.addEventListener('touchend',function(event){
              event.preventDefault();
              var obj = event.target.parentNode;
              if(obj.className == "list-li"){
                  objX =(obj.style.WebkitTransform.replace(/translateX\(/g,"").replace(/px\)/g,""))*1;
                  if(objX>-aaa/2){
                      obj.style.WebkitTransform = "translateX(" + 0 + "px)";
                      objX = 0;
                  }else{
                      obj.style.WebkitTransform = "translateX(" + -aaa + "px)";
                      objX = -aaa;
                  }
              }
           })
     })
    }
  }
</script>


<style type="text/css">
  header{ background: #f7483b; border-bottom: 1px solid #ccc}
  header h2{ text-align: center; line-height: 54px; font-size: 16px; color: #fff}
  .list-ul{ overflow: hidden}
  .list-li{ line-height: 60px; border-bottom: 1px solid #fcfcfc; position:relative;padding: 0 12px; color: #666;background: #f2f2f2;-webkit-transform: translateX(0px);}
  .btn{ position: absolute; top: 0; right: -20%; text-align: center; background: #ffcb20; color: #fff; width: 20%}
</style>