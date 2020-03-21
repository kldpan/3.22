<template>
  <div class="message">
    <!-- 第一层 -->
    <div class="title clearfix">
      <div class="back fl" @click="go(-1)"></div>
      <div class="titlename fl">运单详情</div>
    </div>

    <div class="body">
      <!-- 第二层 -->
      <div class="size" ref="size">
        <div class="weight clearfix">
          <span class="name">货物重量</span>
          <span class="unit fr">吨</span>
          <input
            type="number"
            placeholder="填写大于0吨"
            v-model="userInputGoodWeight"
            @focus="userInputGoodWeight = ''"
          />
        </div>
        <div class="volume clearfix">
          <span class="name">货物体积</span>
          <span class="unit fr">方</span>
          <input type="number" placeholder="填写大于0方" v-model="userInputGoodVolume" />
        </div>
      </div>

      <!-- 第三层 -->
      <div class="goodtype">
        <div class="name">货物类型</div>
        <div class="typeoptions">
          <ul class="clearfix">
            <li
              v-for="(item,index) in goodTypeList"
              :key="index"
              :class="goodTypeNum === index ? 'selectedtype fl' : 'othertype fl'"
              @click="selectGoodType(item,index)"
            >{{item}}</li>
          </ul>
        </div>
        <div class="inputtype">
          <div class="othergood">其他物品</div>
          <div class="inputbox" ref="goodname">
            <input type="text" placeholder="请输入其他物品名称" v-model="userInputGoodName" />
          </div>
        </div>
      </div>

      <!-- 第四层 -->
      <div class="loadtimeandcartype">
        <div class="loadtime" @click="openPicker">
          <span class="name">装货时间</span>
          <span class="notice">选择装货时间</span>
          <span class="more"></span>
        </div>
        <div class="cartype" @click="carTypeModalShow()">
          <span class="name">车型车长</span>
          <span class="notice">非必选项</span>
          <span class="more"></span>
        </div>
      </div>

      <!-- 第五层 -->
      <div class="paywayandnote">
        <div class="payway" @click="payWayModalShow()">
          <span class="name">付款方式</span>
          <span class="notice">选择付款方式</span>
          <span class="more"></span>
        </div>
        <div class="note" @click="toPath('/noteinfos')">
          <span class="name">备注</span>
          <span class="notice">备注信息</span>
          <span class="more"></span>
        </div>
      </div>

      <!-- 第六层 -->
      <div class="topermanent">
        <div class="mycheck">
          <input type="checkbox" :checked="saveChecked" />
          <span>是否存为常发货源</span>
        </div>
      </div>
    </div>

    <!-- 底层 -->
    <!-- 原来 -->
    <!-- <div class="bottom clearfix">
        <span class="price">{{price || '填写重量或者体积后显示运费'}}</span>
        <span class="publish" @click="confirm()">发货</span>
    </div>-->

    <!-- 时间选择器mint部分 -->
    <!-- <div class="datePicker">
      <mt-datetime-picker
        type="time"
        ref="picker"
        date-format="{value} 年"
        time-format="{value} 日"
        minute-format="{value} 分"
        @confirm="handleConfirm"
        :startDate="startDate"
        v-model="pickerValue"
        confirmText="完成"
      ></mt-datetime-picker>
    </div>-->

    <!-- 车型车长模态框 -->
    <div class="cartypemodal" v-show="carTypeModalBool">
      <!-- 上层 -->
      <div class="closearea" @click="closeCarTypeModal()"></div>
      <!-- 选择区 -->
      <div class="cartypearea">
        <!-- 第一层 -->
        <div class="top">
          <span class="cancel" @click.stop="closeCarTypeModal()">取消</span>
          <span class="titlename">车型车长</span>
          <span class="submit" @click="complete()">完成</span>
        </div>
        <!-- 第二层 -->
        <div class="carlength">
          <div class="floor-n1">
            <span class="length">车长</span>
            <span class="notice">(必填)</span>
          </div>
          <div class="floor-n2" ref="userCarLength">
            <ul>
              <li
                v-for="(item,index) in carLength"
                :key="index"
                :class="carLengthNum === index ? 'selected-carlength fl' : 'noselected-carlength fl'"
                @click.stop="selectCarLength(item,index)"
              >
                <span>{{item}}</span>
              </li>
            </ul>
          </div>
        </div>
        <!-- 第三层 -->
        <div class="cartype">
          <div class="floor-n1">
            <span class="type">车型</span>
            <span class="notice">(非必填)</span>
          </div>
          <div class="floor-n2" ref="userCarType">
            <ul>
              <li
                v-for="(item,index) in carTypeList"
                :key="index"
                :class="carTypeNum === index ? 'selected-cartype fl' : 'noselected-cartype fl'"
                @click.stop="selectCarType(item,index)"
              >
                <span>{{item}}</span>
              </li>
            </ul>
          </div>
        </div>
        <!-- 第四层 -->
        <div class="foot">
          <span class="name">预估价：</span>
          <span class="showprice">{{'￥' + priceData[0]}}</span>
        </div>
      </div>
    </div>

    <!-- 付款方式模态框 -->
    <div class="paywaymodal" v-show="payWayModalBool">
      <!-- 上层 -->
      <div class="closearea" @click="closePayWayModal()"></div>
      <!-- 选择区 -->
      <div class="payway">
        <div class="loadpay" @click="selectLoadPay()">发货人付款</div>
        <div class="unloadpay" @click="selectUnloadPay()">收货人付</div>
        <div class="cancel" @click="closePayWayModal()">取消</div>
      </div>
    </div>

    <div class="bottom clearfix">
      <!-- 更改 -->
      <div class="uparea">
        <!-- 无价格时左 -->
        <div class="noinput fl" v-if="priceData.length === 0">
          <div class="noticearea">
            <div>填写重量和车长</div>
            <div>显示运费</div>
          </div>
        </div>
        <!-- 有价格时左 -->
        <div class="autoprice fl" v-else>
          <div class="totalprice">
            <input type="radio" :checked="selectWhichPriceChecked" @click="selectWhichPrice()" />
            <span>{{'￥' + priceData[0]}}</span>
          </div>
          <div class="averageprice">每吨约{{parseInt(priceData[0]/userInputGoodWeight)}}元</div>
          <div class="length">运距约{{distance}}公里</div>
        </div>
        <!-- 用户未输入时右 -->
        <div class="userpricenotice fr" v-if="!userInputPrice">
          <div class="selectarea">
            <input type="radio" :checked="inputChecked" @click="userInputPriceShow()" />
            <span>自己报价</span>
          </div>
        </div>
        <!-- 用户输入时右 -->
        <div class="userpriceshow fr" v-else>
          <div class="userprice">
            <div class="pricearea">
              <input type="radio" :checked="!selectWhichPriceChecked" @click="selectWhichPrice()" />
              <span>￥{{userInputPrice}}</span>
            </div>
            <div class="modifyprice" @click="modifyInputPrice()">修改运费</div>
          </div>
        </div>
      </div>

      <div class="submit" @click="sendToOrder()">发货</div>
    </div>

    <!-- 输入运费模态框 -->
    <div class="inputpricemodal" v-show="inputPriceModalBool">
      <div class="inputbox">
        <!-- 第一层 -->
        <div class="n1">期望运费</div>
        <!-- 第二层 -->
        <div class="n2">
          <div class="historyprice">
            <span class="name">历史成交:</span>
            <span
              class="priceinterval"
            >{{'￥' + historyPriceInterval.minprice + ' ~ ' + '￥' + historyPriceInterval.maxprice}}</span>
          </div>
          <div class="inputarea" ref="inputPrice">
            <input type="number" placeholder="￥  请输入期望运费" />
          </div>
          <div class="noticearea">最终运费以合同为准</div>
        </div>
        <!-- 第三层 -->
        <div class="n3 clearfix">
          <div class="cancel fl" @click="closeInputPriceModal()">取消</div>
          <div class="yes fr" @click="submitInputPrice()">确定</div>
        </div>
      </div>
    </div>

    <!-- 时间选择区 -->
    <timepicker />
  </div>
