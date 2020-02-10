import request from "./http"  // request({})
import params from "./params"

var poxy01="/apis"
var poxy02="/api"
var url1="/index"
var url2="/user/topic"



class Apis {
    getTest(){
       return request({
            method:"GET",
            url:poxy01+"/api/v1/topics",
            headers:{
                token:params.token
            }
        })
    }
    getTopic(){
        return request({
            method:"GET",
            url:poxy01+"/api/v1/topic/5433d5e4e737cbe96dcef312"
        })
    }
    //https://m.amap.com/picker/?keywords=写字楼,小区,学校&zoom=15&center=116.470098,39.992838&radius=1000&total=20&key=（您的Key）
    getAddress(){
        return request({
            method:"GET",
            url:poxy02+"/picker",
            params:{
                keywords: '',
                zoom: '15',
                center: '116.470098,39.992838',
                radius: '1000',
                total: '20',
                key: 'b04b292ba4b2140151e9c2bcd02bad0c'
            }
        })
    }
}

export default new Apis();  //{getTest:function(){}}