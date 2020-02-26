<template>
    <div class="amap-page-container">
        <div :style="{width:'100%',height:'300px'}">
            <el-amap vid="amap" :plugin="plugin" class="amap-demo" :center="center">
            </el-amap>
        </div>

        <div class="loadmap">
            <!-- 第一层搜索 -->
            <div class="search-area clearfix">
                <div class="back fl" @click="back()"></div>
                <div class="search-box fl">
                <span class="searchIcon fl"></span>
                <div class="searchandclear fl">
                    <input class="search" type="text" placeholder="输入关键字" v-model="search_key" @input="keySearch()" @focus="getRecord()" @keydown.delete="deleteInput()"/>
                    <span class="clear" v-if="search_key" @click="clearSearch()"></span>
                </div>
                <div class="icons fr">
                    <span class="voiceIcon"></span>
                    <span class="bigCity">bigCity</span>
                    <span class="popup"></span>
                </div>
                
                </div>
            </div>
            
        </div>

    </div>

</template>

<script>
export default {
    data(){
        const self = this;
        return {
            currentLocationData:{},
            search_key:'',

            // 定位数据 ↓
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
                            self.currentLocationData = JSON.parse(JSON.stringify(result));
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
            // 定位数据 ↑

        }
    },

    mounted(){
        this.locationStorage();
    },

    methods:{
        locationStorage(){
            if(this.currentLocationData.status === 1){

            }
        },
        back(){

        },
        keySearch(){

        },
        getRecord(){

        },
        deleteInput(){

        },
        clearSearch(){

        },

    }


};
</script>

<style lang="scss" scoped>
// .amap-page-container{
//     width:
// }
.amap-demo {
    width:100%;
    height: r(1334);
    position:fixed;
    left:0;
    top:0;
    z-index:100000;
}
.loadmap{
    width:100%;
    height:r(1334);
    position:fixed;
    left:0;
    top:0;
    z-index:100000;
    // 第一层
    .search-area{
      width:100%;
      height: r(88);
      overflow: hidden;
      position: fixed;
      left:0;
      top:0;
      z-index: 100000000;
      background:#fff;
      .back{
        width:r(22);
        height: r(36);
        background: url('../assets/back.png') no-repeat;
        background-size: r(22) r(36);
        margin:r(26) 0 0 r(30);
      }
      .search-box{
        width:r(639);
        height:r(68);
        background:#F2F6F9;
        margin:r(10) 0 r(10) r(30);
        border-radius: r(34);
        .searchIcon{
          display: inline-block;
          width:r(34);
          height:r(34);
          background: url('../assets/search.png') no-repeat;
          background-size: r(34) r(34);
          margin:r(17) 0 r(17) r(20);
          vertical-align: middle;
        }
        .searchandclear{
          width:r(395);
          height:r(68);
          overflow: hidden;
          .search{
          width:r(350);
          height: r(68);
          background:#F2F6F9;
          vertical-align: middle;
          border:none;
          margin-left:r(20);
          }
          .clear{
            display: inline-block;
            width:r(20);
            height:r(20);
            background: url('../assets/clear.png') no-repeat;
            background-size: r(20) r(20);
            margin:r(17) 0 r(17);
            vertical-align: middle;
          }
        }
        .icons{
          width:r(190);
          height: r(68);
          .voiceIcon{
          display: inline-block;
          width:r(22);
          height:r(34);
          background: url('../assets/voice.png') no-repeat;
          background-size: r(22) r(34);
          margin:r(17) 0 r(17) r(15);
          vertical-align: middle;
          }
          .bigCity{
            font-size:r(28);
            font-family: PingFang SC;
            color:#333;
            margin-left:r(15);
            line-height: r(68);
          }
          .popup{
            display: inline-block;
            width: 0;
            height: 0;
            border:r(8) solid;
            border-color:#666 transparent transparent transparent;
            vertical-align: middle;
            margin-left:r(10);
          }
        }
      }
    }
}
</style>