</template>

<script>
import Vue from "vue";
import timepicker from "../common/timepicker.vue";
import { Toast } from "mint-ui";
import instance from "@/core/api/http.js";
export default {
  data() {
    return {
      // params存放备注页中携参
      params: {},
      goodTypeNum: 0,
      goodTypeList: [
        "棉麻布匹",
        "机械设备",
        "金属钢材",
        "食品饮料",
        "蔬菜水果",
        "电子数码",
        "活禽活畜",
        "煤炭矿产"
      ],
      userSelectedType: "棉麻布匹",
      userInputGoodWeight: "",
      userInputGoodVolume: "",
      userInputGoodName: "",
      price: 0,
      carTypeModalBool: false,
      carLength: [17.5, 13, 9.6, 7.6, 6.8],
      carTypeList: ["平板", "高栏", "厢式", "集装箱", "高低板"],
      carLengthNum: 1,
      carTypeNum: 0,
      userSelectedCarLength: "13",
      userSelectedCarType: "平板",
      payWayModalBool: false,
      payWay: "",
      userSelectTime: "",
      userNote: [],
      priceData: [],
      userInputPrice: 0,
      inputPriceModalBool: false,
      historyPriceInterval: { minprice: 5555, maxprice: 8888 },
      saveChecked: true,
      inputChecked: false,
      selectWhichPriceChecked: true,
      distance: 0,
      toastInstanse: null
    };
  },
  components: {
    timepicker
  },
  mounted() {
    console.log(this.$route);
    console.log(this);
    if (this.$route.query.userInputNote) {
      this.params = this.$route.query;
    }
    this.getDistance();
    setTimeout(() => {
      this.getDistance();
    }, 1000);
    console.log(instance);
  },
  watch: {
    userInputGoodWeight() {
      console.log(this.userInputGoodWeight);
    }
  },
  methods: {
    go(n) {
      this.$router.go(n);
    },
    toPath(url) {
      this.$router.push(url);
    },
    selectGoodType(item, index) {
      this.goodTypeNum = index;
      this.userSelectedType = item;
    },
    userInputWeight() {
      this.userWeight = this.$refs.size.firstChild.lastChild.value || 0;
    },
    userInputVolume() {
      this.userVolume = this.$refs.size.lastChild.lastChild.value || 0;
    },
    carTypeModalShow() {
      this.carTypeModalBool = true;
    },
    closeCarTypeModal() {
      this.carTypeModalBool = false;
      this.carLengthNum = 1;
      this.carTypeNum = 0;
      this.userSelectedCarLength = "17.5";
      this.userSelectedCarType = "平板";
      console.log(this.userSelectedCarLength, this.userSelectedCarType);
    },
    inputPriceModalShow() {
      this.inputPriceModalBool = true;
    },
    selectCarLength(item, index) {
      this.carLengthNum = index;
      this.userSelectedCarLength = item;
      // 发接口
      if (!this.userInputGoodWeight) {
        this.toastInstanse = Toast({
          message: "请填写货物重量",
          position: "center",
          duration: 1000
        });
        this.toastInstanse.$el.style.zIndex = 10000000;
      } else {
        if (Number(this.userInputGoodWeight) <= 0) {
          this.toastInstanse = Toast({
            message: "填写货物重量大于0吨",
            position: "center",
            duration: 1000
          });
          this.toastInstanse.$el.style.zIndex = 10000000;
          this.userInputGoodWeight = "";
        } else {
          let countData = {
            weight: Number(this.userInputGoodWeight),
            distance: this.$store.state.distance,
            vehicleLength: this.userSelectedCarLength
          };
          console.log(countData);
          // 发接口
          instance({
            method: "get",
            url: "/freight-calc",
            params: countData
          })
            .then(res => {
              console.log(res.data);
              // this.priceData = [];
              this.priceData.push(res.data.price);
              console.log(this.priceData);
            })
            .catch(() => {});
        }
      }
    },
    selectCarType(item, index) {
      this.carTypeNum = index;
      this.userSelectedCarType = item;
    },
    complete() {
      this.carTypeModalBool = false;
      console.log(this.userSelectedCarLength, this.userSelectedCarType);
    },
    payWayModalShow() {
      this.payWayModalBool = true;
    },
    closePayWayModal() {
      this.payWayModalBool = false;
    },
    selectLoadPay() {
      this.payWay = "loadpay";
      this.closePayWayModal();
    },
    selectUnloadPay() {
      this.payWay = "unloadpay";
      this.closePayWayModal();
    },
    confirm() {
      if (this.params) {
        this.$router.push({
          path: "/waitfororders",
          query: {
            userWeigth: this.userWeigth,
            userVolume: this.userVolume,
            userSelectedType: this.userSelectedType,
            userGoodName: this.userGoodName,
            userSelectTime: this.userSelectTime,
            userCarLength: this.userCarLength,
            userCarType: this.userCarType,
            payWay: this.payWay,
            userSelectOptionList: this.params.userSelectOptionList,
            userInputNote: this.params.userInputNote
          }
        });
      }
      console.log(this.$route);
    },
    sendToOrder() {
      // 1.携参跳转
      // 2.本地保存数据
      // 3.发后端
    },
    closeInputPriceModal() {
      this.inputPriceModalBool = false;
      this.inputChecked = false;
    },
    submitInputPrice() {
      let inputVal = this.$refs.inputPrice.children[0].value;
      // if(inputVal){
      //     this.userInputPrice = inputVal;
      //     this.inputPriceModalBool = false;
      // }else{
      //     this.closeInputPriceModal();
      // }
      if (this.priceData.length === 0 && !inputVal) {
        this.closeInputPriceModal();
      } else if (this.priceData.length === 0 && inputVal) {
        this.inputPriceModalBool = false;
        this.userInputPrice = inputVal;
        this.selectWhichPriceChecked = false;
      } else if (this.priceData.length !== 0) {
        this.closeInputPriceModal();
        this.userInputPrice = inputVal;
        this.selectWhichPriceChecked = true;
      }
    },
    modifyInputPrice() {
      this.inputPriceModalBool = true;
      let inputVal = this.$refs.inputPrice.children[0].value;
      if (this.selectWhichPriceChecked) {
        this.selectWhichPriceChecked = true;
      }
    },
    selectWhichPrice() {
      this.selectWhichPriceChecked = !this.selectWhichPriceChecked;
    },
    userInputPriceShow() {
      this.inputChecked = !this.inputChecked;
      if (this.inputChecked) {
        this.inputPriceModalBool = true;
      }
    },
    autoPrice() {},
    getDistance() {
      console.log(this.$store.state.distance);
      this.distance = this.$store.state.distance;
    },

    //   时间选择器相关
    openPicker() {
      //   this.$refs.picker.open();
      this.$children[0].timePickerBool = true;
    },
    handleConfirm(data) {
      this.birthday = getDate(data); //获取的时间为时间戳，getdata是自己写的一个转换时间的方法
    }
  }
};
</script>

