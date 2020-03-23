<template>
  <div class="waitfororders">
    <!-- 第一层 -->
    <div class="title clearfix">
      <div class="back fl" @click="go(-1)"></div>
      <div class="titlename fl">等待接单</div>
    </div>

    <!-- 订单号 -->
    <div class="ordernumarea">
      <div class="ordernum clearfix">
        <div class="name fl">订单号：</div>
        <div class="number fl">{{orderNum}}</div>
        <div class="state fr">待运输</div>
      </div>
      <div class="orderaddress clearfix">
        <!-- 大左 -->
        <div class="loadaddress fl">{{'发货地'}}</div>
        <!-- 大中 -->
        <div class="lengtharea fl clearfix">
          <div class="left fl">
            <span class="loadicon">装</span>
          </div>
          <div class="center fl">
            <div class="length">
              <span>距离约{{length}}公里</span>
            </div>
            <div class="line"></div>
            <div class="tomap">
              <span>查看地图</span>
            </div>
          </div>
          <div class="right fr">
            <span class="unloadicon">卸</span>
          </div>
        </div>
        <!-- 大右 -->
        <div class="unloadaddress fr">{{'收货地'}}</div>
      </div>
    </div>

    <!-- 订单详情 -->
    <div class="orderdetails">
      <!-- 第一层 -->
      <div class="timearea clearfix">
        <span class="clockicon"></span>
        <span class="day">{{'明天'}}</span>
        <span class="amorpm">{{'下午'}}</span>
        <span class="time">{{'15:00'}}</span>
        <span class="goto">装货</span>
        <span class="phoneconfirm fr">电话确认</span>
      </div>

      <!-- 第二层 -->
      <div class="sendinfos clearfix">
        <div class="left fl">
          <span class="loadicon">装</span>
        </div>
        <div class="right fl">
          <div class="send">
            <span class="name">{{'发件人姓名'}}</span>
            <span class="phonenum">{{'发件人电话'}}</span>
          </div>
          <div class="sendaddress">{{'发件人地址'}}</div>
        </div>
      </div>

      <!-- 第三层 -->
      <div class="recieveinfos clearfix">
        <div class="left fl">
          <span class="loadicon">卸</span>
        </div>
        <div class="right fl">
          <div class="recieve">
            <span class="name">{{'收件人姓名'}}</span>
            <span class="phonenum">{{'收件人电话'}}</span>
          </div>
          <div class="recieveaddress">{{'收件人地址'}}</div>
        </div>
      </div>

      <!-- 第四层 -->
      <div class="goodinfos clearfix">
        <ul class="fr">
          <li class="carinfo">
            <span class="name">车辆信息：</span>
            <span class="info">{{'13米箱式'}}</span>
          </li>
          <li class="goodsize">
            <span class="name">货物信息：</span>
            <span class="info">{{'5吨/棉花'}}</span>
          </li>
          <li class="priceinfo">
            <span class="name">车辆信息：</span>
            <span class="info">￥{{'10000'}}</span>
          </li>
          <li class="payway">
            <span class="name">付款方式：</span>
            <span class="info">{{'发货人付款'}}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- 备注信息(有数据才显示) -->
    <div class="noteinfos">
      <div class="userselectnote">
        <div class="name">备注信息</div>
        <ul>
          <li class="fl" v-for="(item,index) in testData" :key="index">{{item}}</li>
        </ul>
      </div>
      <div class="othernote">
        <div class="name">其他备注信息</div>
      </div>
      <div class="picnote">
        <ul>
          <li class="piclist fl" v-for="(item,index) in picList" :key="index">{{item}}</li>
        </ul>
      </div>
    </div>

    <!-- 底部 -->
    <div class="bottom">
      <div class="pricearea">
        <span class="total">合计：</span>
        <span class="price">￥0.00</span>
      </div>
      <div class="canceldelivery">
        <div class="cancel" @click="cancelDeliveryModalShow()">取消货源</div>
      </div>
    </div>

    <!-- 取消货源模态框 -->
    <div class="canceldeliverymodal" v-show="cancelDeliveryModalBool">
      <div class="noticearea">
        <div class="up">确认取消货源吗？</div>
        <div class="down clearfix">
          <div class="noclear fl" @click="closeModal()">取消</div>
          <div class="clearnow fr" @click="cancelConfirm()">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      params: {},
      orderNum: "MY30694412110",
      length: 0,
      testData: ["11111", "22222", "33333"],
      picList: ["11111", "22222", "33333"],
      cancelDeliveryModalBool: true
    };
  },
  mounted() {
    this.params = this.$route.query;
    console.log(this.params);
  },
  methods: {
    go(n) {
      this.$router.go(n);
    },
    toPath(url) {
      this.$router.push(url);
    },
    cancelDeliveryModalShow() {
      this.cancelDeliveryModalBool = true;
    },
    closeModal() {},
    cancelConfirm() {}
  }
};
</script>

