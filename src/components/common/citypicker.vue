<template>
  <div class="citypicker" v-if="cityPickerBool">
    <div class="closearea" @click="closeModal()"></div>
    <div class="selectarea">
      <!-- 顶部 -->
      <div class="titlearea clearfix">
        <div class="cancel fl" @click="closeModal()">取消</div>
        <div class="titlename fl">选择装货地</div>
        <div class="sub fr" @click="completeSelect()">完成</div>
      </div>
      <!-- 搜索区 -->
      <div class="searcharea">
        <div class="searchbox">
          <span class="searchicon"></span>
          <input type="text" placeholder="输入城市名" />
        </div>
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
              @click="selectProvince(item,index)"
            >{{item}}</li>
          </ul>
        </div>
        <!-- 市 -->
        <div class="cityarea fl">
          <ul>
            <li
              v-for="(item,index) in cityList"
              :key="index"
              :class="cityNum === index ? 'selectedcity' : 'othercity'"
              @click="selectCity(item,index)"
            >{{item}}</li>
          </ul>
        </div>
        <!-- 区 -->
        <div class="districtarea fr">
          <ul>
            <li
              v-for="(item,index) in districtList"
              :key="index"
              :class="districtNum === index ? 'selecteddistrict' : 'otherdistrict'"
              @click="selectDistrict(item,index)"
            >{{item}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Vue from "vue";
import address from "./address.json";
import { Toast } from "mint-ui";
// Vue.use(Toast);

export default {
  data() {
    return {
      cityPickerBool: false,
      provinceNum: -1,
      cityNum: -1,
      districtNum: -1,
      provinceList: [],
      cityList: [],
      districtList: [],
      userSelectedProvince: "",
      userSelectedCity: "",
      userSelectedDistrict: "",
      toastInstanse: null
    };
  },
  mounted() {
    for (let i = 0; i < address.length; i++) {
      this.provinceList.push(address[i].name);
    }
  },
  methods: {
    closeModal() {
      this.userSelectedProvince = "";
      this.userSelectedCity = "";
      this.userSelectedDistrict = "";
      this.cityList = [];
      this.districtList = [];
      this.provinceNum = -1;
      this.cityPickerBool = false;
    },
    completeSelect() {
      // 若打开后未选择省份，提示选择省份
      if (!this.userSelectedProvince) {
        this.toastInstanse = Toast({
          message: "请选择省份",
          position: "middle",
          duration: 1000
        });
        this.toastInstanse.$el.style.zIndex = 100000;
      }

      // 若未选择城市，则提示选择城市
      if (this.userSelectedProvince && !this.userSelectedCity) {
        this.toastInstanse = Toast({
          message: "请选择城市",
          position: "middle",
          duration: 1000
        });
        this.toastInstanse.$el.style.zIndex = 100000;
      }

      // 若未选择区域，则提示选择区域
      if (
        this.userSelectedProvince &&
        this.userSelectedCity &&
        !this.userSelectedDistrict
      ) {
        this.toastInstanse = Toast({
          message: "请选择区域",
          position: "middle",
          duration: 1000
        });
        this.toastInstanse.$el.style.zIndex = 100000;
      }

      // 若全部选择完毕，关闭模态
      if (
        this.userSelectedProvince &&
        this.userSelectedCity &&
        this.userSelectedDistrict
      ) {
        this.$parent.$el.firstChild.lastChild.lastChild.children[1].innerText = this.userSelectedDistrict;
        this.cityPickerBool = false;
        this.$parent.userSelectedProvince = this.userSelectedProvince;
        this.$parent.userSelectedCity = this.userSelectedCity;
        this.$parent.userSelectedDistrict = this.userSelectedDistrict;
      }
    },
    selectProvince(item, index) {
      this.cityList = [];
      this.cityNum = -1;
      this.districtList = [];
      this.districtNum = -1;
      this.provinceNum = index;
      this.userSelectedProvince = item;
      for (let i = 0; i < address.length; i++) {
        if (item === address[i].name) {
          this.cityList = [];
          for (let j = 0; j < address[i].childs.length; j++) {
            this.cityList.push(address[i].childs[j].name);
          }
        }
      }
    },
    selectCity(item, index) {
      this.cityNum = index;
      this.userSelectedCity = item;
      for (let i = 0; i < address.length; i++) {
        for (let j = 0; j < address[i].childs.length; j++) {
          if (item === address[i].childs[j].name) {
            this.districtList = [];
            this.userSelectedCity = item;
            for (let k = 0; k < address[i].childs[j].childs.length; k++) {
              this.districtList.push(address[i].childs[j].childs[k].name);
            }
          }
        }
      }
    },
    selectDistrict(item, index) {
      this.districtNum = index;
      this.userSelectedDistrict = item;
    }
  }
};
</script>

<style lang="scss" scoped>
.citypicker {
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
.mytoast {
  // background: red;
  z-index: 100000 !important;
}
</style>