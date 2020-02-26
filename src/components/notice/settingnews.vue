<template>
    <div class="settingnews">
        <!-- 第一层 -->
        <div class="title clearfix">
            <div class="back fl" @click="go(-1)"></div>
            <div class="titlename fl">消息设置</div>
        </div>

        <!-- 第二层 -->
        <div class="nonews clearfix">
            <div class="left fl">消息免打扰</div>
            <div class="swich fr" ref="swich" @click="swich()">
                <input type="checkbox" value="" name=""/>
                <div class="box">
                    <span></span>
                </div>
            </div>
        </div>
        
        <!-- 第三层 -->
        <div class="cleararea" @click="clearAllNotice()">
            <div class="logisticnews clearfix">
                <span class="name fl">清空物流消息</span>
                <span class="notice fr">清空后不可恢复，请慎重</span>
            </div>
            <div class="activitynews clearfix">
                <span class="name fl">清空活动消息</span>
                <span class="notice fr">默认30天自动清空</span>
            </div>
            <div class="noticenews clearfix">
                <span class="name fl">清空通知消息</span>
                <span class="notice fr">默认30天自动清空</span>
            </div>
        </div>

        <!-- 清空提示框 -->
        <div class="clearnoticemodal" v-show="clearNoticeModalBool">
            <div class="noticearea">
                <div class="up">确认清空通知记录吗？</div>
                <div class="down clearfix">
                    <div class="noclear fl" @click="closeModal()">取消</div>
                    <div class="clearnow fr">确定</div>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
export default {
  data(){
      return {
          checkedBool:true,
          clearNoticeModalBool:false,
      }
  },
  methods:{
      go(n){
          this.$router.go(n);
      },
      swich(){
        //   获取input
        let checkbox = this.$refs.swich.firstChild;
        this.$refs.swich.classList.toggle("swich-on");
        if(checkbox.checked){
            checkbox.checked = "true";
        }else{
            checkbox.checked = "false"
        }
      },
      clearAllNotice(){
          this.clearNoticeModalBool = true;
      },
      closeModal(){
          this.clearNoticeModalBool = false;
      }
  }
};
</script>

<style lang="scss" scoped>
.settingnews{
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
        background:fff;
        line-height:r(88);
        background:#fff;
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
    .nonews{
        width:100%;
        height:r(88);
        background:#fff;
        margin:r(20) 0;
        .left{
            width:r(200);
            height:r(88);
            margin-left:r(30);
            line-height:r(88);
            font-size:r(30);
            color:#333;
        }
        .swich{
            width:r(102);
            height:r(62);
            margin:r(13) r(30) r(13) 0;
            input{
                display:none;
            }
            .box{
                width:r(120);
                height:r(60);
                background:#ccc;
                border-radius:r(30);
                transition: all 0.5s ease;
                span{
                    display:inline-block;
                    height:30px;
                    width:30px;
                    border-radius:r(50);
                    background:#fff;
                    transform:translateX(r(2));
                    transition: all 0.5s ease;
                }
            }
        }
        .swich-on{
            .box{
                background:#0350A0;
                transition: all 0.5s ease;
                span{
                    transform:translateX(30px);
                    transition: all 0.5s ease;
                }
            }
        } 
    }

    // 第三层
    .cleararea{
        width:100%;
        height:r(266);
        background:#fff;
        .logisticnews{
            width:r(690);
            height:r(88);
            margin:0 auto;
            border-bottom:1px solid rgba(198,198,198,0.3);
            .name{
                font-size:r(30);
                color:#333;
                line-height:r(88);
            }
            .notice{
                font-size:r(24);
                color:#999;
                line-height:r(88);
            }
        }

        .activitynews{
            width:r(690);
            height:r(88);
            margin:0 auto;
            border-bottom:1px solid rgba(198,198,198,0.3);
            .name{
                font-size:r(30);
                color:#333;
                line-height:r(88);
            }
            .notice{
                font-size:r(24);
                color:#999;
                line-height:r(88);
            }
        }

        .noticenews{
            width:r(690);
            height:r(88);
            margin:0 auto;
            .name{
                font-size:r(30);
                color:#333;
                line-height:r(88);
            }
            .notice{
                font-size:r(24);
                color:#999;
                line-height:r(88);
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