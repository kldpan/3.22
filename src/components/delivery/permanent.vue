<template>
  <div class="permanent">
    <!-- <div class="frequent"> -->
      <ul>
        <li v-for="(source,index) in $store.state.cargoSources" :key="index" class="frequentGoods">
          <!-- 第一层 -->
          <div class="floor-n1 clearfix">
            <div class="from fl">{{toCityName(source.origin)}}</div>
            <span class="direct fl"></span>
            <div class="to fl">{{toCityName(source.destination)}}</div>
          </div>
          <!-- 第二层 -->
          <div class="floor-n2 clearfix">
            <span class="carlength">{{source.vehicle.length}}米</span>
            <span class="carstyle">{{source.vehicle.type}}</span>
            <span class="goodsinfo">{{source.cargo.weight}}吨</span>
            <span class="goodsName">/{{source.cargo.type}}</span>
          </div>
          <!-- 第三层 -->
          <div class="floor-n3">
            <button class="fastDelivery">再发一单</button>
            <button class="delete" @click="del(source)">删除</button>
          </div>
        </li>
      </ul>
      <!-- more -->
      <div class="more"></div>
    <!-- </div> -->
  </div>
</template>

<script>
import data from "@/components/common/address.json";

const map = new Map();
for (let record1 of data) {
  for (let record2 of record1.childs) {
    for (let record3 of record2.childs) {
      map.set(record3.code, record3.name);
    }
  }
}

export default {
  async created() {
    await this.$store.dispatch("fetchCargoSources");
  },
  mounted(){
    
  },
  methods: {

    toCityName(code) {
      return map.get(code.substring(0, 6));
    },

    async del(source) {
      await this.$store.dispatch("deleteCargoSource", source);
    }
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