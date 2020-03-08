<template>
  <div class="mymap">
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
    

    <!-- 第二层地图 -->
    <div class="mapbox">
      <div class="map" id="container" :plugin="plugin" vid="amap" :center="center"></div>
      <div class="sign"></div>
    </div>
    

    <!-- 第三层搜索列表 -->
    <div class="search-list" v-if="search_key">
    <!-- <div class="search-list" v-if="search_list.length !== 0"> -->
      <ul>
        <li v-for="(item,index) in search_list" :key="index" @click="onSearchLi(item.location)" class="searchlist clearfix">
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
        <li class="currentposition clearfix">
          <span class="maplocationicon fl"></span>
          <div class="addressarea fl" v-if="autoLocation.status === 1">
            <div class="roughaddressarea">
              <span class="roughaddress">{{autoLocation.addressComponent.province}}</span>
              <span class="notice">当前</span>
            </div>
            <div class="detailedaddress" v-if="autoAddress">{{autoAddress}}</div>
          </div>
          <div class="locating fl" v-else="!autoLocation">正在定位</div>
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

    <!-- 第四层信息 -->
    <div class="senderInfo" ref="senderInfo">
      <!-- 第一层 -->
      <div class="floor-n1">
        <span class="loadIcon">装</span>
        <span class="title">发货人信息</span>  
      </div>

      <!-- 第二层 -->
      <div class="floor-n2">
        <span class="locationIcon"></span>
        <input type="text" placeholder="详细地址（精确到门牌号）" v-model="detailedAddress" >
      </div>

      <!-- 第三层 -->
      <div class="floor-n3 clearfix">
        <div class="sender fl">
          <span class="senderIcon"></span>
          <input class="sendername" placeholder="联系人">
        </div>
        <div class="phone fl">
          <span class="phoneIcon"></span>
          <input class="phonenumber" placeholder="联系电话">
          <!-- <span class="contacts">通信录</span> -->
        </div>
      </div>

      <!-- 第四层 -->
      <div class="submit" @click="toUnloadMap()">
        <div class="subbtn">确定</div>
      </div>


    </div>

    <div class="amap-page-container">
      <div :style="{width:'0',height:'0px'}">
        <el-amap vid="amap" :plugin="plugin" class="amap-demo" :center="center">
        </el-amap>
      </div>
    </div>



  </div>

</template>

<script>

export default {
  data(){
    const self = this;
    return{
      autoLocation:{},
      autoAddress:"",
      currentPosition:{},                   //定位全部数据
      search_key: '',                       //搜索值
      search_list: [],                      //搜索结果列表
      noSearchShow: false,                  //无搜索结果提示，无搜索结果时会显示暂无搜索结果
      detailedAddress:'',
      bool: false,                          //bool值控制搜索得焦后出现的页面
      testData:[],
      autoCity:"正在定位",
      // 地址
      dragAddress:[],
      autoAddress:"",
      searchAddress:"",
      userInputAddress:"",
      // 联系人
      userInputName:"",
      autoName:"",
      // 电话
      userInputPhone:"",
      autoPhone:"",
      // 提交表单
      loaderInfo:{
        senderName:"",
        senderPhone:"",
        senderAdd:""
      },

      // 地图数据 ↓
      // center: [121.59996, 31.197646],
      center: [106.532357,29.57212],        //纬度-经度
      lng: 0,
      lat: 0,
      loaded: false,
      plugin: [{
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 100,          //超过10秒后停止定位，默认：无穷大
        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
        convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: true,        //显示定位按钮，默认：true
        buttonPosition: 'LT',    //定位按钮停靠位置，默认：'LB'，左下角
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
              console.log(result);
              

            });
          }
        }
      }]

      // 地图数据 ↑
      
    }
  },
  mounted(){
    if(this.$store.state.location.status === 1){
      this.autoLocation = this.$store.state.location;
      this.autoAddress = this.$store.state.address;
    }

    this.adMap();
    // this.dragMapAddressToDetails();

    

  },
  methods:{
    // 初始化地图方法
    adMap(){
      // console.log(AMap);
      //初始化地图
      var map = new AMap.Map('container',{
        zoom: 19,      //缩放级别
        // center: this.center, //设置地图中心点
        center: [106.532357,29.57212],
        resizeEnable: true, //地图初始化加载定位到当前城市
      });
      //获取初始中心点并赋值
      var currentCenter = map.getCenter();//此方法是获取当前地图的中心点
      this.center = [currentCenter.lng,currentCenter.lat];//将获取到的中心点的纬度经度赋值给data的center
      //根据地图中心点查附近地点，此方法在下方
      this.centerSearch();
      //监听地图移动事件，并在移动结束后获取地图中心点并更新地点列表
      var moveendFun = (e) => {
        // 获取地图中心点
        currentCenter = map.getCenter();
        this.center = [currentCenter.lng,currentCenter.lat]
        //根据地图中心点查附近地点
        this.centerSearch();
      }
      // 绑定事件移动地图事件
      map.on('moveend', moveendFun);
    },
    // 周边查询
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
          if(status == 'complete'){
            this.lists = result.poiList.pois//将查询到的地点赋值
            console.log(result);
            this.dragAddress = this.lists;
            this.dragMapAddressToDetails();
          }
        });
      });
    },
    // 搜索方法
    keySearch(){
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
          if(status == 'complete'){
            if(result.poiList.count === 0){
              this.noSearchShow = true;
              this.bool = false;
            }else{
              this.search_list = result.poiList.pois//将查询到的地点赋值
              this.noSearchShow = false;
              this.bool = false;
            }
          }else{
            this.search_list = [];
            this.noSearchShow = true;
          }
        });
      });
    },

    // 点击搜索结果方法
    onSearchLi(location){
      this.center = [location.lng,location.lat];
      this.adMap();
      this.search_key = '';
    },
    back(){
      this.$router.go(0);
    },
    toMap(){
      this.bool = false;
    },
    toPath(url){
      this.$router.push(url);
    },
    getRecord(){
      this.bool = true;
    },
    clearSearch(){
      this.search_key = '';
      this.bool = true;
    },
    deleteInput(){
      if(this.search_key.length === 1){
        this.clearSearch();
      }

    },
    toUnloadMap(){
      this.toPath('/unloadmap');
      let senderInfo = {
        senderAddress:'',
        senderName:'',
        senderPhone:''
      }
      localStorage.setItem('senderInfo',senderInfo);
    },

    // 拖动地址改变内容
    dragMapAddressToDetails(){
      // console.log(this.$refs.senderInfo.children[1].children[1].value);
      this.$refs.senderInfo.children[1].children[1].value = this.dragAddress[0].address;
    }
  },
  watch: {
    search_key(newv,oldv){
      if(newv == ''){
        this.search_list = [];
        this.noSearchShow = false;
        this.bool = true;
      }
    }
  },
};
</script>

