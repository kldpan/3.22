<template>
  <div>
    <h1>Mine</h1>
    <!-- <div class="box">
      <div class="box_li" :key="index" v-for="(item,index) in subjects" @click="changeCss(item)" :class="index===selectedItem?'selectedItem':''">{{item.name}}</div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "firstcomponent",
        data() {
          return {
            // selectedItem:[],
            // author:"微信公众号 haiyan",
            // subjects:[
            //   { name:'历史' },
            //   { name:'地理' },
            //   { name:'生物' },
            //   { name:'政治' },
            //   { name:'技术' },
            //   { name:'物理' },
            //   { name:'化学' }
            // ]
          }
        },
        methods:{
          changeCss(item) {
            if (!item.selected && this.selectedItem.length < 3) {
              item.selected = true
              this.selectedItem.push(item.name)
            } else if (item.selected) {
              item.selected = false
              const i = this.selectedItem.indexOf(item.name)
              this.selectedItem.splice(i, 1)
            }
          }
        }
}
</script>