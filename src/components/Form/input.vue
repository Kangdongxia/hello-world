<template>
  <input  
      type="text"
      :value="currentValue" 
      @input="handleInput"
      @blur="handleBlur"/>
</template>
<script>
 import Emitter from '../../mixins/emitter.js'
 export default {
   name:'iInput',
   mixins:[ Emitter ],
   props:{
     value:{
       type:String,
       default:''
     }
   },
   data(){
     return {
       currentValue: this.value
     }
   },
   watch:{
    value(newValue){
      // console.log('newValue',newValue);
      this.currentValue = newValue; 
    }
   },
   methods:{
     //输入框每输入一个字符,都触发input事件
     handleInput(event){
       const nowValue = event.target.value;
       this.currentValue = nowValue;
       //达成将input的值同步给form.model[prop]的目的
       this.$emit('input',nowValue);
       this.dispatch('iFormItem','on-form-change',nowValue);
     },
     //输入框失去光标时触发
     handleBlur(){
       this.dispatch('iFormItem','on-form-blur',this.currentValue); 
     }
   }
 }
</script>
