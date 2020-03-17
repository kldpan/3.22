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
        <!-- 省 -->
        <div class="provincearea fl">
          <ul>
            <li
              v-for="(item,index) in provinceList"
              :key="index"
              :class="provinceNum === index ? 'selectedprovince' : 'otherprovince'"
            >{{item.replace(/[\d]*/ig, "")}}</li>
          </ul>
        </div>
        <!-- 市 -->
        <div class="cityarea fl">
          <ul>
            <li
              v-for="(item,index) in cityList"
              :key="index"
              :class="cityNum === index ? 'selectedcity' : 'othercity'"
            >{{item.replace(/[\d]*/ig, "")}}</li>
          </ul>
        </div>
        <!-- 区 -->
        <div class="districtarea fr">
          <ul>
            <li
              v-for="(item,index) in districtList"
              :key="index"
              :class="districtNum === index ? 'selecteddistrict' : 'otherdistrict'"
            >{{item.replace(/[\d]*/ig, "")}}</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 街道弹出区 -->
    <!-- <mt-popup v-model="popupVisible" position="bottom">...</mt-popup> -->
  </div>
</template>

<script>
import { Toast } from "mint-ui";
// Vue.use(Toast);

export default {
  data() {
    return {
      timePickerBool: false,
      provinceNum: -1,
      cityNum: -1,
      districtNum: -1,
      provinceList: [],
      cityList: [],
      districtList: [],
      userSelectedProvince: "",
      userSelectedCity: "",
      userSelectedDistrict: "",
      toastInstanse: null,
      search_key: "",
      popupVisible: false
    };
  },
  mounted() {},
  methods: {
    closeModal() {},
    completeSelect() {}
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
    height: r(334);
  }
  .selectarea {
    width: 100%;
    height: r(1000);
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
      height: r(804);
      overflow: hidden;
      .provincearea {
        width: r(250);
        height: r(804);
        overflow: hidden;
        ul {
          width: r(250);
          height: r(804);
          background: rgba(242, 246, 249, 1);
          overflow: auto;
          li {
            width: r(250);
            height: r(88);
            font-size: r(30);
            line-height: r(88);
            padding-left: r(20);
            white-space: nowrap;
            overflow-x: auto;
            color: #333;
          }
          .selectedprovince {
            background: #fff;
            color: #0350a0;
          }
        }
      }
      .cityarea {
        width: r(249);
        height: r(804);
        border-right: 1px solid rgba(198, 198, 198, 0.3);
        overflow: hidden;
        ul {
          width: r(250);
          height: r(804);
          background: #fff;
          overflow: auto;
          li {
            width: r(250);
            height: r(88);
            font-size: r(30);
            line-height: r(88);
            padding-left: r(20);
            white-space: nowrap;
            overflow-x: auto;
            color: #333;
          }
          .selectedcity {
            background: #fff;
            color: #0350a0;
          }
        }
      }
      .districtarea {
        width: r(250);
        height: r(804);
        overflow: hidden;
        ul {
          width: r(250);
          height: r(804);
          background: #fff;
          overflow: auto;
          li {
            width: r(250);
            height: r(88);
            font-size: r(30);
            line-height: r(88);
            padding-left: r(20);
            white-space: nowrap;
            overflow-x: auto;
            color: #333;
          }
          .selecteddistrict {
            background: #fff;
            color: #0350a0;
          }
        }
      }
    }
  }
}
</style>