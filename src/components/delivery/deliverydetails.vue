<template>
  <div class="message">
    <!-- 第一层 -->
    <div class="title clearfix">
        <div class="back fl" @click="go(-1)"></div>
        <div class="titlename fl">运单详情</div>
    </div>

    <!-- 第二层 -->
    <div class="size" ref="size">
        <div class="weight clearfix">
            <span class="name">货物重量</span>
            <span class="unit fr">吨</span>
            <input type="number" placeholder="填写大于0吨" @blur="userInputWeight()"/>
        </div>
        <div class="volume clearfix">
            <span class="name">货物体积</span>
            <span class="unit fr">方</span>
            <input type="number"  placeholder="填写大于0方" @blur="userInputVolume()"/>
        </div>
    </div>

    <!-- 第三层 -->
    <div class="goodtype">
        <div class="name">货物类型</div>
        <div class="typeoptions">
            <ul class="clearfix">
                <li v-for="(item,index) in goodTypeList" :key="index" :class="goodTypeNum === index ? 'selectedtype fl' : 'othertype fl'" @click="selectGoodType(item,index)">{{item}}</li>
            </ul>
        </div>
        <div class="inputtype">
            <div class="othergood">其他物品</div>
            <div class="inputbox" ref="goodname">
                <input type="text" placeholder="请输入其他物品名称" @blur="userInputGoodName()"/>
            </div>
        </div>
    </div>

    <!-- 第四层 -->
    <div class="loadtimeandcartype">
        <div class="loadtime" @click="openPicker">
            <span class="name">装货时间</span>
            <span class="notice">选择装货时间</span>
            <span class="more"></span>
        </div>
        <div class="cartype" @click="carTypeModalShow()">
            <span class="name">车型车长</span>
            <span class="notice">非必选项</span>
            <span class="more"></span>
        </div>
    </div>

    <!-- 第五层 -->
    <div class="paywayandnote">
        <div class="payway" @click="payWayModalShow()">
            <span class="name">付款方式</span>
            <span class="notice">选择付款方式</span>
            <span class="more"></span>
        </div>
        <div class="note" @click="toPath('/noteinfos')">
            <span class="name">备注</span>
            <span class="notice">备注信息</span>
            <span class="more"></span>
        </div>
    </div>

    <!-- 第六层 -->
    <div class="topermanent">
        <div class="mycheck">
            <input type="checkbox"/>
            <span>是否存为常发货源</span>
        </div>
        
        
    </div>

    <!-- 底层 -->
    <div class="bottom">
        <span class="price">{{price || '填写重量或者体积后显示运费'}}</span>
        <span class="publish" @click="confirm()">发货</span>
    </div>


    <!-- 时间选择器mint部分 -->
    <div class="datePicker">
       <mt-datetime-picker
            type="time"
            ref="picker"
            date-format="{value} 年"
            time-format="{value} 日"
            minute-format="{value} 分"
            @confirm="handleConfirm"
            :startDate="startDate"
            v-model="pickerValue"
            confirmText="完成"
            >
        </mt-datetime-picker>
    </div>

    <!-- 车型车长模态框 -->
    <div class="cartypemodal" v-show="carTypeModalBool">
        <!-- 上层 -->
        <div class="closearea" @click="closeCarTypeModal()"></div>
        <!-- 选择区 -->
        <div class="cartypearea">
            <!-- 第一层 -->
            <div class="top">
                <span class="cancel" @click.stop="closeCarTypeModal()">取消</span>
                <span class="titlename">车型车长</span>
                <span class="submit" @click="complete()">完成</span>
            </div>
            <!-- 第二层 -->
            <div class="carlength">
                <div class="floor-n1">
                    <span class="length">车长</span>
                    <span class="notice">(必填，最多填3项)</span>
                </div>
                <div class="floor-n2" ref="userCarLength">
                    <ul>
                    <li v-for="(item,index) in carLength" :key="index" :class="item.bool === true ? 'selected-carlength fl' : 'noselected-carlength fl'" @click.stop="selectCarLength(item,index)">{{item.carLength}}</li>
                    </ul>
                </div>
            </div>
            <!-- 第三层 -->
            <div class="cartype">
                <div class="floor-n1">
                    <span class="type">车型</span>
                    <span class="notice">(必填，最多填3项)</span>
                </div>
                <div class="floor-n2" ref="userCarType">
                    <ul>
                    <li v-for="(item,index) in carTypeList" :key="index" :class="carTypeNum === index ? 'selected-cartype fl' : 'noselected-cartype fl'" @click.stop="selectCarType(item,index)">{{item}}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <!-- 付款方式模态框 -->
    <div class="paywaymodal" v-show="payWayModalBool">
        <!-- 上层 -->
        <div class="closearea" @click="closePayWayModal()"></div>
        <!-- 选择区 -->
        <div class="payway">
            <div class="loadpay" @click="selectLoadPay()">发货人付款</div>
            <div class="unloadpay" @click="selectUnloadPay()">收货人付</div>
            <div class="cancel" @click="closePayWayModal()">取消</div>
        </div>
    </div>
    

  </div>
