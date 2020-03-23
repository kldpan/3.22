<template>
  <div class="timepicker" v-if="timePickerBool">
    <div class="closearea" @click="closeModal()"></div>
    <div class="selectarea">
      <!-- 顶部 -->
      <div class="titlearea clearfix">
        <div class="cancel fl" @click="closeModal()">取消</div>
        <div class="titlename fl">装货时间</div>
        <div class="sub fr" @click="completeSelect()">完成</div>
      </div>

      <!-- 地址区 -->
      <div class="addressarea clearfix">
        <!-- 日期 -->
        <div class="provincearea fl">
          <ul>
            <li
              v-for="(item,index) in dateList"
              :key="index"
              :class="dateNum === index ? 'selectedprovince' : 'otherprovince'"
              @click="selectDate(item,index)"
            >{{item}}</li>
          </ul>
        </div>
        <!-- 点 -->
        <div class="districtarea fr">
          <ul>
            <li
              v-for="(item,index) in timeList"
              :key="index"
              :class="timeNum === index ? 'selecteddistrict' : 'otherdistrict'"
              @click="selectTime(item,index)"
            >{{item}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
let date = new Date();
console.log(dayjs(date.getTime()).startOf("day"));
export default {
  data() {
    return {
      timePickerBool: false,
      toastInstanse: null,
      dateNum: 0,
      timeNum: 0,
      dateList: ["今天", "明天"],
      timeList: [
        "全天都可以",
        "上午都可以",
        "下午都可以",
        "晚上都可以",
        "凌晨(00:00-01:00)",
        "凌晨(01:00-02:00)",
        "凌晨(02:00-03:00)",
        "凌晨(03:00-04:00)",
        "凌晨(04:00-05:00)",
        "凌晨(05:00-06:00)",
        "上午(06:00-07:00)",
        "上午(07:00-08:00)",
        "上午(08:00-09:00)",
        "上午(09:00-10:00)",
        "上午(10:00-11:00)",
        "上午(11:00-12:00)",
        "下午(12:00-13:00)",
        "下午(13:00-14:00)",
        "下午(14:00-15:00)",
        "下午(15:00-16:00)",
        "下午(16:00-17:00)",
        "下午(17:00-18:00)",
        "晚上(18：00-19:00)",
        "晚上(19：00-20:00)",
        "晚上(20：00-21:00)",
        "晚上(21：00-22:00)",
        "晚上(22：00-23:00)",
        "晚上(23：00-00:00)",
        ""
      ],
      userSelectedDate: "今天",
      userSelectedTime: "全天都可以",
      sendDate: "",
      sendTime: ""
    };
  },
  mounted() {
    this.getSelectDate();
  },
  methods: {
    closeModal() {
      this.dateNum = 0;
      this.timeNum = 0;
      this.timePickerBool = false;
    },
    completeSelect() {
      this.timePickerBool = false;
      console.log(this.userSelectedDate, this.userSelectedTime);
      if (this.dateNum === 0) {
        let date = new Date();
        let time = new Date().getTime();
        let today = date.setTime(time);
        this.sendDate = dayjs(today).format();
        this.sendTime = this.userSelectedTime;
        console.log(this.sendDate, this.sendTime);
      } else if (this.dateNum === 1) {
        let date = new Date();
        let time = new Date().getTime();
        let nextDay = date.setTime(time + 24 * 60 * 60 * 1000);
        this.sendDate = dayjs(nextDay).format();
        this.sendTime = this.userSelectedTime;
        console.log(this.sendDate, this.sendTime);
      } else if (this.dateNum === 2) {
        let date = new Date();
        let time = new Date().getTime();
        let nextTwoDay = date.setTime(time + 24 * 60 * 60 * 1000 * 2);
        this.sendDate = dayjs(nextTwoDay).format();
        this.sendTime = this.userSelectedTime;
        console.log(this.sendDate, this.sendTime);
      } else if (this.dateNum === 3) {
        let date = new Date();
        let time = new Date().getTime();
        let nextThreeDay = date.setTime(time + 24 * 60 * 60 * 1000 * 3);
        this.sendDate = dayjs(nextThreeDay).format();
        this.sendTime = this.userSelectedTime;
        console.log(this.sendDate, this.sendTime);
      }
      this.$parent.loadDate = this.sendDate;
      this.$parent.loadTime = this.sendTime;
    },
    getSelectDate() {
      let time = new Date().getTime();
      let newDate01 = new Date();
      let newTime01 = newDate01.setTime(time + 24 * 60 * 60 * 1000 * 2);
      let newDate02 = new Date();
      let newTime02 = newDate02.setTime(time + 24 * 60 * 60 * 1000 * 3);
      // 月份01处理
      if (newDate01.getMonth() < 10) {
        var month01 = "0" + (newDate01.getMonth() + 1);
        console.log(month01);
      } else {
        month01 = newDate01.getMonth() + 1;
        console.log(month01);
      }
      // 月份02处理
      if (newDate02.getMonth() < 10) {
        var month02 = "0" + (newDate02.getMonth() + 1);
        console.log(month02);
      } else {
        month02 = newDate02.getMonth() + 1;
        console.log(month02);
      }
      // 日01处理
      if (newDate01.getDate() < 10) {
        var day01 = "0" + newDate01.getDate();
        console.log(day01);
      } else {
        day01 = newDate01.getDate();
        console.log(day01);
      }
      // 日02处理
      if (newDate02.getDate() < 10) {
        var day02 = "0" + newDate02.getDate();
        console.log(day02);
      } else {
        day02 = newDate02.getDate();
        console.log(day02);
      }
      let date01 = month01 + "月" + day01 + "日";
      let date02 = month02 + "月" + day02 + "日";
      this.dateList.push(date01);
      this.dateList.push(date02);
      // if (newDate02.getMonth() < 10) {
      //   let day02 = "0" + (newDate02.getMonth() + 1);
      //   console.log(day02);
      // }
      // let date01 =
      //   newDate01.getMonth() + 1 < 10
      //     ? "0" + (newDate01.getMonth() + 1) + "月"
      //     : newDate01.getMonth() + 1 + "月" + newDate01.getDate();
      // let newDate02 = new Date();
      // let newTime02 = newDate02.setTime(time + 86400000 * 3);
      // let date02 = newDate02.getMonth() + 1 + "月" + newDate02.getDate() + "日";
      // console.log(date01, date02);
      // this.dateList.push(date01);
      // this.dateList.push(date02);
    },
    selectDate(item, index) {
      this.dateNum = index;
      this.userSelectedDate = item;
    },
    selectTime(item, index) {
      // if (!this.userSelectedDate) {
      //   this.toastInstanse = Toast({
      //     message: "请选择日期",
      //     position: "middle",
      //     duration: 1000
      //   });
      //   this.toastInstanse.$el.style.zIndex = 100000;
      // }
      this.timeNum = index;
      this.userSelectedTime = item;
    }
  }
};
</script>

<style lang="scss" scoped>
.timepicker {
  width: 100%;
  height: r(1334);
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000000000;
  .closearea {
    width: 100%;
    height: r(888);
  }
  .selectarea {
    width: 100%;
    height: r(444);
    background: #fff;
    box-shadow: 0 r(3) r(20) rgba(0, 0, 0, 0.16);
    border-radius: r(10) r(10) 0 0;
    .titlearea {
      width: r(710);
      height: r(88);
      margin: 0 auto;
      border-bottom: 1px solid rgba(198, 198, 198, 0.3);
      line-height: r(88);
      .cancel {
        width: r(155);
        height: r(88);
        font-size: r(32);
        color: #0350a0;
      }
      .titlename {
        width: r(400);
        height: r(88);
        text-align: center;
        font-size: r(32);
        color: #333;
      }
      .sub {
        width: r(155);
        height: r(88);
        font-size: r(32);
        color: #0350a0;
        text-align: right;
      }
    }
    .searcharea {
      width: r(710);
      height: r(106);
      margin: 0 auto;
      overflow: hidden;
      border-bottom: 1px solid rgba(198, 198, 198, 0.3);
      .searchbox {
        width: r(710);
        height: r(68);
        margin-top: r(19);
        border-radius: r(34);
        background: rgba(242, 246, 249, 1);
        padding: 0 r(20);
        .searchicon {
          display: inline-block;
          width: r(34);
          height: r(34);
          background: url(../../assets/search.png) no-repeat;
          background-size: r(34) r(34);
          vertical-align: middle;
        }
        input {
          width: r(610);
          height: r(68);
          margin-left: r(20);
          border: none;
          background: rgba(242, 246, 249, 1);
          overflow: hidden;
          vertical-align: middle;
        }
      }
    }
    .addressarea {
      width: 100%;
      height: r(444);
      overflow: hidden;
      .provincearea {
        width: r(375);
        height: r(444);
        overflow: hidden;
        ul {
          width: r(375);
          height: r(444);
          background: #fff;
          padding-left: r(20);
          // overflow: auto;
          li {
            width: r(355);
            height: r(88);
            font-size: r(26);
            line-height: r(88);
            text-align: center;
            // border-bottom: 1px solid rgba(198, 198, 198, 0.3);
            background: #fff;
            color: #999;
          }
          .selectedprovince {
            font-size: r(32);
            color: #333;
          }
        }
      }
      // .cityarea {
      //   width: r(249);
      //   height: r(804);
      //   border-right: 1px solid rgba(198, 198, 198, 0.3);
      //   overflow: hidden;
      //   ul {
      //     width: r(250);
      //     height: r(804);
      //     background: #fff;
      //     overflow: auto;
      //     li {
      //       width: r(250);
      //       height: r(88);
      //       font-size: r(30);
      //       line-height: r(88);
      //       padding-left: r(20);
      //       white-space: nowrap;
      //       overflow-x: auto;
      //       color: #333;
      //     }
      //     .selectedcity {
      //       background: #fff;
      //       color: #0350a0;
      //     }
      //   }
      // }
      .districtarea {
        width: r(375);
        height: r(804);
        overflow: hidden;
        ul {
          width: r(375);
          height: r(444);
          background: #fff;
          overflow: auto;
          padding-right: r(20);
          li {
            width: r(355);
            height: r(88);
            font-size: r(26);
            line-height: r(88);
            text-align: center;
            // border-bottom: 1px solid rgba(198, 198, 198, 0.3);
            background: #fff;
            color: #999;
          }
          .selecteddistrict {
            font-size: r(32);
            color: #333;
          }
        }
      }
    }
  }
}
</style>