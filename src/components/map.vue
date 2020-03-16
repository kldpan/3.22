<template>
  <div class="map-info">
    <!-- 第一层搜索 -->
    <div class="search-area clearfix">
      <div class="back fl" @click="back()"></div>
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
          <span class="bigCity">BIGCITY</span>
          <span class="popup"></span>
        </div>
      </div>
    </div>

    <!-- 第二层地图层 -->
    <div class="map">
      <div class="amap-page-container">
        <div class="map-box">
          <el-amap vid="amap" :plugin="plugin" class="amap-demo" :center="center"></el-amap>
        </div>
        <div class="sign"></div>
      </div>
    </div>

    <!-- 第三层搜索列表 -->
    <div class="search-list" v-if="search_key">
      <ul>
        <li v-for="(item,index) in search_list" :key="index" @click="onSearchLi(item.location)">
          <span class="name">{{item.name}}</span>
          <p class="address">{{item.address}}</p>
        </li>
        <li v-if="noSearchShow">
          <p>暂无搜索结果</p>
        </li>
      </ul>
    </div>
    <!-- 搜索输入获取焦点时显示 -->
    <div class="records" v-if="bool">
      <ul>
        <li class="tomap">
          <span class="maplocationicon"></span>
          <span>去地图上选点</span>
        </li>
        <li class="currentposition">
          <span class="currentcity">{{111}}</span>
        </li>
      </ul>
    </div>

    <!-- 第四层信息 -->
    <div class="senderInfo">
      <!-- 第一层 -->
      <div class="floor-n1">
        <span class="loadIcon">装</span>
        <span class="title">发货人信息</span>
      </div>

      <!-- 第二层 -->
      <div class="floor-n2">
        <span class="locationIcon"></span>
        <input type="text" placeholder="详细地址（精确到门牌号）" v-model="detailedAddress" />
      </div>

      <!-- 第三层 -->
      <div class="floor-n3">
        <div class="sender fl">
          <span class="senderIcon"></span>
          <input class="sendername" placeholder="联系人" />
        </div>
        <div class="phone fl">
          <span class="phoneIcon"></span>
          <input class="phonenumber" placeholder="联系电话" />
          <span class="contacts">通信录</span>
        </div>
      </div>

      <!-- 第四层 -->
      <div class="submit">
        <div class="subbtn">确定</div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    const self = this;
    return {
      center: [121.59996, 31.197646],
      lng: 0,
      lat: 0,
      loaded: false,
      search_key: "", //搜索值
      search_list: [], //搜索结果列表
      noSearchShow: false, //无搜索结果提示，无搜索结果时会显示暂无搜索结果
      detailedAddress: "",
      bool: false, //bool值控制搜索得焦后出现的页面
      currentPosition: "",
      plugin: [
        {
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 100, //超过10秒后停止定位，默认：无穷大
          maximumAge: 0, //定位结果缓存0毫秒，默认：0
          convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          showButton: true, //显示定位按钮，默认：true
          buttonPosition: "RT", //定位按钮停靠位置，默认：'LB'，左下角
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
                // console.log(result.formattedAddress);
                // let res = result.addressComponent;
                // let temp = {
                //   province: res.province,
                //   city: res.city,
                //   district: res.district,
                //   township: res.township,
                //   street: res.street,
                //   streetNumber:res.streetNumber,
                //   currentCity:result.formattedAddress
                // };
                // self.$store.commit('getCurrentCity',temp);
                // if (result && result.position) {
                //   self.lng = result.position.lng;
                //   self.lat = result.position.lat;
                //   self.center = [self.lng, self.lat];
                //   self.loaded = true;
                //   self.$nextTick();
                // }
              });
            }
          }
        }
      ]
    };
  },
  mounted() {
    this.adMap();
    // this.currentPosition = this.$store.state.currentCity;
    // // this.adMap();
    // setTimeout(()=>{console.log(this.currentPosition);},1500)
    // console.log(this);
  },
  methods: {
    // 初始化地图方法
    adMap() {
      //初始化地图
      var map = new AMap.Map("container", {
        zoom: 8, //缩放级别
        center: this.center, //设置地图中心点
        resizeEnable: true //地图初始化加载定位到当前城市
      });
      //获取初始中心点并赋值
      var currentCenter = map.getCenter(); //此方法是获取当前地图的中心点
      console.log(currentCenter);
      this.center = [currentCenter.lng, currentCenter.lat]; //将获取到的中心点的纬度经度赋值给data的center
      //根据地图中心点查附近地点，此方法在下方
      this.centerSearch();
      //监听地图移动事件，并在移动结束后获取地图中心点并更新地点列表
      var moveendFun = e => {
        // 获取地图中心点
        currentCenter = map.getCenter();
        this.center = [currentCenter.lng, currentCenter.lat];
        //根据地图中心点查附近地点
        this.centerSearch();
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
          [this.center[0], this.center[1]],
          200,
          (status, result) => {
            if (status == "complete") {
              this.lists = result.poiList.pois; //将查询到的地点赋值
              console.log(result);
              console.log(11111);
            }
          }
        );
      });
    },
    // 搜索方法
    keySearch() {
      AMap.service(["AMap.PlaceSearch"], () => {
        //构造地点查询类
        var placeSearch = new AMap.PlaceSearch({
          type:
            "汽车服务|餐饮服务|购物服务|生活服务|体育休闲服务|医疗保健服务|住宿服务|风景名胜|商务住宅|政府机构及社会团体|科教文化服务|交通设施服务|金融保险服务|公司企业|地名地址信息", // 兴趣点类别
          pageSize: 30, // 单页显示结果条数
          pageIndex: 1, // 页码
          city: "全国", // 兴趣点城市
          citylimit: false, // 是否强制限制在设置的城市内搜索
          autoFitView: false // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        });
        //关键字查询
        placeSearch.search(this.search_key, (status, result) => {
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
      this.$router.back();
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
    }
  },
  watch: {
    search_key(newv, oldv) {
      if (newv == "") {
        this.search_list = [];
        this.noSearchShow = false;
        this.bool = true;
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.map-info {
  width: 100%;
  height: r(1334);
  background: #fff;
  position: absolute;
  z-index: 100000;
  .map {
    width: 100%;
    // height: r(1334);
    // position: absolute;
    // z-index: 100000000;
    // overflow: hidden;
    .map-box {
      width: 100%;
      // height:r(1334);
      .amap-demo {
        height: r(1280);
      }
    }
    .sign {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: r(55);
      margin: auto;
      width: r(45);
      height: r(61);
      background: url("../assets/load.png") no-repeat;
      background-size: r(45) r(61);
      // z-index:10000;
      // background:#000;
    }
  }
}
</style>