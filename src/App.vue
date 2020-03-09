<template>
  <div id="app">
    <router-view/>

    <div class="amap-page-container" v-show="mapShowBool">
      <div :style="{width:'0',height:'0'}">
        <el-amap vid="amap" :plugin="plugin" class="amap-demo" :center="center">
        </el-amap>
      </div>
    </div>
  </div>
</template>


<script>
 export default {
   name:"app",
   data(){
    const self = this;
    return {
      mapShowBool:false,
      search_key: '',
      center: [121.59996, 31.197646],
      lng: 0,
      lat: 0,
      loaded: false,
      plugin: [{
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 100,          //超过10秒后停止定位，默认：无穷大
        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
        convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: true,        //显示定位按钮，默认：true
        buttonPosition: 'RB',    //定位按钮停靠位置，默认：'LB'，左下角
        showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
        showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
        panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
        zoomToAccuracy:true,//定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
        extensions:'all',
        pName: 'Geolocation',
        events: {
          init(o) {
            // o 是高德地图定位插件实例
            o.getCurrentPosition((status, result) => {
              // console.log(result);
              self.$store.dispatch("setLocation",result);
              self.$store.dispatch("setAddress",result.formattedAddress);
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
  //  created(){
  //    this.getLocation();
  //  },
  //  methods:{
  //    getLocation(){
  //      const self = this;
  //      AMap.plugin('AMap.Geolocation', () => {
  //       var geolocation = new AMap.Geolocation({
  //         // 是否使用高精度定位，默认：true
  //         enableHighAccuracy: true,
  //         // 设置定位超时时间，默认：无穷大
  //         timeout: 10000,
  //         //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
  //         zoomToAccuracy: true,
  //         showMarker:true,
  //         maximumAge: 0,           //定位结果缓存0毫秒，默认：0
  //         convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true

  //       })

  //       geolocation.getCurrentPosition()
  //       AMap.event.addListener(geolocation, 'complete', onComplete)
  //       AMap.event.addListener(geolocation, 'error', onError)

  //       function onComplete (data) {
  //         // data是具体的定位信息(精准定位)
  //         console.log(data);
  //         // 此时将data整个存储到vuex中的location中，将data内的地址存储到address中
  //         self.$store.dispatch("setLocation",data);
  //         self.$store.dispatch("setAddress",data.formattedAddress);
  //       }

  //       function onError (data) {
  //         // 定位出错(data为出错数据)
  //         console.log(data);
  //         // 出错时调用城市定位（通过IP来获取当前城市定位）
  //         self.getLngLatLocation();
  //       }
  //     })
  //    },

  //     // 该方法是定位失败时通过IP获取当前城市的非精准定位
  //     getLngLatLocation(){
  //       AMap.plugin('AMap.CitySearch', function () {
  //         var citySearch = new AMap.CitySearch()
  //         citySearch.getLocalCity(function (status, result) {
  //           if (status === 'complete' && result.info === 'OK') {
  //             // 查询成功，result即为当前所在城市信息
  //             console.log(result);
  //             // result是在精准定位失败后通过IP定位后的粗略定位，需要通过经纬度逆向地理编码进行处理
  //             AMap.plugin('AMap.Geocoder', function() {
  //               var geocoder = new AMap.Geocoder({
  //                 // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
  //                 city: result.adcode,
  //               })
              
  //               var lnglat = result.rectangle.split(";")[0].split(",");
  //               geocoder.getAddress(lnglat, function(status, data) {
  //                 if (status === 'complete' && data.info === 'OK') {
  //                     // data为对应的地理位置详细信息
  //                     console.log(data);

  //                 }
  //               })
  //             })
  //           }
  //         })
  //       })
  //     }, 
  //  }
 }
</script>


<style>
  @import url("assets/css/reset.css");
</style>
