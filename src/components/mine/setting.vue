<template>
  <div class="setting">
    <!-- 第一层 -->
    <div class="title clearfix">
        <span class="back fl" @click="back()"></span>
        <span class="titlename">设置</span>
    </div>

    <!-- 第二层 -->
    <div class="sets">
        <div class="address clearfix">
            <span class="addressname fl">收获地址</span>
            <span class="addressmore fr"></span>
        </div>
        <div class="privacy clearfix">
            <span class="privacyname fl">个人隐私</span>
            <span class="privacymore fr"></span>
        </div>
        <div class="security clearfix">
            <span class="securityname fl">账户安全</span>
            <span class="securitymore fr"></span>
        </div>
        <div class="certification clearfix">
            <span class="certificationname fl">认证特权</span>
            <span class="certificationmore fr"></span>
        </div>
        <div class="share clearfix">
            <span class="sharename fl">分享好友</span>
            <span class="sharemore fr"></span>
        </div>
        <div class="service clearfix">
            <span class="servicename fl">联系客服</span>
            <span class="servicemore fr"></span>
        </div>
        <div class="clearcache clearfix">
            <span class="cachename fl">清除缓存</span>
            <span class="cachemore fr"></span>
            <span class="cache fr">0MB</span>
        </div>
        <div class="code clearfix">
            <span class="codename fl">我的二维码</span>
            <span class="codemore fr"></span>
        </div>
        <div class="aboutus clearfix">
            <span class="aboutusname fl">关于我们</span>
            <span class="aboutusmore fr"></span>
        </div>
    </div>

    <!-- 第三层 -->
    <div class="exit" @click="exitModal()">退出登录</div>
    <div class="exitmodal" v-show="exitBool">
        <div class="exitbox">
            <div class="up">
                <p class="yesorno">确定退出吗？</p>
                <p class="notice">退出后不删除历史数据</p>
            </div>
            <div class="down">
                <span class="cancel" @click="closeModal()">取消</span>
                <span class="comfirm" @click="toPath('/login')">确定</span>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
      return {
          exitBool:false
      }
  },
  methods:{
      back(){
          this.$router.back();
      },
      toPath(url){
          this.$router.push(url);
      },
      exitModal(){
          this.exitBool = true;
      },
      closeModal(){
          this.exitBool = false;
      }
  }
};
</script>

