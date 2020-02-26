<template>
  <div class="activity">
    <img src="../../assets/activity-pull-new.jpg"/>
  </div>
</template>

<script>
export default {
  mounted(){
    console.log("One")
  }
};
</script>

<style lang="scss" scoped>
.activity{
    width:100%;
    height:r(1334);
    position:fixed;
    left:0;
    top:0;
    z-index:100000;
    overflow:hidden;
    img{
        width:100%;
        height:100%;
    }
}
</style>