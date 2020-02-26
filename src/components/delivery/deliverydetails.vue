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
                <li v-for="(item,index) in typeList" :key="index" :class="typeNum === index ? 'selectedtype fl' : 'othertype fl'" @click="selectGoodType(item,index)">{{item}}</li>
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
        <div class="loadtime">
            <span class="name">装货时间</span>
            <span class="notice">选择装货时间</span>
            <span class="more"></span>
        </div>
        <div class="cartype">
            <span class="name">车型车长</span>
            <span class="notice">非必选项</span>
            <span class="more"></span>
        </div>
    </div>

    <!-- 第五层 -->
    <div class="paywayandnote">
        <div class="payway">
            <span class="name">装货时间</span>
            <span class="notice">选择装货时间</span>
            <span class="more"></span>
        </div>
        <div class="note">
            <span class="name">车型车长</span>
            <span class="notice">非必选项</span>
            <span class="more"></span>
        </div>
    </div>

    <!-- 第六层 -->
    <div class="topermanent">
        <input type="radio"/>
        <span>是否存为常发货源</span>
    </div>

    <!-- 底层 -->
    <div class="bottom">
        <span class="price">{{price || '填写重量或者体积后显示运费'}}</span>
        <span class="publish">发货</span>
    </div>

  </div>
</template>

<script>
export default {
  data(){
      return {
          typeNum:0,
          typeList:['棉麻布匹','机械设备','金属钢材','食品饮料','蔬菜水果','电子数码','活禽活畜','煤炭矿产'],
          userSelectedType:'',
          userWeigth:0,
          userVolume:0,
          userGoodName:'',
          price:0,
      }
  },
  methods:{
      go(n){
          this.$router.go(n);
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
      }
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
        .moreicon{
            width:r(33);
            height:r(7);
            background:url(../../assets/morepoint.png) no-repeat;
            background-size:r(33) r(7);
            margin:r(40) r(30) r(41) 0;
        }
    }

    // 第二层
    .size{
        width:r(650);
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
        width:r(650);
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
                    flex:1;
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
        width:r(650);
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
    }

    // 付款和备注
    .paywayandnote{
        width:r(650);
        height:r(177);
        margin:r(10) auto;
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
    }

    // 存长发货源
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
}
</style>