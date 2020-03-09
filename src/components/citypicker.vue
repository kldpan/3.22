<template>
    <div class="address">
        <mt-picker :slots="slots" @change="onAddressChange()"></mt-picker>
    </div>
</template>

<script>
import Vue from 'vue';
import { Picker } from 'mint-ui';
Vue.component(Picker.name, Picker);
import address from '../../public/address.json';
console.log(address);
let provinceList = [];
let cityList = [];
for(let i=0; i<address.length; i++){
   provinceList.push(address[i].name);
   let cityData = address[i].childs;
   for(let j=0; j<cityData.length; j++){
    
    cityList.push(cityData[j].name); 
   }
   
}
console.log(provinceList);
console.log(cityList);
export default{
  data() {
    return {
      slots: [
        {
          flex: 1,
          values: provinceList,
          className: 'slot1',
          textAlign: 'right'
        },
        // {
        //   divider: true,
        //   content: '-',
        //   className: 'slot2'
        // },
        {
          flex: 1,
          values: [1,2,3,4,5],
          className: 'slot2',
          textAlign: 'center'
        },
        {
          flex: 1,
          values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
          className: 'slot3',
          textAlign: 'left'
        }
      ]
    };
  },
  methods:{
    onAddressChange(picker, values) {
    //   if (values[0] > values[1]) {
    //     picker.setSlotValue(1, values[0]);
    //   }
    }
  },
}
</script>