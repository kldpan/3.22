<template>
  <div class="mineinfos">
    <!-- 第一层 -->
    <div class="title clearfix">
        <span class="back fl" @click="back()"></span>
        <span class="titlename">个人资料</span>
    </div>
    
    <!-- 第二层 -->
    <div class="infos">
        <!-- 头像 -->
        <div class="head clearfix">
            <span class="headname fl">头像</span>
            <img src="../../assets/head.png"/>
            <span class="headmore fr"></span>
        </div>
        <!-- 手机号 -->
        <div class="phone clearfix">
            <span class="phonename fl">手机号</span>
            <span class="phonemore fr"></span>
            <span class="phonenum fr">18888888888</span>
        </div>
        <!-- 身份证号 -->
        <div class="ID clearfix">
            <span class="IDname fl">身份证号</span>
            <span class="IDmore fr"></span>
            <span class="name fr">风行天下</span>
        </div>
    </div>

    <!-- 第三层 -->
    <div class="certification">
        <!-- 公司名称 -->
        <div class="firmname clearfix">
            <span class="firmtitle fl">公司名称</span>
            <span class="firmnamemore fr"></span>
            <span class="name fr">去完善</span>
        </div>
        <!-- 公司地址 -->
        <div class="firmaddress clearfix">
            <span class="addresstitle fl">公司地址</span>
            <span class="addressmore fr"></span>
            <span class="address fr">去完善</span>
        </div>
        <!-- 营业执照 -->
        <div class="license clearfix">
            <span class="licensetitle fl">营业执照</span>
            <span class="licensemore fr"></span>
            <span class="licensename fr">去完善</span>
        </div>
    </div>

  </div>
</template>

<script>
export default {
  data(){
      return {

      }
  },
  methods:{
      toPath(url){
          this.$router.push(url);
      },
      back(){
          this.$router.back();
      }
  }
};
</script>

<style lang="scss" scoped>
.mineinfos{
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
        // text-align:center;
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

    .infos{
        width:100%;
        height:r(284);
        background:#fff;
        margin:r(20) 0;
        overflow:hidden;
        .head{
            width:100%;
            height:r(94);
            border-bottom:1px solid rgba(198,198,198,0.3);
            .headname{
                line-height:r(94);
                color:#333;
                font-size:r(30);
                margin-left:r(30);
            }
            img{
                width:r(80);
                height:r(80);
                border-radius:50%;
                background:#F2F6F7;
                float:left;
                margin:r(7) 0 r(7) r(516);
            }
            .headmore{
                display:inline-block;
                width:r(14);
                height:r(22);
                background:url(../../assets/right.png) no-repeat;
                background-size:r(14) r(22);
                margin:r(36) r(30) r(30) 0;
            }
        }

        .phone{
            width:100%;
            height:r(94);
            border-bottom:1px solid rgba(198,198,198,0.3);
            line-height:r(94);
            .phonename{
                color:#333;
                font-size:r(30);
                margin-left:r(30);
            }
            .phonenum{
                font-size:r(26);
                color:#999;
                margin-right:r(24);
            }
            .phonemore{
                display:inline-block;
                width:r(14);
                height:r(22);
                background:url(../../assets/right.png) no-repeat;
                background-size:r(14) r(22);
                margin:r(36) r(30) r(30) 0;
            }
        }

        .ID{
            width:100%;
            height:r(94);
            line-height:r(94);
            .IDname{
                color:#333;
                font-size:r(30);
                margin-left:r(30);
            }
            .name{
                font-size:r(26);
                color:#999;
                margin-right:r(24);
            }
            .IDmore{
                display:inline-block;
                width:r(14);
                height:r(22);
                background:url(../../assets/right.png) no-repeat;
                background-size:r(14) r(22);
                margin:r(36) r(30) r(30) 0;
            }
        }
    }

    .certification{
        width:100%;
        height:r(284);
        background:#fff;
        margin:r(20) 0;
        overflow:hidden;
        .firmname{
            width:100%;
            height:r(94);
            border-bottom:1px solid rgba(198,198,198,0.3);
            line-height:r(94);
            .firmtitle{
                line-height:r(94);
                color:#333;
                font-size:r(30);
                margin-left:r(30);
            }
            .name{
                font-size:r(30);
                color:red;
                margin-right:r(24);
            }
            .firmnamemore{
                display:inline-block;
                width:r(14);
                height:r(22);
                background:url(../../assets/right.png) no-repeat;
                background-size:r(14) r(22);
                margin:r(36) r(30) r(30) 0;
            }
        }

        .firmaddress{
            width:100%;
            height:r(94);
            border-bottom:1px solid rgba(198,198,198,0.3);
            line-height:r(94);
            .addresstitle{
                line-height:r(94);
                color:#333;
                font-size:r(30);
                margin-left:r(30);
            }
            .address{
                font-size:r(30);
                color:red;
                margin-right:r(24);
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

        .license{
            width:100%;
            height:r(94);
            border-bottom:1px solid rgba(198,198,198,0.3);
            line-height:r(94);
            .licensetitle{
                line-height:r(94);
                color:#333;
                font-size:r(30);
                margin-left:r(30);
            }
            .licensename{
                font-size:r(30);
                color:red;
                margin-right:r(24);
            }
            .licensemore{
                display:inline-block;
                width:r(14);
                height:r(22);
                background:url(../../assets/right.png) no-repeat;
                background-size:r(14) r(22);
                margin:r(36) r(30) r(30) 0;
            }
        }
    }
    
}
</style>