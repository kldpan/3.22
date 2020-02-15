<template>
    <div class="senderInfo">
      <!-- 第一层 -->
      <div class="floor-n1">
        <span class="loadIcon">卸</span>
        <span class="title">收货人信息</span>  
      </div> 

      <!-- 第二层 -->
      <div class="floor-n2">
        <span class="locationIcon"></span>
        <input type="text" placeholder="详细地址（精确到门牌号）" v-model="detailedAddress">
      </div>

      <!-- 第三层 -->
      <div class="floor-n3">
        <div class="sender fl">
          <span class="senderIcon"></span>
          <input class="sendername" placeholder="联系人">
        </div>
        <div class="phone fl">
          <span class="phoneIcon"></span>
          <input class="phonenumber" placeholder="联系电话">
          <span class="contacts">通信录</span>
        </div>
      </div>

      <!-- 第四层 -->
      <div class="submit">
        <div class="subbtn">确定</div>
      </div>


    </div>
</template>

<script>
    export default {
        data(){
            return {
                
            }
        },

    }
</script>

<style lang="scss" scoped>
    .senderInfo{
      width:r(690);
      height: r(394);
      border-radius:r(10);
      background: rgba(255,255,255,1);
      position:fixed;
      left:r(30);
      bottom:r(30);
      z-index: 10000;
      box-shadow:0px 3px 20px rgba(0,0,0,0.16);
    }
</style>