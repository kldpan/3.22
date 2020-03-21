<template>
  <div class="login">
    <!-- 第一层 -->
    <div class="top clearfix">
      <div class="back fl" @click="back()"></div>
      <!-- <div class="register fr" @click="toPath('/register')">注册</div> -->
    </div>

    <!-- 第二层 -->
    <div class="body">
      <h1>登录</h1>
      <div class="inputArea">
        <div class="phone" ref="inputPhone">
          <input type="number" placeholder="请输入手机号" v-model="form01.phone" />
        </div>
        <div class="code clearfix">
          <input type="number" placeholder="请输入验证码" v-model="form01.code" />
          <button v-if="btnTitle" :disabled="timeDisabledBool" @click="sendCode()">{{btnTitle}}</button>
        </div>
      </div>
      <div class="loginbtn">
        <button class="submit" @click="toLogin()" :disabled="isLogin">登录</button>
      </div>
    </div>

    <!-- 第三层 -->
    <div class="loginmore">
      <p>其他登录方式</p>
      <span class="wx"></span>
      <span class="qq"></span>
      <span class="sina"></span>
    </div>

    <!-- 第四层 -->
    <div class="rules">
      <p>登录即代表您已经同意</p>
      <span class="service" @click="toPath('/service')">《服务条款》</span>
      <span class="and">和</span>
      <span class="privacy" @click="toPath('/privacy')">《隐私政策》</span>
    </div>

    <!-- 第五层 -->
    <div class="call" @click="showCall()" ref="callPhone">
      <span class="phoneicon"></span>
      <span class="phonenum">客服电话：</span>
      <span class="number">12345</span>
    </div>

    <!-- 第六层 -->
    <div class="callModal" v-show="callBool">
      <div class="callnow" @click="callPhone()">
        <span class="callicon"></span>
        <span class="callnum">呼叫 12345</span>
      </div>
      <div class="cancelcall" @click="cancelCall()">取消</div>
    </div>

    <!-- 手机号填错提示模态 -->
    <!-- <div class="errPhoneModal" v-show="errPhoneModalBool" @click="closeErrPhoneModal()">
      <div class="notice">请输入正确的手机号码！</div>
    </div>-->
  </div>
</template>

