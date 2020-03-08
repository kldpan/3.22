<template>
<div class="mapbox">
  <input type="text" v-model="search_key" id="input" @focus="clearInput()">
  <!-- 地图区 -->
  <div class="maparea">
    <div class="locationicon"></div>
    <div id="mapContainer">
      <div class="amap-page-container">
        <div :style="{width:'100%',height:'300px'}">
          <el-amap vid="amap" :plugin="plugin" class="amap-demo" :center="center">
          </el-amap>
        </div>
      </div>
    </div>
  </div>
  
  
  <!-- 搜索区 -->
  <ul>
    <li v-for="(item,index) in search_list" :key="index" @click="mapToThisAddress(item)">
      <span>{{item.name}}</span> —— <span>{{item.address}}</span>
    </li>
  </ul>
  

</div>
</template>

<script>
export default {
  data(){
    const self = this;
    return {
      search_key: '',
      search_list:[],
      center: [121.59996, 31.197646],
      lng: 0,
      lat: 0,
      loaded: false,
      
      plugin: [{
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 100,          //超过10秒后停止定位，默认：无穷大
        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
        convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: false,        //显示定位按钮，默认：true
        buttonPosition: 'RB',    //定位按钮停靠位置，默认：'LB'，左下角
        showMarker: false,        //定位成功后在定位到的位置显示点标记，默认：true
        showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
        panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
        zoomToAccuracy:true,//定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
        extensions:'all',
        pName: 'Geolocation',
        events: {
          init(o) {
            // o 是高德地图定位插件实例
            o.getCurrentPosition((status, result) => {
              console.log(result);
              if (result && result.position) {
                self.lng = result.position.lng;
                self.lat = result.position.lat;
                self.center = [self.lng, self.lat];
                self.loaded = true;
                self.$nextTick();
              }
            });
          }
        }
      }]
    }
  },
  mounted(){
    this.dragMap();
  },
  watch:{
    search_key(){
      
      this.keySearch();
        
    }
  },
  methods:{
    // searchPlace(){
    //   console.log(this.search_key);
    //   var map = new AMap.Map("mapContainer", {
    //     resizeEnable: true,
    //     center: [this.lng,this.lat],//地图中心点
    //     zoom: 13,//地图显示的缩放级别
    //     keyboardEnable: false,
    //   });
    //   AMap.plugin(['AMap.Autocomplete','AMap.PlaceSearch'],function(){
    //     var autoOptions = {
    //       // 城市，默认全国 
    //       city: "全国",
    //       // 使用联想输入的input的id
    //       input: "input"
    //     }
    //     var autocomplete= new AMap.Autocomplete(autoOptions);

    //     var placeSearch = new AMap.PlaceSearch({
    //       type: '汽车服务|餐饮服务|购物服务|生活服务|体育休闲服务|医疗保健服务|住宿服务|风景名胜|商务住宅|政府机构及社会团体|科教文化服务|交通设施服务|金融保险服务|公司企业|地名地址信息', // 兴趣点类别
    //       pageSize: 30, // 单页显示结果条数
    //       pageIndex: 1, // 页码
    //       city: "全国", // 兴趣点城市
    //       autoFitView: true, // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
    //       map:map,
    //     })
    //     AMap.event.addListener(autocomplete, 'select', function(e){
    //       //TODO 针对选中的poi实现自己的功能
    //       placeSearch.setCity(e.poi.adcode);
    //       placeSearch.search(e.poi.name,(status,result) => {
    //         console.log(status,result);
    //       })
    //     })
    //   })
    // }

    clearInput(){
      if(this.search_key){
        this.search_key = '';
        this.search_list = [];
        this.center = [this.$store.state.location.position.lng || 106.532357,this.$store.state.location.position.lat || 29.57212];
      }
    },
    
    // 搜索方法
    keySearch(){
      
      console.log(this.search_key);
      AMap.service(["AMap.PlaceSearch"], () => {
        //构造地点查询类
        var placeSearch = new AMap.PlaceSearch({
          type: '汽车服务|餐饮服务|购物服务|生活服务|体育休闲服务|医疗保健服务|住宿服务|风景名胜|商务住宅|政府机构及社会团体|科教文化服务|交通设施服务|金融保险服务|公司企业|地名地址信息', // 兴趣点类别
          pageSize: 30, // 单页显示结果条数
          pageIndex: 1, // 页码
          city: "全国", // 兴趣点城市
          citylimit: false, //是否强制限制在设置的城市内搜索
          autoFitView: false // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        });
        //关键字查询
        placeSearch.search(this.search_key,(status, result) => {
          // console.log(result);
          if(status == 'complete'){
            if(result.poiList.count === 0){
              // this.noSearchShow = true;
              // this.bool = false;
            }else{
              this.search_list = result.poiList.pois//将查询到的地点赋值
              console.log(this.search_list);
              // this.noSearchShow = false;
              // this.bool = false;
              
            }
          }else{
            this.search_list = [];
            // this.noSearchShow = true;
          }
        });
      });
    },

    // 点击搜索结果地图跳到指定位置
    mapToThisAddress(item){
      console.log(item);
      // this.lng = item.location.lng;
      // this.lat = item.location.lat;
      this.center = [item.location.lng,item.location.lat];
      this.centerSearch();
    },

    // 拖动地图监听事件
    dragMap(){
      // var map = new AMap.Map('mapContainer',{
      //   zoom: 15,      //缩放级别
      //   // center: this.center, //设置地图中心点
      //   center: [this.$store.state.location.position.lng || 106.532357,this.$store.state.location.position.lat || 29.57212],
      //   resizeEnable: true, //地图初始化加载定位到当前城市
      // });
      // //获取初始中心点并赋值
      // var currentCenter = map.getCenter();//此方法是获取当前地图的中心点
      // this.center = [currentCenter.lng,currentCenter.lat];//将获取到的中心点的纬度经度赋值给data的center
      // //根据地图中心点查附近地点，此方法在下方
      // this.centerSearch();
      // //监听地图移动事件，并在移动结束后获取地图中心点并更新地点列表
      // var moveendFun = (e) => {
      //   // 获取地图中心点
      //   currentCenter = map.getCenter();
      //   this.center = [currentCenter.lng,currentCenter.lat]
      //   //根据地图中心点查附近地点
      //   this.centerSearch();
      // }
      // // 绑定事件移动地图事件
      // map.on('moveend', moveendFun);
    },

    // 中心查询
    centerSearch(){
      AMap.service(["AMap.PlaceSearch"], () => {
        //构造地点查询类
        var placeSearch = new AMap.PlaceSearch({ 
          type: '汽车服务|餐饮服务|购物服务|生活服务|体育休闲服务|医疗保健服务|住宿服务|风景名胜|商务住宅|政府机构及社会团体|科教文化服务|交通设施服务|金融保险服务|公司企业|地名地址信息', // 兴趣点类别
          pageSize: 30, // 单页显示结果条数
          pageIndex: 1, // 页码
          city: "全国", // 兴趣点城市
          autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        });
        //根据地图中心点查附近地点
        placeSearch.searchNearBy('', [this.center[0],this.center[1]], 200, (status, result) => {
          console.log(result);
          if(status == 'complete'){
            this.lists = result.poiList.pois//将查询到的地点赋值
            this.dragAddress = this.lists;
            // this.dragMapAddressToDetails();
          }
        });
      });
    },

  },
}    
</script>

<style lang="scss" scoped>
// .amap-demo {
//   height: 300px;
// }
.maparea{
  // display:flex;
  .locationicon{
    position:fixed;
    left:48%;
    top:24.5% ;
    z-index:10000000000;
    width: r(32);
    height: r(32);
    background:#000;
  }
}

</style>