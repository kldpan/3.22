<template>
  <div class="register">
    <!-- 第一层 -->
    <div class="top clearfix">
      <div class="back fl" @click="toPath('/index/delivery')"></div>
      <div class="login fr" @click="toPath('/login')">登录</div>
    </div>

    <!-- 第二层 -->
    <div class="body">
      <h1>注册</h1>
      <div class="inputArea">
        <div class="phone">
          <input type=text placeholder="请输入手机号"/>
        </div>
        <div class="code">
          <input type=number placeholder="请输入验证码"/>
          <Timer slot="icon" @click="sendcodes"></Timer>
        </div>
      </div>
      <div class="loginbtn">
        <button>注册</button>
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


  </div>
</template>

<script>
import Vue from "vue";
import Timer from "./timer.vue";
// import {Toast} from "mint-ui";
// Vue.use(Toast);
export default {
  data(){
    return {
      callBool:false,
      offGray: true,
      tabItem: 1,
      checked: true,
      form1: {
          username: '',
          password: '',
          openid:""
      },
      form2: {
          username: '',
          password: '',
          openid:""
      },
      fullPath:"", //获取整个路由 已经后面的参数
      openidLogin:'',
      codeul: null
    }
  },
  components: {
      Timer
  },
  beforeRouteEnter(to, from, next) { //获取上个页面路由
      next(vm=>{
          vm.fullPath = from.fullPath
      })
  },
  // created(){
  //     // setTimeout(() => {
  //     //     this.offGray =  false
  //     // }, 500);
  //     let dataLogin = null
  //     if(this.$store.state.data.token || this.$store.state.data.wxOpenId == '' ){ //
  //         this.offGray =  false
  //         this.getInfo2() //重新触发微信绑定
  //     }else{
  //         this.getInfo() //第一次 触发 微信 登录 进行微信绑定
  //     }
  //       /**
  //        if (localStorage.getItem('loginInfo')) { //localStorage 是否过期
  //             let b = JSON.parse(localStorage.getItem('loginInfo'));
  //             let time = b.time;
  //             let data = b.date;
  //             if ((parseInt(time) + parseInt(data)) < new Date().getTime()) {
  //                 window.localStorage.removeItem('loginInfo');
  //             } else {
  //                 this.form1.username = b.username;
  //                 this.form1.password = b.password;
  //                 this.form1.openid = b.openid;

  //                 this.form2.username = b.username;
  //                 this.form2.password = b.password;
  //                 this.form2.openid = b.openid;
  //             }
  //         }
  //       */
  //   document.title = '用户登录'
  // },
  beforeRouteLeave(to, from, next){
      document.title = '易棉购'
      next()
  },
  methods: {
    toPath(url){
        this.$router.push(url);
    },
    showCall(){
      this.callBool = true;
    },
    callPhone(){
      let phoneNumber = Number(this.$refs.callPhone.children[2].innerHTML);
      window.location.href = 'tel://' + phoneNumber;
    },
    cancelCall(){
      this.callBool = false;
    },
    onClickLeft() {
        this.$router.push({
            path: '/home'
        });
    },
    tabTitle(val) {
        this.tabItem = val;
    },
    sendcodes(cd) {
        if (this.form2.username == '') {
            // this.common.msg('fail','请输入手机号');
            // Toast('请输入手机号')
            return;
        }
        let data = {
            params: {
                urlAuth: this.config.urlArray.phoneLogin.auth
            }
        }
        this.axios.get(this.config.urlArray.phoneLogin.url + '/' + this.form2.username, data).then((result) => {
            if (result.data.status == 'OK') {
                this.common.msg('success','获取成功');
                cd();
            } else {
                // this.common.msg('fail', result.data.message);
            }
        }).catch((err) => {
            // this.common.msg('fail','获取失败')
        });
    },
    wxLogin() { //微信登录
        let data = {
            code:this.$route.query.code,
        }
        this.axios.post(this.config.urlArray.loginWx.url,data).then((result) => {
              if (result.data.status == 'OK') {

                this.form1.openid = result.data.data.wxOpenId
                let storageInfo = new Object();
                storageInfo.wxOpenId = this.form1.openid;
                storageInfo.time = 604800000;
                storageInfo.date = new Date().getTime();
                Cookies.set('loginInfo', JSON.stringify(storageInfo),{ expires: 365, path: '' });
                // this.common.msg('fail', result.data.message)

                this.openidLogin = result.data.data.wxOpenId
                // this.wxlogins(result.data.data.wxOpenId) //调用 openid  进行登录
              }
              else{
                  this.form1.openid = result.data.data.openid

              }
        }).catch((err) => {
            if(this.$store.state.data.token){
                // this.common.msg('fail','登录失败')
            }

        });
    },
    wxLogin2() { //微信登录   (第一次登陆情况)
        let data = {
            code:this.$route.query.code,
        }
        this.axios.post(this.config.urlArray.loginWx.url, data).then((result) => {
              if (result.data.status == 'OK') {
                // 登录成功后用户信息存vuex
                let userinfodata = result.data.data
                this.form1.openid = userinfodata.wxOpenId
                this.$store.commit('set_userinfo', userinfodata);
                localStorage.setItem('data', JSON.stringify(userinfodata));
                let storageInfo = new Object();
                storageInfo.username = this.form1.username;
                storageInfo.password = this.form1.password
                storageInfo.openid = this.form1.openid;
                storageInfo.time = 604800000;
                storageInfo.date = new Date().getTime();
                Cookies.set('loginInfo', JSON.stringify(storageInfo),{ expires: 365, path: '' });
                // this.LoginBindwechatM() // 让后台 直接进行登录
                // this.$router.push({ path: `${this.fullPath}`})
            } else {
                this.form1.openid = result.data.data.openid
                // this.$store.commit('set_userinfo', userinfodata);
                let storageInfo = new Object();
                storageInfo.wxOpenId = this.form1.openid;
                storageInfo.time = 604800000;
                storageInfo.date = new Date().getTime();
                Cookies.set('loginInfo', JSON.stringify(storageInfo),{ expires: 365, path: '' });
                this.openidLogin = result.data.data.openid
                // this.wxlogins(result.data.data.openid) //调用 openid  进行登录
            }
        }).catch((err) => {
            if(this.$store.state.data.token){
                // this.common.msg('fail','登录失败')
            }

        });
    },
    LoginBindwechatM(){
        let datasw = this.form1.openid
        let data = {
            openid: datasw,
            token: this.$store.state.data.token
            // urlAuth: this.config.urlArray.LoginBindwechat.auth
        }
        this.axios.post(this.config.urlArray.LoginBindwechat.url, data).then((result) => {
              if (result.data.status == 'OK') {
                // 登录成功后用户信息存vuex
                let userinfodata = result.data.data
                this.$store.commit('set_userinfo', userinfodata);
                localStorage.setItem('data', JSON.stringify(userinfodata));
                if (this.checked) { //选中记住密码，存localStorage
                    let storageInfo = new Object();
                    storageInfo.username = this.form1.username;
                    storageInfo.password = this.form1.password
                    storageInfo.openid = this.form1.openid
                    storageInfo.time = 604800000;
                    storageInfo.date = new Date().getTime();
                  Cookies.set('loginInfo', JSON.stringify(storageInfo),{ expires: 365, path: '' });

                } else {
                    Cookies.remove('loginInfo', { path: '' });
                }
                this.offGray =  false
                this.$router.push({ path: `/home}`})
                // this.$router.push({ path: `${this.fullPath}`})
            } else {
                this.common.msg('fail', result.data.message)
            }
        }).catch((err) => {
            if(this.$store.state.data.token){
                // this.common.msg('fail','登录失败')
            }
        });
    },

    wxlogins(openidLogin) { //通过微信  直接登录
        let localData = Cookies.get('loginInfo') ? JSON.parse(Cookies.get('loginInfo')) : '';
        if(localData &&　localData.username ){
            this.form1.username = localData.username
        }
        if(localData &&　localData.password){
            this.form1.password = localData.password
        }
        if (this.form1.username == '' || this.form1.password == '') { //验证表单的输入
            ('请输入用户名和密码')
            this.offGray = false
            return;
        }
        let data = {
            username: this.form1.username,
            password: this.form1.password,
            openid: this.openidLogin,
            urlAuth: this.config.urlArray.login.auth
        }
        this.axios.post(this.config.urlArray.login.url, data).then((result) => {
            if (result.data.status == 'OK') {
                // 登录成功后用户信息存vuex
                let userinfodata = result.data.data
                this.$store.commit('set_userinfo', userinfodata);
              localStorage.setItem('data', JSON.stringify(userinfodata));
                  if (this.checked) { //选中记住密码，存localStorage
                    let storageInfo = new Object();
                    storageInfo.username = this.form1.username;
                    storageInfo.password = this.form1.password
                    storageInfo.openid = this.openidLogin
                    storageInfo.time = 604800000;
                    storageInfo.date = new Date().getTime();
                    Cookies.set('loginInfo', JSON.stringify(storageInfo),{ expires: 365, path: '' });
                } else {
                    Cookies.remove('loginInfo', { path: '' });
                }
                this.offGray =  false

                this.$router.push({ path: `${this.fullPath}`})
            } else {
                // this.common.msg('fail', result.data.message)
            }
        }).catch((err) => {
            if(this.$store.state.data.token){
                // this.common.msg('fail','登录失败')
            }
        });
    },
    fromcodelogin() { //短信验证码登录
      let localData = JSON.parse(Cookies.get('loginInfo')) ? JSON.parse(Cookies.get('loginInfo')) : '';
      if (this.form2.username == '' || this.form2.password == '') { //验证表单的输入
            this.common.msg('fail','请输入手机号和验证码');
            return;
        }
        let data = {
            urlAuth: this.config.urlArray.phoneLogin.auth,
            mobile: this.form2.username,
            openid: this.form1.openid,
            vcode: this.form2.password,
        }
        this.axios.post(this.config.urlArray.phoneLogin.url, data).then((result) => {
            if (result.data.status == 'OK') {
              if(result.data.data.userOrgState == '1'){
                // 登录成功后用户信息存vuex
                let userinfodata = result.data.data;
                this.offGray =  false
                this.$store.commit('set_userinfo', userinfodata);
                localStorage.setItem('data', JSON.stringify(userinfodata));
                this.$router.push({ path: `${this.fullPath}`})
              }else{
                this.common.msg('fail', '该企业未通过审核，请联系平台客服');
              }

            } else {
                this.common.msg('fail', result.data.message)
            }
        }).catch((err) => {
            if(this.$store.state.data.token){
                // this.common.msg('fail','登录失败')
              this.common.msg('fail', '服务器异常')
            }
        });
      },
      tocreateCards() { //创建名片
          this.$router.push({
              path: '/enterAuth'
          })
      },
      toforgetPwd() { //忘记密码
          this.$router.push({
              path: '/forgetPw'
          })
      },
    goBackHome(){
      this.$router.push({
        path: '/home'
      })
    },
    goBackSupermaket(){
      this.$router.push({
        path: '/supermarket'
      })
    },
    goFriend(){
      this.$router.push({
        path: '/friend'
      })
    }
  },
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
}

