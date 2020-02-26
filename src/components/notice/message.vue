<template>
  <div class="message">
    <!-- 第一层 -->
    <div class="title clearfix">
        <div class="back fl" @click="go(-1)"></div>
        <div class="titlename fl">消息中心</div>
        <div class="moreicon fr" @click="setMoreBool()"></div>
    </div>

    <!-- 设置层 -->
    <div class="more" v-show="moreBool">
        <div class="direct"></div>
        <div class="clear" @click="clearnews()">
            <span class="clearicon"></span>
            <span class="clearname">清空消息</span>
        </div>
        <div class="setting" @click="toPath('/settingnews')">
            <span class="settingicon"></span>
            <span class="settingname">消息设置</span>
        </div>
    </div>

    <!-- 第二层 -->
    <div class="news">
        <!-- 物流消息 -->
        <div class="logisticnews">
            <!-- 左 -->
            <div class="left fl">
                <img src="../../assets/logisticnewsicon.png"/>
            </div>
            <!-- 中 -->
            <div class="center fl">
                <!-- 上层 -->
                <div class="up">物流消息</div>
                <!-- 下层 -->
                <div class="down">您的订单已完成</div>
            </div>
            <!-- 右 -->
            <div class="timetitle fr">
                <span class="time">2019-12-12</span>
                <span :class="redPointBool ? 'noticeredpoint fr' : ''"></span>
            </div>
        </div>

        <!-- 活动消息 -->
        <div class="activitynews">
            <!-- 左 -->
            <div class="left fl">
                <img src="../../assets/activitynewsicon.png"/>
            </div>
            <!-- 中 -->
            <div class="center fl">
                <!-- 上层 -->
                <div class="up">活动消息</div>
                <!-- 下层 -->
                <div class="down">拉新赚钱啦！</div>
            </div>
            <!-- 右 -->
            <div class="timetitle fr">
                <span class="time">2019-12-12</span>
                <span :class="redPointBool ? 'noticeredpoint fr' : ''"></span>
            </div>
        </div>

        <!-- 通知消息 -->
        <div class="noticenews">
            <!-- 左 -->
            <div class="left fl">
                <img src="../../assets/noticeicon.png"/>
            </div>
            <!-- 中 -->
            <div class="center fl">
                <!-- 上层 -->
                <div class="up">通知消息</div>
                <!-- 下层 -->
                <div class="down">暂无通知消息</div>
            </div>
            <!-- 右 -->
            <div class="timetitle fr">
                <span class="time">2019-12-12</span>
                <span></span>
            </div>
        </div>

        <!-- 测试 -->
        <div>
            <ul>
                <li v-for="(item,index) in testData" :key="index">
                    <h1>{{item.title}}</h1>
                    <h3>{{item.content}}</h3><br>
                </li>
            </ul>

        </div>

    </div>

    <!-- 第三层 -->
    <!-- 清空提示框 -->
    <div class="clearnoticemodal" v-show="clearNoticeModalBool">
        <div class="noticearea">
            <div class="up">确认清空通知记录吗？</div>
            <div class="down clearfix">
                <div class="noclear fl" @click="closeModal()">取消</div>
                <div class="clearnow fr" @click="clearConfirm()">确定</div>
            </div>
        </div>
    </div>

  </div>
</template>

<script>
export default {
  data(){
        return {
            moreBool:false,
            redPointBool:true,
            testData:[
                {title:'第一条',content:'这是测试数据1'},
                {title:'第二条',content:'这是测试数据2'},
                {title:'第三条',content:'这是测试数据3'},
                {title:'第四条',content:'这是测试数据4'},
                {title:'第五条',content:'这是测试数据4'},
            ],
            clearNoticeModalBool:false,
      }
  },
  methods:{
      go(n){
          this.$router.go(n);
      },
      setMoreBool(){
          this.moreBool = !this.moreBool;
      },
      clearnews(){
          this.clearNoticeModalBool = true;
      },
      toPath(url){
          this.$router.push(url);
      },
      closeModal(){
          this.clearNoticeModalBool = false;
          this.setMoreBool();
      },
      clearConfirm(){
          this.testData = [];
          this.closeModal();
      }
  }
};
</script>

