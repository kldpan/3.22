<template>
  <div class="delivery" ref="nodes">
    <!-- 第一层 -->
    <div class="dispatch">
      <!-- 装一 -->
      <div class="send-n1 clearfix">
        <div class="send-n1-left fl">
          <div class="sendIcon-n1">装</div>
        </div>
        <div class="send-n1-address fl">
          <div class="send-n1-big-area" @click="toLoadMap()">{{loadCityArea}}</div>
          <!-- <div class="send-n1-big-area" @click="toPath('/loadmap')" v-else>{{loadCityArea}}</div> -->
          <div class="send-n1-small-area">{{loadDetailAddress}}</div>
        </div>
        <div class="sendMore-n1 fr">
          <span class="sendMore-n1-span" v-show="!bool"></span>
        </div>
      </div>

      <!-- 装二 -->
      <!-- <div class="send-n2 clearfix" v-show="bool">
         <div class="send-n2-left fl">
           <div class="sendIcon-n2">装</div>
         </div>
         <div class="send-n2-address fl">
           <div class="send-n2-big-area">填写城市 / 区域</div>
           <div class="send-n2-small-area">点击输入详地址</div>
         </div>
         <div class="sendMore-n2 fr">
           <span class="sendMore-n2-span" @click="setBool()"></span>
         </div>
      </div>-->

      <!-- 卸一 -->
      <div class="receive-n1 clearfix">
        <div class="receive-n1-left fl">
          <div class="receiveIcon-n1">卸</div>
        </div>
        <div class="receive-n1-address fl">
          <div class="receive-n1-big-area" @click="toPath('/unloadmap')">填写城市/区域</div>
          <div class="receive-n1-small-area">点击输入详地址</div>
        </div>
        <div class="receiveMore-n1 fr">
          <span class="receiveMore-n1-span" v-show="!showNum"></span>
        </div>
      </div>

      <!-- 卸二 -->
      <!-- <div class="receive-n2 clearfix" v-show="showNum">
        <div class="receive-n2-left fl">
           <div class="receiveIcon-n2">卸</div>
         </div>
         <div class="receive-n2-address fl">
           <div class="receive-n2-big-area">填写城市/区域</div>
           <div class="receive-n2-small-area">点击输入详地址</div>
         </div>
         <div class="receiveMore-n2 fr">
           <span class="receiveMore-n2-span" @click="setShowNum(0)"></span>
         </div>
      </div>-->

      <!-- 测距及选择几装几卸 -->
      <div class="n3 clearfix">
        <div class="length fl">
          <p>运输距离 : {{distance}}公里</p>
        </div>
        <div class="loadway fr" @click="selectLoadway()">
          <span class="add">+</span>
          <span class="loadwaymore">{{userSelectLoadWay || '一装一卸'}}</span>
        </div>
      </div>

      <div class="loadwayModal" v-show="isLoadwayModalShow">
        <div class="cancelArea" @click="closeLoadwayModal()"></div>
        <div class="selectArea">
          <!-- 第一层 -->
          <div class="title">
            <span class="cancel" @click="closeLoadwayModal()">取消</span>
            <span class="titlename">几装几卸</span>
            <span class="submit" @click="submitLoadway()">完成</span>
          </div>
          <!-- 第二层 -->
          <ul>
            <li
              v-for="(item,index) in loadway"
              :key="index"
              @click="changeLoadWay(item,index)"
              :class="num === index ? 'selectedWay' : 'otherLoadWay'"
            >
              <span>{{item}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 第二层 -->
    <!-- <div class="infos">
      <div class="goodsInfo clearfix">
        <div class="option-n1 fl">货物信息</div>
        <div class="option-n1-info fr" @click="toPath('/goodsInfo')">
          <div class="goodsInfoInput">请输入货物信息</div>
          <span></span>
        </div>
      </div>
      <div class="carInfo clearfix">
        <div class="option-n2 fl">车型车长</div>
        <div class="option-n2-info fr" @click="isModelShow()">
          <div class="carInfoInput">非必选项</div>
          <span></span>
        </div>
      </div>
      <div class="loadWay clearfix">
        <div class="option-n3 fl">几装几卸</div>
        <div class="option-n3-info fl">
          <ul>
            <li v-for="(item,index) in loadWay" :key="index" @click="changeLoadWay(index)" :class="num === index ? 'selectedWay fl' : 'otherLoadWay fl'">{{item}}</li>
          </ul>
        </div>
      </div>
    </div>-->

    <!-- 第三层 -->
    <div class="publish" @click="publish()">
      <button>发布</button>
    </div>

    <!-- 第四层 -->
    <div class="permanent">
      <div class="header clearfix">
        <div class="option fl">常发货源</div>
        <div class="option-info fl" @click="goPermanent()">
          <div class="allPermanent">全部常发货源</div>
          <span></span>
        </div>
      </div>
      <div class="permanentdata" v-if="testData.length !== 0">
        <ul>
          <li v-for="(item,index) in testData" :key="index">{{item.title}}</li>
        </ul>
      </div>
      <div class="permanent-content" v-else="testData.length === 0">
        <p>您尚未保存任何常发货源</p>
      </div>
    </div>

    <!-- 第五层 -->
    <!-- <div class="car"> -->
    <!-- <mt-popup v-model="popupVisible" postion="bottom" pop-transition="popup-fade">
    <div class="car" ref="model">-->
    <!-- 第一层 -->
    <!-- <div class="title">
          <span class="cancel">取消</span>
          <span class="titlename">车型车长</span>
          <span class="submit">完成</span>
    </div>-->
    <!-- 第二层 -->
    <!-- <div class="carlength">
          <div class="floor-n1">
            <span class="length">车长</span>
            <span class="notice">(必填，最多填3项)</span>
          </div>
          <div class="selectlength">
            <ul>
              <li v-for="(item,index) in carLength" :key="index" :class="carLengthNum === index ? 'selected' : 'noSelected'" @click="selectCarLength(index)">{{item}}</li>
            </ul>
          </div>
        </div>
    </div>-->
    <!-- </mt-popup> -->
    <!-- </div> -->

    <!-- 第五层 -->
    <div class="model" v-show="modelShow">
      <div class="model-control" @click.stop="closeModel()"></div>
      <div class="car">
        <!-- 第一层 -->
        <div class="title">
          <span class="cancel" @click.stop="closeModel()">取消</span>
          <span class="titlename">车型车长</span>
          <span class="submit">完成</span>
        </div>
        <!-- 第二层 -->
        <div class="carlength">
          <div class="floor-n1">
            <span class="length">车长</span>
            <span class="notice">(必填，最多填3项)</span>
          </div>
          <div class="floor-n2" ref="userCarLength">
            <ul>
              <li
                v-for="(item,index) in carLength"
                :key="index"
                :class="item.bool === true ? 'selected-carlength fl' : 'noselected-carlength fl'"
                @click.stop="selectCarLength(item,index)"
              >{{item.carLength}}</li>
            </ul>
          </div>
        </div>
        <!-- 第三层 -->
        <div class="cartype">
          <div class="floor-n1">
            <span class="type">车型</span>
            <span class="notice">(必填，最多填3项)</span>
          </div>
          <div class="floor-n2" ref="userCarType">
            <ul>
              <li
                v-for="(item,index) in carType"
                :key="index"
                :class="carTypeNum === index ? 'selected-cartype fl' : 'noselected-cartype fl'"
                @click.stop="selectCarType(item,index)"
              >{{item}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- 定位（不出现地图，直接定位） -->
    <!-- <div class="amap-page-container">
      <div :style="{width:'100%',height:'100px'}">
        <el-amap vid="amap" :plugin="plugin" class="amap-demo" :center="center">
        </el-amap>
      </div>
    </div>-->
    <!-- <div class="container" style="width:300px;height:150px;background:pink">

    </div>-->
  </div>
</template>

<script>
export default {
  name: "delivery",
  data() {
    const self = this;
    return {
      popupVisible: false,
      bool: false,
      showNum: 0,
      num: 0,
      carLengthNum: 0,
      carTypeNum: 0,
      modelShow: false,
      isSelected: [],
      loadway: ["一装一卸", "两装一卸", "一装两卸", "两装两卸"],
      loadwayBool: false,
      userSelectLoadWay: "",
      isLoadwayModalShow: false,
      permanentData: "",
      carLength: [
        { carLength: 8.7, bool: false },
        { carLength: 9.6, bool: false },
        { carLength: 11.7, bool: false },
        { carLength: 12.5, bool: false },
        { carLength: 13, bool: false },
        { carLength: 13.7, bool: false },
        { carLength: 15, bool: false },
        { carLength: 16, bool: false },
        { carLength: 17.5, bool: false }
      ],
      carType: [
        "平板",
        "高栏",
        "厢式",
        "集装箱",
        "自卸",
        "冷藏",
        "保温",
        "高低板",
        "面包车",
        "棉被车",
        "爬梯车",
        "飞翼车"
      ],
      userCarLength: [],
      userCarType: [],
      current: {},
      testData: [],
      currentPosition: "",
      loadCityArea: "填写城市 / 区域",
      loadDetailAddress: "点击输入详细地址",
      sendBackInfo: {},
      distance: 0
    };
  },
  beforeRouteEnter(to, from, next) {
    console.log(to);
    console.log(from);
    next();
  },
  mounted() {
    // 进入首页从vuex中将location和address取出
    if (JSON.stringify(this.$route.query) === "{}") {
      console.log("初始化");
      setTimeout(() => {
        this.getLocation();
      }, 1000);
    } else {
      console.log("返回");
      // loadmap页跳转回来首页
      this.sendBackInfo = this.$route.query;
      console.log(this.sendBackInfo);
      this.loadCityArea =
        this.sendBackInfo.addDetailedInfo.addressComponent.province +
          " / " +
          this.sendBackInfo.addDetailedInfo.addressComponent.city ||
        this.sendBackInfo.addDetailedInfo.addressComponent.district;
      this.loadDetailAddress =
        this.sendBackInfo.addDetailedInfo.addressComponent.district +
        this.sendBackInfo.addDetailedInfo.addressComponent.township +
        this.sendBackInfo.addDetailedInfo.addressComponent.street +
        this.sendBackInfo.addDetailedInfo.addressComponent.streetNumber;
    }

    // 后端测试数据
    // this.$apis.getTest01().then(res => {
    //   console.log(res);
    // });
  },
  watch: {},
  beforeDestroy() {
    // console.log(this);
  },
  beforeRouteUpdate(to, from, next) {
    // if (to.path === "/") {
    //   console.log(this.loadCityArea);
    //   // setTimeout(() => {
    //   //   if (this.$store.state.location.status === 1) {
    //   //     this.loadCityArea =
    //   //       this.$store.state.location.addressComponent.province +
    //   //       " / " +
    //   //       this.$store.state.location.addressComponent.city;
    //   //     this.loadDetailAddress =
    //   //       this.$store.state.location.addressComponent.district +
    //   //       this.$store.state.location.addressComponent.township +
    //   //       this.$store.state.location.addressComponent.street +
    //   //       this.$store.state.location.addressComponent.streetNumber;
    //   //   }
    //   // }, 1000);
    //   next();
    // } else if (from.path === "/loadmap") {
    //   console.log(this.loadCityArea);
    //   this.loadCityArea = from.query.add;
    //   next();
    // }
  },

  beforeRouteEnter(to, from, next) {
    console.log(to);
    console.log(from);
    next();
  },
  // 路由守卫
  // beforeRouteLeave(to, from, next) {
  //   console.log(to);
  //   console.log(from);
  //   console.log(next);
  //   if (to.path === "/deliverydetails") {
  //     // 获取cookie内的token
  //     console.log(this);
  //   }
  // },
  methods: {
    getLocation() {
      if (this.$store.state.address) {
        this.loadCityArea =
          this.$store.state.location.addressComponent.province +
          " / " +
          this.$store.state.location.addressComponent.city;
        this.loadDetailAddress =
          this.$store.state.location.addressComponent.district +
          this.$store.state.location.addressComponent.township +
          this.$store.state.location.addressComponent.street +
          this.$store.state.location.addressComponent.streetNumber;
      }
    },
    changeLoadWay(item, index) {
      this.num = index;
      this.userSelectLoadWay = item;
      if (index === 0) {
        this.loadwayBool = false;
      } else if (index === 1) {
        this.loadwayBool = true;
      } else if (index === 2) {
        this.loadwayBool = false;
      } else if (index === 3) {
        this.loadwayBool = !this.loadwayBool;
      }
    },
    setBool() {
      this.bool = !this.bool;
    },
    setShowNum(num) {
      this.showNum = num;
    },
    toLoadMap() {
      this.toPath("/loadmap");
      // this.$route.query = {};
    },
    toPath(url) {
      this.$router.push(url);
    },
    closeModel() {
      this.modelShow = false;
    },
    selectCarLength(item, index) {
      item.bool = !item.bool;
      if (item.bool) {
        this.userCarLength.push(item);
      } else {
        this.userCarLength.splice(this.userCarLength.indexOf(item), 1);
      }
      if (this.userCarLength > 3) {
        for (let i = 0; i < this.userCarLength.length; i++) {
          if (index !== i) {
            this.userCarLength[i].bool = false;
          }
        }
      }
      console.log(this.userCarLength);
      // if(this.userCarLength.length > 3){
      //   item.bool = !item.bool;

      // }
    },
    selectCarType(item, index) {
      this.carTypeNum = index;
      this.userCarType.push(item);
    },
    isModelShow() {
      this.modelShow = !this.modelShow;
    },
    goPermanent() {
      this.toPath("/index/permanent");
      this.$parent.$parent.num = 3;
    },
    selectLoadway() {
      this.isLoadwayModalShow = true;
    },
    submitLoadway() {
      this.isLoadwayModalShow = false;
    },
    closeLoadwayModal() {
      this.isLoadwayModalShow = false;
      this.userSelectLoadWay = "";
      this.num = 0;
    },
    publish() {
      this.$router.push({
        path: "/deliverydetails",
        query: {
          loadAddress: 111,
          unLoadAddress: 222,
          length: 333,
          loadway: 444
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.delivery {
  width: r(750);
  margin: r(30) 0 0 r(-105);
  // 收发层
  .dispatch {
    width: r(690);
    height: r(444);
    border-radius: r(20);
    margin: 0 auto;
    background: #fff;
    // 装一
    .send-n1 {
      width: 100%;
      height: r(177);
      border-bottom: 1px solid rgba(198, 198, 198, 0.3);
      .send-n1-left {
        width: r(72);
        height: 100%;
        display: flex;
        .sendIcon-n1 {
          width: r(32);
          height: r(32);
          background: #0350a0;
          border-radius: 100%;
          color: #fff;
          font-family: PingFang SC;
          font-size: r(20);
          font-weight: 100;
          text-align: center;
          line-height: r(32);
          margin: auto;
        }
      }
      .send-n1-address {
        width: r(546);
        height: r(177);
        .send-n1-big-area {
          width: r(546);
          height: r(88);
          border-bottom: 1px solid rgba(198, 198, 198, 0.3);
          font-size: r(32);
          color: #333;
          line-height: r(88);
          font-weight: 500;
          overflow: hidden;
        }
        .send-n1-small-area {
          width: r(546);
          height: r(88);
          font-size: r(26);
          color: #999;
          line-height: r(88);
          font-weight: 500;
          overflow: hidden;
        }
      }
      .sendMore-n1 {
        width: r(72);
        height: 100%;
        display: flex;
        .sendMore-n1-span {
          display: block;
          margin: auto;
          width: r(32);
          height: r(32);
          background: url("../../assets/add.png") no-repeat;
          background-size: r(32) r(32);
        }
      }
    }
    // 装二
    .send-n2 {
      width: 100%;
      height: r(177);
      border-bottom: 1px solid rgba(198, 198, 198, 0.3);
      .send-n2-left {
        width: r(72);
        height: 100%;
        display: flex;
        .sendIcon-n2 {
          width: r(32);
          height: r(32);
          background: #0350a0;
          border-radius: 100%;
          color: #fff;
          font-family: PingFang SC;
          font-size: r(20);
          font-weight: 100;
          text-align: center;
          line-height: r(32);
          margin: auto;
        }
      }
      .send-n2-address {
        width: r(546);
        height: r(177);
        .send-n2-big-area {
          width: r(546);
          height: r(88);
          border-bottom: 1px solid rgba(198, 198, 198, 0.3);
          font-size: r(32);
          color: #333;
          line-height: r(88);
          font-weight: 500;
        }
        .send-n2-small-area {
          width: r(546);
          height: r(88);
          font-size: r(26);
          color: #999;
          line-height: r(88);
          font-weight: 500;
        }
      }
      .sendMore-n2 {
        width: r(72);
        height: 100%;
        display: flex;
        .sendMore-n2-span {
          display: block;
          margin: auto;
          width: r(32);
          height: r(32);
          background: url("../../assets/reduce.png") no-repeat;
          background-size: r(32) r(32);
        }
      }
    }
    // 卸一
    .receive-n1 {
      width: 100%;
      height: r(177);
      border-bottom: 1px solid rgba(198, 198, 198, 0.3);
      .receive-n1-left {
        width: r(72);
        height: 100%;
        display: flex;
        .receiveIcon-n1 {
          width: r(32);
          height: r(32);
          background: #f28312;
          border-radius: 100%;
          color: #fff;
          font-family: PingFang SC;
          font-size: r(20);
          font-weight: 100;
          text-align: center;
          line-height: r(32);
          margin: auto;
        }
      }
      .receive-n1-address {
        width: r(546);
        height: r(177);
        .receive-n1-big-area {
          width: r(546);
          height: r(88);
          border-bottom: 1px solid rgba(198, 198, 198, 0.3);
          font-size: r(32);
          color: #999;
          line-height: r(88);
          font-weight: 100;
        }
        .receive-n1-small-area {
          width: r(546);
          height: r(88);
          font-size: r(26);
          color: #999;
          line-height: r(88);
          font-weight: 500;
        }
      }
      .receiveMore-n1 {
        width: r(72);
        height: 100%;
        display: flex;
        .receiveMore-n1-span {
          display: block;
          margin: auto;
          width: r(32);
          height: r(32);
          background: url("../../assets/add.png") no-repeat;
          background-size: r(32) r(32);
        }
      }
    }
    // 卸二
    .receive-n2 {
      width: 100%;
      height: r(177);
      .receive-n2-left {
        width: r(72);
        height: 100%;
        display: flex;
        .receiveIcon-n2 {
          width: r(32);
          height: r(32);
          background: #f28312;
          border-radius: 100%;
          color: #fff;
          font-family: PingFang SC;
          font-size: r(20);
          font-weight: 100;
          text-align: center;
          line-height: r(32);
          margin: auto;
        }
      }
      .receive-n2-address {
        width: r(546);
        height: r(177);
        .receive-n2-big-area {
          width: r(546);
          height: r(88);
          border-bottom: 1px solid rgba(198, 198, 198, 0.3);
          font-size: r(32);
          color: #999;
          // background: red;
          line-height: r(88);
          font-weight: 100;
        }
        .receive-n2-small-area {
          width: r(546);
          height: r(88);
          font-size: r(26);
          color: #999;
          line-height: r(88);
          font-weight: 500;
        }
      }
      .receiveMore-n2 {
        width: r(72);
        height: 100%;
        display: flex;
        .receiveMore-n2-span {
          display: block;
          margin: auto;
          width: r(32);
          height: r(32);
          background: url("../../assets/reduce.png") no-repeat;
          background-size: r(32) r(32);
        }
      }
    }
    .n3 {
      width: r(650);
      height: r(50);
      margin: r(19) auto;
      .length {
        width: r(300);
        height: r(50);
        line-height: r(50);
        color: #999;
        font-size: r(26);
      }
      .loadway {
        width: r(180);
        height: r(50);
        line-height: r(50);
        border: 1px solid #ccc;
        text-align: center;
        border-radius: r(28);
        font-size: r(26);
        .add {
          color: 999;
          font-size: r(32);
          font-weight: 100;
        }
        .loadwaymore {
          color: #666;
          font-size: r(26);
          margin-left: r(10);
        }
      }
    }
    .loadwayModal {
      width: 100%;
      height: 100%;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 100000;
      background: rgba(0, 0, 0, 0.3);
      .cancelArea {
        width: 100%;
        height: r(876);
      }
      .selectArea {
        width: 100%;
        height: r(458);
        background: #fff;
        .title {
          width: r(710);
          height: r(88);
          margin: 0 auto;
          .cancel {
            font-size: r(32);
            font-family: PingFang SC;
            font-weight: 400;
            line-height: 25px;
            color: rgba(3, 80, 160, 1);
            line-height: r(88);
          }
          .titlename {
            font-size: r(32);
            font-family: PingFang SC;
            font-weight: 500;
            line-height: r(88);
            color: #333;
            margin-left: r(227);
          }
          .submit {
            font-size: r(32);
            font-family: PingFang SC;
            font-weight: 400;
            line-height: 25px;
            color: rgba(3, 80, 160, 1);
            line-height: r(88);
            margin-left: r(227);
          }
        }
        ul {
          width: r(710);
          height: r(370);
          margin: 0 auto;
          .selectedWay {
            font-family: PingFang SC;
            text-align: center;
            width: r(710);
            height: r(92);
            background: #f7f7f7;
            border-top: 1px solid rgba(198, 198, 198, 0.3);
            line-height: r(50);
            color: #0350a0;
            background: #fff;
            margin: 0 auto;
            span {
              display: block;
              width: r(160);
              height: r(56);
              font-size: r(26);
              font-family: PingFang SC;
              margin: r(18) auto;
              border-radius: r(28);
              border: 1px solid #0350a0;
              line-height: r(56);
            }
          }
          .otherLoadWay {
            font-family: PingFang SC;
            text-align: center;
            width: r(710);
            height: r(92);
            background: #f7f7f7;
            border-top: 1px solid rgba(198, 198, 198, 0.3);
            line-height: r(50);
            color: #666;
            background: #fff;
            margin: 0 auto;
            span {
              display: block;
              width: r(160);
              height: r(56);
              font-size: r(26);
              font-family: PingFang SC;
              margin: r(18) auto;
              border-radius: r(28);
              background: #f7f7f7;
              line-height: r(56);
            }
          }
        }
      }
    }
  }
  // 货物信息层
  .infos {
    width: r(690);
    height: r(266);
    border-radius: r(20);
    margin: r(20) auto 0;
    background: #fff;
    .goodsInfo {
      width: 100%;
      height: r(88);
      .option-n1 {
        width: r(160);
        height: r(88);
        font-size: r(30);
        color: #333;
        font-family: PingFang SC;
        line-height: r(88);
        text-align: center;
      }
      .option-n1-info {
        width: r(530);
        height: r(88);
        border-bottom: 1px solid rgba(198, 198, 198, 0.3);
        .goodsInfoInput {
          font-size: r(26);
          line-height: r(88);
          margin-left: r(297);
          display: inline-block;
          vertical-align: middle;
          font-family: PingFang SC;
          color: #999;
        }
        span {
          display: inline-block;
          vertical-align: middle;
          width: r(14);
          height: r(88);
          background: url("../../assets/right.png") no-repeat center;
          background-size: r(14) r(30);
          margin-left: r(18);
        }
      }
    }
    .carInfo {
      width: 100%;
      height: r(88);
      .option-n2 {
        width: r(160);
        height: r(88);
        font-size: r(30);
        color: #333;
        font-family: PingFang SC;
        line-height: r(88);
        text-align: center;
      }
      .option-n2-info {
        width: r(530);
        height: r(88);
        border-bottom: 1px solid rgba(198, 198, 198, 0.3);
        .carInfoInput {
          font-size: r(26);
          line-height: r(88);
          margin-left: r(374);
          display: inline-block;
          vertical-align: middle;
          font-family: PingFang SC;
          color: #999;
        }
        span {
          display: inline-block;
          vertical-align: middle;
          width: r(14);
          height: r(88);
          background: url("../../assets/right.png") no-repeat center;
          background-size: r(14) r(30);
          margin-left: r(18);
        }
      }
    }
    .loadWay {
      width: 100%;
      height: r(88);
      .option-n3 {
        width: r(160);
        height: r(88);
        font-size: r(30);
        color: #333;
        font-family: PingFang SC;
        line-height: r(88);
        text-align: center;
      }
      .option-n3-info {
        width: r(530);
        height: r(88);
        ul {
          width: r(530);
          height: r(88);
          .selectedWay {
            font-family: PingFang SC;
            text-align: center;
            width: r(120);
            height: r(50);
            border-radius: r(28);
            background: #f7f7f7;
            border: 1px solid #0350a0;
            line-height: r(50);
            color: #0350a0;
            margin-right: r(10);
            margin-top: r(19);
            background: #fff;
          }
          .otherLoadWay {
            font-family: PingFang SC;
            text-align: center;
            width: r(120);
            height: r(50);
            border-radius: r(28);
            background: #f7f7f7;
            line-height: r(50);
            margin-right: r(10);
            margin-top: r(19);
          }
        }
      }
    }
  }

  // 发布按钮区
  .publish {
    width: r(690);
    height: r(86);
    margin: r(20) auto;
    button {
      width: r(690);
      height: r(86);
      border-radius: r(43);
      background: #f28312;
      border: none;
      font-size: r(32);
      color: #fff;
      font-weight: 100;
    }
  }

  // 常发货源区
  .permanent {
    width: r(690);
    height: r(191);
    margin: r(20) auto 0;
    background: #fff;
    border-radius: r(20);
    .header {
      width: 100%;
      height: r(88);
      border-bottom: 1px solid rgba(198, 198, 198, 0.3);
      .option {
        width: r(160);
        height: r(88);
        line-height: r(88);
        text-align: center;
        font-size: r(30);
        font-family: PingFang SC;
        color: #333;
      }
      .option-info {
        width: r(530);
        height: r(88);
        border-bottom: 1px solid rgba(198, 198, 198, 0.3);
        .allPermanent {
          font-size: r(26);
          line-height: r(88);
          margin-left: r(322);
          display: inline-block;
          vertical-align: middle;
          font-family: PingFang SC;
          color: #999;
        }
        span {
          display: inline-block;
          vertical-align: middle;
          width: r(14);
          height: r(88);
          background: url("../../assets/right.png") no-repeat center;
          background-size: r(14) r(30);
          margin-left: r(18);
        }
      }
    }
    .permanentdata {
      width: 100%;
      height: r(102);
      overflow: auto;
    }
    .permanent-content {
      width: 100%;
      height: r(102);
      p {
        font-size: r(26);
        font-family: PingFang SC;
        color: #999;
        text-align: center;
        font-weight: 500;
        line-height: r(26);
        margin-top: r(27);
      }
    }
  }

  // 车型车长区（模态框）
  .model {
    width: r(750);
    height: r(1334);
    background: rgba(0, 0, 0, 0.3);
    position: absolute;
    left: r(-106);
    top: r(-88);
    z-index: 1000000000;
    .model-control {
      width: r(750);
      height: r(720);
    }
    .car {
      width: r(750);
      height: r(614);
      position: fixed;
      bottom: 0;
      z-index: 1000000;
      // float:left;
      // margin-top:r(720);
      background: #fff;
      border-radius: r(10) r(10) 0 0;
      // 第一层
      .title {
        width: r(710);
        height: r(88);
        margin: 0 auto;
        border-bottom: 1px solid rgba(198, 198, 198, 0.3);
        .cancel {
          font-size: r(32);
          font-family: PingFang SC;
          font-weight: 400;
          line-height: 25px;
          color: rgba(3, 80, 160, 1);
          line-height: r(88);
        }
        .titlename {
          font-size: r(32);
          font-family: PingFang SC;
          font-weight: 900;
          line-height: r(88);
          color: #333;
          margin-left: r(227);
        }
        .submit {
          font-size: r(32);
          font-family: PingFang SC;
          font-weight: 400;
          line-height: 25px;
          color: rgba(3, 80, 160, 1);
          line-height: r(88);
          margin-left: r(227);
        }
      }
      // 第二层
      .carlength {
        width: r(710);
        height: r(222);
        margin: 0 auto;
        overflow: hidden;
        border-bottom: 1px solid rgba(198, 198, 198, 0.3);
        .floor-n1 {
          width: 100%;
          height: r(42);
          margin-top: r(20);
          line-height: r(42);
          .length {
            font-size: r(30);
            font-family: PingFang SC;
            font-weight: 500;
            color: #333;
            font-weight: 900;
          }
          .notice {
            font-size: r(30);
            font-family: PingFang SC;
            font-weight: 500;
            color: #666;
            margin-left: r(20);
          }
        }
        .floor-n2 {
          width: r(710);
          height: r(160);
          ul {
            width: r(710);
            height: r(160);

            display: flex;
            flex-wrap: wrap;
            .selected-carlength {
              width: r(126);
              height: r(50);
              border: 1px solid #0350a0;
              border-radius: r(28);
              text-align: center;
              line-height: r(50);
              font-size: r(26);
              color: #0350a0;
              margin: r(15) r(15) 0 0;
              box-sizing: border-box;
            }
            .noselected-carlength {
              width: r(126);
              height: r(50);
              border-radius: r(28);
              text-align: center;
              line-height: r(50);
              font-size: r(26);
              color: #666;
              background: #f7f7f7;
              margin: r(15) r(15) 0 0;
              box-sizing: border-box;
            }
          }
        }
      }
      // 第三层
      .cartype {
        width: r(710);
        height: r(300);
        margin: 0 auto;
        overflow: hidden;
        .floor-n1 {
          width: 100%;
          height: r(42);
          margin-top: r(20);
          line-height: r(42);
          .type {
            font-size: r(30);
            font-family: PingFang SC;
            font-weight: 500;
            color: #333;
            font-weight: 900;
          }
          .notice {
            font-size: r(30);
            font-family: PingFang SC;
            font-weight: 500;
            color: #666;
            margin-left: r(20);
          }
        }
        .floor-n2 {
          width: r(710);
          height: r(240);
          border-bottom: 1px solid rgba(198, 198, 198, 0.3);
          ul {
            width: r(710);
            height: r(240);
            display: flex;
            flex-wrap: wrap;
            .selected-cartype {
              width: r(126);
              height: r(50);
              border: 1px solid #0350a0;
              border-radius: r(28);
              text-align: center;
              line-height: r(50);
              font-size: r(26);
              color: #0350a0;
              margin: r(16) r(16) 0 0;
              box-sizing: border-box;
            }
            .noselected-cartype {
              width: r(126);
              height: r(50);
              border-radius: r(28);
              text-align: center;
              line-height: r(50);
              font-size: r(26);
              color: #666;
              background: #f7f7f7;
              margin: r(15) r(15) 0 0;
              box-sizing: border-box;
            }
          }
        }
      }
    }
  }
}
</style>