</script>

<style lang="scss" scoped>
.register{
  width:100%;
  height:r(1334);
  background:#fff;
  position:absolute;
  z-index:100000;

  .top{
    width:100%;
    height:r(88);
    border-bottom:1px dashed #333;
    .back{
      width:r(22);
      height:r(36);
      background:url(../../assets/back.png) no-repeat;
      background-size:r(22) r(36);
      margin:r(26) 0 0 r(30);
    }
    .login{
      font-family:PingFang SC;
      font-size:r(34);
      line-height:r(88);
      margin-right:r(30);
      color:#333;
    }
  }

  .body{
    width:100%;
    height:r(566);
    overflow:hidden;
    h1{
      font-size:r(56);
      color:#333;
      font-weight:500;
      font-family:PingFang SC;
      text-align:center;
      margin-top:r(30);
    }
    .inputArea{
      width:100%;
      height:r(202);
      margin-top:r(120);
      .phone{
        width:r(690);
        height:r(86);
        margin:0 auto;
        input{
          width:r(660);
          height:r(86);
          background:rgba(242,246,249,1);
          border:none;
          border-radius:r(16);
          padding-left:r(30);
        }
      }
      .code{
        width:r(690);
        height:r(86);
        margin:r(30) auto 0;
        border-radius:r(16);
        background:rgba(242,246,249,1);
        overflow:hidden;
        input{
          display:inline-block;
          float:left;
          width:r(300);
          height:r(86);
          background:rgba(242,246,249,1);
          border:none;
          border-radius:r(16);
          padding-left:r(30);
        }
      }
    }
    .loginbtn{
      width:r(690);
      height:r(86);
      margin:r(50) auto 0;
      button{
        width:r(690);
        height:r(86);
        border-radius: r(16);
        background:rgba(242,246,249,1);
        border:none;
        font-size: r(32);
        color:#999;
        font-weight:100;
      }
    }
  }

  .loginmore{
    width:r(100%);
    height:r(200);
    margin-top:r(125);
    overflow:hidden;
    text-align:center;
    p{
      color:#999;
      font-size:r(26);
      margin-bottom:r(30);
    }
    .wx{
      display:inline-block;
      width:r(70);
      height:r(70);
      background:url(../../assets/vx.png) no-repeat;
      background-size:r(70) r(70);
    }
    .qq{
      display:inline-block;
      width:r(70);
      height:r(70);
      background:url(../../assets/qq.png) no-repeat;
      background-size:r(70) r(70);
      margin:0 r(122);
    }
    .sina{
      display:inline-block;
      width:r(70);
      height:r(70);
      background:url(../../assets/sina.png) no-repeat;
      background-size:r(70) r(70);
    }
  }

  .rules{
    width:r(100%);
    height:r(100);
    margin-top:r(125);
    overflow:hidden;
    text-align:center;
    p{
      color:#999;
      font-size:r(24);
      margin-bottom:r(15);
    }
    .service{
      color:#0350A0;
      font-size:r(24);
    }
    .and{
      color:#999;
      font-size:r(24);
    }
    .privacy{
      color:#0350A0;
      font-size:r(24);
    }
  }

  .call{
    width:100%;
    height:r(128);
    text-align:center;
    line-height:r(128);
    .phoneicon{
      display:inline-block;
      width:r(33);
      height:r(33);
      background:url(../../assets/phone.png) no-repeat;
      background-size:r(33) r(33);
      vertical-align:middle;
    }
    .phonenum{
      display:inline-block;
      margin-left:r(20);
      color:#999;
    }
    .number{
      color:#999;
    }
  }

  .callModal{
    width:100%;
    height:r(1334);
    position:fixed;
    top:0;
    left:0;
    z-index:10000000;
    background:rgba(0,0,0,0.3);
    .callnow{
      width:r(690);
      height:r(114);
      margin:r(1056) auto 0;
      background:#fff;
      border-radius:r(20);
      line-height:r(114);
      .callicon{
        display:inline-block;
        width:r(46);
        height:r(46);
        background:url(../../assets/call.png) no-repeat;
        background-size:r(46) r(46);
        vertical-align:middle;
        margin:0 r(30);
      }
      .callnum{
        color:#108EE9;
        font-size:r(40);
        font-weight:500;
        vertical-align:middle;
      }
    }
    .cancelcall{
      width:r(690);
      height:r(114);
      margin:r(20) auto 0;
      background:#fff;
      border-radius:r(20);
      text-align:center;
      line-height:r(114);
      font-size:r(40);
      color:#108EE9;
      font-weight:500;
    }
  }
}
</style>