<style lang="scss" scoped>
.message{
    width:100%;
    height:r(1334);
    background:#fff;
    position:fixed;
    left:0;
    top:0;
    z-index:100000;
    .title{
        width:100%;
        height:r(88);
        background:fff;
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

    .more{
        width:r(230);
        height:r(168);
        background:#fff;
        position:fixed;
        top:r(88);
        right:r(20);
        z-index:10;
        box-shadow:0px 3px 10px rgba(0,0,0,0.16);
        // .direct{
        //     width:0;
        //     height:0;
        //     border:r(26) solid #eee;
        //     border-color:transparent transparent #eee transparent;
        //     position:absolute;
        //     right:r(-10);
        //     top:r(-35);
        // }
        .clear{
            width:r(230);
            height:r(84);
            .clearicon{
                display:inline-block;
                width:r(30);
                height:r(33);
                background:url(../../assets/smallclear.png) no-repeat;
                background-size:r(30) r(33);
                vertical-align:middle;
                margin:0 r(20) 0 r(30);
            }
            .clearname{
                vertical-align:middle;
                line-height:r(84);
                font-size:r(30);
                color:#333;
            }
        }
        .setting{
            width:r(230);
            height:r(84);
            .settingicon{
                display:inline-block;
                width:r(37);
                height:r(36);
                background:url(../../assets/smallsetting.png) no-repeat;
                background-size:r(37) r(36);
                vertical-align:middle;
                margin:0 r(15) 0 r(30);
            }
            .settingname{
                vertical-align:middle;
                line-height:r(84);
                font-size:r(30);
                color:#333;
            }
        }
    }

    .news{
        width:100%;
        height:r(393);
        .logisticnews{
            width:100%;
            height:r(100);
            // border-bottom:1px solid rgba(153,153,153,1);
            .left{
                width:r(80);
                height:r(80);
                margin:r(10) 0 r(10) r(30);
                img{
                    width:100%;
                    height:100%;
                }
            }
            .center{
                width:r(430);
                height:r(80);
                margin:r(10) 0 r(10) r(20);
                .up{
                    width:r(430);
                    height:r(40);
                    line-height:r(40);
                    font-size:r(32);
                    color:#333;
                }
                .down{
                    width:r(430);
                    height:r(40);
                    line-height:r(40);
                    font-size:r(26);
                    color:#999;
                }
            }
            .timetitle{
                width:r(160);
                height:r(80);
                margin:r(10) r(30) r(10) 0;
                .time{
                    display:inline-block;
                    width:r(160);
                    height:r(40);
                    line-height:r(40);
                    font-size:r(26);
                    color:#999;
                    text-align:right;
                }
                .noticeredpoint{
                    display:inline-block;
                    width:r(16);
                    height:r(16);
                    background:red;
                    line-height:r(40);
                    border-radius:50%;
                }
            }
        }

        //活动消息
        .activitynews{
            width:100%;
            height:r(100);
            // border-bottom:1px solid rgba(153,153,153,1);
            .left{
                width:r(80);
                height:r(80);
                margin:r(10) 0 r(10) r(30);
                img{
                    width:100%;
                    height:100%;
                }
            }
            .center{
                width:r(430);
                height:r(80);
                margin:r(10) 0 r(10) r(20);
                .up{
                    width:r(430);
                    height:r(40);
                    line-height:r(40);
                    font-size:r(32);
                    color:#333;
                }
                .down{
                    width:r(430);
                    height:r(40);
                    line-height:r(40);
                    font-size:r(26);
                    color:#999;
                }
            }
            .timetitle{
                width:r(160);
                height:r(80);
                margin:r(10) r(30) r(10) 0;
                .time{
                    display:inline-block;
                    width:r(160);
                    height:r(40);
                    line-height:r(40);
                    font-size:r(26);
                    color:#999;
                    text-align:right;
                }
                .noticeredpoint{
                    display:inline-block;
                    width:r(16);
                    height:r(16);
                    background:red;
                    line-height:r(40);
                    border-radius:50%;
                }
            }
        }

        //通知消息
        .noticenews{
            width:100%;
            height:r(100);
            // border-bottom:1px solid rgba(153,153,153,1);
            margin-bottom:r(20);
            .left{
                width:r(80);
                height:r(80);
                margin:r(10) 0 r(10) r(30);
                img{
                    width:100%;
                    height:100%;
                }
            }
            .center{
                width:r(430);
                height:r(80);
                margin:r(10) 0 r(10) r(20);
                .up{
                    width:r(430);
                    height:r(40);
                    line-height:r(40);
                    font-size:r(32);
                    color:#333;
                }
                .down{
                    width:r(430);
                    height:r(40);
                    line-height:r(40);
                    font-size:r(26);
                    color:#999;
                }
            }
            .timetitle{
                width:r(160);
                height:r(80);
                margin:r(10) r(30) r(10) 0;
                .time{
                    display:inline-block;
                    width:r(160);
                    height:r(40);
                    line-height:r(40);
                    font-size:r(26);
                    color:#999;
                    text-align:right;
                }
                .noticeredpoint{
                    display:inline-block;
                    width:r(16);
                    height:r(16);
                    background:red;
                    line-height:r(40);
                    border-radius:50%;
                }
            }
        }
    }

    // 模态框
    .clearnoticemodal{
        width:100%;
        height:r(1334);
        position:fixed;
        left:0;
        top:0;
        background:rgba(0,0,0,0.3);
        display:flex;
        .noticearea{
            width:r(540);
            height:r(270);
            margin:auto;
            background:#fff;
            border-radius:r(14);
            .up{
                width:r(540);
                height:r(170);
                text-align:center;
                line-height:r(170);
                font-size:r(36);
                color:#000;
                border-bottom:1px solid rgba(221,221,221,0.3);
            }
            .down{
                width:r(540);
                height:r(99);
                .noclear{
                    width:r(269);
                    height:r(99);
                    text-align:center;
                    line-height:r(99);
                    font-size:r(36);
                    color:#000;
                    border-right:1px solid rgba(221,221,221,0.3);
                }
                .clearnow{
                    width:r(269);
                    height:r(99);
                    text-align:center;
                    line-height:r(99);
                    font-size:r(36);
                    color:#108EE9;
                }
            }
        }
    }
}
</style>