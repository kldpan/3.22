<template>
  <div class="noteinfos">
    <!-- 第一层 -->
    <div class="title clearfix">
        <div class="back fl" @click="go(-1)"></div>
        <div class="titlename fl">备注信息</div>
    </div>

    <!-- 快捷选项 -->
    <div class="fastselectarea">
      <div class="name">快捷选项</div>
      <div class="typeoptions">
        <ul class="clearfix">
          <li v-for="(item,index) in selectList" :key="index" :class="item.bool === true ? 'selectedoption fl' : 'noselectedoption fl'" @click.stop="select(item,index)">{{item.content}}</li>
        </ul>
      </div>
    </div>

    <!-- 其他备注 -->
    <div class="morenote">
      <div class="name">其他备注</div>
      <div class="inputarea">
        <textarea placeholder="请输入备注信息" @blur="saveContent()" ref="textarea"></textarea>
        <span class="voiceicon fr"></span>
      </div>
    </div>

    <!-- 货物图 -->
    <!-- <div class="uploadarea">
      <div class="name">
        <span class="left">货物实拍图</span>
        <span class="right">如果货物特殊，可以拍照以便司机参考</span>
      </div>
      <div class="clickarea">
        <div class="add" @click="upLoad()" ref="test">+</div>
      </div>
    </div> -->

    <!-- 底部确认 -->
    <div class="bottom">
      <div class="confirm" @click="confirm()">确定</div>
    </div>
    

  </div>
</template>

<script>
export default {
  data(){
    return {
      selectList:[
        {content: '三不超', bool:false},
        {content: '需雨布', bool:false},
        {content: '全部现金', bool:false},
        {content: '随时装', bool:false},
        {content: '高价急走', bool:false},
        {content: '寄回单', bool:false},
        {content: '货到付', bool:false},
        {content: '不议价',bool:false}
      ],
      userSelectOptionList:[],
      userInputNote:'',
    }
  },
  methods:{
    go(n){
      this.$router.go(n);
    },
    select(item,index){
      item.bool = !item.bool;
      if(item.bool){
        this.userSelectOptionList.push(item);
      }else{
        this.userSelectOptionList.splice(this.userSelectOptionList.indexOf(item),1);
      }
    },
    upLoad() {
      // 触发上传图片按钮
      this.$refs.avatarInput.dispatchEvent(new MouseEvent("click"));
    },
    saveContent(){
      this.userInputNote = this.$refs.textarea.value;
      console.log(this.userInputNote);
    },
    confirm(){
      this.$router.push({
        path:'/deliverydetails',
        query:{
          userSelectOptionList:this.userSelectOptionList,
          userInputNote:this.userInputNote || '暂无备注',
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.noteinfos{
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

  // 快捷选项区
  .fastselectarea{
    width:r(690);
    height:r(259);
    background:#fff;
    margin:r(20) auto;
    border-radius:r(10);
    padding:0 r(20);
    .name{
      width:100%;
      height:r(88);
      line-height:r(88);
      font-size:r(30);
      color:#333;
      border-bottom:1px solid rgba(198,198,198,0.3);
    }
    .typeoptions{
      width:100%;
      height:r(170);
      ul{
        width:100%;
        height:100%;
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
          margin: r(22) r(7) 0 r(7);
          font-size:r(26);
          display:flex;
          align-items:center;
          justify-content:center;
          box-sizing:border-box;
        }
        .selectedoption{
          border:1px solid #0350A0;
          color:#0350A0;
        }
        .noselectedoption{
          color:#666;
        }
      }
    }
  }

  // 输入备注区
  .morenote{
    width:r(690);
    height:r(358);
    background:#fff;
    margin:r(20) auto;
    border-radius:r(10);
    padding:0 r(20);
    .name{
      width:100%;
      height:r(88);
      line-height:r(88);
      font-size:r(30);
      color:#333;
    }
    .inputarea{
      width:r(620);
      height:r(230);
      border:1px solid rgba(198,198,198,1);
      border-radius:10px;
      padding:r(10) r(20) 0;
      textarea{
        border:none;
        font-size:r(28);
        color:#333;
        width:r(580);
        height:r(165);
      }
      .voiceicon{
        display:inline-block;
        width:r(22);
        height:r(33);
        background:url(../../assets/voice.png) no-repeat;
        background-size:r(22) r(33);
      }
    }
  }

  .bottom{
    width:r(690);
    height:r(88);
    margin:0 auto;
    .confirm{
      width:100%;
      height:100%;
      background:#F28312;
      border-radius:r(43);
      text-align:center;
      line-height:r(88);
      font-size:r(32);
      color:#fff;
    }
  }
  
  
}
</style>