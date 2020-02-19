<template>
  <div class="service">
    <h1>service</h1>
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
.service{
  width:100%;
  height:r(1334);
  position:fixed;
  top:0;
  left:0;
  z-index:100000;
  background:#fff;
}
</style>