</template>

<script>
import Vue from 'vue';
import {DatetimePicker} from 'mint-ui';
Vue.component(DatetimePicker.name, DatetimePicker);
export default {
  data(){
      return {
            // params存放备注页中携参
            params:{},
            goodTypeNum:0,
            goodTypeList:['棉麻布匹','机械设备','金属钢材','食品饮料','蔬菜水果','电子数码','活禽活畜','煤炭矿产'],
            userSelectedType:'',
            userWeigth:0,
            userVolume:0,
            userGoodName:'',
            price:0,
            carTypeModalBool:false,
            carLength:[
                {carLength: 8.7, bool:true},
                {carLength: 9.6, bool:false},
                {carLength: 11.7, bool:false},
                {carLength: 12.5, bool:false},
                {carLength: 13, bool:false},
                {carLength: 13.7, bool:false},
                {carLength: 15, bool:false},
                {carLength: 16, bool:false},
                {carLength: 17.5, bool:false},
                {carLength:20,bool:false}
            ],
            carTypeList:["平板","高栏","厢式","集装箱","自卸","冷藏","保温","高低板","面包车","棉被车","爬梯车","飞翼车"],
            carLengthNum:0,
            carTypeNum:0,
            userCarLength:[],
            userCarType:[],
            payWayModalBool:false,
            payWay:'',
            userSelectTime:'',
            userNote:[],

            //   时间选择器相关
            birthday:"",  //出生日期
            startDate: new Date('1968-01-01'),
            pickerValue:''
      }
  },
  mounted(){
      console.log(this.$route);
      console.log(this);
      if(this.$route.query.userInputNote){
          this.params = this.$route.query;
      }
  },
  methods:{
    go(n){
        this.$router.go(n);
    },
    toPath(url){
        this.$router.push(url);
    },
    selectGoodType(item,index){
        this.typeNum = index;
        this.userSelectedType = item;
    },
    userInputWeight(){
        this.userWeight = this.$refs.size.firstChild.lastChild.value || 0;
    },
    userInputVolume(){
        this.userVolume = this.$refs.size.lastChild.lastChild.value || 0;
    },
    userInputGoodName(){
        this.userGoodName = this.$refs.goodname.children[0].value;
    },
    carTypeModalShow(){
        this.carTypeModalBool = true;
    },
    closeCarTypeModal(){
        this.carTypeModalBool = false;
        this.userCarLength = [];
        this.userCarType = [];
        console.log(this.userCarLength);
    },
    selectCarLength(item,index){
    item.bool = !item.bool;
    if(item.bool){
        this.userCarLength.push(item);
    }else{
        this.userCarLength.splice(this.userCarLength.indexOf(item),1);
    }
    if(this.userCarLength > 3){
        for(let i=0; i<this.userCarLength.length; i++){
            if(index !== i){
                this.userCarLength[i].bool = false;
            }
        }
    }
    console.log(this.userCarLength);
    // if(this.userCarLength.length > 3){
    //   item.bool = !item.bool;

    // }
    },
    selectCarType(item,index){
        this.carTypeNum = index;
        this.userCarType.push(item);
    },
    complete(){
        this.carTypeModalBool = false;
    },
    payWayModalShow(){
        this.payWayModalBool = true;
    },
    closePayWayModal(){
        this.payWayModalBool = false;
    },
    selectLoadPay(){
        this.payWay = 'loadpay';
        this.closePayWayModal();
    },
    selectUnloadPay(){
        this.payWay = 'unloadpay';
        this.closePayWayModal();
    },
    confirm(){
        if(this.params){
            this.$router.push({
            path:'/waitfororders',
            query:{
                userWeigth:this.userWeigth,
                userVolume:this.userVolume,
                userSelectedType:this.userSelectedType,
                userGoodName:this.userGoodName,
                userSelectTime:this.userSelectTime,
                userCarLength:this.userCarLength,
                userCarType:this.userCarType,
                payWay:this.payWay,
                userSelectOptionList:this.params.userSelectOptionList,
                userInputNote:this.params.userInputNote
                }
            })
        }
        console.log(this.$route);
        
    },




    //   时间选择器相关
    openPicker () {
     this.$refs.picker.open()
    },
    handleConfirm (data) {
        this.birthday = getDate(data);   //获取的时间为时间戳，getdata是自己写的一个转换时间的方法
    },
    getDate(data){
        let date = new Date();
        data = date;
    },
    
  }
};
</script>

