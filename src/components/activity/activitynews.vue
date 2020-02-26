<template>
  <div class="activitynews">
    <!-- 第一层 -->
    <div class="title">
        <span class="back"></span>
        <span class="titlename">活动</span>
    </div>

    <!-- 第二层 -->
    <div class="activitypic" @click="toPath('/activity')">
        <img src="../../assets/activitynews.jpg"/>
    </div>

  </div>
</template>

<script>
export default {
  data(){
    return {

    }
  },
  methods:{
      toPath(url){
          this.$router.push(url);
      }
  }
};
</script>

<style lang="scss" scoped>
.activitynews{
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
        background:url(../../assets/back.png) no-repeat;
        background-size:r(22) r(36);
        margin:r(26) 0 r(26) r(30);
        vertical-align:middle;
    }
    .titlename{
        font-size:r(36);
        margin-left:r(288);
        color:#333;
        font-weight:700;
        vertical-align:middle;
    }
  }

  .activitypic{
        width:r(690);
        height:r(355);
        overflow:hidden;
        border-radius:r(15);
        margin:r(20) auto;
        img{
            width:100%;
            height:100%;
        }
  }
}
</style>