<script>
import instance from "@/core/api/http.js";
import Vue from "vue";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      // mine
      btnTitle: "获取验证码",
      timeDisabledBool: false,
      errors: {},
      form01: {
        phone: "",
        code: ""
      },
      callBool: false
      // errPhoneModalBool: false
    };
  },
  computed: {
    // isLogin() {
    //   if (this.form01.phone && this.form01.code) return false;
    //   else return true;
    // }
  },
  mounted() {},
  methods: {
    toPath(url) {
      this.$router.push(url);
    },
    async toLogin() {
      // 如果有错误提醒，先取消错误提醒

      // 发请求
      let { loggedIn, message } = await this.$store.dispatch(
        "login",
        this.form01.phone,
        this.form01.code
      );
      if (!loggedIn) {
        // this.toPath({
        //   path: "/"
        // });
        console.log("哈哈哈哈");
      } else {
        this.toastInstanse = Toast({
          message: message,
          position: "center",
          duration: 1000
        });
        this.toastInstanse.$el.style.zIndex = 10000000;
      }
    },
    back() {
      this.$router.go(0);
    },
    validatePhone(phone) {
      let reg = /^1[3456789]\d{9}$/;
      if (!reg.test(phone)) {
        // this.errPhoneModalBool = true;
        // setTimeout(() => {
        //   this.closeErrPhoneModal();
        // }, 800);
        this.toastInstanse = Toast({
          message: "请填写正确的手机号",
          position: "center",
          duration: 1000
        });
        this.toastInstanse.$el.style.zIndex = 10000000;
      }
    },
    // closeErrPhoneModal() {
    //   this.errPhoneModalBool = false;
    // },
    timerBtn() {
      let time = 5;
      let timer = setInterval(() => {
        if (time === 0) {
          clearInterval(timer);
          this.btnTitle = "获取验证码";
          this.timeDisabledBool = false;
        } else {
          // 倒计时
          this.btnTitle = time + "秒后重试";
          this.timeDisabledBool = true;
          time--;
        }
      }, 1000);
    },
    async sendCode() {
      // 验证手机号格式
      let reg = /^1[3456789]\d{9}$/;
      if (reg.test(this.form01.phone)) {
        // 如果格式正确发送网络请求
        // console.log(111);
        this.timerBtn();
        await this.$store.dispatch("requestVerifyCode", this.form01.phone);

        // instance({
        //   url: "/verify-code",
        //   method: "POST",
        //   data: data
        // }).then(res => {
        //   console.log(res);
        // });
      } else {
        this.toastInstanse = Toast({
          message: "请填写正确的手机号",
          position: "center",
          duration: 1000
        });
        this.toastInstanse.$el.style.zIndex = 10000000;
        setTimeout(() => {
          this.form01.phone = "";
        }, 800);
      }
    },
    showCall() {
      this.callBool = true;
    },
    callPhone() {
      let phoneNumber = Number(this.$refs.callPhone.children[2].innerHTML);
      window.location.href = "tel://" + phoneNumber;
    },
    cancelCall() {
      this.callBool = false;
    }
  }
  // mounted() {
  //   let dataw = Cookies.get("loginInfo") ? JSON.parse(Cookies.get("loginInfo")): {};
  //   if(dataw){
  //     this.form1.username = dataw.username;
  //     this.form1.password = dataw.password;
  //     this.form1.openid = dataw.openid;
  //   }else{
  //     this.form1.username = '';
  //     this.form1.password = '';
  //     this.form1.openid = '';
  //   }
  // }
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: r(1334);
  background: #fff;
  position: absolute;
  z-index: 100000;

  .top {
    width: 100%;
    height: r(88);
    border-bottom: 1px dashed #333;
    .back {
      width: r(22);
      height: r(36);
      background: url(../../assets/back.png) no-repeat;
      background-size: r(22) r(36);
      margin: r(26) 0 0 r(30);
    }
    .register {
      font-family: PingFang SC;
      font-size: r(34);
      line-height: r(88);
      margin-right: r(30);
      color: #333;
    }
  }

  .body {
    width: 100%;
    height: r(566);
    overflow: hidden;
    h1 {
      font-size: r(56);
      color: #333;
      font-weight: 500;
      font-family: PingFang SC;
      text-align: center;
      margin-top: r(30);
    }
    .inputArea {
      width: 100%;
      height: r(202);
      margin-top: r(120);
      .phone {
        width: r(690);
        height: r(86);
        margin: 0 auto;
        input {
          width: r(690);
          height: r(86);
          background: rgba(242, 246, 249, 1);
          border: none;
          border-radius: r(16);
          padding-left: r(30);
        }
      }
      .code {
        width: r(690);
        height: r(86);
        margin: r(30) auto 0;
        border-radius: r(16);
        background: rgba(242, 246, 249, 1);
        overflow: hidden;
        input {
          display: inline-block;
          float: left;
          width: r(300);
          height: r(86);
          background: rgba(242, 246, 249, 1);
          border: none;
          border-radius: r(16);
          padding-left: r(30);
        }
        button {
          float: right;
          background: rgba(242, 246, 249, 1);
          border: none;
          line-height: r(86);
          margin-right: r(30);
        }
      }
    }
    .loginbtn {
      width: r(690);
      height: r(86);
      margin: r(50) auto 0;
      .submit {
        width: r(690);
        height: r(86);
        border-radius: r(16);
        background: rgba(242, 246, 249, 1);
        border: none;
        font-size: r(32);
        color: #999;
        font-weight: 100;
        text-align: center;
        line-height: r(86);
      }
    }
  }

  .loginmore {
    width: r(100%);
    height: r(200);
    margin-top: r(125);
    overflow: hidden;
    text-align: center;
    p {
      color: #999;
      font-size: r(26);
      margin-bottom: r(30);
    }
    .wx {
      display: inline-block;
      width: r(70);
      height: r(70);
      background: url(../../assets/vx.png) no-repeat;
      background-size: r(70) r(70);
    }
    .qq {
      display: inline-block;
      width: r(70);
      height: r(70);
      background: url(../../assets/qq.png) no-repeat;
      background-size: r(70) r(70);
      margin: 0 r(122);
    }
    .sina {
      display: inline-block;
      width: r(70);
      height: r(70);
      background: url(../../assets/sina.png) no-repeat;
      background-size: r(70) r(70);
    }
  }

  .rules {
    width: r(100%);
    height: r(100);
    margin-top: r(125);
    overflow: hidden;
    text-align: center;
    p {
      color: #999;
      font-size: r(24);
      margin-bottom: r(15);
    }
    .service {
      color: #0350a0;
      font-size: r(24);
    }
    .and {
      color: #999;
      font-size: r(24);
    }
    .privacy {
      color: #0350a0;
      font-size: r(24);
    }
  }

  .call {
    width: 100%;
    height: r(128);
    text-align: center;
    line-height: r(128);
    .phoneicon {
      display: inline-block;
      width: r(33);
      height: r(33);
      background: url(../../assets/phone.png) no-repeat;
      background-size: r(33) r(33);
      vertical-align: middle;
    }
    .phonenum {
      display: inline-block;
      margin-left: r(20);
      color: #999;
    }
    .number {
      color: #999;
    }
  }

  .callModal {
    width: 100%;
    height: r(1334);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000000;
    background: rgba(0, 0, 0, 0.3);
    .callnow {
      width: r(690);
      height: r(114);
      margin: r(1056) auto 0;
      background: #fff;
      border-radius: r(20);
      line-height: r(114);
      .callicon {
        display: inline-block;
        width: r(46);
        height: r(46);
        background: url(../../assets/call.png) no-repeat;
        background-size: r(46) r(46);
        vertical-align: middle;
        margin: 0 r(30);
      }
      .callnum {
        color: #108ee9;
        font-size: r(40);
        font-weight: 500;
        vertical-align: middle;
      }
    }
    .cancelcall {
      width: r(690);
      height: r(114);
      margin: r(20) auto 0;
      background: #fff;
      border-radius: r(20);
      text-align: center;
      line-height: r(114);
      font-size: r(40);
      color: #108ee9;
      font-weight: 500;
    }
  }

  // 模态框
  .errPhoneModal {
    width: 100%;
    height: r(1334);
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    .notice {
      background: #fff;
      font-size: r(32);
      color: red;
      margin: auto;
    }
  }
}
</style>