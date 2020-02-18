<template>
    <div class="getvalidate" :class="{gray: (!stop)}" >
        <span @click='clickHandler'>{{ stop ? '发送验证码' : `（${mytimer}）s` }}</span>
    </div>
</template>
<script>
export default {
    name: 'Getvalidate',
    data () {
        return {
            stop : true,
            mytimer: this.timer,
            Interval: null,
        }
    },
    methods: {
       clickHandler (e) {
            if (this.stop) { 
                // 调用外部绑定的倒计时，并且给它开关
                this.$emit('click', this.startTimer);
            }
       },
       update () {
           if (this.mytimer <= 1) {
              // 重置计数
              this.mytimer = this.timer
              // 清除计时器
              clearInterval(this.Interval)
              // 允许启动倒计时
              this.stop = true
           } else {
              // 倒计时
              this.mytimer--;
           }
       },
       startTimer () {
            // 开始循环执行update函数
            this.Interval = setInterval(this.update, 1000)
            // 禁止启动倒计时
            this.stop = false;
       },
       
    },
    props: {
       timer: {
            default: 60, 
            type: Number
       }
    }
};
</script>
<style scoped>
.getvalidate {
    color: #0e6ae7;
    font-weight:900;
    font-size:r(28);
    width: r(360);
    height:r(86);
    font-size: r(28);
    background:rgba(242,246,249,1);
    text-align: center;
    padding: 12px;
    float:right;
}
.gray {
    color: #999;
}
</style>