<style lang="scss" scoped>
.setting{
    width:100%;
    height:r(1334);
    background:#F2F6F7;
    position:fixed;
    top:0;
    left:0;
    z-index:100000;
    .title{
        width:100%;
        height:r(88);
        background:#fff;
        line-height:r(88);
        .back{
            display:inline-block;
            width:r(22);
            height:r(36);
            background:url(../../assets/back.png) no-repeat;
            background-size:r(22) r(36);
            margin:r(26) 0 r(26) r(30);
        }
        .titlename{
            font-size:r(36);
            margin-left:r(252);
            color:#333;
            font-weight:700;
        }
    }

    .sets{
        width:100%;
        height:r(854);
        background:#fff;
        margin-top:r(20);
        .address{
            width:100%;
            height:r(94);
            border-bottom:1px solid rgba(198,198,198,0.3);
            line-height:r(94);
            .addressname{
                color:#333;
                font-size:r(30);
                margin-left:r(30);
            }
            .addressmore{
                display:inline-block;
                width:r(14);
                height:r(22);
                background:url(../../assets/right.png) no-repeat;
                background-size:r(14) r(22);
                margin:r(36) r(30) r(30) 0;
            }
        }

        .privacy{
            width:100%;
            height:r(94);
            border-bottom:1px solid rgba(198,198,198,0.3);
            line-height:r(94);
            .privacyname{
                color:#333;
                font-size:r(30);
                margin-left:r(30);
            }
            .privacymore{
                display:inline-block;
                width:r(14);
                height:r(22);
                background:url(../../assets/right.png) no-repeat;
                background-size:r(14) r(22);
                margin:r(36) r(30) r(30) 0;
            }
        }

        .security{
            width:100%;
            height:r(94);
            border-bottom:1px solid rgba(198,198,198,0.3);
            line-height:r(94);
            .securityname{
                color:#333;
                font-size:r(30);
                margin-left:r(30);
            }
            .securitymore{
                display:inline-block;
                width:r(14);
                height:r(22);
                background:url(../../assets/right.png) no-repeat;
                background-size:r(14) r(22);
                margin:r(36) r(30) r(30) 0;
            }
        }

        .certification{
            width:100%;
            height:r(94);
            border-bottom:1px solid rgba(198,198,198,0.3);
            line-height:r(94);
            .certificationname{
                color:#333;
                font-size:r(30);
                margin-left:r(30);
            }
            .certificationmore{
                display:inline-block;
                width:r(14);
                height:r(22);
                background:url(../../assets/right.png) no-repeat;
                background-size:r(14) r(22);
                margin:r(36) r(30) r(30) 0;
            }
        }

        .share{
            width:100%;
            height:r(94);
            border-bottom:1px solid rgba(198,198,198,0.3);
            line-height:r(94);
            .sharename{
                color:#333;
                font-size:r(30);
                margin-left:r(30);
            }
            .sharemore{
                display:inline-block;
                width:r(14);
                height:r(22);
                background:url(../../assets/right.png) no-repeat;
                background-size:r(14) r(22);
                margin:r(36) r(30) r(30) 0;
            }
        }

        .service{
            width:100%;
            height:r(94);
            border-bottom:1px solid rgba(198,198,198,0.3);
            line-height:r(94);
            .servicename{
                color:#333;
                font-size:r(30);
                margin-left:r(30);
            }
            .servicemore{
                display:inline-block;
                width:r(14);
                height:r(22);
                background:url(../../assets/right.png) no-repeat;
                background-size:r(14) r(22);
                margin:r(36) r(30) r(30) 0;
            }
        }

        .clearcache{
            width:100%;
            height:r(94);
            border-bottom:1px solid rgba(198,198,198,0.3);
            line-height:r(94);
            .cachename{
                color:#333;
                font-size:r(30);
                margin-left:r(30);
            }
            .cache{
                font-size:r(26);
                color:#999;
                margin-right:r(24);
            }
            .cachemore{
                display:inline-block;
                width:r(14);
                height:r(22);
                background:url(../../assets/right.png) no-repeat;
                background-size:r(14) r(22);
                margin:r(36) r(30) r(30) 0;
            }
        }

        .code{
            width:100%;
            height:r(94);
            border-bottom:1px solid rgba(198,198,198,0.3);
            line-height:r(94);
            .codename{
                color:#333;
                font-size:r(30);
                margin-left:r(30);
            }
            .codemore{
                display:inline-block;
                width:r(14);
                height:r(22);
                background:url(../../assets/right.png) no-repeat;
                background-size:r(14) r(22);
                margin:r(36) r(30) r(30) 0;
            }
        }

        .aboutus{
            width:100%;
            height:r(94);
            line-height:r(94);
            .aboutusname{
                color:#333;
                font-size:r(30);
                margin-left:r(30);
            }
            .aboutusmore{
                display:inline-block;
                width:r(14);
                height:r(22);
                background:url(../../assets/right.png) no-repeat;
                background-size:r(14) r(22);
                margin:r(36) r(30) r(30) 0;
            }
        }
    }

    .exit{
        width:100%;
        height:r(100);
        background:#fff;
        position:fixed;
        left:0;
        bottom:0;
        text-align:center;
        line-height:r(100);
        font-size:r(36);
        color:#999;
    }
    .exitmodal{
        width:100%;
        height:r(1334);
        background:rgba(0,0,0,0.3);
        position:fixed;
        left:0;
        top:0;
        display:flex;
        .exitbox{
            width:r(540);
            height:r(270);
            background:#fff;
            border-radius:r(14);
            margin:auto;
            .up{
                width:r(540);
                height:r(170);
                border-bottom:1px solid #ddd;
                text-align:center;
                .yesorno{
                    width:r(540);
                    height:r(85);
                    line-height:r(120);
                    font-size:r(36);
                }
                .notice{
                    width:r(540);
                    height:r(85);
                    line-height:r(50);
                    font-size:r(36);
                    font-size:r(30);
                    color:#888;
                }
            }
            .down{
                width:r(540);
                height:r(99);
                line-height:r(99);
                .cancel{
                    display:inline-block;
                    width:r(269);
                    height:r(99);
                    text-align:center;
                    font-size:r(36);
                    color:#000;
                    border-right:1px solid #ddd;
                }
                .comfirm{
                    display:inline-block;
                    width:r(269);
                    height:r(99);
                    text-align:center;
                    font-size:r(36);
                    color:#108EE9;
                }
            }
        }
    }

}
</style>