<style lang="scss" scoped>
.message{
    width:100%;
    height:r(1334);
    background:#F2F6F7;
    position:fixed;
    left:0;
    top:0;
    z-index:100000;
    .title{
        width:100%;
        height:r(88);
        background:#fff;
        line-height:r(88);
        border-bottom:1px dashed #333;
        .back{
            width:r(22);
            height:r(36);
            background:url(../../assets/back.png) no-repeat;
            background-size:r(22) r(36);
            margin:r(26) 0 r(26) r(30);
            vertical-align:middle;
        }
        .titlename{
            width:r(635);
            height:r(88);
            font-size:r(36);
            color:#333;
            font-weight:700;
            text-align:center;
        }
    }

    // 第二层
    .size{
        width:r(690);
        height:r(177);
        margin:r(25) auto;
        background:#fff;
        border-radius:r(10);
        padding:0 r(20);
        .weight{
            width:r(650);
            height:r(88);
            line-height:r(88);
            border-bottom:1px solid rgba(198,198,198,0.3);
            .name{
                font-size:r(30);
                color:#333;
            }
            input{
                font-size:r(26);
                width:r(150);
                height:r(48);
                border:none;
                float:right;
                margin:r(20) r(20) 0 0;
                text-align:right;
                overflow:hidden;
            }
            .unit{
                font-size:r(30);
                color:#333;
            }
        }
        .volume{
            width:r(650);
            height:r(88);
            line-height:r(88);
            .name{
                font-size:r(30);
                color:#333;
            }
            input{
                font-size:r(26);
                width:r(150);
                height:r(48);
                border:none;
                float:right;
                margin:r(20) r(20);
                text-align:right;
                overflow:hidden;
            }
            .unit{
                font-size:r(30);
                color:#333;
            }
        }
    }

    // 第三层
    .goodtype{
        width:r(690);
        height:r(397);
        margin:0 auto;
        padding:0 r(20);
        background:#fff;
        border-radius:r(10);
        .name{
            width:r(650);
            height:r(88);
            font-size:r(30);
            color:#333;
            line-height:r(88);
            border-bottom:1px solid rgba(198,198,198,0.3);
        }
        .typeoptions{
            height:r(155);
            width:r(650);
            ul{
                width:r(650);
                height:r(155);
                display:flex;
                flex-direction:column;
                flex-wrap: wrap;
                li{
                    width:r(148);
                    height:r(50);
                    background:#F7F7F7;
                    border-radius:r(28);
                    text-align:center;
                    line-height:r(50);
                    margin: r(16) r(6) 0 r(6);
                    font-size:r(26);
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    box-sizing:border-box;
                    
                }
                .selectedtype{
                    width:r(148);
                    height:r(50);
                    background:#fff;
                    color:#0350A0;
                    border:1px solid #0350A0;
                    line-height:r(46);
                }
                .othertype{
                    color:#333;
                }
            }
        }
        .inputtype{
            width:r(650);
            height:r(153);
            .othergood{
                width:r(650);
                height:r(60);
                font-size:r(22);
                color:#666;
                line-height:r(60);
            }
            input{
                width:r(640);
                height:r(68);
                border:none;
                background:#F2F6F9;
                border-radius:r(10);
                font-size:r(26);
                padding-left:r(10);
            }
        }
    }

    // 时间和车型
    .loadtimeandcartype{
        width:r(690);
        height:r(177);
        margin:r(25) auto;
        background:#fff;
        border-radius:r(10);
        padding:0 r(20);
        .loadtime{
            width:r(650);
            height:r(88);
            line-height:r(88);
            border-bottom:1px solid rgba(198,198,198,0.3);
            .name{
                font-size:r(30);
                color:#333;
                display:inline-block;
                width:r(130);
            }
            .notice{
                display:inline-block;
                font-size:r(26);
                color:#999;
                width:r(486);
                // margin:r(20) r(20) 0 0;
                text-align:right;
            }
            .more{
                display:inline-block;
                width:r(14);
                height:r(23);
                background:url(../../assets/right.png) no-repeat;
                background-size: r(14) r(23);
                vertical-align:middle;
                margin-left:r(20);
            }
        }
        // cartype
        .cartype{
            width:r(690);
            height:r(88);
            line-height:r(88);
            .name{
                font-size:r(30);
                color:#333;
                display:inline-block;
                width:r(130);
            }
            .notice{
                display:inline-block;
                font-size:r(26);
                color:#999;
                width:r(486);
                // margin:r(20) r(20) 0 0;
                text-align:right;
            }
            .more{
                display:inline-block;
                width:r(14);
                height:r(23);
                background:url(../../assets/right.png) no-repeat;
                background-size: r(14) r(23);
                vertical-align:middle;
                margin-left:r(20);
            }
        }
    }

    // 付款和备注
    .paywayandnote{
        width:r(690);
        height:r(177);
        margin:r(10) auto 0;
        background:#fff;
        border-radius:r(10);
        padding:0 r(20);
        .payway{
            width:r(650);
            height:r(88);
            line-height:r(88);
            border-bottom:1px solid rgba(198,198,198,0.3);
            .name{
                font-size:r(30);
                color:#333;
                display:inline-block;
                width:r(130);
            }
            .notice{
                display:inline-block;
                font-size:r(26);
                color:#999;
                width:r(486);
                // margin:r(20) r(20) 0 0;
                text-align:right;
            }
            .more{
                display:inline-block;
                width:r(14);
                height:r(23);
                background:url(../../assets/right.png) no-repeat;
                background-size: r(14) r(23);
                vertical-align:middle;
                margin-left:r(20);
            }
        }
        // note
        .note{
            width:r(650);
            height:r(88);
            line-height:r(88);
            .name{
                font-size:r(30);
                color:#333;
                display:inline-block;
                width:r(130);
            }
            .notice{
                display:inline-block;
                font-size:r(26);
                color:#999;
                width:r(486);
                // margin:r(20) r(20) 0 0;
                text-align:right;
            }
            .more{
                display:inline-block;
                width:r(14);
                height:r(23);
                background:url(../../assets/right.png) no-repeat;
                background-size: r(14) r(23);
                vertical-align:middle;
                margin-left:r(20);
            }
        }
    }

    // 存常发货源
    .topermanent{
        width:r(690);
        height:r(82);
        margin:0 auto;
        line-height:r(82);
        
            input{
                width:r(30);
                height:r(30);
                vertical-align:middle;
            }
            span{
                display:inline-block;
                vertical-align:middle;
                font-size:r(26);
                color:#333;
            }


            // input[type=checkbox]{
            // // width:r(30);
            // // height:r(30);
            // // vertical-align:middle;
            // // border-radius:50%;
            // visibility: hidden;
            // }
            // label{
            //     cursor:point;
            //     width:r(30);
            //     height:r(30);
            //     border:1px solid #274A7D;
            //     border-radius:50%;
            //     background:F2F6F7;
            //     position:absolute;
            //     left:0;
            //     top:0;
            // }
            // label:after{
            //     opacity:1;
            //     content:'';
            //     position:absolute;
            //     width:9px;
            //     height:5px;
            //     background:transparent;
            //     top:6px;
            //     left:6px;
            //     border:3px solid red;
            //     border-top:none;
            //     border-right:none;
            //     transform:rotate(-45deg);
            // }
            // input[type=checkbox]:checked~label{
            //     background:#f40;
	        //     border:2px solid #f40;
            // }
            // input[type=checkbox]:checked~label:after{
            //     opacity:1;
	        //     background:#f40;
            // }

    }

    // 底层
    .bottom{
        width:100%;
        height:r(126);
        background:#fff;
        position:fixed;
        left:0;
        bottom:0;
        .price{
            display:inline-block;
            width:r(375);
            height:r(126);
            line-height:r(126);
            text-align:center;
            font-size:r(26);
            color:#999;
        }
        .publish{
            display:inline-block;
            width:r(300);
            height:r(86);
            background:#f28312;
            vertical-align:middle;
            border-radius:r(43);
            text-align:center;
            line-height:r(86);
            font-size:r(32);
            color:#fff;
            margin-left:r(32);
        }
    }

    // 车型车长模态框
    .cartypemodal{
        width:100%;
        height:r(1334);
        position:fixed;
        left:0;
        top:0;
        background:rgba(0,0,0,0.3);
        .closearea{
            width:100%;
            height:r(700);
        }
        .cartypearea{
        width:r(750);
        height:r(614);
        position:fixed;
        bottom:0;
        z-index:1000000;
        // float:left;
        // margin-top:r(720);
        background: #fff;
        border-radius: r(10) r(10) 0 0;
        // 第一层
        .top{
          width:r(710);
          height: r(88);
          margin:0 auto;
          border-bottom:1px solid rgba(198,198,198,0.3);
          .cancel{
            font-size:r(32);
            font-family:PingFang SC;
            font-weight:400;
            line-height:25px;
            color:rgba(3,80,160,1);
            line-height: r(88);
          }
          .titlename{
            font-size:r(32);
            font-family:PingFang SC;
            font-weight:900;
            line-height:r(88);
            color:#333;
            margin-left:r(227);
          }
          .submit{
            font-size:r(32);
            font-family:PingFang SC;
            font-weight:400;
            line-height:25px;
            color:rgba(3,80,160,1);
            line-height: r(88);
            margin-left:r(227);
          }
        }
        // 第二层
        .carlength{
          width:r(710);
          height:r(222);
          margin:0 auto;
          overflow: hidden;
          border-bottom:1px solid rgba(198,198,198,0.3);
          .floor-n1{
            width:100%;
            height:r(42);
            margin-top:r(20);
            line-height: r(42);
            .length{
              font-size:r(30);
              font-family:PingFang SC;
              font-weight:500;
              color:#333;
              font-weight: 900;
            }
            .notice{
              font-size:r(30);
              font-family:PingFang SC;
              font-weight:500;
              color:#666;
              margin-left:r(20);
            }
          }
          .floor-n2{
            width:r(710);
            height: r(160);
            ul{
              width:r(710);
              height:r(160);
              display: flex;
              flex-wrap:wrap;
              .selected-carlength{
                width:r(126);
                height:r(50);
                border:1px solid #0350A0;
                border-radius: r(28);
                text-align: center;
                line-height: r(50);
                font-size: r(26);
                color:#0350A0;
                margin:r(15) r(15) 0 0;
                box-sizing: border-box;
              }
              .noselected-carlength{
                width:r(126);
                height:r(50);
                border-radius: r(28);
                text-align: center;
                line-height: r(50);
                font-size: r(26);
                color:#666;
                background: #F7F7F7;
                margin:r(15) r(15) 0 0;
                box-sizing: border-box;
              }
            }
          }
        }
        // 第三层
        .cartype{
          width:r(710);
          height:r(300);
          margin:0 auto;
          overflow: hidden;
          .floor-n1{
            width:100%;
            height:r(42);
            margin-top:r(20);
            line-height: r(42);
            .type{
              font-size:r(30);
              font-family:PingFang SC;
              font-weight:500;
              color:#333;
              font-weight: 900;
            }
            .notice{
              font-size:r(30);
              font-family:PingFang SC;
              font-weight:500;
              color:#666;
              margin-left:r(20);
            }
          }
          .floor-n2{
            width:r(710);
            height: r(240);
            border-bottom:1px solid rgba(198,198,198,0.3);
            ul{
              width:r(710);
              height:r(240);
              display: flex;
              flex-wrap:wrap;
              .selected-cartype{
                width:r(126);
                height:r(50);
                border:1px solid #0350A0;
                border-radius: r(28);
                text-align: center;
                line-height: r(50);
                font-size: r(26);
                color:#0350A0;
                margin:r(16) r(16) 0 0;
                box-sizing: border-box;
              }
              .noselected-cartype{
                width:r(126);
                height:r(50);
                border-radius: r(28);
                text-align: center;
                line-height: r(50);
                font-size: r(26);
                color:#666;
                background: #F7F7F7;
                margin:r(15) r(15) 0 0;
                box-sizing: border-box;
              }
            }
          }
        }
      }
    }

    // 付款方式模态框
    .paywaymodal{
        width:100%;
        height:r(1334);
        position:fixed;
        left:0;
        top:0;
        background:rgba(0,0,0,0.3);
        .closearea{
            width:100%;
            height:r(1025);
        }
        .payway{
            width:100%;
            height:r(309);
            background:#fff;
            .loadpay{
                width:100%;
                height:r(100);
                border-bottom:1px solid rgba(221,221,221,0.3);
                line-height:r(100);
                text-align:center;
                font-size:r(36);
                color:#333;
            }
            .unloadpay{
                width:100%;
                height:r(100);
                line-height:r(100);
                text-align:center;
                font-size:r(36);
                color:#333;
                border-bottom:r(8) solid rgba(221,221,221,0.3);
            }
            .cancel{
                width:100%;
                height:r(100);
                line-height:r(100);
                text-align:center;
                font-size:r(36);
                color:#333; 
            }
        }
    }


}
</style>