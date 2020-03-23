import axios from "axios";

import Vuex from "vuex";
import dayjs from "dayjs";

const locationTypes = {
  SET_LOCATION: "SET_LOCATION",
  SET_ADDRESS: "SET_ADDRESS",
}

// 设置两地距离类型
const distanceTypes = {
  SET_DISTANCE_INFO: "SET_DISTANCE_INFO",
  SET_DISTANCE: "SET_DISTANCE"
}

export function initStore() {

  let api = axios.create({
    baseURL: "/api",

  });

  let api2 = axios.create({
    baseURL: "/api",
  });


  let store = new Vuex.Store({
    state: {
      sessionId: localStorage.getItem("sessionId"),
      loggedIn: !!localStorage.getItem("sessionId"),
      authToken: null,

      cargoSources: [],

      // 当前位置信息
      location: {},
      // 当前地址
      address: "",
      // 收发两地间距信息
      distanceInfo: {},
      // 间距
      distance: 0,

    },
    getters: {
      // 位置获取
      location: state => state.location,
      // 地址获取
      address: state => state.address,
      // 间距信息获取
      distanceInfo: state => state.distanceInfo,
      // 间距获取
      distance: state => state.distance,
    },
    mutations: {
      // 位置处理
      [locationTypes.SET_LOCATION](state, location) {
        if (location) {
          state.location = location;
        } else {
          state.location = null;
        }
      },

      // 地址处理
      [locationTypes.SET_ADDRESS](state, address) {
        if (address) {
          state.address = address;
        } else {
          state.address = "";
        }
      },

      // 间距信息处理
      [distanceTypes.SET_DISTANCE_INFO](state, distanceInfo) {
        if (distanceInfo) {
          state.distanceInfo = distanceInfo;
        } else {
          state.distanceInfo = null;
        }
      },

      // 间距处理
      [distanceTypes.SET_DISTANCE](state, distance) {
        if (distance) {
          state.distance = distance;
        } else {
          state.distance = 0;
        }
      },

      setSessionId(state, value) {
        localStorage.setItem("sessionId", value);
        console.log("setSessionId", value);
        state.sessionId = value;
      },
      setLoggedIn(state, value) {
        state.loggedIn = value;
      },
      setAuthToken(state, value) {
        state.authToken = value;
      },
      setCargoSources(state, value) {
        state.cargoSources = value;
      }
    },
    actions: {
      // 位置
      setLocation: ({
        commit
      }, location) => {
        commit(locationTypes.SET_LOCATION, location);
      },

      // 地址
      setAddress: ({
        commit
      }, address) => {
        commit(locationTypes.SET_ADDRESS, address);
      },

      // 距离信息
      setDistanceInfo: ({
        commit
      }, distanceInfo) => {
        commit(distanceTypes.SET_DISTANCE_INFO, distanceInfo);
      },

      // 距离
      setDistance: ({
        commit
      }, distance) => {
        commit(distanceTypes.SET_DISTANCE, distance);
      },



      async login({
        commit
      }, {
        mobile,
        verifyCode
      }) {
        console.log(">>", mobile, verifyCode)
        let {
          sessionId,
          loggedIn,
          message
        } = await api2.post("/login", {
          mobile,
          verifyCode
        }).then(res => res.data);
        if (loggedIn) {
          commit("setSessionId", sessionId);
        }
        commit("setLoggedIn", loggedIn);
        return {
          loggedIn,
          message
        };
      },
      async calculateFreight({
        commit
      }, params) {
        return api2.get("/freight-calc", {
          params: params
        }).then(res => res.data.price);
      },

      async requestVerifyCode({
        commit
      }, {
        mobile
      }) {
        await api2.post("/verify-code", {
          mobile
        });
      },

      async fetchCargoSources({
        commit
      }) {
        let cargoSources = await api.get("/my/cargo-sources").then(res => res.data);
        commit("setCargoSources", cargoSources);
      },

      async deleteCargoSource({
        commit,
        state
      }, {
        id
      }) {
        let cargoSources = state.cargoSources.filter(cs => cs.id != id);
        commit("setCargoSources", cargoSources);
      }
    }
  });

  api.interceptors.request.use(async function (config) {
    let authToken;
    console.log("store.state.sessionId", store.state.sessionId)
    console.log("store.state.authToken", store.state.authToken)
    if (store.state.sessionId) {
      let needRefresh = true;
      if (store.state.authToken) {
        authToken = store.state.authToken;
        needRefresh = dayjs(store.state.authToken.expiresAt).subtract(2, "minute").isBefore(Date.now());
      }
      if (needRefresh) {
        authToken = await requestAuthToken(store.state.sessionId);
        console.log("authToken", authToken);
        store.commit("setAuthToken", authToken);
      }
    }
    if (!config.headers) config.headers = {};
    if (authToken) config.headers["Authorization"] = `Bearer ${authToken.accessToken}`;
    return config;
  });

  async function requestAuthToken(sessionId) {
    let res = await api2.post("/auth", {
      sessionId,
      expiresIn: 10 * 60
    });
    return res.data;
  }

  return store;
}