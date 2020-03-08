<template>
<div class="mapbox">
  <div class="inputarea">
    <input type="text" v-model="search_key" id="input">
  </div>
  <div id="container"></div>

</div>
</template>

<script>
export default {
  data(){
    return {
      search_key:'',
    }
  },
  mounted(){
    this.initMap();
  },
  // watch:{
  //   search_key(){
  //     if(this.search_key){
  //       this.searchPlace();
  //     }
        
  //   }
  // },
  methods:{
    initMap(){
      var map = new AMap.Map('container',{
        zoom: 13,      //缩放级别
        // center: this.center, //设置地图中心点
        center: [this.$store.state.location.position.lng || 106.532357, this.$store.state.location.position.lat || 29.57212],
        resizeEnable:true, //地图初始化加载定位到当前城市
      });
    },
    // searchPlace(){
    //   var windowsArr = [];
    //   var marker = [];
    //   var map = new AMap.Map("mapContainer", {
    //           resizeEnable: true,
    //           center: [116.397428, 39.90923],//地图中心点
    //           zoom: 13,//地图显示的缩放级别
    //           keyboardEnable: false
    //   });
    //   AMap.plugin(['AMap.Autocomplete','AMap.PlaceSearch'],function(){
    //     var autoOptions = {
    //       city: "全国", //城市，默认全国
    //       input: "keyword"//使用联想输入的input的id
    //     };
    //     autocomplete= new AMap.Autocomplete(autoOptions);
    //     var placeSearch = new AMap.PlaceSearch({
    //           city:'全国',
    //           map:map
    //     })
    //     AMap.event.addListener(autocomplete, "select", function(e){
    //       //TODO 针对选中的poi实现自己的功能
    //       placeSearch.setCity(e.poi.adcode);
    //       placeSearch.search(e.poi.name)
    //     });
    //   });
    // }
  },
}    
</script>

<style lang="scss" scoped>
.amap-demo {
  height: 300px;
}
</style>