<template>
  <div class="tabbar">
    
    <!-- <div v-for="(item,index) in pathList" :key="index" @click="selectIcon(index)">
      <img slot="icon" :src="`${item.ImgUrl}${num === index ? '2.png' : '1.png'}`">
    </div> -->

    <div v-model="selected" class="btm_nav">
      <div v-for="(item,index) in pathList" :key="index" class="nav" @click="selectIcon(index)">
        <div :class="btmIcon_classname[index]">
          <img slot="icon" :src="`${num === index ? item.selectedImgUrl : item.ImgUrl}`">
          <span :class="`${num === index ? 'selectedname' : 'name'}`">{{item.name}}</span>
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
        // { pathname: "index", path: "/index", ImgUrl:"https://res.bestcake.com/m-images/ww/foot/foot-menu-a-", name: "发货"},
        // { pathname: "order", path: "/order", ImgUrl:"https://res.bestcake.com/m-images/ww/foot/foot-menu-c-", name: "订单"},
        // { pathname: "mine", path: "/mine", ImgUrl:"https://res.bestcake.com/m-images/ww/foot/foot-menu-d-", name: "我的"},
        { pathname: "index", path: "/index/delivery", ImgUrl:"http://m.qpic.cn/psc?/V14WvDya21PaU3/hsnfJ.a5yg7.BhItQyNwPaq.5X7yC68rUvm6Suhh5Y9fCimMi175TNasOpdHH7V.uncE1vSNYNMd2Jy0KMA*WduwDgwvKMxeg5R5F96kTfk!/b&bo=MAAmAAAAAAADBzQ!&rf=viewer_4", selectedImgUrl:"http://m.qpic.cn/psc?/V14WvDya21PaU3/hsnfJ.a5yg7.BhItQyNwPStPnzOd5ydk.CUsVDLRnP6Odk.FCvjHY85L3E1bfnt7hTnuCGg*NjUROvVc3VlfQvwlEB1xPKJ2LmhLw7mQVZ4!/b&bo=LgAlAAAAAAADFzk!&rf=viewer_4", name: "发货"},
        { pathname: "order", path: "/order", ImgUrl:"http://m.qpic.cn/psc?/V14WvDya21PaU3/hsnfJ.a5yg7.BhItQyNwPdEWeLKwuX4D6tfrAzbdXBRd1ZUOC77l2tjV1WGtwbOfltLhfDWOLBGnfguY8gG2AjC64Tt1G4OSGByoG9aWDgE!/b&bo=LAAwAAAAAAADFy4!&rf=viewer_4", selectedImgUrl:"http://m.qpic.cn/psc?/V14WvDya21PaU3/hsnfJ.a5yg7.BhItQyNwPdyTLPS*lZ5NEoewZDL3mTtmrKRc.MKXVlHoBIVCkChNh9CwHQNV9c1HtHUIkBlY73wepYvkP*cN5*iy6aw9aYA!/b&bo=KgAuAAAAAAADFzY!&rf=viewer_4", name: "订单"},
        { pathname: "logout", path: "/logout", ImgUrl:"http://m.qpic.cn/psc?/V14WvDya21PaU3/hsnfJ.a5yg7.BhItQyNwPRaPUPbZXUJo*XVO6O3FXalwgHTPcqIDGclchjlg8r1Mp2Cxto*cWMr1tuN0pwsp0Cjx*NxPLLG4TFktHzEVHiU!/b&bo=KwAwAAAAAAADFyk!&rf=viewer_4", selectedImgUrl:"http://m.qpic.cn/psc?/V14WvDya21PaU3/hsnfJ.a5yg7.BhItQyNwPa2*BHDEUt47fqzO*rg0xALrk9cgKj3UpmMkUWs.6KUKNsSJQg0bEc54jp4S1BXls68.cHcvJeLIMNyuK*1UBQ8!/b&bo=KQAuAAAAAAADFzU!&rf=viewer_4", name: "我的"},

      ],
      selected:'',
      num:0,
      btmIcon_classname:[ "goodsIcon", "orderIcon", "mineIcon" ]
    };
  },
  methods: {
    selectIcon(index){
        // 当点击该图标时，将num换为该图标的下标值，节点处的图标链接改为图标下标处时2.png,不是该下标值时，改为1.png
        this.num = index;
        // 并在点击时跳转到各自的页面
        this.$router.push(this.pathList[index].path);
    }
  },
  mounted(){
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
.btm_nav{
  display: flex;
  width:100%;
  height:r(98);
  background-color:#fff;
  position:fixed;
  bottom:0;
  z-index: 10000;
  overflow: hidden;
  .nav{
    flex:1;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    .goodsIcon img{
      width:r(53);
      height:r(45);
    }
    .goodsIcon span{
      margin-left:r(6.75);
    }
    .orderIcon img{
      width:r(44);
      height: r(48);
    }
    .orderIcon span{
      margin-left:r(1.5);
    }
    .mineIcon img{
      width:r(43);
      height:r(48);
    }
    span{
      display: block;
      font-weight: 900;
      margin-top: r(13);
    }
    .name{
      font-family: PingFang SC;
      font-size:r(20);
      color:#BBBBBB;
      margin-top: r(13);
      margin-left: r(2);
      font-weight: 9 00;
    }
    .selectedname{
      font-family: PingFang SC;
      font-size:r(20);
      color:#0350A0;
      margin-top: r(13);
      font-weight: 900;
    }
  }
}
</style>