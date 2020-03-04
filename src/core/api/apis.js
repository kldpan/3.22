import request from "./http"  // request({})
import params from "./params"

var poxy="/apis"
var url1="/index"
var url2="/user/topic"
// var url3="/json1811.ashx"
var url4="/api/goodssource"



class Apis {
    // cnode接口
    getTest01(){
       return request({
            method:"GET",
            url:poxy+"/api/v1/topics",
            headers:{
                token:params.token
            },
        })
    }

    // 贝思客测试接口
    getTest02(){
        return request({
             method:"GET",
             url:poxy + "/json1811.ashx",
             params:{
                 c : 'NewIndexController',
                 m : 'index',
                 v : params.v
             }
         })
     }


    //  后端首页接口测试
    getTest03(){
        return request({
             method:"GET",
             url:"http://192.168.0.109" + '/api/goodssource',
             params:{
                 
             }
         })
    }

    // 后端数据传送测试
    sendTest01(){
        return request({
            method:"GET",
            url:"http://192.168.0.116:8080/" + 'login/sendCode',
            params:{test:{a:1,b:2,c:3}},
        })
    }



    // getTopic(){
    //     return request({
    //         method:"GET",
    //         url:poxy01+"/api/v1/topic/5433d5e4e737cbe96dcef312"
    //     })
    // }

    //https://m.amap.com/picker/?keywords=写字楼,小区,学校&zoom=15&center=116.470098,39.992838&radius=1000&total=20&key=（您的Key）
    // getAddress(){
    //     return request({
    //         method:"GET",
    //         url:poxy02+"/picker",
    //         params:{
    //             keywords: '',
    //             zoom: '15',
    //             center: '116.470098,39.992838',
    //             radius: '1000',
    //             total: '20',
    //             key: 'b04b292ba4b2140151e9c2bcd02bad0c'
    //         }
    //     })
    // }
}

export default new Apis();  //{getTest:function(){}}