import Vue from "vue";
import Vuex from "vuex";
import  apis from "@/core/api/apis"

Vue.use(Vuex);       //this.$store.state

export default new Vuex.Store({
  state: {     //全局属性变量  data
    currentCity:{},
  },
  mutations:{
    // getCurrentCity(state,data){
    //   console.log(data);
    //   state.currentCity = JSON.parse(JSON.stringify(data));
    //   console.log(state.currentCity);
    // },
    getCurrentInfo(state,data){
      state.currentInfo = JSON.parse(JSON.stringify(data));
      // console.log(state.currentInfo);
    },
  },
  getters:{
            //类似 组件内的 computed,函数名字 直接当变量去用
    count(state){
      return state.num*state.price;
    },
    getRole: state => {
      return state.role
    }

  },
  actions:{
      //actions 异步函数,一般写通用接口
      //固定写法第一个参数 写一个 context    //state  getters  commit dispatch
      // actions 里面的方法 使用  dispatch 调用
      getTestData(context,data){
        // console.log(context); 
        console.log(data);
        apis.getTest().then((res)=>{
          context.state.goodsList=res.data.data;
          console.log( context.state.goodsList);
        })
      },
  }


})
