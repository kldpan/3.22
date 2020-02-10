<template>
  <div class="permanent">
    <!-- <div class="frequent"> -->
      <ul>
        <li v-for="(item,index) in frequentGoodsList" :key="index" class="frequentGoods">
          <!-- 第一层 -->
          <div class="floor-n1 clearfix">
            <div class="from fl">{{item.fromBigArea}}</div>
            <span class="direct fl"></span>
            <div class="to fl">{{item.toBigArea}}</div>
          </div>
          <!-- 第二层 -->
          <div class="floor-n2 clearfix">
            <span class="carlength">{{item.carLength}}</span>
            <span class="carstyle">{{item.carStyle}}</span>
            <span class="goodsinfo">{{item.goodsWeight ? item.goodsWeight : item.goodsVolume}}</span>
            <span class="goodsName">/{{item.goodsName}}</span>
          </div>
          <!-- 第三层 -->
          <div class="floor-n3">
            <button class="fastDelivery">再发一单</button>
            <button class="delete">删除</button>
          </div>
        </li>
      </ul>
      <!-- more -->
      <div class="more"></div>
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  data(){
    return {
      frequentGoodsList:[
        {fromBigArea:'江苏省',fromSmallArea:'苏州市',toBigArea:'北京市',toSmallArea:'昌平',carLength:'13米车',carStyle:'平板', goodsName:'棉花',goodsWeight:'5吨',goodsVolume:''},
        {fromBigArea:'江苏省',fromSmallArea:'苏州市',toBigArea:'北京市',toSmallArea:'昌平',carLength:'13米车',carStyle:'平板', goodsName:'棉花',goodsWeight:'',goodsVolume:'600立方'},
        {fromBigArea:'江苏省',fromSmallArea:'苏州市',toBigArea:'北京市',toSmallArea:'昌平',carLength:'13米车',carStyle:'平板', goodsName:'棉花',goodsWeight:'5吨',goodsVolume:''},
        {fromBigArea:'江苏省',fromSmallArea:'苏州市',toBigArea:'北京市',toSmallArea:'昌平',carLength:'13米车',carStyle:'平板', goodsName:'棉花',goodsWeight:'',goodsVolume:'200立方'},
      ],
    }
  },
  mounted(){
    
  },
  methods:{

  }
};
</script>

<style lang="scss" scoped>
  .permanent{
    width:r(750);
    margin:r(50) 0 0 r(-105);
    .frequentGoods{
      width:r(690);
      height:r(275);
      background: #fff;
      margin:0 auto;
      border-radius: r(10);
      margin-bottom:r(20);
      overflow: hidden;
      // 第一层
      .floor-n1{
        width:100%;
        height:r(67);
        margin-top:r(19);
        line-height: r(67);
        .from{
          font-size: r(32);
          font-family: PingFang SC;
          color:#333;
          font-weight: 900;
          line-height: r(67);
          margin-left:r(20);
        }
        .direct{
          display: block;
          width:r(84);
          height:r(26);
          background: url('../../assets/direct.png') no-repeat;
          background-size: r(84) r(26);
          margin-top:r(21);
          margin-left:r(60);
        }
        .to{
          font-size: r(32);
          font-family: PingFang SC;
          color:#333;
          font-weight: 900;
          line-height: r(67);
          margin-left:r(60);
        }
      }
      // 第二层
      .floor-n2{
        width:100%;
        height: r(59);
        font-size: r(26);
        padding-left:r(20);
        font-family: PingFang SC;
        line-height: r(59);
        .carstyle{
          margin:0 r(20) 0;
        }
      }
      // 第三层
      .floor-n3{
        width:r(650);
        height: r(110);
        margin:0 auto;
        border-top:1px solid rgba(198,198,198,0.3);
        .fastDelivery{
          width:r(150);
          height:r(50);
          border:none;
          background: #F28312;
          border-radius: r(28);
          margin:r(30) r(30) 0 r(344);
          color:#fff;
        }
        .delete{
          width:r(126);
              height:r(50);
              background: #fff;
              border:none;
              border:1px solid #ccc;
              border-radius: r(50);
              font-size: r(26);
              font-family: PingFang SC;
              color:#666;
              margin-top:r(30);
        }
      }
    }
    .more{
      width:100%;
      height:r(1);
      margin-bottom:r(98);
    }
  }
</style>