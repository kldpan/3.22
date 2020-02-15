<template>
  <div class="goodsInfo">
    <!-- 第一层 -->
    <div class="floor-n1">
      <span class="backIcon" @click="goBack()"></span>
      <span class="title">货物信息</span>
    </div>
    <!-- 第二层 -->
    <div class="floor-n2">
      <!-- 第一层 -->
      <div class="goodsType">

      </div>
      <!-- 第二层 -->
      <div class="measure">

      </div>
      <!-- 第三层 -->
      <div class="submit">
        <button>确定</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {

    }
  },
  mounted(){

  },
  methods:{
    goBack(){
      this.$router.back();
    }
  }
};
</script>

<style lang="scss" scoped>
.goodsInfo{
  width:100%;
  height: r(1334);
  position: absolute;
  z-index: 10000000;
  background: #F2F6F7;
  // 第一层
  .floor-n1{
    width:100%;
    height:r(88);
    background:#fff;
    .backIcon{
    display: inline-block;
    width:r(22);
    height:r(36);
    background: url(../assets/back.png) no-repeat 0 0;
    background-size: r(22) r(36);
    margin-left:r(28);
    vertical-align: middle;
    }
    .title{
      line-height: r(88);
      font-size: r(36);
      font-weight: 900;
      color:#333;
      display: inline-block;
      margin-left:r(254);
      vertical-align: middle;
      letter-spacing:r(2);
    }
  }
  // 第二层
  .floor-n2{
    width:100%;
    height:r(1246);
    overflow: hidden;
    .goodsType{
      width:r(690);
      height: r(397);
      background: #fff;
      margin:0 auto;
      margin-top:r(20);
      border-radius: r(10);
    }
    .measure{
      width:r(690);
      height: r(266);
      background: #fff;
      margin:0 auto;
      margin-top:r(39);
      border-radius: r(10);
    }
    .submit{
      width:r(300);
      height:r(86);
      margin:r(368) auto 0;
      button{
        width:100%;
        height: 100%;
        border-radius: r(43);
        background: #0350A0;
        border:none;
        font-size: r(32);
        color:#fff;
        font-family: PingFang SC;
        letter-spacing: r(2);
      }
    }
  }
  
}
</style>