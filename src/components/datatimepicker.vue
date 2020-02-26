<template>
    <mt-datetime-picker
    v-model="pickerVisible"
    type="date"
    year-format="{value} 年"
    month-format="{value} 月"
    date-format="{value} 日">
    </mt-datetime-picker>
</template>

<script>
import Vue from 'vue';
import { DatetimePicker } from 'mint-ui';
Vue.component(DatetimePicker.name, DatetimePicker);
export default {
    data(){
        return {
            
        }
    },
    methods:{
        openPicker() {
            this.$refs.picker.open();
        }
    }
}
</script>
