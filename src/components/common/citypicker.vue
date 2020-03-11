<template>
  <div class="citypicker">
    <div class="closearea"></div>
    <div class="selectarea">

    </div>
  </div>
</template>

<script>
import address from "./address.json"; 
export default {
  data() {
    return {
      
    }
  }
}
</script>

<style lang="scss" scoped>
.citypicker{
  width:100%;
  height:r(1334);
  background:rgba(0,0,0,0.3);
  position:fixed;
  left:0;
  top:0;
  z-index:1000000;
  .closearea{
    width:100%;
    height:r(334);
    background:pink;
  }
  .selectarea{
    width:100%;
    height:r(1000);
    background:#fff;
  }
}
</style>