<style lang="scss" scoped>
.waitfororders {
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

  // 订单号
  .ordernumarea {
    width: r(690);
    height: r(257);
    background: #fff;
    margin: r(20) auto;
    border-radius: r(10);
    padding: 0 r(20);
    .ordernum {
      width: 100%;
      height: r(88);
      line-height: r(88);
      font-size: r(30);
      color: #333;
      border-bottom: 1px solid rgba(198, 198, 198, 0.3);
      .name {
        width: r(110);
        height: r(88);
        font-size: r(26);
        color: #999;
        line-height: r(88);
      }
      .number {
        width: r(400);
        height: r(88);
        font-size: r(26);
        color: #333;
        line-height: r(88);
      }
      .state {
        width: r(140);
        height: r(88);
        font-size: r(30);
        color: #333;
        text-align: right;
        line-height: r(88);
      }
    }
    .orderaddress {
      width: 100%;
      height: r(168);
      .loadaddress {
        width: r(170);
        height: r(168);
        font-size: r(30);
        color: #333;
        font-weight: 700;
        text-align: center;
        line-height: r(168);
      }
      .lengtharea {
        width: r(310);
        height: r(168);
        .left {
          width: r(32);
          height: r(168);
          display: flex;
          .loadicon {
            width: r(32);
            height: r(32);
            background: #0350a0;
            border-radius: 50%;
            margin: auto;
            color: #fff;
            text-align: center;
            line-height: r(32);
            font-size: r(20);
          }
        }
        .length {
          width: r(246);
          height: r(83);
          span {
            display: inline-block;
            width: r(246);
            height: r(83);
            line-height: r(120);
            text-align: center;
            font-size: r(22);
            color: #666;
          }
        }
        .line {
          width: r(246);
          height: r(2);
          background: linear-gradient(
            to right,
            rgba(3, 80, 160, 0.5),
            rgba(242, 131, 18, 0.5)
          );
        }
        .tomap {
          width: r(246);
          height: r(83);
          display: flex;
          span {
            display: inline-block;
            width: r(150);
            height: r(50);
            margin: auto;
            text-align: center;
            line-height: r(50);
            border: 1px solid rgba(204, 204, 204, 1);
            border-radius: r(28);
            font-size: r(26);
            color: #666;
          }
        }
        .right {
          width: r(32);
          height: r(168);
          display: flex;
          .unloadicon {
            width: r(32);
            height: r(32);
            background: #f28312;
            border-radius: 50%;
            margin: auto;
            color: #fff;
            text-align: center;
            line-height: r(32);
            font-size: r(20);
          }
        }
      }
      .unloadaddress {
        width: r(170);
        height: r(168);
        font-size: r(30);
        color: #333;
        font-weight: 700;
        text-align: center;
        line-height: r(168);
      }
    }
  }

  // 订单详情
  .orderdetails {
    width: r(690);
    height: r(458);
    background: #fff;
    margin: r(20) auto;
    border-radius: r(10);
    padding: 0 r(20);

    // 时间区域
    .timearea {
      width: 100%;
      height: r(88);
      line-height: r(88);
      .clockicon {
        display: inline-block;
        width: r(32);
        height: r(32);
        background: url(../../assets/img/clock.png) no-repeat;
        background-size: r(32) r(32);
        opacity: 0.7;
        vertical-align: middle;
      }
      .day {
        font-size: r(26);
        color: #333;
        margin-left: r(20);
        vertical-align: middle;
      }
      .amorpm {
        font-size: r(26);
        color: #333;
        vertical-align: middle;
      }
      .time {
        font-size: r(26);
        color: #333;
        margin: 0 r(10);
        vertical-align: middle;
      }
      .goto {
        font-size: r(26);
        color: #333;
        vertical-align: middle;
      }
      .phoneconfirm {
        font-size: r(26);
        color: #333;
        width: r(150);
        height: r(50);
        border: 1px solid rgba(204, 204, 204, 1);
        line-height: r(50);
        text-align: center;
        margin-top: r(19);
        border-radius: r(28);
        font-size: r(26);
        color: #666;
      }
    }

    // 发货人信息
    .sendinfos {
      width: 100%;
      height: r(120);
      border-bottom: 1px solid rgba(198, 198, 198, 0.3);
      .left {
        width: r(32);
        height: r(120);
        display: flex;
        .loadicon {
          display: inline-block;
          width: r(32);
          height: r(32);
          background: #0350a0;
          border-radius: 50%;
          margin: auto;
          color: #fff;
          text-align: center;
          line-height: r(32);
          font-size: r(20);
        }
      }
      .right {
        width: r(598);
        height: r(120);
        margin-left: r(20);
        .send {
          width: 100%;
          height: r(60);
          line-height: r(60);
          .name {
            font-size: r(26);
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
            opacity: 1;
          }
          .phonenum {
            font-size: r(26);
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
            opacity: 1;
            margin-left: r(30);
          }
        }
        .sendaddress {
          width: 100%;
          height: r(60);
          line-height: r(60);
          font-size: r(24);
          color: #999;
        }
      }
    }

    // 收货人信息
    .recieveinfos {
      width: 100%;
      height: r(120);
      border-bottom: 1px solid rgba(198, 198, 198, 0.3);
      .left {
        width: r(32);
        height: r(120);
        display: flex;
        .loadicon {
          display: inline-block;
          width: r(32);
          height: r(32);
          background: #f28312;
          border-radius: 50%;
          margin: auto;
          color: #fff;
          text-align: center;
          line-height: r(32);
          font-size: r(20);
        }
      }
      .right {
        width: r(598);
        height: r(120);
        margin-left: r(20);
        .recieve {
          width: 100%;
          height: r(60);
          line-height: r(60);
          .name {
            font-size: r(26);
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
            opacity: 1;
          }
          .phonenum {
            font-size: r(26);
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
            opacity: 1;
            margin-left: r(30);
          }
        }
        .recieveaddress {
          width: 100%;
          height: r(60);
          line-height: r(60);
          font-size: r(24);
          color: #999;
        }
      }
    }

    // 货物信息
    .goodinfos {
      width: 100%;
      height: r(120);
      ul {
        width: r(598);
        height: r(120);
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        li {
          width: r(299);
          height: r(60);
          float: left;
          line-height: r(60);
          .name {
            font-size: r(24);
            color: #999;
          }
          .info {
            font-size: r(24);
            color: #333;
          }
        }
      }
    }
  }

  .noteinfos {
    width: r(690);
    height: r(458);
    background: #fff;
    margin: r(20) auto;
    border-radius: r(10);
    padding: 0 r(20);
  }

  .bottom {
    width: r(690);
    height: r(88);
    margin: 0 auto;
    .confirm {
      width: 100%;
      height: 100%;
      background: #f28312;
      border-radius: r(43);
      text-align: center;
      line-height: r(88);
      font-size: r(32);
      color: #fff;
    }
  }
}
</style>