<style lang="scss" scoped>
  .mymap{
    width:100%;
    height:r(1334);
    position:absolute;
    left:0;
    top:0;
    z-index: 100000;
    background: #fff;
    // 搜索层
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
    // 地图层
    .mapbox{
      // display: flex;
      .map{
      width: 100%;
      height:r(1334);
      position: absolute;
      // opacity: 0.1;
      }
      .sign{
        position:absolute;
        left:0;
        right:0;
        top:0;
        bottom:r(31);
        margin:auto;
        width:r(45);
        height: r(61);
        background:url('../assets/upload.png') no-repeat;
        background-size:r(45) r(61);
        // z-index:10000;
        // background:#000;
      }
    }

    // 搜索列表层
    .search-list{
      width:100%;
      height: r(1244);
      position:absolute;
      background: #fff; 
      z-index: 1000000;
      left:0;
      top:r(88);
      // overflow:auto;
      ul{
        width:100%;
        height:r(1244);
        overflow:auto;
        // 搜索列表
        .searchlist{
          width:r(690);
          height:r(98);
          margin:0 auto;
          border-bottom:1px solid rgba(198,198,198,0.3);
          .maplocationicon{
            display:inline-block;
            width:r(27);
            height:r(33);
            background:url(../assets/address.png) no-repeat;
            background-size:r(27) r(33);
            vertical-align:middle;
            margin:r(33) 0 r(32) 0;
          }
          .searchaddressarea{
            width:r(635);
            height:r(98);
            overflow:hidden;
            margin-left:r(24);
            .name{
              width:r(635);
              height:r(49);
              line-height:r(49);
              font-size:r(28);
              color:#333;
            }
            .address{
              width:r(635);
              height:r(49);
              line-height:r(49);
              color:#999;
              overflow:hidden;
            }
          }
        }
        // 暂无搜索结果
        .nosearch{
          width:100%;
          height:r(1244);
          display:flex;
          span{
            margin:auto;
          }
        }
      }

    }

    // 获焦暂无搜索
    .records{
      width:100%;
      height: r(1246);
      position:absolute;
      background: #fff; 
      z-index: 100000;
      left:0;
      top:r(88);
      // 地图选点和当前位置
      .upul{
        width:100%;
        height:r(197);
        li{
          width:r(690);
          height:r(98);
          margin:0 auto;
        }
        .tomap{
          border-bottom:1px solid rgba(198,198,198,0.3);
          .maplocationicon{
            display:inline-block;
            width:r(27);
            height:r(33);
            background:url(../assets/address.png) no-repeat;
            background-size:r(27) r(33);
            vertical-align:middle;
          }
          .maptpaddress{
            // vertical-align:middle;
            line-height:r(98);
            margin-left:r(24);
            color:#333;
            font-size:r(30);
          }
        }
        .currentposition{
          .maplocationicon{
            display:inline-block;
            width:r(27);
            height:r(33);
            background:url(../assets/address.png) no-repeat;
            background-size:r(27) r(33);
            vertical-align:middle;
            margin-top:r(33);
          }
          .addressarea{
            margin-left:r(24);
            width:r(635);
            height:r(98);
            .roughaddressarea{
              width:r(595);
              height:r(49);
              line-height:r(49);
              .roughaddress{
                font-size:r(28);
                color:#333;
              }
              .notice{
                display:inline-block;
                width:r(66);
                height:r(36);
                border:1px solid rgba(3,80,160,0.3);
                border-radius:r(6);
                color:#0350A0;
                text-align:center;
                line-height:r(36);
                // vertical-align:middle;
                margin-left:r(18);
              }
            }
            .detailedaddress{
              width:r(595);
              height:r(49);
              line-height:r(49);
              color:#999;
              overflow:hidden;
            }
          }
          .locating{
            margin-left:r(24);
            width:r(635);
            height:r(98);
            line-height:r(98);
            color:#333;
            font-size:r(30);
          }
        }
      }
      // 历史记录
      .historypart{
        width:100%;
        height:r(1048);
        background:#F2F6F7;
        .historytitle{
          width:100%;
          height:r(82);
          .title{
            color:#666;
            font-size:r(30);
            margin:r(26) 0 0 r(30);
          }
          .deleteicon{
            display:block;
            width:r(28);
            height:r(30);
            background:url(../assets/delete.png) no-repeat;
            background-size:r(28) r(30);
            margin:r(26) r(30) r(26) 0;
          }
        }
        .historyarea{
          width:100%;
          height:r(966);
          overflow:auto;
          background:#fff;
          li{
            width:r(690);
            height:r(98);
            margin:0 auto;
            border-bottom:1px solid rgba(198,198,198,0.3);
            .maplocationicon{
              display:inline-block;
              width:r(27);
              height:r(33);
              background:url(../assets/address.png) no-repeat;
              background-size:r(27) r(33);
              vertical-align:middle;
              margin-top:r(33);
            }
            .addressarea{
              margin-left:r(24);
              width:r(635);
              height:r(98);
              .roughaddressarea{
                width:r(635);
                height:r(49);
                line-height:r(49);
                .roughaddress{
                  font-size:r(28);
                  color:#333;
                }
              }
              .detailedaddress{
                width:r(635);
                height:r(49);
                line-height:r(49);
                color:#999;
                overflow:hidden;
              }
            }
          }
        }
      }

    }
    

    // 信息表单层
    .senderInfo{
      width:r(690);
      height: r(394);
      border-radius:r(10);
      background: rgba(255,255,255,1);
      position:fixed;
      left:r(30);
      bottom:r(30);
      z-index: 10000;
      box-shadow:0px 3px 20px rgba(0,0,0,0.16);
      .floor-n1{
        width:r(650);
        height:r(88);
        margin:0 auto;
        border-bottom:1px solid rgba(198,198,198,0.3);
        .loadIcon{
          display:inline-block;
          width:r(32);
          height:r(32);
          background:#0350A0;
          color:#fff;
          border-radius:50%;
          line-height:r(30);
          text-align:center;
          font-size:r(20);
          margin-top:r(28);
        }
        .title{
          vertical-align:middle;
          line-height:r(88);
          margin-left:r(20);
          font-size:r(30);
          color:#333;
        }
      }
      .floor-n2{
        width:r(650);
        height:r(88);
        margin:0 auto;
        border-bottom:1px solid rgba(198,198,198,0.3);
        // overflow:hidden;
        .locationIcon{
          width:r(27);
          height:r(33);
          display:inline-block;
          background:url(../assets/address.png) no-repeat;
          background-size:r(27) r(33);
          vertical-align:middle;
        }
        input{
          border:none;
          line-height:r(88);
          margin-left:r(20);
          width:r(600);
          height:r(84);
          vertical-align:middle;
        }
      }
      .floor-n3{
        width:r(650);
        height:r(88);
        margin:0 auto;
        border-bottom:1px solid rgba(198,198,198,0.3);
        .sender{
          width:r(325);
          height:r(88);
          .senderIcon{
            width:r(29);
            height:r(33);
            display:inline-block;
            background:url(../assets/lightmine.png) no-repeat;
            background-size:r(29) r(33);
            vertical-align:middle;
          }
          .sendername{
            border:none;
            line-height:r(88);
            margin-left:r(20);
            width:r(275);
            height:r(84);
            vertical-align:middle;
          }
        }
        .phone{
          width:r(325);
          height:r(88);
          .phoneIcon{
            width:r(29);
            height:r(33);
            display:inline-block;
            background:url(../assets/lightphone.png) no-repeat;
            background-size:r(29) r(33);
            vertical-align:middle;
          }
          .phonenumber{
            border:none;
            line-height:r(88);
            margin-left:r(20);
            width:r(275);
            height:r(84);
            vertical-align:middle;
          }
        }
      }
      .submit{
        width:r(650);
        height:r(127);
        margin:0 auto;
        display:flex;
        .subbtn{
          margin:auto;
          width:r(300);
          height:r(86);
          background:#0350A0;
          border-radius:r(43);
          line-height:r(86);
          text-align:center;
          color:#fff;
          font-size:r(32);
        }
      }
    }    
  }
</style>