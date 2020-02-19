<template>
  <div class="mine">
    <!-- 第一层 -->
    <div class="top">
      <span class="setting"></span>
    </div>

    <!-- 第二层 -->
    <div class="infos clearfix">
      <!-- 左 -->
      <div class="head fl">
        <img src="../assets/head.png"/>
      </div>
      <!-- 中 -->
      <div class="info fl">
        <!-- 上层 -->
        <div class="up">
          <span class="name">货主007</span>
          <span class="certification">未认证，去认证</span>
        </div>
        <!-- 下层 -->
        <div class="down">
          <span class="trade">交易</span>
          <span class="tradetime">0次</span>
          <span class="delivery">发货</span>
          <span class="deliverytime">0次</span>
        </div>
      </div>
      <!-- 右 -->
      <div class="topersoncenter fr">
        <span class="infosmore"></span>
      </div>
    </div>

    <!-- 第三层 -->
    <div class="wallet clearfix">
      <span class="walleticon fl"></span>
      <span class="mywallet fl">我的钱包</span>
      <span class="walletmore fr"></span>
    </div>

    <!-- 第四层 -->
    <div class="evaluation clearfix">
      <span class="evaluationicon fl"></span>
      <span class="myevaluation fl">评价管理</span>
      <span class="evaluationmore fr"></span>
    </div>

    <!-- 第五层 -->
    <div class="opinion clearfix">
      <span class="opinionicon fl"></span>
      <span class="myopinion fl"         >意见反馈</span>
      <span class="opinionmore fr"></span>
    </div>

    <!-- 第六层 -->
    <div class="data clearfix">
      <span class="dataicon fl"></span>
      <span class="mydata fl">数据统计</span>
      <span class="datamore fr"></span>
    </div>




  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.mine{
  width:100%;
  height:r(1334);
  background:#F2F6F7;
  .top{
    width:100%;
    height:r(64);
    background:#fff;
    .setting{
      display:inline-block;
      width:r(39);
      height:r(39);
      background:url(../assets/setting.png) no-repeat;
      background-size:r(39) r(39);
      margin:r(13) r(0) r(13) r(681);
    }
  }

  .infos{
    width:100%;
    height:r(186);
    background:#fff;
    .head{
      width:r(140);
      height:r(140);
      border-radius:50%;
      background:#F2F6F7;
      margin:r(23) 0 0 r(30);
      overflow:hidden;
      img{
        width:100%;
        height:100%;
      }
    }
    .info{
      width:r(400);
      height:r(140);
      margin:r(23) 0 0 r(25);
      .up{
        width:r(400);
        height:r(70);
        .name{
          font-size:r(36);
          line-height:r(70);
          color:#333;
          vertical-align:middle;
          font-weight:500;
        }
        .certification{
          width:r(160);
          height:r(36);
          display:inline-block;
          font-size:r(20);
          color:#0350A0;
          border:1px solid #0350A0;
          vertical-align:middle;
          margin-left:r(10);
          line-height:r(32);
          text-align:center;
          border-radius:r(6);
        }
      }
      .down{
        width:r(400);
        height:r(70);
        line-height:r(70);
        font-size:r(28);
        color:#666;
        .tradetime{
          margin: 0 r(30) 0 r(10);
        }
        .deliverytime{
          margin-left:r(10);
        }
      }
    }
    .topersoncenter{
      width:r(50);
      height:r(186);
      line-height:r(186);
      text-align:right;
      .infosmore{
        display:inline-block;
        width:r(14);
        height:r(22);
        background:url(../assets/right.png) no-repeat;
        background-size:r(14) r(22);
        margin-right:r(30);
      }
    }
  }

  .wallet{
    width:100%;
    height:r(88);
    background:#fff;
    margin:r(20) 0;
    line-height:r(88);
    overflow:hidden;
    .walleticon{
      display:inline-block;
      width:r(38);
      height:r(38);
      background:url(../assets/setting.png) no-repeat;
      background-size:r(38) r(38);
      margin: r(25) r(25) 0 r(33);
    }
    .mywallet{
      font-size:r(33);
      color:#333;
    }
    .walletmore{
      display:inline-block;
        width:r(14);
        height:r(22);
        background:url(../assets/right.png) no-repeat;
        background-size:r(14) r(22);
        margin-right:r(30);
        margin-top:r(33);
    }
  }

  .evaluation{
    width:100%;
    height:r(88);
    background:#fff;
    line-height:r(88);
    overflow:hidden;
    border-bottom:1px solid rgba(198,198,198,1);
    .evaluationicon{
      display:inline-block;
      width:r(38);
      height:r(38);
      background:url(../assets/setting.png) no-repeat;
      background-size:r(38) r(38);
      margin: r(25) r(25) 0 r(33);
    }
    .myevaluation{
      font-size:r(33);
      color:#333;
    }
    .evaluationmore{
      display:inline-block;
        width:r(14);
        height:r(22);
        background:url(../assets/right.png) no-repeat;
        background-size:r(14) r(22);
        margin-right:r(30);
        margin-top:r(33);
    }
  }

  .opinion{
    width:100%;
    height:r(88);
    background:#fff;
    line-height:r(88);
    overflow:hidden;
    border-bottom:1px solid rgba(198,198,198,1);
    .opinionicon{
      display:inline-block;
      width:r(38);
      height:r(38);
      background:url(../assets/setting.png) no-repeat;
      background-size:r(38) r(38);
      margin: r(25) r(25) 0 r(33);
    }
    .myopinion{
      font-size:r(33);
      color:#333;
    }
    .opinionmore{
      display:inline-block;
        width:r(14);
        height:r(22);
        background:url(../assets/right.png) no-repeat;
        background-size:r(14) r(22);
        margin-right:r(30);
        margin-top:r(33);
    }
  }

  .data{
    width:100%;
    height:r(88);
    background:#fff;
    line-height:r(88);
    overflow:hidden;
    .dataicon{
      display:inline-block;
      width:r(38);
      height:r(38);
      background:url(../assets/setting.png) no-repeat;
      background-size:r(38) r(38);
      margin: r(25) r(25) 0 r(33);
    }
    .mydata{
      font-size:r(33);
      color:#333;
    }
    .datamore{
      display:inline-block;
        width:r(14);
        height:r(22);
        background:url(../assets/right.png) no-repeat;
        background-size:r(14) r(22);
        margin-right:r(30);
        margin-top:r(33);
    }
  }

}
</style>