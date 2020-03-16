<template>
  <div class="tabbar">
    <!-- <div v-for="(item,index) in pathList" :key="index" @click="selectIcon(index)">
      <img slot="icon" :src="`${item.ImgUrl}${num === index ? '2.png' : '1.png'}`">
    </div>-->

    <!-- 后端传回icon -->
    <div class="btm_nav">
      <div v-for="(item,index) in pathList" :key="index" class="nav" @click="selectIcon(index)">
        <div :class="btmIcon_classname[index]">
          <div class="up">
            <img slot="icon" :src="`${num === index ? item.selectedImgUrl : item.ImgUrl}`" />
          </div>
          <div class="down">
            <span :class="`${num === index ? 'selectedname' : 'name'}`">{{item.name}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pathList: [
        {
          pathname: "index",
          path: "/index/delivery",
          ImgUrl: "delivery.png",
          selectedImgUrl: "delivery-selected.png",
          name: "发货"
        },
        {
          pathname: "order",
          path: "/order",
          ImgUrl: "order.png",
          selectedImgUrl: "order-selected.png",
          name: "订单"
        },
        {
          pathname: "logout",
          path: "/logout",
          ImgUrl: "mine.png",
          selectedImgUrl: "mine-selected.png",
          name: "我的"
        }
      ],
      selected: "",
      num: 0,
      btmIcon_classname: ["goodsIcon", "orderIcon", "mineIcon"]
    };
  },
  methods: {
    selectIcon(index) {
      // 当点击该图标时，将num换为该图标的下标值，节点处的图标链接改为图标下标处时2.png,不是该下标值时，改为1.png
      this.num = index;
      // 并在点击时跳转到各自的页面
      this.$router.push(this.pathList[index].path);
    },
    toDelivery() {
      this.testSrc = this.pathList[0].selectedImgUrl;
    }
  },
  mounted() {
    this.selectIcon(0);
  }
};
</script>

<style lang="scss" scoped>
// .tabbar{
//     display: flex;
//     width:100%;
//     height:r(98);
//     background-color:#fff;
//     position:fixed;
//     bottom:0;
//     z-index: 10000;
//     overflow: hidden;
//     }
// .tabbar>div{
//     flex:1;
//     display:flex;
//     justify-content: center;
// }
// .tabbar>div  img{
//   width:r(135);
//   height:r(150);
// }
.btm_nav {
  display: flex;
  width: 100%;
  height: r(98);
  background-color: #fff;
  position: fixed;
  bottom: 0;
  z-index: 10000;
  overflow: hidden;
  .nav {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    .goodsIcon img {
      width: r(53);
      height: r(45);
    }
    .goodsIcon span {
      margin-left: r(6.75);
    }
    .orderIcon img {
      width: r(44);
      height: r(48);
    }
    .orderIcon span {
      margin-left: r(1.5);
    }
    .mineIcon img {
      width: r(43);
      height: r(48);
    }
    span {
      display: block;
      font-weight: 900;
      margin-top: r(13);
    }
    .name {
      font-family: PingFang SC;
      font-size: r(20);
      color: #bbbbbb;
      margin-top: r(13);
      margin-left: r(2);
      font-weight: 9 00;
    }
    .selectedname {
      font-family: PingFang SC;
      font-size: r(20);
      color: #0350a0;
      margin-top: r(13);
      font-weight: 900;
    }
  }
}
</style>