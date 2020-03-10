<template>
  <!-- <div class="address">
        <mt-picker :slots="slots" @change="onAddressChange(slots)"></mt-picker>
  </div>-->
  <div class="addressFour">
    <h1>hahahahha</h1>
    <mt-picker :slots="addressSlots" @change="onAddressChange()" v-model="province"></mt-picker>
  </div>
</template>

<script>
import Vue from "vue";
import { Picker } from "mint-ui";
Vue.component(Picker.name, Picker);
import address from "../../public/address.json";
// console.log(address);
// let provinceList = [];
// let cityList = [];
// for(let i=0; i<address.length; i++){

//    provinceList.push(address[i].name);
//    for(let j=0; j<address[i].childs.length; j++){
//       [] = cityList[address[i].code];
//       [].push(address[i].childs[j].name);
//    }

//   //  provinceList[address[i].code] = address[i].name;
//   //  let city = address[i].childs;
//   //  for(let j=0; j<city.length; j++){
//   //   cityData.push(city[j]);

//   //  }

// }
// // console.log(provinceData);
// console.log(provinceList);
// // console.log(cityData);
// console.log(cityList);
export default {
  // data() {
  //   return {
  //     slots: [
  //       {
  //         flex: 1,
  //         values: [1,2,3,4,5],
  //         className: 'slot1',
  //         textAlign: 'right'
  //       },
  //       // {
  //       //   divider: true,
  //       //   content: '-',
  //       //   className: 'slot2'
  //       // },
  //       {
  //         flex: 1,
  //         values: [1,2,3,4,5],
  //         className: 'slot2',
  //         textAlign: 'center'
  //       },
  //       {
  //         flex: 1,
  //         values: [1,2,3,4,5],
  //         className: 'slot3',
  //         textAlign: 'left'
  //       }
  //     ]
  //   };
  // },
  // methods:{
  //   onAddressChange(picker, values) {
  //     // console.log(picker);
  //     // console.log(vlaues);
  //   }
  // },
  name: "addressFour",
  props: ["valSelect"],
  data() {
    return {
      province: "",
      popupVisible: false, //省市区三级
      popupVisible2: false, //街道
      streetRender: true, //街道是否展示
      addressSlots: [
        {
          flex: 1,
          defaultIndex: 1,
          values: [5, 4, 3, 2, 1],
          className: "slot1",
          textAlign: "center"
        },
        {
          divider: true,
          content: "-",
          className: "slot2"
        },
        {
          flex: 1,
          values: [1, 2, 3, 4, 5],
          className: "slot3",
          textAlign: "center"
        },
        {
          divider: true,
          content: "-",
          className: "slot4"
        },
        {
          flex: 1,
          values: [5, 4, 3, 2, 1],
          className: "slot5",
          textAlign: "center"
        }
      ],
      streetSlots: [
        {
          flex: 1,
          values: [],
          className: "slot1",
          textAlign: "center"
        }
      ],
      addressProvince: "省",
      addressCity: "市",
      county: "区",
      addressStreet: "街道"
    };
  },
  methods: {
    onAddressChange(picker, values) {
      let shi = Object.keys(address[values[0]]);
      let index = shi.indexOf(values[1]);
      let xian = address[values[0]][shi[index]];
      this.xianObj = xian;
      picker.setSlotValues(1, shi);
      this.addressProvince = values[0];
      this.addressCity = values[1];
      if (values[2]) {
        //有时为undefined
        this.county = values[2];
      }
      this.$emit("addressProvince", values[0]);
      this.$emit("addressCity", values[1]);
      this.$emit("county", values[2]);
      let address_full = picker.getValues();
      if (address_full[address_full.length - 1] != undefined) {
        //会出现四组值，一组有效
        this.$emit("addressFull", picker.getValues());
      }
      if (xian) {
        //xian报undefined,报错
        picker.setSlotValues(2, Object.keys(xian));
      }
    },
    onStreetChange(picker, values) {
      this.addressStreet = values[0];
      this.$emit("addressStreet", values[0]);
    }
  },
  watch: {
    // county: {
    //   handler(val, oval) {
    //     let street = this.xianObj[val];
    //     if (street.length === 0) {
    //       this.streetRender = false;
    //       this.$emit("noPopup", false);
    //       return;
    //     }
    //     this.streetRender = true;
    //     this.streetSlots[0].values = street;
    //   }
    // }
    province() {
      console.log(this.province);
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.addressSlots[0].defaultIndex = 0;
      }, 100);
    });
  }
};
</script>