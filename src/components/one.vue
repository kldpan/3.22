<template>
  <div>
    <mt-popup v-model="popupVisible" position="bottom">12345688546574684dfasf</mt-popup>
  </div>
</template>

<script>
import Vue from "vue";
import { Popup } from "mint-ui";
Vue.component(Popup.name, Popup);
export default {
  data() {
    return {
      popupVisible: true
    };
  },
  mounted() {
    console.log("One");
  }
};
</script>

<style lang="scss" scoped>
</style>