import Vue from "vue";
import Vuex from "vuex";
import  apis from "@/core/api/apis"

Vue.use(Vuex);       //this.$store.state

// 设置定位类型
const locationTypes = {
  SET_LOCATION:"SET_LOCATION",
  SET_ADDRESS:"SET_ADDRESS"
}

export default new Vuex.Store({
  state: {
    // 当前位置信息
    location:{},
    // 当前地址
    address:"",
  },

  getters:{
    // 位置获取
    location:state => state.location,
    // 地址获取
    address:state => state.address
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
    }
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
  }
})
