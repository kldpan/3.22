import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);       //this.$store.state

// 设置定位类型
const locationTypes = {
  SET_LOCATION: "SET_LOCATION",
  SET_ADDRESS: "SET_ADDRESS",
}

// 设置两地距离类型
const distanceTypes = {
  SET_DISTANCE_INFO: "SET_DISTANCE_INFO",
  SET_DISTANCE: "SET_DISTANCE"
}

export default new Vuex.Store({
  state: {
    // 当前位置信息
    location: {},
    // 当前地址
    address: "",
    // 收发两地间距信息
    distanceInfo: {},
    // 间距
    distance: 0,
  },

  getters:{
    // 位置获取
    location: state => state.location,
    // 地址获取
    address: state => state.address,
    // 间距信息获取
    distanceInfo: state => state.distanceInfo,
    // 间距获取
    distance: state => state.distance,
  },

  mutations:{
    // 位置处理
    [locationTypes.SET_LOCATION](state,location){
      if(location){
        state.location = location;
      }else{
        state.location = null;
      }
    },

    // 地址处理
    [locationTypes.SET_ADDRESS](state,address){
      if(address){
        state.address = address;
      }else{
        state.address = "";
      }
    },

    // 间距信息处理
    [distanceTypes.SET_DISTANCE_INFO](state,distanceInfo){
      if(distanceInfo){
        state.distanceInfo = distanceInfo;
      }else{
        state.distanceInfo = null;
      }
    },

    // 间距处理
    [distanceTypes.SET_DISTANCE](state,distance){
      if(distance){
        state.distance = distance;
      }else{
        state.distance = 0;
      }
    },
  },

  actions:{
    // 位置
    setLocation:({commit},location) => {
      commit(locationTypes.SET_LOCATION,location);
    },

    // 地址
    setAddress:({commit},address) => {
      commit(locationTypes.SET_ADDRESS,address);
    },

    // 距离信息
    setDistanceInfo:({commit},distanceInfo) => {
      commit(distanceTypes.SET_DISTANCE_INFO,distanceInfo);
    },

    // 距离
    setDistance:({commit},distance) => {
      commit(distanceTypes.SET_DISTANCE,distance);
    },
  }
})
