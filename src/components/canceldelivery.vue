<template>
  <div class="canceldelivery">
    <!-- 第一层 -->
    <div class="title">
        <span class="back"></span>
        <span class="titlename">取消货源</span>
    </div>

    <!-- 第二层 -->
    <div class="body">
      <span class="notice">您的货源已成功取消</span>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {

    }
  }
};
</script>

<style lang="scss" scoped>
.canceldelivery{
  width:100%;
  height:r(1334);
  background:#F2F6F7;
  position:fixed;
  top:0;
  left:0;
  z-index:100000;
  .title{
    width:100%;
    height:r(88);
    background:#fff;
    line-height:r(88);
    .back{
        display:inline-block;
        width:r(22);
        height:r(36);
        background:url(../assets/back.png) no-repeat;
        background-size:r(22) r(36);
        margin:r(26) 0 r(26) r(30);
        vertical-align:middle;
    }
    .titlename{
        font-size:r(36);
        margin-left:r(252);
        color:#333;
        font-weight:700;
        vertical-align:middle;
    }
  }

  .body{
    width:100%;
    height:r(135);
    display:flex;
    .notice{
      margin:auto;
    }
  }
}
</style>