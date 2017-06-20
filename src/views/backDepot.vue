<template>
  <div>
      <header>
        <div align="center"><img src="../assets/icon10.png" alt=""></div>
        <div>选择商品回库的仓库</div>
        <div align="center"><img src="../assets/icon10.png" alt=""></div>
      </header>
      <content>
          

      </content>
      <footer></footer>
  </div>
  
</template>

<script type="text/javascript">
 
</script>

<style scoped>

  header{
    height:88px;
    line-height:88px;
    position: fixed;
    top:0;
    left:0;
    background:#fff;
    width:100%;
  }
  header div{
    display:inline-block;
  }
  header div:nth-child(1),div:nth-child(3){
    width:12%;
    height:88px;
  }
  header div:nth-child(1) img{
    width:60px;
    height:60px;
    vertical-align: middle;
  }
  header div:nth-child(2){
    text-align: center;
    width:73%;
    font-size: 40px;
    color: #3B456C;
    letter-spacing: 0;
  }
  header div:nth-child(3) img{
    width:60px;
    height:60px;
    transform:rotate(270deg);
    vertical-align: middle;
  }
  content{
    position: absolute;
    top:88px;
    bottom:88px;
    left:0;
    z-index:-1;
    background:#ebecf0;
    height:auto;
    width:100%;
    overflow: auto;
  }
  footer{
    height:88px;
    width:100%;
    background:#f00;
    position: fixed;
    bottom:0;
    left:0;
  }
</style>