<style lang="scss" scoped>
.message {
  width: 100%;
  height: r(1334);
  background: #f2f6f7;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100000;
  .title {
    width: 100%;
    height: r(88);
    background: #fff;
    line-height: r(88);
    border-bottom: 1px dashed #333;
    .back {
      width: r(22);
      height: r(36);
      background: url(../../assets/back.png) no-repeat;
      background-size: r(22) r(36);
      margin: r(26) 0 r(26) r(30);
      vertical-align: middle;
    }
    .titlename {
      width: r(635);
      height: r(88);
      font-size: r(36);
      color: #333;
      font-weight: 700;
      text-align: center;
    }
  }

  .body {
    width: 100%;
    height: r(910);
    overflow: auto;

    // 第二层
    .size {
      width: r(690);
      height: r(177);
      margin: r(25) auto;
      background: #fff;
      border-radius: r(10);
      padding: 0 r(20);
      .weight {
        width: r(650);
        height: r(88);
        line-height: r(88);
        border-bottom: 1px solid rgba(198, 198, 198, 0.3);
        .name {
          font-size: r(30);
          color: #333;
        }
        input {
          font-size: r(26);
          width: r(150);
          height: r(48);
          border: none;
          float: right;
          margin: r(20) r(20) 0 0;
          text-align: right;
          overflow: hidden;
        }
        .unit {
          font-size: r(30);
          color: #333;
        }
      }
      .volume {
        width: r(650);
        height: r(88);
        line-height: r(88);
        .name {
          font-size: r(30);
          color: #333;
        }
        input {
          font-size: r(26);
          width: r(150);
          height: r(48);
          border: none;
          float: right;
          margin: r(20) r(20);
          text-align: right;
          overflow: hidden;
        }
        .unit {
          font-size: r(30);
          color: #333;
        }
      }
    }

    // 第三层
    .goodtype {
      width: r(690);
      height: r(397);
      margin: 0 auto;
      padding: 0 r(20);
      background: #fff;
      border-radius: r(10);
      .name {
        width: r(650);
        height: r(88);
        font-size: r(30);
        color: #333;
        line-height: r(88);
        border-bottom: 1px solid rgba(198, 198, 198, 0.3);
      }
      .typeoptions {
        height: r(155);
        width: r(650);
        ul {
          width: r(650);
          height: r(155);
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          li {
            width: r(148);
            height: r(50);
            background: #f7f7f7;
            border-radius: r(28);
            text-align: center;
            line-height: r(50);
            margin: r(16) r(6) 0 r(6);
            font-size: r(26);
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
          }
          .selectedtype {
            width: r(148);
            height: r(50);
            background: #fff;
            color: #0350a0;
            border: 1px solid #0350a0;
            line-height: r(46);
          }
          .othertype {
            color: #333;
          }
        }
      }
      .inputtype {
        width: r(650);
        height: r(153);
        .othergood {
          width: r(650);
          height: r(60);
          font-size: r(22);
          color: #666;
          line-height: r(60);
        }
        input {
          width: r(640);
          height: r(68);
          border: none;
          background: #f2f6f9;
          border-radius: r(10);
          font-size: r(26);
          padding-left: r(10);
        }
      }
    }

    // 时间和车型
    .loadtimeandcartype {
      width: r(690);
      height: r(177);
      margin: r(25) auto;
      background: #fff;
      border-radius: r(10);
      padding: 0 r(20);
      .loadtime {
        width: r(650);
        height: r(88);
        line-height: r(88);
        border-bottom: 1px solid rgba(198, 198, 198, 0.3);
        .name {
          font-size: r(30);
          color: #333;
          display: inline-block;
          width: r(130);
        }
        .notice {
          display: inline-block;
          font-size: r(26);
          color: #999;
          width: r(486);
          // margin:r(20) r(20) 0 0;
          text-align: right;
        }
        .more {
          display: inline-block;
          width: r(14);
          height: r(23);
          background: url(../../assets/right.png) no-repeat;
          background-size: r(14) r(23);
          vertical-align: middle;
          margin-left: r(20);
        }
      }
      // cartype
      .cartype {
        width: r(690);
        height: r(88);
        line-height: r(88);
        .name {
          font-size: r(30);
          color: #333;
          display: inline-block;
          width: r(130);
        }
        .notice {
          display: inline-block;
          font-size: r(26);
          color: #999;
          width: r(486);
          // margin:r(20) r(20) 0 0;
          text-align: right;
        }
        .more {
          display: inline-block;
          width: r(14);
          height: r(23);
          background: url(../../assets/right.png) no-repeat;
          background-size: r(14) r(23);
          vertical-align: middle;
          margin-left: r(20);
        }
      }
    }

    // 付款和备注
    .paywayandnote {
      width: r(690);
      height: r(177);
      margin: r(10) auto 0;
      background: #fff;
      border-radius: r(10);
      padding: 0 r(20);
      .payway {
        width: r(650);
        height: r(88);
        line-height: r(88);
        border-bottom: 1px solid rgba(198, 198, 198, 0.3);
        .name {
          font-size: r(30);
          color: #333;
          display: inline-block;
          width: r(130);
        }
        .notice {
          display: inline-block;
          font-size: r(26);
          color: #999;
          width: r(486);
          // margin:r(20) r(20) 0 0;
          text-align: right;
        }
        .more {
          display: inline-block;
          width: r(14);
          height: r(23);
          background: url(../../assets/right.png) no-repeat;
          background-size: r(14) r(23);
          vertical-align: middle;
          margin-left: r(20);
        }
      }
      // note
      .note {
        width: r(650);
        height: r(88);
        line-height: r(88);
        .name {
          font-size: r(30);
          color: #333;
          display: inline-block;
          width: r(130);
        }
        .notice {
          display: inline-block;
          font-size: r(26);
          color: #999;
          width: r(486);
          // margin:r(20) r(20) 0 0;
          text-align: right;
        }
        .more {
          display: inline-block;
          width: r(14);
          height: r(23);
          background: url(../../assets/right.png) no-repeat;
          background-size: r(14) r(23);
          vertical-align: middle;
          margin-left: r(20);
        }
      }
    }

    // 存常发货源
    .topermanent {
      width: r(690);
      height: r(82);
      margin: 0 auto;
      line-height: r(82);

      input {
        width: r(30);
        height: r(30);
        vertical-align: middle;
      }
      span {
        display: inline-block;
        vertical-align: middle;
        font-size: r(26);
        color: #333;
      }

      // input[type=checkbox]{
      // // width:r(30);
      // // height:r(30);
      // // vertical-align:middle;
      // // border-radius:50%;
      // visibility: hidden;
      // }
      // label{
      //     cursor:point;
      //     width:r(30);
      //     height:r(30);
      //     border:1px solid #274A7D;
      //     border-radius:50%;
      //     background:F2F6F7;
      //     position:absolute;
      //     left:0;
      //     top:0;
      // }
      // label:after{
      //     opacity:1;
      //     content:'';
      //     position:absolute;
      //     width:9px;
      //     height:5px;
      //     background:transparent;
      //     top:6px;
      //     left:6px;
      //     border:3px solid red;
      //     border-top:none;
      //     border-right:none;
      //     transform:rotate(-45deg);
      // }
      // input[type=checkbox]:checked~label{
      //     background:#f40;
      //     border:2px solid #f40;
      // }
      // input[type=checkbox]:checked~label:after{
      //     opacity:1;
      //     background:#f40;
      // }
    }
  }

  // 底层
  // 原来
  // .bottom{
  //     width:100%;
  //     height:r(126);
  //     background:#fff;
  //     position:fixed;
  //     left:0;
  //     bottom:0;
  //     .price{
  //         display:inline-block;
  //         width:r(375);
  //         height:r(126);
  //         line-height:r(126);
  //         text-align:center;
  //         font-size:r(26);
  //         color:#999;
  //     }
  //     .publish{
  //         display:inline-block;
  //         width:r(300);
  //         height:r(86);
  //         background:#f28312;
  //         vertical-align:middle;
  //         border-radius:r(43);
  //         text-align:center;
  //         line-height:r(86);
  //         font-size:r(32);
  //         color:#fff;
  //         margin-left:r(32);
  //     }
  // }

  .bottom {
    width: r(690);
    height: r(316);
    background: #fff;
    position: absolute;
    left: r(30);
    bottom: 0;
    z-index: 10;
    box-shadow: 0px -1px 10px rgba(0, 0, 0, 0.06);
    overflow: hidden;
    border-radius: r(10) r(10) 0 0;
    .uparea {
      width: 100%;
      height: r(150);
      margin-top: r(30);
      .noinput {
        width: r(345);
        height: r(150);
        text-align: center;
        font-size: r(26);
        color: #999;
        display: flex;
        .noticearea {
          margin: auto;
        }
      }
      .autoprice {
        width: r(345);
        height: r(150);
        .totalprice {
          width: 100%;
          height: r(60);
          line-height: r(60);
          input {
            vertical-align: middle;
            margin-left: r(40);
          }
          span {
            vertical-align: middle;
            margin-left: r(20);
            font-size: r(30);
            color: #f28312;
          }
        }
        .averageprice {
          width: r(260);
          height: r(45);
          margin-left: r(85);
          font-size: r(26);
          color: #999;
          line-height: r(45);
        }
        .length {
          width: r(260);
          height: r(45);
          margin-left: r(85);
          font-size: r(26);
          color: #999;
          line-height: r(45);
        }
      }
      .userpricenotice {
        width: r(344);
        height: r(150);
        border-left: 1px solid rgba(198, 198, 198, 0.3);
        display: flex;
        .selectarea {
          margin: auto;
          input {
            vertical-align: middle;
          }
          span {
            display: inline-block;
            vertical-align: middle;
            margin-left: r(10);
          }
        }
      }
      .userpriceshow {
        width: r(344);
        height: r(150);
        border-left: 1px solid rgba(198, 198, 198, 0.3);
        display: flex;
        .userprice {
          width: r(260);
          height: r(100);
          margin: auto;
          .pricearea {
            width: 100%;
            height: r(50);
            input {
              margin-left: r(40);
              vertical-align: middle;
            }
            span {
              display: inline-block;
              text-align: center;
              vertical-align: middle;
              margin-left: r(20);
              font-size: r(30);
              color: #f28312;
              line-height: r(50);
            }
          }
          .modifyprice {
            width: 100%;
            height: r(50);
            text-align: center;
            line-height: r(50);
            font-size: r(26);
            color: #0350a0;
          }
        }
      }
    }
    .submit {
      width: r(650);
      height: r(86);
      margin: 0 auto;
      text-align: center;
      line-height: r(86);
      background: #f28312;
      border-radius: r(43);
      margin: r(30) auto;
      font-size: r(32);
      color: #fff;
    }
  }

  // 车型车长模态框
  .cartypemodal {
    width: 100%;
    height: r(1334);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10000000;
    background: rgba(0, 0, 0, 0.3);
    .closearea {
      width: 100%;
      height: r(700);
    }
    .cartypearea {
      width: r(750);
      height: r(479);
      position: fixed;
      bottom: 0;
      z-index: 1000000;
      // float:left;
      // margin-top:r(720);
      background: #fff;
      border-radius: r(10) r(10) 0 0;
      // 第一层
      .top {
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
      // 第二层
      .carlength {
        width: r(710);
        height: r(130);
        margin: 0 auto;
        overflow: hidden;
        // border-bottom: 1px solid rgba(198, 198, 198, 0.3);
        .floor-n1 {
          width: 100%;
          height: r(40);
          margin-top: r(20);
          line-height: r(42);
          .length {
            font-size: r(30);
            font-family: PingFang SC;
            font-weight: 500;
            color: #333;
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
          height: r(70);
          ul {
            width: r(710);
            height: r(70);
            display: flex;
            justify-content: space-around;
            align-items: center;
            li {
              width: r(126);
              height: r(50);
              border-radius: r(28);
              text-align: center;
              line-height: r(50);
              font-size: r(26);
              display: flex;
              span {
                margin: auto;
              }
            }
            .selected-carlength {
              border: 1px solid #0350a0;
              color: #0350a0;
              background: #fff;
            }
            .noselected-carlength {
              color: #666;
              background: #f7f7f7;
            }
          }
        }
      }
      // 第三层
      .cartype {
        width: r(710);
        height: r(130);
        margin: 0 auto;
        overflow: hidden;
        // border-bottom: 1px solid red;
        .floor-n1 {
          width: 100%;
          height: r(40);
          margin-top: r(20);
          line-height: r(40);
          .type {
            font-size: r(30);
            font-family: PingFang SC;
            font-weight: 500;
            color: #333;
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
          height: r(70);
          ul {
            width: r(710);
            height: r(70);
            display: flex;
            justify-content: space-around;
            align-items: center;
            li {
              width: r(126);
              height: r(50);
              border-radius: r(28);
              text-align: center;
              line-height: r(50);
              font-size: r(26);
              display: flex;
              span {
                margin: auto;
              }
            }
            .selected-cartype {
              border: 1px solid #0350a0;
              color: #0350a0;
              background: #fff;
            }
            .noselected-cartype {
              color: #666;
              background: #f7f7f7;
            }
          }
        }
      }

      // 价格显示层
      .foot {
        width: r(710);
        height: r(130);
        margin: 0 auto;
        .name {
          display: inline-block;
          width: 50%;
          height: r(130);
          font-size: r(26);
          color: #999;
          line-height: r(130);
          text-align: right;
        }
        .showprice {
          display: inline-block;
          width: 50%;
          height: r(130);
          font-size: r(32);
          color: #f28312;
          line-height: r(130);
          text-align: left;
          font-weight: 600;
        }
      }
    }
  }

  // 付款方式模态框
  .paywaymodal {
    width: 100%;
    height: r(1334);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10000;
    background: rgba(0, 0, 0, 0.3);
    .closearea {
      width: 100%;
      height: r(1025);
    }
    .payway {
      width: 100%;
      height: r(309);
      background: #fff;
      .loadpay {
        width: 100%;
        height: r(100);
        border-bottom: 1px solid rgba(221, 221, 221, 0.3);
        line-height: r(100);
        text-align: center;
        font-size: r(36);
        color: #333;
      }
      .unloadpay {
        width: 100%;
        height: r(100);
        line-height: r(100);
        text-align: center;
        font-size: r(36);
        color: #333;
        border-bottom: r(8) solid rgba(221, 221, 221, 0.3);
      }
      .cancel {
        width: 100%;
        height: r(100);
        line-height: r(100);
        text-align: center;
        font-size: r(36);
        color: #333;
      }
    }
  }

  .inputpricemodal {
    width: 100%;
    height: r(1334);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10000;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    .inputbox {
      width: r(562);
      height: r(446);
      background: #fff;
      border-radius: r(14);
      margin: auto;
      .n1 {
        width: 100%;
        height: r(110);
        border-bottom: 1px solid rgba(198, 198, 198, 0.3);
        text-align: center;
        line-height: r(110);
        font-size: r(36);
        color: #333;
      }
      .n2 {
        width: 100%;
        height: r(233);
        .historyprice {
          width: r(330);
          height: r(77);
          margin: 0 auto;
          line-height: r(77);
          .name {
            display: inline-block;
            margin: auto;
            width: r(120);
            height: r(77);
            font-size: r(26);
            color: #999;
            text-align: center;
          }
          .priceinterval {
            display: inline-block;
            width: r(210);
            height: r(77);
            text-align: center;
            font-size: r(26);
            color: #ff4343;
          }
        }
        .inputarea {
          width: r(285);
          height: r(80);
          border: 1px solid rgba(198, 198, 198, 0.3);
          border-radius: r(40);
          margin: 0 auto;
          overflow: hidden;
          input {
            width: r(280);
            height: r(76);
            line-height: r(80);
            border: none;
            padding: 0 r(30);
            font-size: r(26);
            color: #0350a0;
            font-size: r(26);
            // text-align:center;
          }
        }
        .noticearea {
          width: 100%;
          height: r(76);
          border-bottom: 1px solid rgba(198, 198, 198, 0.3);
          text-align: center;
          line-height: r(76);
          font-size: r(26);
          color: #999;
        }
      }
      .n3 {
        width: 100%;
        height: r(103);
        .cancel {
          width: r(280);
          height: r(103);
          font-size: r(36);
          text-align: center;
          line-height: r(103);
          border-right: 1px solid rgba(198, 198, 198, 0.3);
          color: #000;
        }
        .yes {
          width: r(281);
          height: r(103);
          font-size: r(36);
          text-align: center;
          line-height: r(103);
          border-right: 1px solid rgba(198, 198, 198, 0.3);
          color: #108ee9;
        }
      }
    }
  }
}
</style>