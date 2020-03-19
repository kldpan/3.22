<template>
  <div class="mymap">
    <!-- 第一层搜索 -->
    <div class="search-area clearfix">
      <div class="back fl" @click="toMap()"></div>
      <div class="search-box fl">
        <span class="searchIcon fl"></span>
        <div class="searchandclear fl">
          <input
            class="search"
            type="text"
            placeholder="输入关键字"
            v-model="search_key"
            @input="keySearch()"
            @focus="getRecord()"
            @keydown.delete="deleteInput()"
          />
          <span class="clear" v-if="search_key" @click="clearSearch()"></span>
        </div>
        <div class="icons fr">
          <span class="voiceIcon"></span>
          <span
            class="bigCity"
            @click="cityPicker()"
            v-if="this.$store.state.address"
          >{{district.replace(/[\d]*/gi, "")}}</span>
          <span :class="this.cityPickerBool ? 'popdown' : 'popup'"></span>
        </div>
      </div>
    </div>

    <!-- 第二层地图 -->
    <div class="mapbox">
      <div class="map" id="container" :plugin="plugin" vid="amap" :center="center"></div>
      <div class="sign"></div>
      <div v-show="mapCenterNoteBoxBool" class="notebox">
        <!-- :class="detailedAddress.length >= 20 ? 'bignotebox' : 'notebox'" -->
        <div :class="detailedAddress.length >= 50 ? 'bigaddnote' : 'addnote'">
          <span>{{mapShowDetailedAddress}}</span>
        </div>
        <div class="direct"></div>
      </div>
    </div>

    <!-- 第三层搜索列表 -->
    <!-- <div class="search-list" v-if="search_key"> -->
    <div class="search-list" v-if="searchListBool">
      <!-- <div class="search-list" v-if="search_list.length !== 0"> -->
      <ul>
        <li
          v-for="(item,index) in search_list"
          :key="index"
          @click="mapToThisAddress(item)"
          class="searchlist clearfix"
        >
          <span class="maplocationicon fl"></span>
          <div class="searchaddressarea fl">
            <div class="name">{{item.name}}</div>
            <div class="address">{{item.address}}</div>
          </div>
        </li>
        <li v-if="noSearchShow" class="nosearch">
          <span>暂无搜索结果</span>
        </li>
      </ul>
    </div>

    <!-- 搜索输入获取焦点时显示 -->
    <div class="records" v-if="bool">
      <ul class="upul">
        <li class="tomap" @click="toMap()">
          <span class="maplocationicon"></span>
          <span class="maptpaddress">去地图上选点</span>
        </li>
        <li class="currentposition">
          <span class="maplocationicon fl"></span>
          <div class="addressarea fl" v-if="autoAddressInfo">
            <div class="roughaddressarea">
              <span
                class="roughaddress"
              >{{autoAddressInfo.addressComponent.township + autoAddressInfo.addressComponent.street}}</span>
              <span class="notice">当前</span>
            </div>
            <div class="detailedaddress">{{autoAddressInfo.formattedAddress}}</div>
          </div>
          <!-- <div v-else="autoAddressInfo" class="locating">正在定位</div> -->
        </li>
      </ul>

      <div class="historypart" v-if="testData.length !== 0">
        <div class="historytitle clearfix">
          <span class="title fl">历史记录：</span>
          <span class="deleteicon fr"></span>
        </div>
        <ul class="historyarea">
          <li v-for="(item,index) in testData" :key="index">
            <span class="maplocationicon fl"></span>
            <div class="addressarea fl">
              <div class="roughaddressarea">
                <span class="roughaddress">{{item.title.slice(0,4)}}</span>
              </div>
              <div class="detailedaddress">{{item.title.slice(0,18)}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- 回当前位置图标 -->
    <div class="goback" @click="backCurrentPosition()">
      <span class="gobackicon"></span>
    </div>

    <!-- 第四层信息 -->
    <div class="senderInfo" ref="senderInfo">
      <!-- 第一层 -->
      <div class="floor-n1">
        <span class="loadIcon">收</span>
        <span class="title">收货人信息</span>
      </div>

      <!-- 第二层 -->
      <div class="floor-n2">
        <span class="locationIcon"></span>
        <input type="text" placeholder="详细地址（精确到门牌号）" v-model="detailedAddress" />
        <!-- @input="getUserInputAddress()"
        @focus="clearDetailedAddress()"-->
      </div>

      <!-- 第三层 -->
      <div class="floor-n3 clearfix">
        <div class="sender fl">
          <span class="senderIcon"></span>
          <input class="sendername" placeholder="联系人" v-model="userInputName" />
        </div>
        <div class="phone fl">
          <span class="phoneIcon"></span>
          <input class="phonenumber" placeholder="联系电话" v-model="userInputPhone" />
          <!-- <span class="contacts">通信录</span> -->
        </div>
      </div>

      <!-- 第四层 -->
      <div class="submit" @click="submit()">
        <div class="subbtn">确定</div>
      </div>
    </div>

    <div class="amap-page-container">
      <div :style="{width:'0',height:'0px'}">
        <el-amap vid="amap" :plugin="plugin" class="amap-demo" :center="center"></el-amap>
      </div>
    </div>

    <!-- 城市选择区 -->
    <keep-alive>
      <citypicker />
    </keep-alive>
  </div>
</template>

<script>
import Vue from "vue";
import citypicker from "@/components/common/citypicker.vue";
import address from "./common/address.json";
export default {
  data() {
    const self = this;
    return {
      currentPositionInfo: {}, //定位全部数据
      search_key: "", //搜索值
      search_list: [], //搜索结果列表
      noSearchShow: false, //无搜索结果提示，无搜索结果时会显示暂无搜索结果
      detailedAddressInfo: {},
      detailedAddress: this.$store.state.address
        ? "this.$store.state.address"
        : "",
      mapShowDetailedAddress: "",
      bool: false, //bool值控制搜索得焦后出现的页面
      testData: [],
      searchListBool: false,
      cityPickerBool: false,
      mapCenterNoteBoxBool: false,
      addressCode: 0,
      district: this.$store.state.location.addressComponent.district,

      // 首页定位到的vuex中存储的地址信息
      autoAddressInfo: {},
      // 用户搜索点击过的地址信息
      userSearchAddressInfo: {},
      // 用户拖动地图后的地址信息
      userDragMapAddressInfo: {},
      // 用户手动输入的地址信息
      userInputAddressInfo: "",
      userSearchToDecodeAddress: {},
      // 用户选择的地址
      userSelectedProvince: "",
      userSelectedCity: "",
      userSelectedDistrict: "",

      // 地址
      dragAddress: [],
      // autoAddress:"",
      searchAddress: "",
      userInputAddress: "",
      // 联系人
      userInputName: "",
      autoName: "",
      // 电话
      userInputPhone: "",
      autoPhone: "",
      // 提交表单
      recieveName: "",
      recievePhone: "",
      senderAdd: "",
      recieveAddLng: "",
      recieveAddLat: "",
      recieveList: [],

      // 地图数据 ↓
      // center: [121.59996, 31.197646],
      // center: [106.532357,29.57212],        //纬度-经度
      center: [
        this.$store.state.address
          ? this.$store.state.location.position.lng
          : "106.532357",
        this.$store.state.address
          ? this.$store.state.location.position.lat
          : "29.57212"
      ],
      lng: 0,
      lat: 0,
      loaded: false,
      plugin: [
        {
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 100, //超过10秒后停止定位，默认：无穷大
          maximumAge: 0, //定位结果缓存0毫秒，默认：0
          convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          showButton: true, //显示定位按钮，默认：true
          buttonPosition: "LT", //定位按钮停靠位置，默认：'LB'，左下角
          showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
          showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
          zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
          extensions: "all",
          pName: "Geolocation",
          events: {
            init(o) {
              // o 是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                console.log(result);
                self.currentPositionInfo = result;
                if (!self.$store.state) {
                  self.autoAddressInfo = result;
                }
              });
            }
          }
        }
      ]

      // 地图数据 ↑
    };
  },
  components: {
    citypicker
  },
  mounted() {
    this.autoAddressInfo = this.$store.state.location;
    this.adMap();
    setTimeout(() => {
      console.log(this.currentPositionInfo);
    }, 800);

    // this.dragMapAddressToDetails();

    // this.$apis.getTest01().then((res) => {
    //   let resData = res.data.data;
    //   for(let i=0; i<resData.length; i++){
    //     setTimeout(()=>{
    //       this.testData.push(resData[i]);
    //     },2000)
    //   }
    // });
  },
  methods: {
    // 初始化地图方法
    adMap() {
      // console.log(AMap);
      //初始化地图
      var map = new AMap.Map("container", {
        zoom: 14, //缩放级别
        center: this.center, //设置地图中心点
        // center: [this.$store.state.location.position.lng || 106.532357,this.$store.state.location.position.lat || 29.57212],
        resizeEnable: true //地图初始化加载定位到当前城市
      });
      //获取初始中心点并赋值
      var currentCenter = map.getCenter(); //此方法是获取当前地图的中心点
      // this.center = [currentCenter.lng,currentCenter.lat];//将获取到的中心点的纬度经度赋值给data的center
      //根据地图中心点查附近地点，此方法在下方
      this.centerSearch();

      //监听地图移动事件，并在移动结束后获取地图中心点并更新地点列表
      var moveendFun = e => {
        // 获取地图中心点
        currentCenter = map.getCenter();
        this.center = [currentCenter.lng, currentCenter.lat];
        //根据地图中心点查附近地点
        this.centerSearch();
        // this.mapCenterNoteBoxBool = false;
      };
      // 绑定事件移动地图事件
      map.on("moveend", moveendFun);
    },
    // 周边查询
    centerSearch() {
      AMap.service(["AMap.PlaceSearch"], () => {
        //构造地点查询类
        var placeSearch = new AMap.PlaceSearch({
          type:
            "汽车服务|餐饮服务|购物服务|生活服务|体育休闲服务|医疗保健服务|住宿服务|风景名胜|商务住宅|政府机构及社会团体|科教文化服务|交通设施服务|金融保险服务|公司企业|地名地址信息", // 兴趣点类别
          pageSize: 30, // 单页显示结果条数
          pageIndex: 1, // 页码
          city: "全国", // 兴趣点城市
          autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        });
        //根据地图中心点查附近地点
        placeSearch.searchNearBy(
          "",
          [this.center[0] || 106.532357, this.center[1] || 29.57212],
          200,
          (status, result) => {
            if (status == "complete") {
              this.lists = result.poiList.pois; //将查询到的地点赋值
              // console.log(result);
              this.userDragMapAddressInfo = result.poiList.pois[0];
              this.recieveAddLng = result.poiList.pois[0].location.lng;
              this.recieveAddLat = result.poiList.pois[0].location.lat;
              console.log(this.userDragMapAddressInfo);
              this.getCompeleteAddress(this.userDragMapAddressInfo);
              // this.dragAddress = this.lists;
              // this.dragMapAddressToDetails();
            }
          }
        );
      });
    },
    // 搜索方法
    keySearch() {
      if (this.search_list) {
        this.searchListBool = true;
      }
      AMap.service(["AMap.PlaceSearch"], () => {
        //构造地点查询类
        var placeSearch = new AMap.PlaceSearch({
          type: "政府机构及社会团体|政府机构及社会团体|公司企业|地名地址信息", // 兴趣点类别
          // "汽车服务|餐饮服务|购物服务|生活服务|体育休闲服务|医疗保健服务|住宿服务|风景名胜|商务住宅|政府机构及社会团体|科教文化服务|交通设施服务|金融保险服务|公司企业|地名地址信息"
          pageSize: 30, // 单页显示结果条数
          pageIndex: 1, // 页码
          city: "全国", // 兴趣点城市
          citylimit: false, //是否强制限制在设置的城市内搜索
          autoFitView: false // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        });
        //关键字查询
        placeSearch.search(this.search_key, (status, result) => {
          console.log(result);
          if (status == "complete") {
            if (result.poiList.count === 0) {
              this.noSearchShow = true;
              this.bool = false;
            } else {
              this.search_list = result.poiList.pois; //将查询到的地点赋值
              this.noSearchShow = false;
              this.bool = false;
            }
          } else {
            this.search_list = [];
            this.noSearchShow = true;
          }
        });
      });
    },

    // 点击搜索结果方法
    onSearchLi(location) {
      this.center = [location.lng, location.lat];
      this.adMap();
      this.search_key = "";
    },
    back() {
      this.$router.go(-1);
    },
    toMap() {
      if (this.bool) {
        this.bool = false;
      } else {
        this.back();
      }
    },
    toPath(url) {
      this.$router.push(url);
    },
    getRecord() {
      this.bool = true;
    },
    clearSearch() {
      this.search_key = "";
      this.bool = true;
    },
    deleteInput() {
      if (this.search_key.length === 1) {
        this.clearSearch();
      }
    },
    // toUnloadMap() {
    //   this.toPath("/unloadmap");
    //   let senderInfo = {
    //     senderAddress: "",
    //     senderName: "",
    //     senderPhone: ""
    //   };
    //   localStorage.setItem("senderInfo", senderInfo);
    // },

    // 拖动地址改变内容
    dragMapAddressToDetails() {
      this.detailedAddress = this.dragAddress[0].address;
      //  || this.$store.state.location.addressComponent.district + this.$store.state.location.addressComponent.township + this.$store.state.location.addressComponent.street + this.$store.state.location.addressComponent.streetNumber
    },

    // 点击搜索结果地图跳到指定位置
    mapToThisAddress(item) {
      this.searchListBool = false;
      this.bool = false;
      this.search_key = "";
      this.center = [item.location.lng, item.location.lat];
      this.adMap();
      this.userSearchAddressInfo = item;
      console.log(this.userSearchAddressInfo);
      this.senderAddLng = item.location.lng;
      this.senderAddLat = item.location.lat;
      this.getCompeleteAddress(item);
    },

    clearDetailedAddress() {
      this.detailedAddress = "";
    },

    // 用户输入地址
    getUserInputAddress() {
      // console.log(111)
    },

    cityPicker() {
      this.$children[1].cityPickerBool = true;
      // if (this.$children[1].cityPickerBool) {
      //   this.cityPickerBool = true;
      // } else {
      //   this.cityPickerBool = false;
      // }
    },

    backCurrentPosition() {
      this.center = [
        this.$store.state.address
          ? this.$store.state.location.position.lng
          : "106.532357",
        this.$store.state.address
          ? this.$store.state.location.position.lat
          : "29.57212"
      ];
      this.adMap();
    },

    getCompeleteAddress(item) {
      AMap.plugin("AMap.Geocoder", function() {
        var geocoder = new AMap.Geocoder({
          // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
          city: "全国"
        });

        var lnglat = [item.location.lng, item.location.lat];

        geocoder.getAddress(lnglat, function(status, result) {
          if (status === "complete" && result.info === "OK") {
            // result为对应的地理位置详细信息
            console.log(result);
            console.log(self);
            for (let key in self.__VUE_HOT_MAP__) {
              if (key === "b62d18c6") {
                let loadmapComponent = self.__VUE_HOT_MAP__[key].instances[0];
                setTimeout(() => {
                  loadmapComponent.detailedAddressInfo = result.regeocode;
                  loadmapComponent.detailedAddress =
                    result.regeocode.formattedAddress;
                  loadmapComponent.getAddCode();
                  loadmapComponent.district =
                    result.regeocode.addressComponent.district;
                  loadmapComponent.mapShowDetailedAddress = result.regeocode.formattedAddress.replace(
                    result.regeocode.addressComponent.province +
                      result.regeocode.addressComponent.city +
                      result.regeocode.addressComponent.district,
                    ""
                  );
                  loadmapComponent.district =
                    result.regeocode.addressComponent.district;
                }, 200);
              }
            }
          }
        });
      });
    },

    getAddCode() {
      // console.log(this.detailedAddressInfo);
      let searchProvince = this.detailedAddressInfo.addressComponent.province;
      let searchCity = this.detailedAddressInfo.addressComponent.city;
      let searchDistrict = this.detailedAddressInfo.addressComponent.district;
      let searchTownship = this.detailedAddressInfo.addressComponent.township;
      console.log(searchProvince, searchCity, searchDistrict, searchTownship);
      // console.log(this.$children[1].selectProvince);
      for (let i = 0; i < address.length; i++) {
        if (searchProvince === address[i].name) {
          console.log(address[i].code);
          for (let j = 0; j < address[i].childs.length; j++) {
            if ((searchCity || searchProvince) === address[i].childs[j].name) {
              console.log(address[i].childs[j].code);
              for (let p = 0; p < address[i].childs[j].childs.length; p++) {
                if (searchDistrict === address[i].childs[j].childs[p].name) {
                  console.log(address[i].childs[j].childs[p].code);
                  for (
                    let q = 0;
                    q < address[i].childs[j].childs[p].childs.length;
                    q++
                  ) {
                    if (
                      searchTownship ===
                      address[i].childs[j].childs[p].childs[q].name
                    ) {
                      this.addressCode =
                        address[i].childs[j].childs[p].childs[q].code;
                      console.log(this.addressCode);
                    }
                  }
                }
              }
            }
          }
        }
      }
    },

    getDistance() {
      let sendInfo = JSON.parse(localStorage.getItem("senderInfo"));
      //   console.log(sendInfo);
      let recieveInfo = JSON.parse(localStorage.getItem("recieveInfo"));
      //   console.log(recieveInfo);
      let sendCenter = sendInfo.addCenter;
      let recieveCenter = recieveInfo.addCenter;
      //   直接坐标测距
      //   let basicDistance = AMap.GeometryUtil.distance(sendCenter, recieveCenter);
      //   console.log(basicDistance);
      //   this.distance = parseInt(basicDistance / 1000);
      //   console.log(this.distance);

      // 调用货车路线规划测距
      AMap.plugin("AMap.Driving", function() {
        var driving = new AMap.Driving({
          // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式;  LEAST_FEE是最经济模式;  LEAST_DISTANCE是最短距离模式;   REAL_TRAFFIC是考虑实时路况模式
          policy: AMap.DrivingPolicy.REAL_TRAFFIC
          //
        });

        var startLngLat = sendCenter;
        var endLngLat = recieveCenter;

        driving.search(startLngLat, endLngLat, function(status, result) {
          // 未出错时，result即是对应的路线规划方案
          // 将该result数据存入localStorage中
          localStorage.setItem("distanceInfo", JSON.stringify(result));
          console.log(result.routes[0].distance);
          for (let key in self.__VUE_HOT_MAP__) {
            if (key === "6fb47643") {
              let loadmapComponent = self.__VUE_HOT_MAP__[key].instances[0];
              loadmapComponent.distance = Math.round(
                result.routes[0].distance / 1000
              );
              // 并将其存入vuex中
              loadmapComponent.$store.dispatch("setDistanceInfo",result);
              loadmapComponent.$store.dispatch("setDistance",Math.round(result.routes[0].distance / 1000));
              console.log(loadmapComponent.distance);
            }
          }
        });
      });
    },

    submit() {
      let recieveInfo = {
        addCode: this.addressCode,
        add: this.detailedAddress,
        addCenter: [this.recieveAddLng, this.recieveAddLat],
        addDetailedInfo: this.detailedAddressInfo,
        name: this.userInputName,
        phone: this.userInputPhone
      };
      console.log(recieveInfo);
      localStorage.setItem("recieveInfo", JSON.stringify(recieveInfo));
      this.toPath({
        path: "/deliverydetails",
        query: recieveInfo
      });
      this.getDistance();
    }
  },

  watch: {
    search_key(newv, oldv) {
      if (newv == "") {
        this.search_list = [];
        this.noSearchShow = false;
        // this.bool = true;
      }
    },
    detailedAddress() {
      if (this.detailedAddress) {
        this.mapCenterNoteBoxBool = true;
        console.log(this.detailedAddress);
        this.getAddCode();
      } else {
        this.mapCenterNoteBoxBool = false;
      }
      // 通过获取该地址的经纬度然后编码成全地址
    },
    userInputName() {
      this.senderName = this.userInputName;
    },
    userInputPhone() {
      this.senderPhone = this.userInputPhone;
    },
    userSelectedDistrict() {
      let paramsAdd =
        this.userSelectedProvince +
        this.userSelectedCity +
        this.userSelectedDistrict;
      console.log(paramsAdd);

      // 检测到用户选择的城市数据后，逆向编码获取该地区的经纬度并赋值给地图中心
      AMap.plugin("AMap.Geocoder", function() {
        var geocoder = new AMap.Geocoder({
          // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
          city: "全国"
        });

        geocoder.getLocation(paramsAdd, function(status, result) {
          if (status === "complete" && result.info === "OK") {
            // result中对应详细地理坐标信息
            console.log(result);
            // 获取到该坐标值，换到地图中心
            console.log(self.__VUE_HOT_MAP__);
            for (let key in self.__VUE_HOT_MAP__) {
              if (key === "b62d18c6") {
                let loadmapComponent = self.__VUE_HOT_MAP__[key].instances[0];
                loadmapComponent.center = [
                  result.geocodes[0].location.lng,
                  result.geocodes[0].location.lat
                ];
                loadmapComponent.adMap();
              }
            }
          }
        });
      });
    }
  }
};
</script>

<style lang="scss">
.mymap {
  width: 100%;
  height: r(1000);
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100000;
  background: #fff;
  // 搜索层
  .search-area {
    width: 100%;
    height: r(88);
    overflow: hidden;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100000000;
    background: #fff;
    .back {
      width: r(22);
      height: r(36);
      background: url("../assets/back.png") no-repeat;
      background-size: r(22) r(36);
      margin: r(26) 0 0 r(30);
    }
    .search-box {
      width: r(639);
      height: r(68);
      background: #f2f6f9;
      margin: r(10) 0 r(10) r(30);
      border-radius: r(34);
      .searchIcon {
        display: inline-block;
        width: r(34);
        height: r(34);
        background: url("../assets/search.png") no-repeat;
        background-size: r(34) r(34);
        margin: r(17) 0 r(17) r(20);
        vertical-align: middle;
      }
      .searchandclear {
        width: r(395);
        height: r(68);
        overflow: hidden;
        .search {
          width: r(350);
          height: r(68);
          background: #f2f6f9;
          vertical-align: middle;
          border: none;
          margin-left: r(20);
        }
        .clear {
          display: inline-block;
          width: r(20);
          height: r(20);
          background: url("../assets/clear.png") no-repeat;
          background-size: r(20) r(20);
          margin: r(17) 0 r(17);
          vertical-align: middle;
        }
      }
      .icons {
        width: r(190);
        height: r(68);
        .voiceIcon {
          display: inline-block;
          width: r(22);
          height: r(34);
          background: url("../assets/voice.png") no-repeat;
          background-size: r(22) r(34);
          margin: r(17) 0 r(17) r(15);
          vertical-align: middle;
          margin-right: r(15);
        }
        .bigCity {
          font-size: r(28);
          font-family: PingFang SC;
          color: #333;
          // line-height: r(68);
          vertical-align: middle;
        }
        // .popup {
        //   display: inline-block;
        //   width: 0;
        //   height: 0;
        //   border: r(8) solid;
        //   border-color: #666 transparent transparent transparent;
        //   vertical-align: middle;
        //   margin-left: r(10);
        // }
        // .popdown {
        //   display: inline-block;
        //   width: 0;
        //   height: 0;
        //   border: r(8) solid;
        //   border-color: transparent transparent #666 transparent;
        //   vertical-align: middle;
        //   margin-left: r(10);
        // }
      }
    }
  }
  // 地图层
  .mapbox {
    .map {
      width: 100%;
      height: r(1334);
      position: absolute;
    }
    .sign {
      position: absolute;
      left: 0;
      right: 0;
      top: r(300);
      bottom: r(31);
      margin: auto;
      width: r(45);
      height: r(61);
      background: url("../assets/upload.png") no-repeat;
      background-size: r(45) r(61);
      // z-index:10000;
      // background:#000;
    }
    .notebox {
      position: fixed;
      left: 0;
      right: 0;
      top: r(-20);
      bottom: r(250);
      // z-index: -1;
      margin: auto;
      width: 100%;
      height: r(80);
      display: flex;
      .addnote {
        height: r(80);
        // border: 1px solid;
        border-radius: r(14);
        text-align: center;
        margin: auto;
        background: #fff;
        display: flex;
        padding: 0 r(20);
        box-shadow: 0px 0px r(20) rgba(0, 0, 0, 0.16);
        span {
          margin: auto;
          color: #333;
          font-size: r(26);
          word-wrap: break-word;
        }
      }
      .direct {
        position: fixed;
        left: 48.8%;
        top: r(562);
        z-index: 10;
        width: r(20);
        height: r(20);
        // border-bottom: 1px solid;
        // border-right: 1px solid;
        transform: rotate(45deg);
        background: #fff;
        // box-shadow: 0 0 r(20) rgba(0, 0, 0, 0.16);
      }
    }
    .bignotebox {
      position: fixed;
      left: 0;
      right: 0;
      top: r(-30);
      bottom: r(250);
      z-index: 100;
      margin: auto;
      width: 100%;
      height: r(100);
      display: flex;
      // background: red;
      .addnote {
        width: r(300);
        height: r(100);
        // border: 1px solid;
        border-radius: r(14);
        text-align: center;
        margin: auto;
        background: #fff;
        display: flex;
        padding: 0 r(20);
        box-shadow: 0px 0px r(20) rgba(0, 0, 0, 0.16);
        overflow: hidden;
        span {
          margin: auto;
          color: #333;
          font-size: r(26);
          word-wrap: break-word;
        }
      }
      .bigaddnote {
        width: r(300);
        height: r(100);
        // border: 1px solid;
        border-radius: r(14);
        text-align: center;
        margin: auto;
        background: #fff;
        display: flex;
        padding: 0 r(20);
        box-shadow: 0px 0px r(20) rgba(0, 0, 0, 0.16);
        overflow: auto;
        span {
          margin: auto;
          color: #333;
          font-size: r(22);
          word-wrap: break-word;
        }
      }
      .direct {
        position: fixed;
        left: 48.8%;
        top: r(570);
        z-index: -1;
        width: r(20);
        height: r(20);
        // border-bottom: 1px solid;
        // border-right: 1px solid;
        transform: rotate(45deg);
        background: #fff;
        box-shadow: 0 0 r(20) rgba(0, 0, 0, 0.16);
      }
    }
  }

  // 搜索列表层
  .search-list {
    width: 100%;
    height: r(1244);
    position: absolute;
    background: #fff;
    z-index: 1000000;
    left: 0;
    top: r(88);
    // overflow:auto;
    ul {
      width: 100%;
      height: r(1244);
      overflow: auto;
      // 搜索列表
      .searchlist {
        width: r(690);
        height: r(98);
        margin: 0 auto;
        border-bottom: 1px solid rgba(198, 198, 198, 0.3);
        .maplocationicon {
          display: inline-block;
          width: r(27);
          height: r(33);
          background: url(../assets/address.png) no-repeat;
          background-size: r(27) r(33);
          vertical-align: middle;
          margin: r(33) 0 r(32) 0;
        }
        .searchaddressarea {
          width: r(635);
          height: r(98);
          overflow: hidden;
          margin-left: r(24);
          .name {
            width: r(635);
            height: r(49);
            line-height: r(49);
            font-size: r(28);
            color: #333;
          }
          .address {
            width: r(635);
            height: r(49);
            line-height: r(49);
            color: #999;
            overflow: hidden;
          }
        }
      }
      // 暂无搜索结果
      .nosearch {
        width: 100%;
        height: r(1244);
        display: flex;
        span {
          margin: auto;
        }
      }
    }
  }

  // 获焦暂无搜索
  .records {
    width: 100%;
    height: r(1246);
    position: absolute;
    background: #fff;
    z-index: 100000;
    left: 0;
    top: r(88);
    // 地图选点和当前位置
    .upul {
      width: 100%;
      height: r(197);
      li {
        width: r(690);
        height: r(98);
        margin: 0 auto;
      }
      .tomap {
        border-bottom: 1px solid rgba(198, 198, 198, 0.3);
        .maplocationicon {
          display: inline-block;
          width: r(27);
          height: r(33);
          background: url(../assets/address.png) no-repeat;
          background-size: r(27) r(33);
          vertical-align: middle;
        }
        .maptpaddress {
          // vertical-align:middle;
          line-height: r(98);
          margin-left: r(24);
          color: #333;
          font-size: r(30);
        }
      }
      .currentposition {
        .maplocationicon {
          display: inline-block;
          width: r(27);
          height: r(33);
          background: url(../assets/address.png) no-repeat;
          background-size: r(27) r(33);
          vertical-align: middle;
          margin-top: r(33);
        }
        .addressarea {
          margin-left: r(24);
          width: r(635);
          height: r(98);
          .roughaddressarea {
            width: r(595);
            height: r(49);
            line-height: r(49);
            .roughaddress {
              font-size: r(28);
              color: #333;
            }
            .notice {
              display: inline-block;
              width: r(66);
              height: r(36);
              border: 1px solid rgba(3, 80, 160, 0.3);
              border-radius: r(6);
              color: #0350a0;
              text-align: center;
              line-height: r(36);
              // vertical-align:middle;
              margin-left: r(18);
            }
          }
          .detailedaddress {
            width: r(595);
            height: r(49);
            line-height: r(49);
            color: #999;
            overflow: hidden;
          }
        }
      }
    }
    // 历史记录
    .historypart {
      width: 100%;
      height: r(1048);
      background: #f2f6f7;
      .historytitle {
        width: 100%;
        height: r(82);
        .title {
          color: #666;
          font-size: r(30);
          margin: r(26) 0 0 r(30);
        }
        .deleteicon {
          display: block;
          width: r(28);
          height: r(30);
          background: url(../assets/delete.png) no-repeat;
          background-size: r(28) r(30);
          margin: r(26) r(30) r(26) 0;
        }
      }
      .historyarea {
        width: 100%;
        height: r(966);
        overflow: auto;
        background: #fff;
        li {
          width: r(690);
          height: r(98);
          margin: 0 auto;
          border-bottom: 1px solid rgba(198, 198, 198, 0.3);
          .maplocationicon {
            display: inline-block;
            width: r(27);
            height: r(33);
            background: url(../assets/address.png) no-repeat;
            background-size: r(27) r(33);
            vertical-align: middle;
            margin-top: r(33);
          }
          .addressarea {
            margin-left: r(24);
            width: r(635);
            height: r(98);
            .roughaddressarea {
              width: r(635);
              height: r(49);
              line-height: r(49);
              .roughaddress {
                font-size: r(28);
                color: #333;
              }
            }
            .detailedaddress {
              width: r(635);
              height: r(49);
              line-height: r(49);
              color: #999;
              overflow: hidden;
            }
          }
        }
      }
    }
  }

  // 回当前位置图标
  .goback {
    position: fixed;
    left: 0;
    right: r(-588);
    top: 0;
    bottom: r(-333);
    margin: auto;
    width: r(96);
    height: r(96);
    background: #fff;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    display: flex;
    span {
      margin: auto;
      display: inline-block;
      width: r(50);
      height: r(50);
      background: url(../assets/img/gobackicon.png) no-repeat;
      background-size: r(50) r(50);
      opacity: 0.7;
    }
  }

  // 信息表单层
  .senderInfo {
    width: r(690);
    height: r(394);
    border-radius: r(10);
    background: rgba(255, 255, 255, 1);
    position: fixed;
    left: r(30);
    bottom: r(30);
    z-index: 10000;
    box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.16);
    .floor-n1 {
      width: r(650);
      height: r(88);
      margin: 0 auto;
      border-bottom: 1px solid rgba(198, 198, 198, 0.3);
      .loadIcon {
        display: inline-block;
        width: r(32);
        height: r(32);
        background: #f28312;
        color: #fff;
        border-radius: 50%;
        line-height: r(32);
        text-align: center;
        font-size: r(20);
        margin-top: r(28);
      }
      .title {
        vertical-align: middle;
        line-height: r(88);
        margin-left: r(20);
        font-size: r(30);
        color: #333;
      }
    }
    .floor-n2 {
      width: r(650);
      height: r(88);
      margin: 0 auto;
      border-bottom: 1px solid rgba(198, 198, 198, 0.3);
      // overflow:hidden;
      .locationIcon {
        width: r(27);
        height: r(33);
        display: inline-block;
        background: url(../assets/address.png) no-repeat;
        background-size: r(27) r(33);
        vertical-align: middle;
      }
      input {
        border: none;
        line-height: r(88);
        margin-left: r(20);
        width: r(600);
        height: r(84);
        vertical-align: middle;
        overflow: hidden;
      }
    }
    .floor-n3 {
      width: r(650);
      height: r(88);
      margin: 0 auto;
      border-bottom: 1px solid rgba(198, 198, 198, 0.3);
      .sender {
        width: r(325);
        height: r(88);
        .senderIcon {
          width: r(29);
          height: r(33);
          display: inline-block;
          background: url(../assets/lightmine.png) no-repeat;
          background-size: r(29) r(33);
          vertical-align: middle;
        }
        .sendername {
          border: none;
          line-height: r(88);
          margin-left: r(20);
          width: r(275);
          height: r(84);
          vertical-align: middle;
        }
      }
      .phone {
        width: r(325);
        height: r(88);
        .phoneIcon {
          width: r(29);
          height: r(33);
          display: inline-block;
          background: url(../assets/lightphone.png) no-repeat;
          background-size: r(29) r(33);
          vertical-align: middle;
        }
        .phonenumber {
          border: none;
          line-height: r(88);
          margin-left: r(20);
          width: r(275);
          height: r(84);
          vertical-align: middle;
        }
      }
    }
    .submit {
      width: r(650);
      height: r(127);
      margin: 0 auto;
      display: flex;
      .subbtn {
        margin: auto;
        width: r(300);
        height: r(86);
        background: #f28312;
        border-radius: r(43);
        line-height: r(86);
        text-align: center;
        color: #fff;
        font-size: r(32);
      }
    }
  }
}
.toasts {
  background: red !important;
  z-index: 10000000000;
}
.messagebox {
  background: red !important;
  z-index: 10000000000;
}
</style>